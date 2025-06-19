'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/layout/AdminLayout';
import useAuthStore from '@/store/useAuthStore';
import { toast } from 'react-hot-toast';

export default function AdminInsurance() {
  const { isAuthenticated, initialized, initialize, user } = useAuthStore();
  const router = useRouter();

  type Claim = {
    _id: string;
    farm?: { name?: string; farmer?: { fullName: string } };
    claimType: string;
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
  };

  const [claims, setClaims] = useState<Claim[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [loading, setLoading] = useState(false);

  const fetchClaims = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/insurance/claims');
      if (res.ok) {
        const data = await res.json();
        setClaims(data.claims);
      }
    } catch (e) {
      console.error(e);
      toast.error('فشل في جلب المطالبات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      fetchClaims();
    }
  }, [isAuthenticated, user]);

  const handleAction = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const res = await fetch('/api/admin/insurance/claims', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claimId: id, status }),
      });
      if (res.ok) {
        toast.success('تم تحديث حالة المطالبة');
        fetchClaims();
      } else {
        toast.error('فشل تحديث الحالة');
      }
    } catch (e) {
      toast.error('خطأ في الشبكة');
    }
  };

  const filteredClaims = statusFilter === 'all' ? claims : claims.filter((c) => c.status === statusFilter);

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
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">إدارة صندوق التأمين</h1>

        {/* فلاتر */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="border rounded px-3 py-2 focus:outline-none"
          >
            <option value="all">الكل</option>
            <option value="pending">قيد المراجعة</option>
            <option value="approved">موافق عليه</option>
            <option value="rejected">مرفوض</option>
          </select>
          {loading && <span className="text-sm text-gray-500">جاري التحميل...</span>}
        </div>

        {/* جدول المطالبات */}
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right font-semibold">المزرعة</th>
                <th className="px-6 py-3 text-right font-semibold">المربي</th>
                <th className="px-6 py-3 text-right font-semibold">نوع المطالبة</th>
                <th className="px-6 py-3 text-right font-semibold">المبلغ المطلوب</th>
                <th className="px-6 py-3 text-right font-semibold">التاريخ</th>
                <th className="px-6 py-3 text-right font-semibold">الحالة</th>
                <th className="px-6 py-3 text-right font-semibold">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClaims.map((c: Claim) => (
                <tr key={c._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{c.farm?.name || '---'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{c.farm?.farmer?.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{c.claimType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{c.amount.toLocaleString()} ر.س</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString('ar-SA')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${c.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : c.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{c.status === 'pending' ? 'قيد المراجعة' : c.status === 'approved' ? 'معتمد' : 'مرفوض'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2 rtl:space-x-reverse">
                    {c.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAction(c._id, 'approved')}
                          className="text-green-600 hover:underline"
                        >اعتماد</button>
                        <button
                          onClick={() => handleAction(c._id, 'rejected')}
                          className="text-red-600 hover:underline"
                        >رفض</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {!loading && filteredClaims.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">لا توجد مطالبات</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
