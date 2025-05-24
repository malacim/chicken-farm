'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface Product {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  unit: 'dozen' | 'chick' | 'hen';
  available: number;
  image?: string;
  farm?: {
    _id?: string;
    id?: string;
    name: string;
  } | string;
}

interface Farm {
  _id?: string;
  id?: string;
  name: string;
  location: string;
}

interface OrderForm {
  productId: string;
  quantity: string;
  farmId: string;
}

async function fetchProducts() {
  try {
    const res = await fetch('/api/products');
    if (!res.ok) {
      console.error('API returned error status:', res.status);
      throw new Error('Failed to fetch products');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function fetchFarms() {
  try {
    const res = await fetch('/api/farms');
    if (!res.ok) {
      console.error('API returned error status:', res.status);
      throw new Error('Failed to fetch farms');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching farms:', error);
    return [];
  }
}

async function createOrder(data: { productId: string; quantity: number; farmId: string }) {
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { success: true };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false };
  }
}

const MarketPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<OrderForm>({ productId: '', quantity: '1', farmId: '' });
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingFarms, setLoadingFarms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setLoadingProducts(true);
    setLoadingFarms(true);
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoadingProducts(false));
    fetchFarms()
      .then(setFarms)
      .finally(() => setLoadingFarms(false));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setForm({ ...form, productId: (product._id || product.id || '').toString() });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const farmId = typeof selectedProduct?.farm === 'string'
        ? selectedProduct.farm
        : selectedProduct?.farm?._id || selectedProduct?.farm?.id || form.farmId;

      const res = await createOrder({
        productId: form.productId,
        quantity: Number(form.quantity),
        farmId,
      });
      if (res.success) {
        fetchProducts().then(setProducts);
        setForm({ productId: '', quantity: '1', farmId: '' });
        setSelectedProduct(null);
      } else {
        setError('Failed to create order.');
      }
    } catch (err) {
      setError('Error creating order.');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = filter === 'all'
    ? products
    : products.filter(product => {
        if (filter === 'eggs') return product.name.includes('بيض');
        if (filter === 'chicks') return product.name.includes('كتاكيت');
        if (filter === 'hens') return product.name.includes('دجاج');
        return true;
      });

  const getProductIcon = (product: Product) => {
    if (product.name.includes('بيض')) return '🥚';
    if (product.name.includes('كتاكيت')) return '🐣';
    if (product.name.includes('دجاج')) return '🐔';
    return '🐓';
  };

  return (
    <DashboardLayout>
      <div className="bg-gradient-to-b from-gray-50 to-gray-100" dir="rtl" lang="ar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Products Section */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden backdrop-blur-sm bg-opacity-95">
                <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">منتجات السوق</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setFilter('all')}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${filter === 'all' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      الكل
                    </button>
                    <button
                      onClick={() => setFilter('eggs')}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${filter === 'eggs' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      البيض
                    </button>
                    <button
                      onClick={() => setFilter('chicks')}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${filter === 'chicks' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      الكتاكيت
                    </button>
                    <button
                      onClick={() => setFilter('hens')}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${filter === 'hens' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      الدجاج
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  {loadingProducts ? (
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="flex items-center space-x-4 p-5 bg-gray-50 rounded-xl">
                            <div className="h-14 w-14 bg-gray-200 rounded-full"></div>
                            <div className="flex-1 space-y-2">
                              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : filteredProducts.length > 0 ? (
                    <div className="space-y-4">
                      {filteredProducts.map((product: Product) => (
                        <div
                          key={product._id || product.id}
                          className={`flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md cursor-pointer ${selectedProduct && (selectedProduct._id === product._id || selectedProduct.id === product.id) ? 'ring-2 ring-green-500 bg-green-50' : ''}`}
                          onClick={() => handleProductSelect(product)}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="h-14 w-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-2xl shadow-sm">
                              {product.image || getProductIcon(product)}
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 text-lg">{product.name}</h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {typeof product.farm === 'string'
                                  ? product.farm
                                  : product.farm?.name || 'مزرعة غير محددة'}
                              </p>
                            </div>
                          </div>
                          <div className="text-right flex items-center gap-2">
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">{product.price} MAD</p>
                              <p className="text-xs text-gray-500">لكل {product.unit === 'dozen' ? 'دزينة' : product.unit === 'chick' ? 'كتكوت' : 'دجاجة'}</p>
                            </div>
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1.5 rounded-full">
                              {product.available} متوفر
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="h-20 w-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto flex items-center justify-center mb-5 shadow-inner">
                        <span className="text-3xl">🛒</span>
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">لا توجد منتجات متاحة</h3>
                      <p className="text-gray-500 max-w-sm mx-auto">لا توجد منتجات متاحة حاليًا في هذه الفئة</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Featured Farms */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden backdrop-blur-sm bg-opacity-95">
                <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">المزارع المميزة</h2>
                  <button className="text-xs text-green-600 font-medium hover:text-green-700 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    عرض الكل
                  </button>
                </div>
                <div className="p-6">
                  {loadingFarms ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="animate-pulse p-5 bg-gray-50 rounded-xl">
                          <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  ) : farms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {farms.map((farm: Farm) => (
                        <div
                          key={farm._id || farm.id}
                          className="p-5 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md group cursor-pointer"
                        >
                          <h3 className="font-medium text-gray-900 text-lg mb-2 group-hover:text-green-600 transition-colors">{farm.name}</h3>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {farm.location}
                            </p>
                            <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md font-medium">متوفر</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">لا توجد مزارع متاحة</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar - Order Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 sticky top-8 overflow-hidden backdrop-blur-sm bg-opacity-95">
                <div className="px-6 py-5 border-b border-gray-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h2 className="text-xl font-semibold">طلب جديد</h2>
                  </div>
                  <p className="text-sm text-gray-500">قم بإنشاء طلب شراء جديد</p>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {!selectedProduct ? (
                    <div className="text-center py-8">
                      <div className="h-16 w-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto flex items-center justify-center mb-4 shadow-inner">
                        <span className="text-2xl">👆</span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">اختر منتجًا</h3>
                      <p className="text-gray-500 text-sm">الرجاء اختيار منتج من القائمة للمتابعة</p>
                    </div>
                  ) : (
                    <>
                      <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-xl shadow-sm">
                            {selectedProduct.image || getProductIcon(selectedProduct)}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{selectedProduct.name}</h3>
                            <p className="text-sm text-gray-500">{typeof selectedProduct.farm === 'string' ? selectedProduct.farm : selectedProduct.farm?.name || 'مزرعة غير محددة'}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">الكمية</label>
                        <div className="relative">
                          <input
                            type="number"
                            name="quantity"
                            value={form.quantity}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                            placeholder="أدخل الكمية"
                            required
                            min={1}
                            max={selectedProduct.available}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          الكمية المتاحة: {selectedProduct.available}
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <p className="text-sm font-medium text-gray-700">سعر الوحدة:</p>
                          <p className="font-medium">{selectedProduct.price} MAD</p>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <p className="text-sm font-medium text-gray-700">الكمية:</p>
                          <p className="font-medium">{form.quantity}</p>
                        </div>
                        <div className="h-px bg-gray-200 my-4"></div>
                        <div className="flex justify-between items-center">
                          <p className="text-base font-bold text-gray-900">المجموع:</p>
                          <p className="text-lg font-bold text-green-600">{Number(selectedProduct.price) * Number(form.quantity)} MAD</p>
                        </div>
                      </div>

                      {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                          <p className="text-sm text-red-600 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white py-3 px-6 rounded-xl font-medium focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:shadow-none flex items-center justify-center"
                        disabled={loading || !selectedProduct}
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                            جاري إنشاء الطلب...
                          </div>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            إتمام الطلب
                          </>
                        )}
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MarketPage;
