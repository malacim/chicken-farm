'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/layout/AdminLayout';
import useAuthStore from '@/store/useAuthStore';
import { toast } from 'react-hot-toast';

export default function AdminMarket() {
  const { isAuthenticated, initialized, initialize, user } = useAuthStore();
  const router = useRouter();

  type Overview = {
    products: { available: number; soldOut: number; hidden: number };
    orders: {
      pendingOrders: number;
      confirmedOrders: number;
      shippedOrders: number;
      recentOrders: Array<{ _id: string; buyer: { fullName: string }; product: { name: string }; quantity: number; totalAmount: number; status: string; createdAt: string }>;
    };
  };

  const [overview, setOverview] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOverview = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/admin/market/overview');
        if (res.ok) {
          const data = await res.json();
          setOverview(data);
        }
      } catch (e) {
        console.error(e);
        toast.error('فشل جلب بيانات السوق');
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated && user?.role === 'admin') fetchOverview();
  }, [isAuthenticated, user]);

  const StatCard = ({ title, value, color }: { title: string; value: number; color: string }) => (
    <div className={`p-4 rounded shadow ${color}`}>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-bold">{loading && value === 0 ? '...' : value}</p>
    </div>
  );

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

  if (!initialized || !isAuthenticated || user?.role !== 'admin') return null;

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold mb-6">إدارة السوق</h1>

        {/* بطاقات إحصائيات المنتجات */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard title="متاحة" value={overview?.products.available ?? 0} color="bg-green-100" />
          <StatCard title="نفدت" value={overview?.products.soldOut ?? 0} color="bg-red-100" />
          <StatCard title="مخفية" value={overview?.products.hidden ?? 0} color="bg-gray-100" />
        </div>

        {/* بطاقات إحصائيات الطلبات */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard title="طلبات معلقة" value={overview?.orders.pendingOrders ?? 0} color="bg-yellow-100" />
          <StatCard title="تم التأكيد" value={overview?.orders.confirmedOrders ?? 0} color="bg-blue-100" />
          <StatCard title="تم الشحن" value={overview?.orders.shippedOrders ?? 0} color="bg-purple-100" />
        </div>

        {/* جدول الطلبات الأخيرة */}
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right font-semibold">المشتري</th>
                <th className="px-6 py-3 text-right font-semibold">المنتج</th>
                <th className="px-6 py-3 text-right font-semibold">الكمية</th>
                <th className="px-6 py-3 text-right font-semibold">الإجمالي</th>
                <th className="px-6 py-3 text-right font-semibold">الحالة</th>
                <th className="px-6 py-3 text-right font-semibold">التاريخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(overview?.orders.recentOrders || []).map((o: any) => (
                <tr key={o._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{o.buyer.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{o.product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{o.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{o.totalAmount.toLocaleString()} ر.س</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${o.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : o.status === 'confirmed' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>{o.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(o.createdAt).toLocaleDateString('ar-SA')}</td>
                </tr>
              ))}
              {!overview && (
                <tr><td colSpan={6} className="px-6 py-4 text-center text-gray-500">جاري التحميل...</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
