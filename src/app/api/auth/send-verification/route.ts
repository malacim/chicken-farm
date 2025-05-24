import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import connectDB from '@/lib/db';
import { User } from '@/models';
import nodemailer from 'nodemailer';

const createEmailTemplate = (verificationUrl: string, appName: string = "HalaChick") => `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title>Verify Your Email</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @media screen and (max-width: 600px) {
      .container { width: 100% !important; padding: 20px !important; margin: 0 auto !important; }
      .button { width: 100% !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',Arial,sans-serif;background-color:#f8fafc;">
  <div style="padding:40px 20px;">
    <div class="container" style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:12px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);overflow:hidden;">

      <!-- Header -->
      <div style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:40px 40px 30px;text-align:center;">
        <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:600;letter-spacing:-0.025em;">
          Verify Your Email
        </h1>
        <p style="margin:12px 0 0;color:#e2e8f0;font-size:16px;opacity:0.9;">
          Welcome to ${appName}! Let's get you started.
        </p>
      </div>

      <!-- Content -->
      <div style="padding:40px;">
        <div style="text-align:center;margin-bottom:32px;">
          <div style="width:64px;height:64px;background-color:#f1f5f9;border-radius:50%;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="#667eea"/>
            </svg>
          </div>
          <h2 style="margin:0 0 16px;color:#1e293b;font-size:24px;font-weight:600;">
            Almost there!
          </h2>
          <p style="margin:0;color:#64748b;font-size:16px;line-height:1.6;">
            Click the button below to verify your email address and complete your account setup.
          </p>
        </div>

        <!-- CTA Button -->
        <div style="text-align:center;margin:32px 0;">
          <a href="${verificationUrl}"
            class="button"
            style="display:inline-block;padding:16px 32px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:16px;transition:all 0.2s ease;box-shadow:0 4px 6px -1px rgba(102,126,234,0.3);">
            Verify Email Address
          </a>
        </div>

        <!-- Alternative Link -->
        <div style="margin-top:32px;padding-top:24px;border-top:1px solid #e2e8f0;">
          <p style="margin:0 0 12px;color:#64748b;font-size:14px;text-align:center;">
            Button not working? Copy and paste this link into your browser:
          </p>
          <p style="margin:0;word-break:break-all;text-align:center;">
            <a href="${verificationUrl}" style="color:#667eea;text-decoration:none;font-size:14px;">
              ${verificationUrl}
            </a>
          </p>
        </div>

        <!-- Expiry Notice -->
        <div style="margin-top:24px;padding:16px;background-color:#fef3cd;border-left:4px solid #f59e0b;border-radius:6px;">
          <p style="margin:0;color:#92400e;font-size:14px;">
            <strong>⏰ This link expires in 1 hour</strong> for security reasons.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="padding:24px 40px;background-color:#f8fafc;border-top:1px solid #e2e8f0;">
        <p style="margin:0;color:#64748b;font-size:14px;text-align:center;">
          If you didn't create an account with ${appName}, you can safely ignore this email.
        </p>
        <p style="margin:12px 0 0;color:#94a3b8;font-size:12px;text-align:center;">
          © ${new Date().getFullYear()} ${appName}. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;

export async function POST(request: Request) {
  await connectDB();
  const { email } = await request.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const token = uuidv4();
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
  user.emailVerificationToken = token;
  user.emailVerificationExpires = expires;
  await user.save();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/auth/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: user.email,
    subject: 'Verify your email address',
    html: createEmailTemplate(verificationUrl, 'Your App Name')
  });

  return NextResponse.json({ message: 'Verification email sent' });
}
