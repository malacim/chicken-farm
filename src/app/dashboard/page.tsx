'use client';

import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuthStore();

  console.log({user});

  const renderWelcomeMessage = () => {
    if (!user) return 'مرحباً بك في لوحة التحكم';

    const roleMessages = {
      investor: 'مرحباً بك في لوحة تحكم المستثمر. يمكنك متابعة استثماراتك وأرباحك من هنا.',
      farmer: 'مرحباً بك في لوحة تحكم المزارع. يمكنك إدارة مزرعتك ومتابعة التقارير من هنا.',
      market_buyer: 'مرحباً بك في السوق. يمكنك تصفح المنتجات وإدارة مشترياتك من هنا.',
    };

    return roleMessages[user.role as keyof typeof roleMessages] || 'مرحباً بك في لوحة التحكم';
  };

  const redirectToOnboarding = () => {
    if (!user) return;

    const onboardingRoutes = {
      investor: '/onboarding/investor',
      farmer: '/onboarding/farmer',
      market_buyer: '/onboarding/market-buyer'
    };

    const route = onboardingRoutes[user.role as keyof typeof onboardingRoutes];
    if (route) {
      router.push(route);
    }
  };

  return (
    <DashboardLayout>
      {!user?.isActive && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-amber-800 font-bold">الحساب غير نشط</h3>
              <p className="text-amber-700 mt-1">يرجى إكمال بيانات التسجيل لتفعيل حسابك والوصول إلى كافة الميزات.</p>
            </div>
            <button
              onClick={redirectToOnboarding}
              className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-md transition-colors duration-300 cursor-pointer"
            >
              إكمال التسجيل
            </button>
          </div>
        </div>
      )}
      <div className="max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">مرحباً، {user?.fullName}</h1>
        <p className="text-gray-600 mb-8">{renderWelcomeMessage()}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {user?.role === 'investor' && (
            <>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">إجمالي الاستثمارات</h3>
                <p className="text-2xl text-[var(--color-primary)]">0 درهم</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">الأرباح الحالية</h3>
                <p className="text-2xl text-green-600">0 درهم</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">المشاريع النشطة</h3>
                <p className="text-2xl text-[var(--color-primary)]">0</p>
              </div>
            </>
          )}

          {user?.role === 'farmer' && (
            <>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">عدد الدجاج</h3>
                <p className="text-2xl text-[var(--color-primary)]">0</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">إنتاج اليوم</h3>
                <p className="text-2xl text-[var(--color-primary)]">0</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">الأرباح الشهرية</h3>
                <p className="text-2xl text-green-600">0 درهم</p>
              </div>
            </>
          )}

          {user?.role === 'market_buyer' && (
            <>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">الطلبات النشطة</h3>
                <p className="text-2xl text-[var(--color-primary)]">0</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">إجمالي المشتريات</h3>
                <p className="text-2xl text-[var(--color-primary)]">0 درهم</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">المنتجات المفضلة</h3>
                <p className="text-2xl text-[var(--color-primary)]">0</p>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
