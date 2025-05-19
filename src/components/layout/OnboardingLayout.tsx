'use client';

import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface OnboardingLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

export default function OnboardingLayout({ children, title, description }: OnboardingLayoutProps) {
  const router = useRouter();

  const redirectToDashboard = () => {
      router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-[var(--color-primary)]">HlaChick</h1>
          </div>
          <button
            onClick={redirectToDashboard}
            className="p-2 text-gray-600 hover:text-[var(--color-primary)] transition-colors flex items-center cursor-pointer"
            title="العودة للرئيسية"
          >
            <span className="mr-2">العودة للرئيسية</span>
            <ArrowLeft className="h-5 w-5 mr-2 mt-1" />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600">{description}</p>
          </div>

          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} HlaChick. جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}
