import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { User } from '@/models';

export async function GET(request: Request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Invalid or missing token' }, { status: 400 });
  }

  const user = await User.findOne({ emailVerificationToken: token, emailVerificationExpires: { $gt: new Date() } });
  if (!user) {
    return NextResponse.json({ error: 'Token is invalid or expired' }, { status: 400 });
  }

  user.isActive = true;
  user.emailVerificationToken = null;
  user.emailVerificationExpires = null;
  await user.save();

  return NextResponse.json({ message: 'Email verified successfully' });
}
