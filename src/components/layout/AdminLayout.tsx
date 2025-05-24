'use client';

import { ReactNode } from 'react';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="h-screen bg-gray-50 max-h-screen overflow-hidden">
      <AdminSidebar />

      <main className="mr-72 p-8 transition-all duration-300 h-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
