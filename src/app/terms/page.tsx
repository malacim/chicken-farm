import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الشروط والأحكام - HalaChick",
  description: "راجع شروط وأحكام استخدام منصة HalaChick.",
};

export default function TermsPage() {
  return (
    <div dir="rtl" className="bg-[var(--color-secondary)] min-h-screen pt-24 pb-16 font-[var(--font-sans)] text-[var(--color-text-primary)]">
      <div className="container mx-auto px-4 max-w-4xl space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary-dark)] mb-8 text-center">
          الشروط والأحكام
        </h1>
        <p className="leading-relaxed text-[var(--color-text-secondary)]">
          مرحباً بك في منصة HalaChick. من خلال وصولك إلى المنصة أو استخدامها، فإنك توافق على الالتزام بالشروط والأحكام التالية. يرجى قراءتها بعناية.
        </p>
        <h2 className="text-2xl font-bold text-[var(--color-primary-dark)]">1. قبول الشروط</h2>
        <p className="leading-relaxed text-[var(--color-text-secondary)]">
          باستخدام المنصة، فإنك تقر بقبول هذه الشروط والأحكام وسياسة الخصوصية الخاصة بنا.
        </p>
        <h2 className="text-2xl font-bold text-[var(--color-primary-dark)]">2. حساب المستخدم</h2>
        <p className="leading-relaxed text-[var(--color-text-secondary)]">
          يجب عليك تقديم معلومات دقيقة وكاملة عند إنشاء حسابك، وأنت مسؤول عن الحفاظ على سرية معلومات حسابك.
        </p>
        <h2 className="text-2xl font-bold text-[var(--color-primary-dark)]">3. المسؤولية</h2>
        <p className="leading-relaxed text-[var(--color-text-secondary)]">
          المنصة غير مسؤولة عن أي خسائر ناتجة عن سوء استخدام الحساب أو الاستثمارات.
        </p>
        {/* Add more sections as needed */}
      </div>
    </div>
  );
}
