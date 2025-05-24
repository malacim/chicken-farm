'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useAuthStore from '@/store/useAuthStore';
import AuthLayout from '@/components/layout/AuthLayout';
import { FiMail, FiLock } from 'react-icons/fi';
import api from '@/lib/apiService';

export default function Login() {
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await api.post('/auth/login', { email, password });
      const data = response.data;

      if (data.user) {
        setAuth(data.user);
        router.push('/dashboard');
      }
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm">
          <div className="mb-8">
            <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] bg-clip-text text-transparent">
              تسجيل الدخول إلى حسابك
            </h2>
            <p className="mt-2 text-center text-gray-600 text-sm">
              مرحباً بك مجدداً! يرجى إدخال بيانات حسابك
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md"
                role="alert"
              >
                <p className="text-sm text-red-700">{error}</p>
              </motion.div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <FiMail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full pr-10 py-3 text-gray-900 rounded-lg border border-gray-200 placeholder-gray-400 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 transition-all duration-200"
                  placeholder="البريد الإلكتروني"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <FiLock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full pr-10 py-3 text-gray-900 rounded-lg border border-gray-200 placeholder-gray-400 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 transition-all duration-200"
                  placeholder="كلمة المرور"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="relative w-full py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="ml-4">جاري التحميل...</span>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              ) : (
                'تسجيل الدخول'
              )}
            </motion.button>

            <div className="text-center">
              <Link
                href="/auth/register"
                className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors duration-200"
              >
                ليس لديك حساب؟ سجل الآن
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </AuthLayout>
  );
}
