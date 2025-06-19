import { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية - HalaChick",
  description: "تعرف على كيفية جمعنا واستخدامنا وحماية بياناتك على منصة HalaChick.",
};

export default function PrivacyPage() {
  return (
    <div dir="rtl" className="bg-[var(--color-secondary)] min-h-screen pt-24 pb-16 font-[var(--font-sans)] text-[var(--color-text-primary)]">
      <div className="container mx-auto px-4 max-w-4xl space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary-dark)] mb-8 text-center">
          سياسة الخصوصية
        </h1>
        <p className="leading-relaxed text-[var(--color-text-secondary)]">
          نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيف نجمع المعلومات ونستخدمها ونحافظ على سريتها.
        </p>
        <h2 className="text-2xl font-bold text-[var(--color-primary-dark)]">1. جمع المعلومات</h2>
        <p className="leading-relaxed text-[var(--color-text-secondary)]">
          قد نقوم بجمع المعلومات التي تقدمها طوعاً عند إنشاء حساب أو استخدام خدماتنا.
        </p>
        <h2 className="text-2xl font-bold text-[var(--color-primary-dark)]">2. استخدام المعلومات</h2>
        <p className="leading-relaxed text-[var(--color-text-secondary)]">
          نستخدم معلوماتك لتقديم الخدمات وتحسين تجربتك بالإضافة إلى الأغراض التسويقية والتحليلية.
        </p>
        <h2 className="text-2xl font-bold text-[var(--color-primary-dark)]">3. حماية المعلومات</h2>
        <p className="leading-relaxed text-[var(--color-text-secondary)]">
          نتخذ إجراءات أمنية لحماية بياناتك من الوصول أو الاستخدام أو الكشف غير المصرح به.
        </p>
        {/* Add more sections as needed */}
      </div>
    </div>
  );
}
