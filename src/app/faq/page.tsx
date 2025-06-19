import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة - HalaChick",
  description: "إجابات عن الأسئلة الأكثر شيوعاً حول منصة HalaChick والاستثمار في الدواجن.",
};

const faqItems = [
  {
    question: "ما هو مبلغ الاستثمار المطلوب للبدء؟",
    answer:
      "يمكنك البدء بمبلغ بسيط يبدأ من 500 درهم في منصة هلا تشيك. كلما زاد حجم استثمارك، زادت نسبة الأرباح المحتملة.",
  },
  {
    question: "كيف يعمل صندوق التأمين؟",
    answer:
      "يتم اقتطاع 2.5% من قيمة الاستثمار للمساهمة في صندوق التأمين الذي يحمي رأس المال في حالة الأمراض الفتاكة أو الكوارث الطبيعية، مع تعويض يصل إلى 70% من رأس المال.",
  },
  {
    question: "هل يمكنني سحب استثماري قبل نهاية الدورة؟",
    answer:
      "لا يمكن سحب الاستثمار قبل نهاية الدورة المتفق عليها. عند الاكتمال، يمكنك طلب سحب المبلغ الأصلي مع الأرباح المتفق عليها.",
  },
  {
    question: "كيف يتم حساب الأرباح؟",
    answer:
      "تُحسب الأرباح بناءً على نوع الحزمة المختارة ومدة الاستثمار وعدد الوحدات. يتراوح معدل الربح بين 15% و30% اعتماداً على الحزمة.",
  },
];

export default function FAQPage() {
  return (
    <div dir="rtl" className="bg-[var(--color-secondary)] min-h-screen pt-24 pb-16 font-[var(--font-sans)] text-[var(--color-text-primary)]">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary-dark)] mb-12 text-center">
          الأسئلة الشائعة
        </h1>
        <div className="space-y-6">
          {faqItems.map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[var(--color-primary-dark)] mb-3">
                {item.question}
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
