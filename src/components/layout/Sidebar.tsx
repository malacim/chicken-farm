'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Home, Settings, User, BarChart2, ShoppingCart } from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';
import Image from 'next/image';

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout(() => {
      router.push('/');
    });
  };

  const getNavItems = () => {
    const commonItems = [
      { href: '/dashboard', label: 'الرئيسية', icon: Home },
      { href: '/dashboard/profile', label: 'الملف الشخصي', icon: User },
      { href: '/dashboard/settings', label: 'الإعدادات', icon: Settings },
    ];

    const roleSpecificItems: Record<string, NavItem[]> = {
      investor: [
        { href: '/dashboard/investments', label: 'استثماراتي', icon: BarChart2 },
      ],
      farmer: [
        { href: '/dashboard/farm', label: 'المزرعة', icon: BarChart2 },
      ],
      market_buyer: [
        { href: '/dashboard/market', label: 'السوق', icon: ShoppingCart },
      ],
    };

    return [...commonItems, ...(roleSpecificItems[user?.role as keyof typeof roleSpecificItems] || [])];
  };

  const navItems = getNavItems();

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <aside className="fixed right-0 top-0 w-72 h-full bg-white shadow-xl z-10 transition-all duration-300">
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-100 flex items-center cursor-pointer" onClick={handleLogoClick}>
          <Image src="/images/logo-d.png" alt="Logo" width={50} height={50} />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] bg-clip-text text-transparent">
            HalaChick
          </h1>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
              القائمة الرئيسية
            </p>
            <ul className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? 'bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/20'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-[var(--color-primary)]'}`} />
                      <span className="font-medium">{item.label}</span>

                      {isActive && (
                        <span className="mr-auto h-2 w-2 rounded-full bg-white"></span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center p-2 rounded-xl bg-white shadow-sm">
            <div className="flex-shrink-0 w-10 h-10 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-[var(--color-primary)]" />
            </div>

            <div className="flex-1 min-w-0 mr-3">
              <p className="font-medium text-gray-900 truncate">{user?.fullName}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="تسجيل الخروج"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
