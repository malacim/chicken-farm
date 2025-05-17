'use client';

import Image from 'next/image';
import {
  Check,
  ShoppingCart,
  ChevronDown,
  Shield,
  BarChart3,
  Users,
  MessageCircle
} from 'lucide-react';
import { useState } from 'react';
import Chicken from '@/icons/Chicken';
import Chick from '@/icons/Chick';

export default function Home() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const [activeTab, setActiveTab] = useState('baidcash');

  const features = [
    {
      icon: <Chicken className="w-10 h-10 text-[var(--color-primary-dark)]" />,
      title: "بايد كاش",
      description: "استثمر في تأجير الدجاج البياض واحصل على عوائد شهرية مضمونة بنسبة تصل إلى 30%",
      benefits: [
        "استثمار مرن من 60 إلى 365 يوم",
        "عوائد تتراوح بين 15-30%",
        "صندوق تأمين يحمي رأس مالك"
      ]
    },
    {
      icon: <Chick className="w-10 h-10 text-[var(--color-primary-dark)]" />,
      title: "كتي كاش",
      description: "استثمر في تربية الصيصان بدورات مختلفة واستفد من أرباح موسمية مضمونة",
      benefits: [
        "خيارات استثمار متعددة (45-180 يوم)",
        "أرباح تصل إلى 25%",
        "مرونة في اختيار حجم الاستثمار"
      ]
    },
    {
      icon: <ShoppingCart className="w-10 h-10 text-[var(--color-primary-dark)]" />,
      title: "ماركت تشيك",
      description: "منصة مباشرة لبيع المنتجات الدواجن من المزرعة إلى المستهلك",
      benefits: [
        "منتجات طازجة مباشرة من المزرعة",
        "أسعار تنافسية",
        "دعم المزارعين المحليين"
      ]
    }
  ];

  const whyChooseUs = [
    "نظام استثماري شفاف",
    "حماية مالية من خلال صندوق التأمين",
    "فرص استثمارية متنوعة",
    "دعم فني ومتابعة مستمرة"
  ];

  const investmentPackages = {
    baidcash: {
      title: "بايد كاش - الاستثمار في الدجاج البياض",
      description: "استثمر في تأجير الدجاج البياض واحصل على عوائد شهرية مضمونة تصل إلى 30%",
      unitPrice: "15 درهم / دجاجة / شهر",
      duration: ["60 يوم", "90 يوم", "180 يوم", "365 يوم"],
      profitRate: "15-30%",
      insuranceFee: "2.5% من قيمة الاستثمار",
      image: "/images/white-chicken.jpg"
    },
    kticash: {
      title: "كتي كاش - الاستثمار في الصيصان",
      description: "استثمر في تربية الصيصان بمراحل مختلفة واحصل على أرباح موسمية مضمونة",
      packages: [
        { name: "حزمة 0 يوم", cycle: "45 يوم", price: "10 دراهم/صوص", profit: "15%" },
        { name: "حزمة 7 أيام", cycle: "90 يوم", price: "15 درهم/صوص", profit: "20%" },
        { name: "حزمة 21 يوم", cycle: "180 يوم", price: "22 درهم/صوص", profit: "25-30%" }
      ],
      insuranceFee: "2.5% من قيمة الاستثمار",
      image: "/images/kits.jpg"
    }
  };

  const userRoles = [
    {
      icon: <Users className="w-12 h-12 mb-4 text-[var(--color-primary-dark)]" />,
      title: "المستثمرون",
      description: "اختر حزم الاستثمار، تتبع الأرباح، وطلب السحب بكل سهولة من خلال لوحة تحكم خاصة",
    },
    {
      icon: <BarChart3 className="w-12 h-12 mb-4 text-[var(--color-primary-dark)]" />,
      title: "المزارعون",
      description: "سجل قطعان الدواجن، تابع المدفوعات، واستفد من الدعم الفني المستمر"
    },
    {
      icon: <ShoppingCart className="w-12 h-12 mb-4 text-[var(--color-primary-dark)]" />,
      title: "المتسوقون",
      description: "تصفح منتجات الدواجن الطازجة وقم بالشراء مباشرة من المزارعين بأسعار تنافسية"
    }
  ];

  const faqItems = [
    {
      question: "ما هو مبلغ الاستثمار المطلوب للبدء؟",
      answer: "يمكنك البدء بمبلغ بسيط يبدأ من 500 درهم في منصة هلا تشيك. كلما زاد حجم استثمارك، زادت نسبة الأرباح المحتملة."
    },
    {
      question: "كيف يعمل صندوق التأمين؟",
      answer: "يتم اقتطاع 2.5% من قيمة الاستثمار للمساهمة في صندوق التأمين الذي يحمي رأس المال في حالة الأمراض الفتاكة أو الكوارث الطبيعية، مع تعويض يصل إلى 70% من رأس المال."
    },
    {
      question: "هل يمكنني سحب استثماري قبل نهاية الدورة؟",
      answer: "لا يمكن سحب الاستثمار قبل نهاية الدورة المتفق عليها. عند الاكتمال، يمكنك طلب سحب المبلغ الأصلي مع الأرباح المتفق عليها."
    },
    {
      question: "كيف يتم حساب الأرباح؟",
      answer: "تُحسب الأرباح بناءً على نوع الحزمة المختارة ومدة الاستثمار وعدد الوحدات. يتراوح معدل الربح بين 15% و30% اعتماداً على الحزمة."
    }
  ];

  return (
    <div dir="rtl" className="bg-[var(--color-secondary)] font-[var(--font-sans)] text-[var(--color-text-primary)]">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-[var(--color-primary-dark)]">
              هلا تشيك
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <button onClick={() => scrollToSection('features')} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-dark)] cursor-pointer transition-all duration-300">خدماتنا</button>
            <button onClick={() => scrollToSection('investment')} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-dark)] cursor-pointer transition-all duration-300">الاستثمار</button>
            <button onClick={() => scrollToSection('why-us')} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-dark)] cursor-pointer transition-all duration-300">لماذا نحن</button>
            <button onClick={() => scrollToSection('faq')} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-dark)] cursor-pointer transition-all duration-300">الأسئلة الشائعة</button>
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <a href="/login" className="text-[var(--color-primary-dark)] hover:underline cursor-pointer transition-all duration-300 hover:text-[var(--color-primary)] ml-4">تسجيل الدخول</a>
            <a href="/signup" className="btn-sm bg-[var(--color-primary-dark)] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all">
              إنشاء حساب
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section - 100vh */}
      <div className="relative h-screen flex items-center overflow-hidden" style={{ minHeight: '100vh' }}>
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-l from-[var(--color-primary-dark)]/90 to-[var(--color-primary-dark)]/40 z-10"></div>
          <Image
            src="/images/hero-bg.jpg"
            alt="مزرعة دواجن"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 z-20 relative pt-24">
          <div className="max-w-2xl">
            <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
              استثمر بذكاء في عالم <span className="text-[var(--color-accent)]">الدواجن</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              منصة هلا تشيك توفر لك فرص استثمارية مبتكرة في قطاع الدواجن بعوائد مجزية تصل إلى 30% وبنظام شفاف وآمن
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
              <a href="/signup" className="ml-4 btn bg-white text-[var(--color-primary-dark)] text-lg px-8 py-4 rounded-lg shadow-lg hover:bg-opacity-90 transition-all font-semibold">
                ابدأ الاستثمار الآن
              </a>
              <button onClick={() => scrollToSection('features')} className="btn bg-transparent text-white border-2 border-white text-lg px-8 py-4 rounded-lg hover:bg-white/10 transition-all font-semibold flex items-center justify-center">
                اكتشف المزيد
                <ChevronDown className="mr-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Stats Banner */}
      <div className="bg-[var(--color-primary-dark)] text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">+2500</div>
              <div className="text-lg opacity-90">مستثمر نشط</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">+500</div>
              <div className="text-lg opacity-90">مزارع شريك</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">30%</div>
              <div className="text-lg opacity-90">أقصى عائد استثماري</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">+10K</div>
              <div className="text-lg opacity-90">عملية استثمار مكتملة</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary-dark)] mb-4">
              خدماتنا الاستثمارية
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              نقدم لك مجموعة متنوعة من الفرص الاستثمارية في قطاع الدواجن مع أعلى معايير الشفافية والأمان
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-primary-dark)]/10 rounded-bl-full -mr-8 -mt-8 transition-all duration-300 group-hover:bg-[var(--color-primary-dark)]/20"></div>
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-[var(--color-primary-dark)] mb-4">
                  {feature.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-[var(--color-success)] mt-1 ml-2 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <a href={`/${feature.title.split(' ')[0].toLowerCase()}`} className="text-[var(--color-primary-dark)] font-semibold inline-flex items-center hover:underline">
                    عرض التفاصيل
                    <ChevronDown className="transform rotate-90 mr-1 w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Roles Section */}
      <div className="py-20 bg-[var(--color-secondary)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary-dark)] mb-4">
              منصة لجميع الأطراف
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              تجمع منصة هلا تشيك بين المستثمرين والمزارعين والمستهلكين في نظام بيئي متكامل
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {userRoles.map((role, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
                {role.icon}
                <h3 className="text-xl font-semibold text-[var(--color-primary-dark)] mb-3">
                  {role.title}
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  {role.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investment Packages Section */}
      <div id="investment" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary-dark)] mb-4">
              حزم الاستثمار
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              اختر الحزمة الاستثمارية المناسبة لك وابدأ في تحقيق أرباح مضمونة
            </p>

            {/* Tab Navigation */}
            <div className="flex justify-center mt-8">
              <div className="inline-flex rounded-md shadow-sm p-1 bg-gray-100">
                <button
                  onClick={() => setActiveTab('baidcash')}
                  className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === 'baidcash'
                      ? 'bg-[var(--color-primary-dark)] text-white'
                      : 'bg-transparent text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  بايد كاش
                </button>
                <button
                  onClick={() => setActiveTab('kticash')}
                  className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === 'kticash'
                      ? 'bg-[var(--color-primary-dark)] text-white'
                      : 'bg-transparent text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  كتي كاش
                </button>
              </div>
            </div>
          </div>

          {/* BaidCash Package */}
          {activeTab === 'baidcash' && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-lg overflow-hidden shadow-lg relative">
                <Image
                  src={investmentPackages.baidcash.image}
                  alt="الدجاج البياض"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-4">
                  {investmentPackages.baidcash.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                  {investmentPackages.baidcash.description}
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <span className="font-semibold ml-2">سعر الوحدة:</span>
                    <span>{investmentPackages.baidcash.unitPrice}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-semibold ml-2">مدة الاستثمار:</span>
                    <div className="flex flex-wrap gap-2">
                      {investmentPackages.baidcash.duration.map((period, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {period}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold ml-2">نسبة الربح:</span>
                    <span>{investmentPackages.baidcash.profitRate}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold ml-2">رسوم التأمين:</span>
                    <span>{investmentPackages.baidcash.insuranceFee}</span>
                  </div>
                </div>
                <a href="/signup" className="btn bg-[var(--color-primary-dark)] text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all inline-block">
                  استثمر الآن
                </a>
              </div>
            </div>
          )}

          {/* KtiCash Package */}
          {activeTab === 'kticash' && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={investmentPackages.kticash.image}
                  alt="الصيصان"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-4">
                  {investmentPackages.kticash.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                  {investmentPackages.kticash.description}
                </p>
                <div className="mb-8">
                  <h4 className="font-semibold mb-3">الحزم المتاحة:</h4>
                  <div className="space-y-4">
                    {investmentPackages.kticash.packages.map((pkg, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="font-semibold text-[var(--color-primary-dark)] mb-2">{pkg.name}</div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500">المدة:</span>
                            <div>{pkg.cycle}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">السعر:</span>
                            <div>{pkg.price}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">الربح:</span>
                            <div>{pkg.profit}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <span className="font-semibold ml-2">رسوم التأمين:</span>
                    <span>{investmentPackages.kticash.insuranceFee}</span>
                  </div>
                </div>
                <a href="/signup" className="btn bg-[var(--color-primary-dark)] text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all inline-block">
                  استثمر الآن
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Insurance Fund Section */}
      <div className="py-20 bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-primary-dark)]/80 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center bg-white/20 p-3 rounded-full mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                صندوق التأمين المتكامل
              </h2>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                نحمي استثمارك من المخاطر من خلال صندوق تأمين متكامل يغطي الأمراض الفتاكة والكوارث الطبيعية بتعويض يصل إلى 70% من رأس المال.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-white mt-1 ml-2 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block">مساهمة المستثمر</span>
                    <span className="text-white/90">رسوم تأمين إلزامية: 180-280 درهم + 2.5% من الاستثمارات اللاحقة</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-white mt-1 ml-2 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block">مساهمة المزارع</span>
                    <span className="text-white/90">مساهمة إلزامية: 280-380 درهم + 2.5% من الأرباح</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-white mt-1 ml-2 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block">مساهمة المنصة</span>
                    <span className="text-white/90">1% من الأرباح الشهرية</span>
                  </div>
                </div>
              </div>
              <a href="/insurance" className="btn bg-white text-[var(--color-primary-dark)] px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all inline-block font-semibold">
                المزيد عن صندوق التأمين
              </a>
            </div>
            <div className="hidden md:block relative">
              <Image
                src="/images/invest-ass.jpg"
                alt="صندوق التأمين"
                width={500}
                height={500}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 shadow-lg border border-[#eee] -right-6 bg-white text-[var(--color-primary-dark)] px-6 py-4 rounded-lg">
                <div className="text-2xl font-bold">70%</div>
                <div className="text-sm">تعويض من رأس المال</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="why-us" className="py-20 bg-[var(--color-secondary)]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/images/chickens.webp"
                alt="لماذا هلا تشيك"
                width={500}
                height={500}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg text-center hidden md:block">
                <div className="text-4xl font-bold text-[var(--color-primary-dark)]">5+</div>
                <div className="text-[var(--color-primary-dark)]">سنوات من الخبرة</div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary-dark)] mb-6">
                لماذا تختار هلا تشيك؟
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] mb-8">
                نحن نقدم نظام استثماري متكامل يضمن أعلى مستويات الشفافية والأمان مع عوائد مجزية
              </p>
              <div className="space-y-5">
                {whyChooseUs.map((reason, index) => (
                  <div key={index} className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                    <div className="bg-[var(--color-primary-dark)]/10 p-2 rounded-full ml-4">
                      <Check className="w-6 h-6 text-[var(--color-success)]" />
                    </div>
                    <div>
                      <span className="text-lg font-medium">{reason}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <a href="/about" className="btn bg-[var(--color-primary-dark)] text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all inline-block">
                  تعرف على قصتنا
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary-dark)] mb-4">
              الأسئلة الشائعة
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              إليك إجابات عن الأسئلة الأكثر شيوعاً حول منصة هلا تشيك والاستثمار في الدواجن
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-[var(--color-secondary)] rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-[var(--color-primary-dark)] mb-3">
                    {item.question}
                  </h3>
                  <p className="text-[var(--color-text-secondary)]">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-[var(--color-text-secondary)] mb-4">
                لم تجد إجابة لسؤالك؟ لا تتردد في التواصل معنا
              </p>
              <a href="/contact" className="btn bg-[var(--color-primary-dark)] text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all inline-block">
                تواصل معنا
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-[var(--color-secondary)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary-dark)] mb-4">
              آراء عملائنا
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              تعرف على تجارب المستثمرين والمزارعين مع منصة هلا تشيك
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md relative">
              <div className="text-4xl text-[var(--color-primary-dark)]/10 absolute top-4 right-4 font-serif">"</div>
              <p className="mb-6 relative z-10 text-[var(--color-text-secondary)]">
                استثمرت في حزمة بايد كاش منذ 6 أشهر وكانت التجربة رائعة. أحصل على أرباحي بانتظام والفريق متعاون جداً.
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[var(--color-primary-dark)] rounded-full flex items-center justify-center text-white font-bold ml-3">
                  س.ع
                </div>
                <div>
                  <div className="font-medium">سمير العربي</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">مستثمر منذ 2023</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md relative">
              <div className="text-4xl text-[var(--color-primary-dark)]/10 absolute top-4 right-4 font-serif">"</div>
              <p className="mb-6 relative z-10 text-[var(--color-text-secondary)]">
                كمزارع، وفرت لي المنصة فرصة توسيع مشروعي والوصول إلى مستثمرين جدد. الدعم الفني ممتاز والمتابعة مستمرة.
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[var(--color-primary-dark)] rounded-full flex items-center justify-center text-white font-bold ml-3">
                  م.خ
                </div>
                <div>
                  <div className="font-medium">محمد خالد</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">مزارع شريك</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md relative">
              <div className="text-4xl text-[var(--color-primary-dark)]/10 absolute top-4 right-4 font-serif">"</div>
              <p className="mb-6 relative z-10 text-[var(--color-text-secondary)]">
                أحب التنوع في حزم الاستثمار والشفافية الكاملة في عرض البيانات. صندوق التأمين يعطي شعوراً بالأمان لرأس المال.
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[var(--color-primary-dark)] rounded-full flex items-center justify-center text-white font-bold ml-3">
                  ن.ح
                </div>
                <div>
                  <div className="font-medium">نورا حسن</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">مستثمرة منذ 2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-16 bg-[var(--color-primary-dark)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">ابق على اطلاع بآخر المستجدات</h2>
            <p className="text-lg opacity-90 mb-8">
              اشترك في نشرتنا البريدية للحصول على آخر العروض والأخبار حول منصة هلا تشيك
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                className="px-6 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-right w-full md:w-auto md:min-w-80"
              />
              <button className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white font-semibold px-8 py-3 rounded-lg transition-all">
                اشتراك
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-24 bg-gradient-to-br from-[var(--color-secondary)] to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">
            ابدأ رحلة استثمارك اليوم
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] mb-10 max-w-3xl mx-auto">
            سجل الآن واستفد من فرص استثمارية مميزة في عالم الدواجن مع عوائد مضمونة وشفافية كاملة
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/signup" className="btn bg-[var(--color-primary-dark)] text-white text-lg px-10 py-4 rounded-lg shadow-lg hover:bg-opacity-90 transition-all font-semibold">
              إنشاء حساب
            </a>
            <a href="/contact" className="btn bg-transparent border-2 border-[var(--color-primary-dark)] text-[var(--color-primary-dark)] text-lg px-10 py-4 rounded-lg hover:bg-[var(--color-primary-dark)]/10 transition-all font-semibold">
              تواصل معنا
            </a>
          </div>
          <div className="mt-8 flex justify-center items-center gap-2 text-[var(--color-text-secondary)]">
            <MessageCircle className="w-5 h-5" />
            <span>متاحون للرد على استفساراتك على مدار الساعة</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[var(--color-primary-dark)] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">هلا تشيك</h3>
              <p className="opacity-80 mb-4">
                منصة استثمارية رائدة في مجال الدواجن، نربط المستثمرين بالمزارعين لتحقيق عوائد مجزية.
              </p>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  <span className="sr-only">فيسبوك</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  <span className="sr-only">انستغرام</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  <span className="sr-only">تويتر</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
              <ul className="space-y-2 opacity-80">
                <li><a href="/" className="hover:underline">الرئيسية</a></li>
                <li><a href="/about" className="hover:underline">عن المنصة</a></li>
                <li><a href="/packages" className="hover:underline">حزم الاستثمار</a></li>
                <li><a href="/insurance" className="hover:underline">صندوق التأمين</a></li>
                <li><a href="/marketplace" className="hover:underline">السوق</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">الدعم</h3>
              <ul className="space-y-2 opacity-80">
                <li><a href="/faq" className="hover:underline">الأسئلة الشائعة</a></li>
                <li><a href="/contact" className="hover:underline">تواصل معنا</a></li>
                <li><a href="/terms" className="hover:underline">الشروط والأحكام</a></li>
                <li><a href="/privacy" className="hover:underline">سياسة الخصوصية</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
              <ul className="space-y-2 opacity-80">
                <li className="flex items-start">
                  <span className="ml-2">العنوان:</span>
                  <span>الرباط، المغرب</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-2">الهاتف:</span>
                  <span>+212 5XX-XXXXX</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-2">البريد الإلكتروني:</span>
                  <span>info@hlachick.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8 text-center opacity-70">
            <p>© {new Date().getFullYear()} هلا تشيك. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
