'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Search,
  Filter,
  Eye,
  UserCheck,
  UserX,
  Trash2,
  Bell
} from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';
import AdminLayout from '@/components/layout/AdminLayout';
import { toast } from 'react-hot-toast';
import api from '@/lib/apiService';

// Define a type for our user
interface UserType {
  _id: string;
  fullName: string;
  email: string;
  role: "investor" | "farmer" | "market_buyer" | "admin";
  isActive: boolean;
  phoneNumber?: string;
  country?: string;
  communicationPreferences?: {
    whatsapp: boolean;
    email: boolean;
    phone: boolean;
  };
  createdAt: string;
}

export default function UsersManagement() {
  const { isAuthenticated, initialized, initialize, user } = useAuthStore();
  const router = useRouter();

  const [users, setUsers] = useState<UserType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (roleFilter !== 'all') params.append('role', roleFilter);
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (searchTerm) params.append('search', searchTerm);

      const response = await api.get(`/admin/users?${params.toString()}`);
      setUsers(response.data.users);
    } catch (err) {
      toast.error('فشل في جلب بيانات المستخدمين');
      console.error('Error fetching users:', err);
    }
  }, [roleFilter, statusFilter, searchTerm]);

  // Initialize auth state
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Handle authentication and routing
  useEffect(() => {
    if (initialized) {
      if (!isAuthenticated) {
        router.replace('/auth/login');
      } else if (user?.role !== 'admin') {
        toast.error('ليس لديك صلاحية الوصول إلى لوحة تحكم الإدارة');
        router.replace('/dashboard');
      } else {
        fetchUsers();
      }
    }
  }, [initialized, isAuthenticated, router, user, fetchUsers]);

  // Fetch users when filters change
  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      fetchUsers();
    }
  }, [isAuthenticated, user?.role, fetchUsers]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' ||
                        (statusFilter === 'active' && user.isActive) ||
                        (statusFilter === 'inactive' && !user.isActive);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleViewDetails = (user: UserType) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleActivateUser = async (userId: string) => {
    try {
      await api.patch(`/admin/users/${userId}`, { isActive: true });
      setUsers(users.map(u =>
        u._id === userId ? { ...u, isActive: true } : u
      ));
      toast.success('تم تفعيل المستخدم بنجاح');
    } catch (err) {
      toast.error('فشل في تفعيل المستخدم');
      console.error(err);
    }
  };

  const handleDeactivateUser = async (userId: string) => {
    try {
      await api.patch(`/admin/users/${userId}`, { isActive: false });
      setUsers(users.map(u =>
        u._id === userId ? { ...u, isActive: false } : u
      ));
      toast.success('تم تعليق المستخدم بنجاح');
    } catch (err) {
      toast.error('فشل في تعليق المستخدم');
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      try {
        await api.delete(`/admin/users/${userId}`);
        setUsers(users.filter(u => u._id !== userId));
        toast.success('تم حذف المستخدم بنجاح');
      } catch (err) {
        toast.error('فشل في حذف المستخدم');
        console.error(err);
      }
    }
  };

  const handleSendNotification = async (userId: string) => {
    try {
      await api.post('/admin/users/notify', {
        userId,
        message: 'تنبيه من إدارة المنصة',
        notificationType: 'admin_notification'
      });
      toast.success('تم إرسال التنبيه بنجاح');
    } catch (err) {
      toast.error('فشل في إرسال التنبيه');
      console.error(err);
    }
  };

  const translateRole = (role: "investor" | "farmer" | "market_buyer" | "admin") => {
    const roles = {
      'investor': 'مستثمر',
      'farmer': 'مربي',
      'market_buyer': 'مشتري',
      'admin': 'مدير'
    };
    return roles[role] || role;
  };

  if (!initialized) return <div>Loading...</div>;
  if (!isAuthenticated || user?.role !== 'admin') return null;

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">إدارة المستخدمين</h1>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="بحث عن مستخدم..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-chickadmin-primary)] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="flex flex-wrap gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--color-chickadmin-primary)] focus:border-transparent"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="all">جميع الأدوار</option>
                  <option value="investor">مستثمر</option>
                  <option value="farmer">مربي</option>
                  <option value="market_buyer">مشتري</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-gray-500" />
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--color-chickadmin-primary)] focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">جميع الحالات</option>
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المستخدم</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الدور</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المشاريع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ الانضمام</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">آخر نشاط</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-[var(--color-chickadmin-primary)]/10 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-[var(--color-chickadmin-primary)]" />
                        </div>
                        <div className="mr-4">
                          <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[var(--color-chickadmin-primary)]/10 text-[var(--color-chickadmin-primary)]">
                        {translateRole(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'نشط' : 'غير نشط'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* Display investment/farm count - we'll use 0 as placeholder */}
                      0
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* Last active time - using createdAt as fallback */}
                      {new Date(user.createdAt).toLocaleDateString('ar-SA')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* Last active time - using createdAt as fallback */}
                      {new Date(user.createdAt).toLocaleDateString('ar-SA')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <button
                          onClick={() => handleViewDetails(user)}
                          className="text-[var(--color-chickadmin-primary)] hover:text-[var(--color-chickadmin-primary)]/80"
                          title="عرض التفاصيل"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        {user.isActive ? (
                          <button
                            onClick={() => handleDeactivateUser(user._id)}
                            className="text-yellow-600 hover:text-yellow-700"
                            title="تعليق المستخدم"
                          >
                            <UserX className="h-5 w-5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleActivateUser(user._id)}
                            className="text-green-600 hover:text-green-700"
                            title="تفعيل المستخدم"
                          >
                            <UserCheck className="h-5 w-5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleSendNotification(user._id)}
                          className="text-blue-600 hover:text-blue-700"
                          title="إرسال تنبيه"
                        >
                          <Bell className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-600 hover:text-red-700"
                          title="حذف المستخدم"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Details Modal */}
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">تفاصيل المستخدم</h2>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 bg-[var(--color-chickadmin-primary)]/10 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-[var(--color-chickadmin-primary)]" />
                  </div>
                  <div className="mr-4">
                    <h3 className="text-lg font-semibold">{selectedUser.fullName}</h3>
                    <p className="text-gray-600">{selectedUser.email}</p>
                    <div className="flex items-center mt-1">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        selectedUser.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      } mr-2`}>
                        {selectedUser.isActive ? 'نشط' : 'غير نشط'}
                      </span>
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[var(--color-chickadmin-primary)]/10 text-[var(--color-chickadmin-primary)]">
                        {translateRole(selectedUser.role)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-[var(--color-chickadmin-primary)]">معلومات الحساب</h4>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-semibold">تاريخ الانضمام:</span> {new Date(selectedUser.createdAt).toLocaleDateString('ar-SA')}</p>
                    <p className="text-sm"><span className="font-semibold">آخر نشاط:</span> {new Date(selectedUser.createdAt).toLocaleDateString('ar-SA')}</p>
                    <p className="text-sm"><span className="font-semibold">عدد المشاريع:</span> 0</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-[var(--color-chickadmin-primary)]">معلومات التواصل</h4>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-semibold">البريد الإلكتروني:</span> {selectedUser.email}</p>
                    <p className="text-sm"><span className="font-semibold">رقم الهاتف:</span> {selectedUser.phoneNumber || '+212 6XX-XXXXXX'}</p>
                    <p className="text-sm"><span className="font-semibold">البلد:</span> {selectedUser.country || 'المغرب'}</p>
                  </div>
                </div>
              </div>

              {/* Investment/Farm History Section */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-4 text-[var(--color-chickadmin-primary)]">
                  {selectedUser.role === 'investor' ? 'سجل الاستثمارات' :
                   selectedUser.role === 'farmer' ? 'سجل المزرعة' : 'سجل المشتريات'}
                </h4>

                {/* For now, we'll show a placeholder message since we don't have actual project data */}
                <p className="text-gray-500 text-sm">لا توجد مشاريع حتى الآن</p>
              </div>

              <div className="flex justify-end gap-3">
                {selectedUser.isActive ? (
                  <button
                    onClick={() => {
                      handleDeactivateUser(selectedUser._id);
                      setShowUserModal(false);
                    }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    تعليق الحساب
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleActivateUser(selectedUser._id);
                      setShowUserModal(false);
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                  >
                    تفعيل الحساب
                  </button>
                )}
                <button
                  onClick={() => {
                    handleSendNotification(selectedUser._id);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  إرسال تنبيه
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
                      handleDeleteUser(selectedUser._id);
                      setShowUserModal(false);
                    }
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  حذف الحساب
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
