'use client';

import useAuthStore from '@/store/useAuthStore';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

function VerifyEmailBanner({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const { initialize } = useAuthStore();
  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startPolling = () => {
    setPolling(true);
    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setPolling(false);
      toast.error('انتهت مهلة التفعيل. يرجى إعادة المحاولة لاحقاً.');
    }, 120000);

    intervalRef.current = setInterval(async () => {
      try {
        const res = await fetch('/api/auth/me', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email })
        });
        const data = await res.json();
        if (data.isActive) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setPolling(false);
          initialize();
          router.refresh?.();
        }
      } catch (err) {
        console.error(err);
      }
    }, 20000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSendVerification = async () => {
    setLoading(true);
    await fetch('/api/auth/send-verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email })
    });
    setLoading(false);
    toast.success('تم إرسال رابط التفعيل إلى بريدك الإلكتروني.');
    startPolling();
  };

  return (
    <div className="bg-orange-50 border-l-4 border-red-500 p-4 mb-6 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-red-800 font-bold">البريد الإلكتروني غير مُفعّل</h3>
          <p className="text-red-700 mt-1">يرجى تفعيل بريدك الإلكتروني.</p>
        </div>
        <button
          onClick={handleSendVerification}
          className={`text-white py-2 px-4 rounded-md transition-colors duration-300 cursor-pointer ${loading || polling ? 'bg-orange-500 hover:bg-orange-600' : 'bg-red-500 hover:bg-red-600'}`}
          disabled={loading || polling}
        >
          {loading ? '...جاري الإرسال' : polling ? 'بانتظار التفعيل...' : 'إرسال البريد'}
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { isAuthenticated, initialized, initialize, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (initialized) {
      if (!isAuthenticated) {
        router.replace('/auth/login');
      } else if (user?.role === 'admin') {
        // Redirect admin users to the admin dashboard
        router.replace('/admin');
      }
    }
  }, [initialized, isAuthenticated, router, user?.role]);

  if (!initialized) return <div>Loading...</div>;

  const renderWelcomeMessage = () => {
    if (!isAuthenticated) return 'مرحباً بك في لوحة التحكم';

    const roleMessages = {
      investor: 'مرحباً بك في لوحة تحكم المستثمر. يمكنك متابعة استثماراتك وأرباحك من هنا.',
      farmer: 'مرحباً بك في لوحة تحكم المزارع. يمكنك إدارة مزرعتك ومتابعة التقارير من هنا.',
      market_buyer: 'مرحباً بك في السوق. يمكنك تصفح المنتجات وإدارة مشترياتك من هنا.',
    };

    return roleMessages[user?.role as keyof typeof roleMessages] || 'مرحباً بك في لوحة التحكم';
  };

  return (
    <DashboardLayout>
      {user && !user.isActive && (
        <VerifyEmailBanner user={user} />
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
