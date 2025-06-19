'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/layout/AdminLayout';
import useAuthStore from '@/store/useAuthStore';
import { toast } from 'react-hot-toast';

export default function AdminSettings() {
  const { isAuthenticated, initialized, initialize, user } = useAuthStore();
  const router = useRouter();

  type SettingsMap = { [key: string]: any };

  const [settings, setSettings] = useState<SettingsMap>({});
  const [edited, setEdited] = useState<SettingsMap>({});
  const [loading, setLoading] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings || {});
      }
    } catch (e) {
      console.error(e);
      toast.error('فشل جلب الإعدادات');
    } finally {
      setLoading(false);
    }
  };

  const saveSetting = async (key: string, value: any) => {
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      });
      if (res.ok) {
        toast.success('تم الحفظ');
        fetchSettings();
      } else {
        toast.error('فشل الحفظ');
      }
    } catch (e) {
      toast.error('خطأ في الشبكة');
    }
  };

  const addSetting = async () => {
    if (!newKey) return toast.error('أدخل مفتاحًا');
    await saveSetting(newKey, newValue);
    setNewKey('');
    setNewValue('');
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') fetchSettings();
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

  if (!initialized || !isAuthenticated || user?.role !== 'admin') return null;

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold mb-6">إعدادات النظام</h1>

        {/* جدول الإعدادات */}
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right font-semibold">المفتاح</th>
                <th className="px-6 py-3 text-right font-semibold">القيمة</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(settings).map(([k, v]) => (
                <tr key={k}>
                  <td className="px-6 py-4 whitespace-nowrap font-mono">{k}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      value={edited[k] ?? v}
                      onChange={(e) => setEdited({ ...edited, [k]: e.target.value })}
                      className="border rounded px-2 py-1 w-full focus:outline-none"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => saveSetting(k, edited[k] ?? v)}
                      className="text-[var(--color-chickadmin-primary)] hover:underline"
                    >حفظ</button>
                  </td>
                </tr>
              ))}
              {loading && (
                <tr><td colSpan={3} className="px-6 py-4 text-center text-gray-500">جاري التحميل...</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* إضافة إعداد جديد */}
        <div className="bg-white shadow rounded-lg p-4 space-y-4">
          <h2 className="text-lg font-semibold">إضافة إعداد جديد</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              placeholder="المفتاح"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none"
            />
            <input
              placeholder="القيمة"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none"
            />
          </div>
          <button
            onClick={addSetting}
            className="mt-2 px-4 py-2 bg-[var(--color-chickadmin-primary)] text-white rounded"
          >إضافة</button>
        </div>
      </div>
    </AdminLayout>
  );
}
