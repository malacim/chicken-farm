"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface Farm {
  _id?: string;
  id?: string;
  name: string;
  description?: string;
  location: string | {
    city?: string;
    province?: string;
    village?: string;
  };
}

interface Investment {
  _id?: string;
  id?: string;
  userId: {
    name?: string;
  } | string;
  amount: number;
  type: 'BaidCash' | 'KtiCash';
  status?: string;
}

interface NewFarm {
  name: string;
  description: string;
  location: string;
}

async function fetchMyFarms() {
  const res = await fetch("/api/farms");
  if (!res.ok) throw new Error("فشل جلب المزارع");
  return await res.json();
}

async function fetchFarmInvestors(farmId: string) {
  const res = await fetch(`/api/investments?farmId=${farmId}`);
  if (!res.ok) throw new Error("فشل جلب المستثمرين");
  return await res.json();
}

async function createFarm(data: NewFarm) {
  const res = await fetch("/api/farms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

const FarmsPage = () => {
  const [myFarms, setMyFarms] = useState<Farm[]>([]);
  const [loadingFarms, setLoadingFarms] = useState(true);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [farmInvestors, setFarmInvestors] = useState<Investment[]>([]);
  const [loadingInvestors, setLoadingInvestors] = useState(false);
  const [showAddFarm, setShowAddFarm] = useState(false);
  const [newFarm, setNewFarm] = useState<NewFarm>({ name: "", description: "", location: "" });
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoadingFarms(true);
    fetchMyFarms()
      .then(setMyFarms)
      .finally(() => setLoadingFarms(false));
  }, []);

  const handleSelectFarm = async (farm: Farm) => {
    setSelectedFarm(farm);
    setLoadingInvestors(true);
    fetchFarmInvestors(farm._id || farm.id || '')
      .then(setFarmInvestors)
      .finally(() => setLoadingInvestors(false));
  };

  const handleAddFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingAdd(true);
    setError("");
    try {
      const res = await createFarm(newFarm);
      if (res && res._id) {
        setMyFarms((prev) => [...prev, res]);
        setShowAddFarm(false);
        setNewFarm({ name: "", description: "", location: "" });
      } else {
        setError("فشل إضافة المزرعة");
      }
    } catch {
      setError("فشل إضافة المزرعة");
    } finally {
      setLoadingAdd(false);
    }
  };

  console.log(myFarms);

  return (
    <DashboardLayout>
      <div className="bg-gradient-to-b from-gray-50 to-gray-100" dir="rtl" lang="ar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Farms List */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden backdrop-blur-sm bg-opacity-95">
                <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">مزارعي</h2>
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded font-medium hover:bg-green-700 transition-all"
                    onClick={() => setShowAddFarm(true)}
                  >
                    + إضافة مزرعة
                  </button>
                </div>
                <div className="p-6">
                  {loadingFarms ? (
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="animate-pulse h-12 bg-gray-100 rounded-xl"></div>
                      ))}
                    </div>
                  ) : myFarms.length > 0 ? (
                    <div className="space-y-4">
                      {myFarms.map((farm) => (
                        <div
                          key={farm._id || farm.id}
                          className={`flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white transition-all duration-300 cursor-pointer ${selectedFarm && (selectedFarm._id || selectedFarm.id) === (farm._id || farm.id) ? "ring-2 ring-green-300" : ""}`}
                          onClick={() => handleSelectFarm(farm)}
                        >
                          <div>
                            <h3 className="font-medium text-gray-900 text-lg">{farm.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">{typeof farm.location === 'string' ? farm.location : (farm.location?.city || farm.location?.village || farm.location?.province || '')}</p>
                            {farm.description && <p className="text-sm text-gray-500 mt-1">{farm.description}</p>}
                          </div>
                          <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md font-medium">{selectedFarm && (selectedFarm._id || selectedFarm.id) === (farm._id || farm.id) ? "المختارة" : ""}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">لا توجد مزارع بعد</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Investors in Selected Farm */}
              {selectedFarm && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden backdrop-blur-sm bg-opacity-95 mt-8">
                  <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">المستثمرون في {selectedFarm.name}</h2>
                  </div>
                  <div className="p-6">
                    {loadingInvestors ? (
                      <div className="space-y-4">
                        {Array.from({ length: 2 }).map((_, i) => (
                          <div key={i} className="animate-pulse h-10 bg-gray-100 rounded-xl"></div>
                        ))}
                      </div>
                    ) : farmInvestors.length > 0 ? (
                      <div className="space-y-4">
                        {farmInvestors.map((inv) => (
                          <div key={inv._id || inv.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {typeof inv.userId === 'string' ? inv.userId : inv.userId?.name || "مستثمر مجهول"}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">{inv.amount} درهم - {inv.type === 'BaidCash' ? 'بيض كاش' : 'كتي كاش'}</p>
                            </div>
                            <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md font-medium">{inv.status || "نشط"}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-gray-500">لا يوجد مستثمرون بعد</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Add Farm Form */}
            <div className="lg:col-span-1">
              {showAddFarm && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mb-8 p-6">
                  <h2 className="text-xl font-semibold mb-4">إضافة مزرعة جديدة</h2>
                  <form onSubmit={handleAddFarm} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">اسم المزرعة</label>
                      <input
                        type="text"
                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        value={newFarm.name}
                        onChange={e => setNewFarm({ ...newFarm, name: e.target.value })}
                        required
                        placeholder="أدخل اسم المزرعة"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
                      <input
                        type="text"
                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        value={newFarm.description}
                        onChange={e => setNewFarm({ ...newFarm, description: e.target.value })}
                        required
                        placeholder="وصف مختصر"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الموقع</label>
                      <input
                        type="text"
                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        value={newFarm.location}
                        onChange={e => setNewFarm({ ...newFarm, location: e.target.value })}
                        required
                        placeholder="المدينة أو العنوان"
                      />
                    </div>
                    {error && <div className="p-3 bg-red-50 text-red-700 rounded">{error}</div>}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white py-3 px-6 rounded-xl font-medium focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:shadow-none flex items-center justify-center"
                      disabled={loadingAdd}
                    >
                      {loadingAdd ? "جاري الإضافة..." : "إضافة المزرعة"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FarmsPage;
