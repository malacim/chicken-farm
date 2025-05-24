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