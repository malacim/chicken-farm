'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Mock data for demonstration
// const mockInvestments = [
//   { id: 1, farm: { name: 'Green Valley Farm' }, amount: 5000, type: 'BaidCash', status: 'Active' },
//   { id: 2, farm: { name: 'Sunny Acres' }, amount: 3200, type: 'KtiCash', status: 'Pending' },
//   { id: 3, farm: { name: 'Mountain View Farm' }, amount: 7500, type: 'BaidCash', status: 'Active' }
// ];

// const mockFarms = [
//   { id: 1, name: 'Green Valley Farm', location: 'Casablanca' },
//   { id: 2, name: 'Sunny Acres', location: 'Rabat' },
//   { id: 3, name: 'Mountain View Farm', location: 'Marrakech' },
//   { id: 4, name: 'Desert Oasis', location: 'Agadir' }
// ];

interface Investment {
  id: string | number;
  farm?: {
    name: string;
  } | string;
  farmId?: string | number;
  amount: number;
  type: 'BaidCash' | 'KtiCash';
  status: 'Active' | 'Pending' | 'Completed';
}

interface Farm {
  id: string | number;
  name: string;
  location: string;
}

interface InvestmentForm {
  farmId: string;
  amount: string;
  type: 'BaidCash' | 'KtiCash';
}

async function fetchInvestments() {
  const res = await fetch('/api/investments');
  if (!res.ok) throw new Error('Failed to fetch investments');
  return await res.json();
}

async function fetchFarms() {
  const res = await fetch('/api/farms');
  if (!res.ok) throw new Error('Failed to fetch farms');
  return await res.json();
}

async function createInvestment(data: { farmId: number; amount: number; type: 'BaidCash' | 'KtiCash' }) {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true };
}

const InvestorsPage = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [form, setForm] = useState<InvestmentForm>({ farmId: '', amount: '', type: 'BaidCash' });
  const [loadingInvestments, setLoadingInvestments] = useState(true);
  const [loadingFarms, setLoadingFarms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoadingInvestments(true);
    setLoadingFarms(true);
    fetchInvestments()
      .then(setInvestments)
      .finally(() => setLoadingInvestments(false));
    fetchFarms()
      .then(setFarms)
      .finally(() => setLoadingFarms(false));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await createInvestment({
        farmId: Number(form.farmId),
        amount: Number(form.amount),
        type: form.type,
      });
      if (res.success) {
        fetchInvestments().then(setInvestments);
        setForm({ farmId: '', amount: '', type: 'BaidCash' });
      } else {
        setError('Failed to create investment.');
      }
    } catch (err) {
      setError('Error creating investment.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: Investment['status']) => {
    const baseClasses = "px-3 py-1.5 rounded-full text-xs font-medium";
    switch (status) {
      case 'Active':
        return `${baseClasses} bg-emerald-100 text-emerald-800`;
      case 'Pending':
        return `${baseClasses} bg-amber-100 text-amber-800`;
      case 'Completed':
        return `${baseClasses} bg-sky-100 text-sky-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getTypeIcon = (type: Investment['type']) => {
    return type === 'BaidCash' ? '🥚' : '🐣';
  };

  return (
  <DashboardLayout>
    <div className="bg-gradient-to-b from-gray-50 to-gray-100" dir="rtl" lang="ar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Investments Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden backdrop-blur-sm bg-opacity-95">
              <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold">استثماراتك</h2>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1.5 rounded-full">
                  {investments.length} إجمالي
                </span>
              </div>
              <div className="p-6">
                {loadingInvestments ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="flex items-center space-x-4 p-5 bg-gray-50 rounded-xl">
                          <div className="h-14 w-14 bg-gray-200 rounded-full"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                          <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : investments.length > 0 ? (
                  <div className="space-y-4">
                    {investments.map((inv: any) => (
                      <div
                        key={inv.id}
                        className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="h-14 w-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-2xl shadow-sm">
                            {getTypeIcon(inv.type)}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 text-lg">{inv.farm?.name || inv.farm || inv.farmId}</h3>
                            <p className="text-sm text-gray-500 mt-1">{inv.type === 'BaidCash' ? 'Egg-laying hens' : 'Chicks'}</p>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-2">
                          <p className="text-lg font-bold text-gray-900">{inv.amount.toLocaleString()} MAD</p>
                          <span className={getStatusBadge(inv.status)}>{inv.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="h-20 w-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto flex items-center justify-center mb-5 shadow-inner">
                      <span className="text-3xl">📊</span>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">لا توجد استثمارات بعد</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">ابدأ بإنشاء أول استثمار لك باستخدام النموذج</p>
                  </div>
                )}
              </div>
            </div>

            {/* Available Farms */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden backdrop-blur-sm bg-opacity-95">
              <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold">المزارع المتاحة</h2>
                <button className="text-xs text-green-600 font-medium hover:text-green-700 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  عرض الكل
                </button>
              </div>
              <div className="p-6">
                {loadingFarms ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="animate-pulse p-5 bg-gray-50 rounded-xl">
                        <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : farms.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {farms.map((farm: any) => (
                      <div
                        key={farm.id}
                        className="p-5 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md group cursor-pointer"
                      >
                        <h3 className="font-medium text-gray-900 text-lg mb-2 group-hover:text-green-600 transition-colors">{farm.name}</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {farm.location}
                          </p>
                          <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md font-medium">Available</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500">لا توجد مزارع متاحة</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Investment Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 sticky top-8 overflow-hidden backdrop-blur-sm bg-opacity-95">
              <div className="px-6 py-5 border-b border-gray-200">
                <div className="flex items-center space-x-2 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <h2 className="text-xl font-semibold">استثمار جديد</h2>
                </div>
                <p className="text-sm text-gray-500">قم بإنشاء استثمار جديد في مزرعة</p>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اختر المزرعة</label>
                  <div className="relative">
                    <select
                      name="farmId"
                      value={form.farmId}
                      onChange={handleInputChange}
                      className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors appearance-none"
                      required
                    >
                      <option value="">اختر مزرعة...</option>
                      {farms.map((farm: any) => (
                        <option key={farm.id} value={farm.id}>
                          {farm.name} - {farm.location}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">قيمة الاستثمار</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="amount"
                      value={form.amount}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors pr-16"
                      placeholder="أدخل المبلغ"
                      required
                      min={100}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <span className="h-full flex items-center px-4 bg-gray-100 text-gray-500 text-sm rounded-r-xl border-l border-gray-300">MAD</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    الحد الأدنى للاستثمار: 100 درهم
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نوع الاستثمار</label>
                  <div className="space-y-3">
                    <label className={`flex items-center p-4 border ${form.type === 'BaidCash' ? 'border-green-300 bg-green-50' : 'border-gray-200'} rounded-xl cursor-pointer hover:bg-gray-50 transition-colors`}>
                      <input
                        type="radio"
                        name="type"
                        value="BaidCash"
                        checked={form.type === 'BaidCash'}
                        onChange={handleInputChange}
                        className="text-green-600 focus:ring-green-500 h-5 w-5"
                      />
                      <div className="ml-3">
                        <div className="flex items-center">
                          <span className="mr-2 text-xl">🥚</span>
                          <span className="font-medium text-gray-900">بيض كاش</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">استثمار في الدجاج البياض</p>
                      </div>
                    </label>
                    <label className={`flex items-center p-4 border ${form.type === 'KtiCash' ? 'border-green-300 bg-green-50' : 'border-gray-200'} rounded-xl cursor-pointer hover:bg-gray-50 transition-colors`}>
                      <input
                        type="radio"
                        name="type"
                        value="KtiCash"
                        checked={form.type === 'KtiCash'}
                        onChange={handleInputChange}
                        className="text-green-600 focus:ring-green-500 h-5 w-5"
                      />
                      <div className="ml-3">
                        <div className="flex items-center">
                          <span className="mr-2 text-xl">🐣</span>
                          <span className="font-medium text-gray-900">كتي كاش</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">استثمار في الكتاكيت</p>
                      </div>
                    </label>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error && 'حدث خطأ أثناء العملية'}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white py-3 px-6 rounded-xl font-medium focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:shadow-none flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      جاري إنشاء الاستثمار...
                    </div>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      إنشاء الاستثمار
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
  );
};

export default InvestorsPage;