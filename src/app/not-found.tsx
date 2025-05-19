'use client';

import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">الصفحة غير موجودة</h2>
        <p className="text-gray-600 mb-8">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            العودة للصفحة الرئيسية
          </Link>

          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            الرجوع للصفحة السابقة
          </button>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="h-24 w-24 relative">
            <div className="absolute inset-0 border-4 border-dashed border-gray-300 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🐔</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
