"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }
    setLoading(true);
    try {
      // TODO: Integrate with a real backend or email service.
      await new Promise((res) => setTimeout(res, 1000));
      toast.success("تم إرسال رسالتك بنجاح!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("حدث خطأ، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center py-20 bg-[var(--color-secondary)]"
    >
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-[var(--color-primary-dark)]">
          تواصل معنا
        </h1>
        <p className="text-[var(--color-text-secondary)] text-center mb-8">
          إذا كان لديك أي استفسار أو اقتراح، يرجى ملء النموذج أدناه وسنعاود
          الاتصال بك في أقرب وقت ممكن.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-[var(--color-text-primary)]">
              الاسم
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-dark)]"
              placeholder="اسمك الكامل"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-[var(--color-text-primary)]">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-dark)]"
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-[var(--color-text-primary)]">
              الرسالة
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-dark)]"
              placeholder="اكتب رسالتك هنا..."
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn bg-[var(--color-primary-dark)] text-white py-3 rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-70"
          >
            {loading ? "جاري الإرسال..." : "إرسال"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link href="/" className="text-[var(--color-primary-dark)] hover:underline">
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
