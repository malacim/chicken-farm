'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ChevronDown, Loader2, Mail, Lock, User, Phone, MapPin } from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';
import AuthLayout from '@/components/layout/AuthLayout';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: '',
    phoneNumber: '',
    country: '',
    communicationPreferences: {
      whatsapp: false,
      email: false,
      phone: false,
    },
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'An error occurred');
      }

      setAuth(data.user, data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Role options with icons
  const roleOptions = [
    { value: 'investor', label: 'مستثمر', icon: '💼' },
    { value: 'farmer', label: 'مزارع', icon: '🌱' },
    { value: 'market_buyer', label: 'مشتري', icon: '🛒' },
  ];

  const selectedRole = roleOptions.find(role => role.value === formData.role);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <AuthLayout>
      <div className="max-w-2xl w-full mx-auto p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100">
        <motion.div
          className="space-y-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              إنشاء حساب جديد
            </h2>
            <p className="mt-2 text-gray-600">
              أدخل بياناتك لإنشاء حساب جديد
            </p>
          </div>

          {error && (
            <motion.div
              className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              role="alert"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="mr-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </motion.div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  الاسم الكامل
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className="appearance-none pr-10 block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition duration-150 ease-in-out"
                    placeholder="أدخل اسمك الكامل"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none pr-10 block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition duration-150 ease-in-out"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  كلمة المرور
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none pr-10 block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition duration-150 ease-in-out"
                    placeholder="********"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  رقم الهاتف
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    required
                    className="appearance-none pr-10 block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition duration-150 ease-in-out"
                    placeholder="+1234567890"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  />
                </div>
              </div>

              {/* Country */}
              <div className="space-y-2">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  البلد
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    className="appearance-none pr-10 block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition duration-150 ease-in-out"
                    placeholder="المملكة المغربية"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>
              </div>

              {/* Role - Custom Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  نوع الحساب
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className={`relative w-full px-4 py-3 text-right border ${isRoleOpen ? 'border-primary' : 'border-gray-200'} rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition duration-150 ease-in-out`}
                    onClick={() => setIsRoleOpen(!isRoleOpen)}
                  >
                    <span className="flex items-center justify-between">
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                      <span className="flex items-center gap-3 space-x-reverse">
                        {selectedRole ? (
                          <>
                            <span className="text-xl">{selectedRole.icon}</span>
                            <span className="text-gray-900">{selectedRole.label}</span>
                          </>
                        ) : (
                          <span className="text-gray-500">اختر نوع الحساب</span>
                        )}
                      </span>
                    </span>
                  </button>

                  {isRoleOpen && (
                    <motion.div
                      className="absolute mt-1 w-full rounded-lg bg-white shadow-lg border border-gray-100 z-10"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ul className="py-1 max-h-56 overflow-auto">
                        {roleOptions.map((option) => (
                          <li key={option.value}>
                            <button
                              type="button"
                              className="w-full px-4 py-2 text-right hover:bg-gray-50 flex items-center justify-between"
                              onClick={() => {
                                setFormData({ ...formData, role: option.value });
                                setIsRoleOpen(false);
                              }}
                            >
                              {formData.role === option.value && (
                                <Check className="h-4 w-4 text-primary" />
                              )}
                              <span className="flex items-center gap-3 space-x-reverse">
                                <span className="text-xl">{option.icon}</span>
                                <span>{option.label}</span>
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Hidden input for form submission */}
                  <input
                    type="hidden"
                    name="role"
                    value={formData.role}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Communication Preferences */}
            <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
              <label className="block text-sm font-medium text-gray-700">
                طرق التواصل المفضلة
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="relative flex items-center">
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="checkbox"
                    className="peer absolute opacity-0 h-5 w-5"
                    checked={formData.communicationPreferences.whatsapp}
                    onChange={(e) => setFormData({
                      ...formData,
                      communicationPreferences: {
                        ...formData.communicationPreferences,
                        whatsapp: e.target.checked,
                      },
                    })}
                  />
                  <div className="h-5 w-5 border border-gray-300 rounded-md peer-checked:bg-primary peer-checked:border-primary flex items-center justify-center transition-colors">
                    {formData.communicationPreferences.whatsapp && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <label htmlFor="whatsapp" className="mr-2 block text-sm text-gray-700 select-none">
                    واتساب
                  </label>
                </div>

                <div className="relative flex items-center">
                  <input
                    id="emailPref"
                    name="emailPref"
                    type="checkbox"
                    className="peer absolute opacity-0 h-5 w-5"
                    checked={formData.communicationPreferences.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      communicationPreferences: {
                        ...formData.communicationPreferences,
                        email: e.target.checked,
                      },
                    })}
                  />
                  <div className="h-5 w-5 border border-gray-300 rounded-md peer-checked:bg-primary peer-checked:border-primary flex items-center justify-center transition-colors">
                    {formData.communicationPreferences.email && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <label htmlFor="emailPref" className="mr-2 block text-sm text-gray-700 select-none">
                    البريد الإلكتروني
                  </label>
                </div>

                <div className="relative flex items-center">
                  <input
                    id="phonePref"
                    name="phonePref"
                    type="checkbox"
                    className="peer absolute opacity-0 h-5 w-5"
                    checked={formData.communicationPreferences.phone}
                    onChange={(e) => setFormData({
                      ...formData,
                      communicationPreferences: {
                        ...formData.communicationPreferences,
                        phone: e.target.checked,
                      },
                    })}
                  />
                  <div className="h-5 w-5 border border-gray-300 rounded-md peer-checked:bg-primary peer-checked:border-primary flex items-center justify-center transition-colors">
                    {formData.communicationPreferences.phone && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <label htmlFor="phonePref" className="mr-2 block text-sm text-gray-700 select-none">
                    الهاتف
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition duration-150 ease-in-out flex items-center justify-center"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 text-white animate-spin" />
                ) : (
                  'إنشاء الحساب'
                )}
              </motion.button>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                لديك حساب بالفعل؟ سجل دخولك
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </AuthLayout>
  );
}