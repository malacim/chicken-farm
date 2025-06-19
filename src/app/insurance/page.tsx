import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "صندوق التأمين - HalaChick",
  description: "تعرف على آلية صندوق التأمين الذي يحمي استثماراتك في منصة HalaChick بنسبة تعويض تصل إلى 70% من رأس المال.",
};

export default function InsurancePage() {
  return (
    <div dir="rtl" className="bg-[var(--color-secondary)] min-h-screen pt-24 pb-16 text-[var(--color-text-primary)] font-[var(--font-sans)]">
      {/* Hero */}
      <section className="relative h-72 w-full">
        <Image
          src="/images/hero-bg.jpg"
          alt="HalaChick Insurance Fund"
          fill
          className="object-cover object-center opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[var(--color-primary-dark)]/90 to-[var(--color-primary-dark)]/30"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-md">
            صندوق التأمين
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 max-w-4xl mt-12 space-y-8">
        <h2 className="text-3xl font-bold text-[var(--color-primary-dark)] text-center">
          حماية رأس مالك هي أولويتنا
        </h2>
        <p className="leading-relaxed text-lg text-[var(--color-text-secondary)]">
          يهدف صندوق التأمين في <span className="font-semibold">HalaChick</span> إلى الحد
          من المخاطر المرتبطة بالأمراض الفتاكة والكوارث الطبيعية في قطاع الدواجن.
          يتم تمويل الصندوق من خلال مساهمات المستثمرين والمزارعين بالإضافة إلى نسبة
          ثابتة من أرباح المنصة، مما يضمن توفير تغطية تصل إلى <span className="font-semibold text-[var(--color-success)]">70%</span> من رأس المال في الحالات القصوى.
        </p>

        {/* Contribution Breakdown */}
        <div className="grid sm:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mb-2">
              المستثمرون
            </h3>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              رسوم تأمين إلزامية: 180-280 درهم + 2.5% من الاستثمارات اللاحقة.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mb-2">
              المزارعون
            </h3>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              مساهمة إلزامية: 280-380 درهم + 2.5% من الأرباح.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mb-2">
              المنصة
            </h3>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              1% من الأرباح الشهرية تذهب لدعم الصندوق.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mt-10">
          كيف يعمل الصندوق؟
        </h3>
        <ol className="list-decimal pr-6 space-y-3 text-lg text-[var(--color-text-secondary)]">
          <li>
            يتم اقتطاع الرسوم والمساهمات تلقائياً عند بدء الاستثمار أو عند توزيع
            الأرباح.
          </li>
          <li>
            تُجمع الأموال في حساب منفصل مخصص للصندوق وتدار بشفافية كاملة.
          </li>
          <li>
            في حال وقوع خسائر ناتجة عن أمراض أو كوارث، يُقدَّم تعويض يصل إلى 70% من
            رأس المال بعد تحقيق مستقل.
          </li>
          <li>
            يتم نشر تقارير دورية عن أداء الصندوق ورصيده لضمان الشفافية.
          </li>
        </ol>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link
            href="/contact"
            className="btn bg-[var(--color-primary-dark)] text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all inline-block"
          >
            لديك أسئلة؟ تواصل معنا
          </Link>
        </div>
      </section>
    </div>
  );
}
