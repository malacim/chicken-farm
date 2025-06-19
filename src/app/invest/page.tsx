"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

interface Package {
  key: string;
  title: string;
  description: string;
  image: string;
  details: string[];
}

const packages: Package[] = [
  {
    key: "baidcash",
    title: "بيض كاش",
    description:
      "استثمر في تأجير الدجاج البياض واحصل على عوائد شهرية مضمونة تصل إلى 30%",
    image: "/images/white-chicken.jpg",
    details: [
      "استثمار مرن من 60 إلى 365 يوم",
      "عوائد تتراوح بين 15-30%",
      "صندوق تأمين يحمي رأس مالك",
    ],
  },
  {
    key: "kticash",
    title: "كتي كاش",
    description:
      "استثمر في تربية الصيصان بمراحل مختلفة واحصل على أرباح موسمية مضمونة",
    image: "/images/kits.jpg",
    details: [
      "خيارات استثمار متعددة (45-180 يوم)",
      "أرباح تصل إلى 25%",
      "مرونة في اختيار حجم الاستثمار",
    ],
  },
  {
    key: "market",
    title: "سوق",
    description:
      "استثمر في تأجير الدجاج البياض واحصل على عوائد شهرية مضمونة تصل إلى 30%",
    image: "/images/white-chicken.jpg",
    details: [
      "استثمار مرن من 60 إلى 365 يوم",
      "عوائد تتراوح بين 15-30%",
      "صندوق تأمين يحمي رأس مالك",
    ],
  },
];

export default function InvestPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  const handleInvest = (pkg: Package) => {
    if (pkg.key === "market") {
      router.push("/dashboard/market");
    } else {
      if (user) {
        router.push("/dashboard/investors?package=" + pkg.key);
      } else {
        router.push("/auth/register?role=investor");
      }
    }
  };

  return (
    <div
      dir="rtl"
      className="bg-[var(--color-secondary)] min-h-screen pt-24 pb-16 text-[var(--color-text-primary)] font-[var(--font-sans)]"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary-dark)] mb-12 text-center">
          تفاصيل فرص الاستثمار
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.key}
              className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-3">
                  {pkg.title}
                </h2>
                <p className="text-[var(--color-text-secondary)] mb-4 flex-1">
                  {pkg.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {pkg.details.map((d, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-2 h-2 rounded-full mt-2 ml-2 bg-[var(--color-primary-dark)]"></span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleInvest(pkg)}
                  className="mt-auto btn bg-[var(--color-primary-dark)] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all"
                >
                  {pkg.key === "market" ? "عرض السوق" : "استثمر الآن"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
