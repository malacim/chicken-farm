'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingLayout from '@/components/layout/OnboardingLayout';
import useAuthStore from '@/store/useAuthStore';

export default function InvestorOnboarding() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    initialInvestmentAmount: '',
    preferredInvestmentType: '',
    communicationPreferences: {
      whatsapp: false,
      email: false,
      phone: false
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (name.startsWith('comm_')) {
      const commType = name.replace('comm_', '');
      setFormData({
        ...formData,
        communicationPreferences: {
          ...formData.communicationPreferences,
          [commType]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/users/complete-onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?._id,
          role: 'investor',
          ...formData
        }),
      });

      if (response.ok) {
        // Refresh auth state and redirect to dashboard
        router.push('/dashboard');
      } else {
        const data = await response.json();
        alert(data.error || 'حدث خطأ أثناء حفظ البيانات');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('حدث خطأ أثناء الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnboardingLayout 
      title="إكمال بيانات المستثمر" 
      description="يرجى تقديم المعلومات التالية لإكمال تسجيل حسابك كمستثمر"
    >
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="preferredInvestmentType">
            نوع الاستثمار المفضل
          </label>
          <select
            id="preferredInvestmentType"
            name="preferredInvestmentType"
            value={formData.preferredInvestmentType}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            <option value="">اختر نوع الاستثمار</option>
            <option value="BaidCash">BaidCash - تأجير الدجاج البياض</option>
            <option value="KtiCash">KtiCash - استثمار الكتاكيت</option>
            <option value="both">كلاهما</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="initialInvestmentAmount">
            مبلغ الاستثمار المبدئي (بالدرهم)
          </label>
          <input
            type="number"
            id="initialInvestmentAmount"
            name="initialInvestmentAmount"
            value={formData.initialInvestmentAmount}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div className="mb-6">
          <p className="block text-gray-700 text-sm font-bold mb-2">
            تفضيلات التواصل
          </p>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="comm_whatsapp"
                name="comm_whatsapp"
                checked={formData.communicationPreferences.whatsapp}
                onChange={handleChange}
                className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <label htmlFor="comm_whatsapp" className="mr-2 text-gray-700">
                واتساب
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="comm_email"
                name="comm_email"
                checked={formData.communicationPreferences.email}
                onChange={handleChange}
                className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <label htmlFor="comm_email" className="mr-2 text-gray-700">
                البريد الإلكتروني
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="comm_phone"
                name="comm_phone"
                checked={formData.communicationPreferences.phone}
                onChange={handleChange}
                className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <label htmlFor="comm_phone" className="mr-2 text-gray-700">
                الاتصال الهاتفي
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--color-primary)] text-white py-2 px-6 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-50 disabled:opacity-50"
          >
            {loading ? 'جاري الحفظ...' : 'إكمال التسجيل'}
          </button>
        </div>
      </form>
    </OnboardingLayout>
  );
}
