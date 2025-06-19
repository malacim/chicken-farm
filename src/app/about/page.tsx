import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "قصتنا - HalaChick",
  description: "تعرف على قصة وتأسيس منصة HalaChick ورؤيتنا لمستقبل الاستثمار في الدواجن.",
};

export default function AboutPage() {
  return (
    <div dir="rtl" className="bg-[var(--color-secondary)] min-h-screen pt-24 pb-16 text-[var(--color-text-primary)] font-[var(--font-sans)]">
      {/* Hero */}
      <section className="relative h-72 w-full">
        <Image
          src="/images/farm-story.jpeg"
          alt="HalaChick Story"
          fill
          className="object-cover object-center opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[var(--color-primary-dark)]/90 to-[var(--color-primary-dark)]/30"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-md">
            قصتنا
          </h1>
        </div>
      </section>

      {/* Story Content */}
      <section className="container mx-auto px-4 max-w-4xl mt-12 space-y-8">
        <h2 className="text-3xl font-bold text-[var(--color-primary-dark)] text-center">
          من فكرة إلى منصة رائدة
        </h2>
        <p className="leading-relaxed text-lg text-[var(--color-text-secondary)]">
          بدأت قصة <span className="font-semibold">HalaChick</span> برؤية مشتركة بين مجموعة من
          رواد الأعمال والخبراء في مجال تربية الدواجن، والذين لاحظوا وجود فجوة
          في سوق الاستثمارات الزراعية الرقمية في المنطقة العربية. أردنا تمكين
          المستثمرين من الدخول إلى قطاع الدواجن بسهولة، مع توفير الشفافية
          والأمان اللذين يفتقر إليهما هذا القطاع.
        </p>
        <p className="leading-relaxed text-lg text-[var(--color-text-secondary)]">
          بعد سنوات من البحث والتطوير، قمنا ببناء منصة شاملة تربط بين المزارعين،
          المستثمرين، والمستهلكين، لتقديم حلول استثمارية مبتكرة واعتماد أحدث
          التقنيات في تتبع القطيع وإدارة المخاطر. نحن فخورون بأن منصتنا أصبحت وجهة
          موثوقة للراغبين في تنويع محافظهم الاستثمارية والمساهمة في دعم الأمن
          الغذائي.
        </p>
        <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mt-6">
          رؤيتنا
        </h3>
        <p className="leading-relaxed text-lg text-[var(--color-text-secondary)]">
          أن نكون المنصة التقنية الأولى في العالم العربي لتمكين الاستثمارات
          الزراعية المستدامة، مع التركيز على قطاع الدواجن، وتوفير تجربة استثمارية
          شفافة وآمنة تحقق قيمة حقيقية للمستثمرين والمجتمع.
        </p>
        <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mt-6">
          قيمنا
        </h3>
        <ul className="list-disc pr-6 space-y-2 text-lg text-[var(--color-text-secondary)]">
          <li>الشفافية: توفير معلومات دقيقة وواضحة للمستثمرين.</li>
          <li>الأمان: تطبيق أفضل الممارسات في إدارة المخاطر وحماية رأس المال.</li>
          <li>الاستدامة: دعم الممارسات الزراعية المسؤولة والصديقة للبيئة.</li>
          <li>الابتكار: تبني التقنيات الحديثة لتحسين عمليات الإنتاج والمتابعة.</li>
        </ul>
        <div className="text-center mt-10">
          <Link
            href="/contact"
            className="btn bg-[var(--color-primary-dark)] text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all inline-block"
          >
            تواصل معنا
          </Link>
        </div>
      </section>
    </div>
  );
}
