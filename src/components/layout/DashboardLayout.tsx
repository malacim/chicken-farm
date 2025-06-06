'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-screen bg-gray-50 max-h-screen overflow-hidden">
      <Sidebar />

      <main className="mr-72 p-8 transition-all duration-300 h-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
