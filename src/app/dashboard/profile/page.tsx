'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import useAuthStore from '@/store/useAuthStore';

export default function Profile() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    country: '',
    communicationPreferences: {
      whatsapp: false,
      email: false,
      phone: false,
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    } else if (user) {
      setFormData({
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber || '',
        country: user.country || '',
        communicationPreferences: user.communicationPreferences || {
          whatsapp: false,
          email: false,
          phone: false,
        },
      });
    }
  }, [isAuthenticated, router, user]);

  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement profile update functionality
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      alert('سيتم تنفيذ تحديث الملف الشخصي قريباً');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 border border-gray-100 rounded-xl shadow-md bg-white mt-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">الملف الشخصي</h1>
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            {user.email}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">المعلومات الشخصية</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary transition-all"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  disabled
                  className="block w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary transition-all"
                  placeholder="أدخل رقم هاتفك"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  البلد
                </label>
                <input
                  type="text"
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary transition-all"
                  placeholder="أدخل بلدك"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">طرق التواصل المفضلة</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  id="whatsapp"
                  checked={formData.communicationPreferences.whatsapp}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      communicationPreferences: {
                        ...formData.communicationPreferences,
                        whatsapp: e.target.checked,
                      },
                    })
                  }
                  className="h-5 w-5 rounded text-primary border-gray-300 ml-3"
                />
                <div className="flex flex-col">
                  <label htmlFor="whatsapp" className="font-medium text-gray-800">
                    واتساب
                  </label>
                  <span className="text-xs text-gray-500">تلقي إشعارات عبر واتساب</span>
                </div>
              </div>

              <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  id="emailPref"
                  checked={formData.communicationPreferences.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      communicationPreferences: {
                        ...formData.communicationPreferences,
                        email: e.target.checked,
                      },
                    })
                  }
                  className="h-5 w-5 rounded text-primary border-gray-300 ml-3"
                />
                <div className="flex flex-col">
                  <label htmlFor="emailPref" className="font-medium text-gray-800">
                    البريد الإلكتروني
                  </label>
                  <span className="text-xs text-gray-500">تلقي إشعارات عبر البريد الإلكتروني</span>
                </div>
              </div>

              <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  id="phonePref"
                  checked={formData.communicationPreferences.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      communicationPreferences: {
                        ...formData.communicationPreferences,
                        phone: e.target.checked,
                      },
                    })
                  }
                  className="h-5 w-5 rounded text-primary border-gray-300 ml-3"
                />
                <div className="flex flex-col">
                  <label htmlFor="phonePref" className="font-medium text-gray-800">
                    الهاتف
                  </label>
                  <span className="text-xs text-gray-500">تلقي مكالمات هاتفية</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-primary hover:bg-primary/80 text-white font-medium rounded-lg shadow-sm transition-colors flex items-center justify-center min-w-[120px]"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'حفظ التغييرات'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}