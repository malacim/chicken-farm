import type { Metadata } from "next";
import { Cairo, Tajawal } from "next/font/google";
import AuthInitializer from "@/components/auth/AuthInitializer";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  weight: ["400", "500", "700"],
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HlaChick - منصة استثمار بمشاريع الدواجن",
  description: "منصة رقمية للاستثمار في تربية الدواجن ومتابعة الأرباح بشكل شفاف وآمن",
  keywords: ["استثمار", "دواجن", "تربية الدواجن", "مشاريع استثمارية", "أرباح", "HlaChick"],
  authors: [{ name: "HlaChick" }],
  creator: "HlaChick",
  publisher: "HlaChick",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        url: "/favicon-96x96.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://hlachick.com",
    title: "HlaChick - منصة استثمار بمشاريع الدواجن",
    description: "منصة رقمية للاستثمار في تربية الدواجن ومتابعة الأرباح بشكل شفاف وآمن",
    siteName: "HlaChick",
  },
  twitter: {
    card: "summary_large_image",
    title: "HlaChick - منصة استثمار بمشاريع الدواجن",
    description: "منصة رقمية للاستثمار في تربية الدواجن ومتابعة الأرباح بشكل شفاف وآمن",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} ${tajawal.variable} antialiased font-sans bg-[--color-neutral-100]`}
      >
        <AuthInitializer />
        <Toaster position="top-center" />
        <main>{children}</main>
      </body>
    </html>
  );
}