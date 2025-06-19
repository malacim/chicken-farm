'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/layout/AdminLayout';
import useAuthStore from '@/store/useAuthStore';
import { toast } from 'react-hot-toast';
import api from '@/lib/apiService';
import {
  Search,
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
  Loader2,
} from 'lucide-react';

interface Investment {
  _id: string;
  userId: string;
  investorName?: string;
  farmId: string;
  farmName?: string;
  amount: number;
  type: 'BaidCash' | 'KtiCash' | string;
  status: 'pending_payment' | 'active' | 'completed' | string;
  createdAt?: string;
}

export default function AdminInvestments() {
  const { isAuthenticated, initialized, initialize, user } = useAuthStore();
  const router = useRouter();

  const [investments, setInvestments] = useState<Investment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending_payment' | 'active' | 'completed'>('all');
  const [loading, setLoading] = useState(false);

  const fetchInvestments = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (searchTerm) params.append('search', searchTerm);

      const res = await api.get(`/investments${params.toString() ? `?${params.toString()}` : ''}`);
      setInvestments(res.data);
    } catch (err) {
      console.error(err);
      toast.error('فشل في جلب بيانات الاستثمارات');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchTerm]);

  // Initialize auth state
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Handle authentication and fetch
  useEffect(() => {
    if (initialized) {
      if (!isAuthenticated) {
        router.replace('/auth/login');
      } else if (user?.role !== 'admin') {
        toast.error('ليس لديك صلاحية الوصول إلى لوحة تحكم الإدارة');
        router.replace('/dashboard');
      } else {
        fetchInvestments();
      }
    }
  }, [initialized, isAuthenticated, user, router, fetchInvestments]);

  // Refetch when filters change
  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      fetchInvestments();
    }
  }, [statusFilter, searchTerm, isAuthenticated, user, fetchInvestments]);

  const translateStatus = (status: string) => {
    const map: Record<string, string> = {
      pending_payment: 'في انتظار الدفع',
      active: 'نشط',
      completed: 'مكتمل',
    } as const;
    return map[status] || status;
  };

  if (!initialized || !isAuthenticated || user?.role !== 'admin') return null;

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">إدارة الاستثمارات</h1>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="بحث عن مستثمر أو مزرعة..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-chickadmin-primary)] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--color-chickadmin-primary)] focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
              >
                <option value="all">جميع الحالات</option>
                <option value="pending_payment">في انتظار الدفع</option>
                <option value="active">نشط</option>
                <option value="completed">مكتمل</option>
              </select>
            </div>
          </div>
        </div>

        {/* Investments Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المستثمر</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المزرعة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المبلغ (MAD)</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النوع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ الإنشاء</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center">
                      <Loader2 className="animate-spin mx-auto text-[var(--color-chickadmin-primary)]" />
                    </td>
                  </tr>
                ) : investments.length > 0 ? (
                  investments.map((inv) => (
                    <tr key={inv._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {inv.investorName || inv.userId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {inv.farmName || inv.farmId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {inv.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[var(--color-chickadmin-primary)]/10 text-[var(--color-chickadmin-primary)]">
                          {inv.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            inv.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : inv.status === 'completed'
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {translateStatus(inv.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {inv.createdAt ? new Date(inv.createdAt).toLocaleDateString('ar-SA') : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <button
                            className="text-[var(--color-chickadmin-primary)] hover:text-[var(--color-chickadmin-primary)]/80"
                            title="عرض التفاصيل"
                            onClick={() => toast('Coming soon')}
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          {inv.status !== 'completed' && (
                            <button
                              className="text-green-600 hover:text-green-700"
                              title="وضع كمكتمل"
                              onClick={async () => {
                                try {
                                  await api.patch(`/investments/${inv._id}`, { status: 'completed' });
                                  toast.success('تم تحديث الحالة');
                                  fetchInvestments();
                                } catch (err) {
                                  toast.error('خطأ في تحديث الحالة');
                                }
                              }}
                            >
                              <CheckCircle2 className="h-5 w-5" />
                            </button>
                          )}
                          {inv.status !== 'active' && (
                            <button
                              className="text-yellow-600 hover:text-yellow-700"
                              title="وضع كنشط"
                              onClick={async () => {
                                try {
                                  await api.patch(`/investments/${inv._id}`, { status: 'active' });
                                  toast.success('تم تحديث الحالة');
                                  fetchInvestments();
                                } catch (err) {
                                  toast.error('خطأ في تحديث الحالة');
                                }
                              }}
                            >
                              <XCircle className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                      لا توجد استثمارات
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
