'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import useAuthStore from '@/store/useAuthStore';
import { toast } from 'react-hot-toast';

export default function Settings() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    language: 'ar',
    theme: 'light',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('تم تحديث الإعدادات بنجاح');
    } catch (error) {
      console.error('Error updating settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto px-4 py-2 border border-gray-100 rounded-xl shadow-md bg-white mt-2">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">الإعدادات</h1>
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            {user.email}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Notifications Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">الإشعارات</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  id="emailNotif"
                  checked={formData.notifications.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notifications: { ...formData.notifications, email: e.target.checked },
                    })
                  }
                  className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300 ml-3"
                />
                <div className="flex flex-col">
                  <label htmlFor="emailNotif" className="font-medium text-gray-800">
                    البريد الإلكتروني
                  </label>
                  <span className="text-xs text-gray-500">تلقي تحديثات عبر البريد الإلكتروني</span>
                </div>
              </div>

              <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  id="pushNotif"
                  checked={formData.notifications.push}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notifications: { ...formData.notifications, push: e.target.checked },
                    })
                  }
                  className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300 ml-3"
                />
                <div className="flex flex-col">
                  <label htmlFor="pushNotif" className="font-medium text-gray-800">
                    الإشعارات الفورية
                  </label>
                  <span className="text-xs text-gray-500">تلقي إشعارات عبر المتصفح</span>
                </div>
              </div>

              <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  id="smsNotif"
                  checked={formData.notifications.sms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notifications: { ...formData.notifications, sms: e.target.checked },
                    })
                  }
                  className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300 ml-3"
                />
                <div className="flex flex-col">
                  <label htmlFor="smsNotif" className="font-medium text-gray-800">
                    الرسائل النصية
                  </label>
                  <span className="text-xs text-gray-500">تلقي تحديثات عبر SMS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Language Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">اللغة</h2>

            <div className="max-w-md">
              <select
                id="language"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
              <p className="mt-2 text-sm text-gray-500">
                هذا الإعداد سيغير لغة واجهة المستخدم في التطبيق
              </p>
            </div>
          </div>

          {/* Theme Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">المظهر</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  formData.theme === 'light'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setFormData({ ...formData, theme: 'light' })}
              >
                <div className="flex items-center mb-3">
                  <input
                    type="radio"
                    id="lightTheme"
                    name="theme"
                    value="light"
                    checked={formData.theme === 'light'}
                    onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 ml-3"
                  />
                  <label htmlFor="lightTheme" className="font-medium text-gray-800">
                    فاتح
                  </label>
                </div>
                <div className="h-16 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full border border-gray-300"></div>
                </div>
              </div>

              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  formData.theme === 'dark'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setFormData({ ...formData, theme: 'dark' })}
              >
                <div className="flex items-center mb-3">
                  <input
                    type="radio"
                    id="darkTheme"
                    name="theme"
                    value="dark"
                    checked={formData.theme === 'dark'}
                    onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 ml-3"
                  />
                  <label htmlFor="darkTheme" className="font-medium text-gray-800">
                    داكن
                  </label>
                </div>
                <div className="h-16 bg-gray-800 rounded border border-gray-700 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-600 rounded-full border border-gray-500"></div>
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
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg shadow-sm transition-colors flex items-center justify-center min-w-[120px]"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'حفظ الإعدادات'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}