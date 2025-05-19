'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Upload } from 'lucide-react';
import OnboardingLayout from '@/components/layout/OnboardingLayout';
import useAuthStore from '@/store/useAuthStore';

// Define proper types for the form data
interface FarmFormData {
  farmLocation: {
    city: string;
    province: string;
    village: string;
    gps: { lat: string; lng: string };
  };
  flockInfo: {
    poultryType: string;
    currentCount: string;
    availableSections: string;
    vaccinationStatus: boolean;
    azollaAvailable: boolean;
  };
  documents: {
    personalPhotos: FileList | null;
    idCard: File | null;
  };
  termsAgreed: boolean;
}

export default function FarmerOnboarding() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FarmFormData>({
    farmLocation: {
      city: '',
      province: '',
      village: '',
      gps: { lat: '', lng: '' }
    },
    flockInfo: {
      poultryType: '',
      currentCount: '',
      availableSections: '',
      vaccinationStatus: false,
      azollaAvailable: false
    },
    documents: {
      personalPhotos: null,
      idCard: null
    },
    termsAgreed: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      if (name.startsWith('flockInfo.')) {
        const field = name.split('.')[1];
        setFormData({
          ...formData,
          flockInfo: {
            ...formData.flockInfo,
            [field]: (e.target as HTMLInputElement).checked
          }
        });
      } else {
        setFormData({
          ...formData,
          [name]: (e.target as HTMLInputElement).checked
        });
      }
    } else if (name.startsWith('farmLocation.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        farmLocation: {
          ...formData.farmLocation,
          [field]: value
        }
      });
    } else if (name.startsWith('flockInfo.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        flockInfo: {
          ...formData.flockInfo,
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      if (name === 'personalPhotos') {
        setFormData({
          ...formData,
          documents: {
            ...formData.documents,
            personalPhotos: files
          }
        });
      } else if (name === 'idCard') {
        setFormData({
          ...formData,
          documents: {
            ...formData.documents,
            idCard: files[0]
          }
        });
      }
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            farmLocation: {
              ...formData.farmLocation,
              gps: {
                lat: position.coords.latitude.toString(),
                lng: position.coords.longitude.toString()
              }
            }
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('فشل في الحصول على الموقع الجغرافي. يرجى المحاولة مرة أخرى أو إدخال الموقع يدويًا.');
        }
      );
    } else {
      alert('متصفحك لا يدعم تحديد الموقع الجغرافي.');
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
      // Create form data for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('userId', user?._id || '');
      formDataToSend.append('role', 'farmer');
      formDataToSend.append('farmLocation', JSON.stringify(formData.farmLocation));
      formDataToSend.append('flockInfo', JSON.stringify(formData.flockInfo));
      
      // Append files if they exist
      if (formData.documents.personalPhotos) {
        for (let i = 0; i < formData.documents.personalPhotos.length; i++) {
          formDataToSend.append('personalPhotos', formData.documents.personalPhotos[i]);
        }
      }
      
      if (formData.documents.idCard) {
        formDataToSend.append('idCard', formData.documents.idCard);
      }

      const response = await fetch('/api/users/complete-onboarding', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        alert('تم تقديم طلبك بنجاح. سيتم مراجعته من قبل فريقنا وسيتم إعلامك عند التفعيل.');
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
      title="إكمال بيانات المزارع" 
      description="يرجى تقديم المعلومات التالية لإكمال تسجيل حسابك كمزارع"
    >
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        {/* Farm Location Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">معلومات موقع المزرعة</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="farmLocation.city">
                المدينة
              </label>
              <input
                type="text"
                id="farmLocation.city"
                name="farmLocation.city"
                value={formData.farmLocation.city}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="farmLocation.province">
                المحافظة
              </label>
              <input
                type="text"
                id="farmLocation.province"
                name="farmLocation.province"
                value={formData.farmLocation.province}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="farmLocation.village">
              القرية
            </label>
            <input
              type="text"
              id="farmLocation.village"
              name="farmLocation.village"
              value={formData.farmLocation.village}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          
          <div className="mb-4">
            <button
              type="button"
              onClick={getLocation}
              className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <MapPin className="h-5 w-5 ml-2" />
              تحديد الموقع الجغرافي
            </button>
            {formData.farmLocation.gps.lat && formData.farmLocation.gps.lng && (
              <p className="mt-2 text-sm text-green-600">
                تم تحديد الموقع بنجاح: {formData.farmLocation.gps.lat}, {formData.farmLocation.gps.lng}
              </p>
            )}
          </div>
        </div>
        
        {/* Flock Information Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">معلومات القطيع</h3>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="flockInfo.poultryType">
              نوع الدواجن
            </label>
            <select
              id="flockInfo.poultryType"
              name="flockInfo.poultryType"
              value={formData.flockInfo.poultryType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              <option value="">اختر النوع</option>
              <option value="laying_hens">دجاج بياض</option>
              <option value="chicks">كتاكيت</option>
              <option value="both">كلاهما</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="flockInfo.currentCount">
                العدد الحالي للدواجن
              </label>
              <input
                type="number"
                id="flockInfo.currentCount"
                name="flockInfo.currentCount"
                value={formData.flockInfo.currentCount}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="flockInfo.availableSections">
                عدد الأقسام المتاحة للتربية
              </label>
              <input
                type="number"
                id="flockInfo.availableSections"
                name="flockInfo.availableSections"
                value={formData.flockInfo.availableSections}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="flockInfo.vaccinationStatus"
                name="flockInfo.vaccinationStatus"
                checked={formData.flockInfo.vaccinationStatus}
                onChange={handleChange}
                className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <label htmlFor="flockInfo.vaccinationStatus" className="mr-2 text-gray-700">
                برنامج التطعيم متبع
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="flockInfo.azollaAvailable"
                name="flockInfo.azollaAvailable"
                checked={formData.flockInfo.azollaAvailable}
                onChange={handleChange}
                className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <label htmlFor="flockInfo.azollaAvailable" className="mr-2 text-gray-700">
                نبات الأزولا متوفر
              </label>
            </div>
          </div>
        </div>
        
        {/* Document Upload Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">تحميل المستندات</h3>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="personalPhotos">
              صور شخصية (صورتان)
            </label>
            <div className="flex items-center">
              <input
                type="file"
                id="personalPhotos"
                name="personalPhotos"
                onChange={handleFileChange}
                accept="image/*"
                multiple
                required
                className="hidden"
              />
              <label
                htmlFor="personalPhotos"
                className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md cursor-pointer"
              >
                <Upload className="h-5 w-5 ml-2" />
                اختر الصور
              </label>
              <span className="mr-3 text-sm text-gray-600">
                {formData.documents.personalPhotos ? `${formData.documents.personalPhotos.length} صور محددة` : 'لم يتم اختيار صور'}
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">يجب أن تكون الصور بصيغة PNG أو JPG وحجم أقصى 2 ميجابايت</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="idCard">
              صورة بطاقة الهوية
            </label>
            <div className="flex items-center">
              <input
                type="file"
                id="idCard"
                name="idCard"
                onChange={handleFileChange}
                accept="image/*"
                required
                className="hidden"
              />
              <label
                htmlFor="idCard"
                className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md cursor-pointer"
              >
                <Upload className="h-5 w-5 ml-2" />
                اختر الصورة
              </label>
              <span className="mr-3 text-sm text-gray-600">
                {formData.documents.idCard ? formData.documents.idCard.name : 'لم يتم اختيار صورة'}
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">يجب أن تكون الصورة بصيغة PNG أو JPG وحجم أقصى 2 ميجابايت</p>
          </div>
        </div>
        
        {/* Terms Agreement Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">الموافقة على الشروط</h3>
          
          <div className="mb-4">
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
                أوافق على الالتزام بالحفاظ على صحة القطيع، وأن المزرعة تقع في منطقة ريفية، وأن برنامج التطعيم منتظم، واستخدام نبات الأزولا أو نظام بديل لتقليل تكلفة التغذية، والموافقة على المراقبة بالذكاء الاصطناعي والزيارات الميدانية.
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
            {loading ? 'جاري الإرسال...' : 'تقديم الطلب'}
          </button>
        </div>
      </form>
    </OnboardingLayout>
  );
}
