'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingLayout from '@/components/layout/OnboardingLayout';
import useAuthStore from '@/store/useAuthStore';

export default function MarketBuyerOnboarding() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    deliveryAddress: '',
    city: '',
    postalCode: '',
    preferredProducts: [] as string[],
    purchaseFrequency: '',
    termsAgreed: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleProductPreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData({
        ...formData,
        preferredProducts: [...formData.preferredProducts, value]
      });
    } else {
      setFormData({
        ...formData,
        preferredProducts: formData.preferredProducts.filter(product => product !== value)
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.termsAgreed) {
      alert('يجب الموافقة على الشروط والأحكام للمتابعة');
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch('/api/users/complete-onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?._id,
          role: 'market_buyer',
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
      title="إكمال بيانات مشتري السوق" 
      description="يرجى تقديم المعلومات التالية لإكمال تسجيل حسابك كمشتري في السوق"
    >
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deliveryAddress">
            عنوان التوصيل
          </label>
          <textarea
            id="deliveryAddress"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
              المدينة
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postalCode">
              الرمز البريدي
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="block text-gray-700 text-sm font-bold mb-2">
            المنتجات المفضلة
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="product_eggs"
                value="eggs"
                onChange={handleProductPreferenceChange}
                className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <label htmlFor="product_eggs" className="mr-2 text-gray-700">
                البيض
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="product_chicken"
                value="chicken"
                onChange={handleProductPreferenceChange}
                className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <label htmlFor="product_chicken" className="mr-2 text-gray-700">
                الدجاج
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="product_chicks"
                value="chicks"
                onChange={handleProductPreferenceChange}
                className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <label htmlFor="product_chicks" className="mr-2 text-gray-700">
                الكتاكيت
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="product_feed"
                value="feed"
                onChange={handleProductPreferenceChange}
                className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <label htmlFor="product_feed" className="mr-2 text-gray-700">
                العلف
              </label>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="purchaseFrequency">
            معدل الشراء المتوقع
          </label>
          <select
            id="purchaseFrequency"
            name="purchaseFrequency"
            value={formData.purchaseFrequency}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            <option value="">اختر المعدل</option>
            <option value="daily">يومي</option>
            <option value="weekly">أسبوعي</option>
            <option value="monthly">شهري</option>
            <option value="occasionally">من حين لآخر</option>
          </select>
        </div>

        <div className="mb-6">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="termsAgreed"
              name="termsAgreed"
              checked={formData.termsAgreed}
              onChange={handleChange}
              required
              className="h-4 w-4 mt-1 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
            />
            <label htmlFor="termsAgreed" className="mr-2 text-gray-700">
              أوافق على شروط وأحكام السوق، وأتعهد بالالتزام بسياسات الشراء والتوصيل المعمول بها في منصة HlaChick.
            </label>
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
