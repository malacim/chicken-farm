'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  BarChart2,
  ShieldAlert,
  Bell,
  Brain,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';
import AdminLayout from '@/components/layout/AdminLayout';
import { toast } from 'react-hot-toast';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// --- Analytics state ---





export default function AdminDashboard() {
  const { isAuthenticated, initialized, initialize, user, logout } = useAuthStore();
  const router = useRouter();
  const [stats, setStats] = useState<null | {
    totalInvestors: number;
    activeInvestors: number;
    activeFarmers: number;
    activeInvestments: number;
    completedInvestments: number;
    insuranceFund: number;
    emergencyAlerts: number;
  }>(null);
  const [analytics, setAnalytics] = useState<null | {
    monthly: { labels: string[]; investments: number[]; profits: number[] };
    distribution: { BaidCash: number; KtiCash: number };
    alerts: { type: string; userName: string; userRole: string; date: string; status: string }[];
  }>(null);

  useEffect(() => {
    // fetch aggregated stats & analytics from api
    const fetchStats = async () => {
      // stats

      try {
        const res = await fetch('/api/admin/stats');
        if (!res.ok) throw new Error('فشل جلب الإحصائيات');
        const data = await res.json();
        setStats(data);
          // fetch analytics in parallel
          try {
            const resAn = await fetch('/api/admin/analytics');
            if (resAn.ok) {
              const an = await resAn.json();
              setAnalytics(an);
            }
          } catch (e) { console.error(e); }
      } catch (err) {
        console.error(err);
        toast.error('حدث خطأ أثناء جلب الإحصائيات');
      }
    };
    if (isAuthenticated && user?.role === 'admin') fetchStats();
  }, [isAuthenticated, user]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (initialized) {
      if (!isAuthenticated) {
        router.replace('/auth/login');
      } else if (user?.role !== 'admin') {
        toast.error('ليس لديك صلاحية الوصول إلى لوحة تحكم الإدارة');
        router.replace('/dashboard');
      }
    }
  }, [initialized, isAuthenticated, router, user]);

  const handleLogout = () => {
    logout(() => {
      router.push('/');
    });
  };

  if (!initialized) return <div>Loading...</div>;
  if (!isAuthenticated || user?.role !== 'admin') return null;

  // Dashboard stat card component
  const StatCard = ({ title, value, Icon, color }: {
    title: string;
    value: string | number;
    Icon: React.ElementType;
    color: string;
  }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border-r-4" style={{ borderColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-2xl font-bold" style={{ color }}>{value}</p>
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
          <Icon className="h-6 w-6" style={{ color }} />
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">لوحة تحكم الإدارة</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-[var(--color-chickadmin-primary)]" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {stats?.emergencyAlerts ?? 0}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-[var(--color-chickadmin-primary)] text-white px-4 py-2 rounded-md hover:bg-[var(--color-chickadmin-primary)]/90 transition-colors"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="إجمالي المستثمرين"
            value={stats?.totalInvestors ?? 0}
            Icon={Users}
            color="var(--color-chickadmin-primary)"
          />
          <StatCard
            title="المستثمرين النشطين"
            value={stats?.activeInvestors ?? 0}
            Icon={Users}
            color="var(--color-chickadmin-accent)"
          />
          <StatCard
            title="المربين النشطين"
            value={stats?.activeFarmers ?? 0}
            Icon={Users}
            color="var(--color-chickadmin-secondary)"
          />
          <StatCard
            title="الاستثمارات الجارية"
            value={stats?.activeInvestments ?? 0}
            Icon={TrendingUp}
            color="var(--color-chickadmin-primary)"
          />
          <StatCard
            title="الاستثمارات المنتهية"
            value={stats?.completedInvestments ?? 0}
            Icon={BarChart2}
            color="var(--color-chickadmin-secondary)"
          />
          <StatCard
            title="رصيد صندوق التأمين"
            value={`${stats?.insuranceFund ?? 0} درهم`}
            Icon={ShieldAlert}
            color="var(--color-chickadmin-accent)"
          />
          <StatCard
            title="حالات الطوارئ"
            value={stats?.emergencyAlerts ?? 0}
            Icon={AlertTriangle}
            color="#f44336"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">الأداء الشهري</h2>
            <div className="h-80">
              <Bar
                data={{
                  labels: analytics?.monthly.labels || [],
                  datasets: [
                    {
                      label: 'الاستثمارات',
                      data: analytics?.monthly.investments || [],
                      backgroundColor: 'rgba(46, 125, 50, 0.6)',
                    },
                    {
                      label: 'الأرباح',
                      data: analytics?.monthly.profits || [],
                      backgroundColor: 'rgba(212, 175, 55, 0.6)',
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                      align: 'end',
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">توزيع الاستثمارات</h2>
            <div className="h-80 flex items-center justify-center">
              <Pie
                data={{
                  labels: ['BaidCash', 'KtiCash'],
                  datasets: [
                    {
                      data: analytics ? [analytics.distribution.BaidCash, analytics.distribution.KtiCash] : [],
                      backgroundColor: [
                        'rgba(46, 125, 50, 0.6)',
                        'rgba(212, 175, 55, 0.6)',
                      ],
                      borderColor: [
                        'rgba(46, 125, 50, 1)',
                        'rgba(212, 175, 55, 1)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">آخر التنبيهات</h2>
            <button className="text-[var(--color-chickadmin-primary)] hover:underline">عرض الكل</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النوع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المستخدم</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراء</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analytics?.alerts.map((alert, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${alert.type === 'disease' ? 'bg-red-100 text-red-800' : alert.type === 'natural_disaster' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>{alert.type}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{alert.userName} ({alert.userRole === 'investor' ? 'مستثمر' : 'مربي'})</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(alert.date).toLocaleDateString('ar-SA')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${alert.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : alert.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{alert.status === 'pending' ? 'قيد المراجعة' : alert.status === 'approved' ? 'تمت المعالجة' : 'مرفوض'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-chickadmin-primary)] hover:underline cursor-pointer">عرض</td>
                  </tr>
                ))}
                {!analytics && (
                  <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">جاري التحميل...</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-6 w-6 text-[var(--color-chickadmin-primary)]" />
            <h2 className="text-xl font-semibold">توصيات الذكاء الاصطناعي</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 border-r-4 border-yellow-500 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-yellow-800">تنبيه: قطيع معرض للخطر</h3>
              <p className="text-yellow-700 mt-1">تم رصد مؤشرات تدل على احتمالية وجود مرض في قطيع المربي أحمد محمد. يرجى التحقق من الأمر.</p>
              <button className="mt-2 text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors">
                عرض التفاصيل
              </button>
            </div>
            <div className="p-4 border-r-4 border-blue-500 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800">توقعات: زيادة في الطلب</h3>
              <p className="text-blue-700 mt-1">تشير التحليلات إلى زيادة متوقعة في الطلب على منتجات البيض خلال الشهر القادم بنسبة 15%.</p>
              <button className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors">
                عرض التحليل
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
