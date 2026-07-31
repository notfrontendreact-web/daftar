import React, { useState } from 'react';
import { X, Search, Package, Clock, CheckCircle2, Truck, AlertCircle } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderResult, setOrderResult] = useState<Order | null>(null);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError('');
    setOrderResult(null);

    try {
      const res = await fetch(`/api/orders/track/${encodeURIComponent(code.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setOrderResult(data);
      } else {
        setError('سفارشی با این کد پیگیری یافت نشد. لطفاً کد را بررسی کنید.');
      }
    } catch (e) {
      setError('خطا در ارتباط با سامانه پیگیری سفارش.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-pink-200 overflow-hidden">
        {/* Header */}
        <div className="bg-pink-purple p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-yellow-300" />
            <h2 className="font-bold text-base font-display">پیگیری آنلاین سفارشات تحریر</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <form onSubmit={handleTrack} className="space-y-2">
            <label className="text-xs font-bold text-purple-900 block">
              کد پیگیری پستی یا فاکتور را وارد کنید:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="مثلاً: TRK-123456"
                className="flex-1 bg-pink-50 border border-pink-300 rounded-xl px-4 py-2 text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span>{loading ? '...' : 'جستجو'}</span>
              </button>
            </div>
          </form>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {orderResult && (
            <div className="bg-pink-50/70 rounded-2xl p-4 border border-pink-200 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-pink-200 pb-2">
                <div>
                  <span className="text-[11px] text-gray-500 block">سفارش دهنده:</span>
                  <span className="font-bold text-xs text-purple-950">{orderResult.customerName}</span>
                </div>
                <div className="text-left">
                  <span className="text-[11px] text-gray-500 block">وضعیت سفارش:</span>
                  <span className="bg-purple-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {orderResult.status}
                  </span>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold text-purple-900 block">مراحل ارسال پستی:</span>
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 bg-white p-2.5 rounded-xl border border-pink-200">
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ثبت اولیه</span>
                  </div>
                  <div className="w-8 h-0.5 bg-green-400"></div>
                  <div className="flex items-center gap-1 text-purple-600">
                    <Clock className="w-4 h-4" />
                    <span>بسته‌بندی</span>
                  </div>
                  <div className="w-8 h-0.5 bg-purple-300"></div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Truck className="w-4 h-4" />
                    <span>تحویل به پست</span>
                  </div>
                </div>
              </div>

              {/* Items Summary */}
              <div className="text-xs space-y-1">
                <span className="font-bold text-slate-800">اقلام این سفارش ({orderResult.cartItems.length} کالا):</span>
                <ul className="space-y-1 text-slate-600">
                  {orderResult.cartItems.map((ci, idx) => (
                    <li key={idx} className="flex justify-between bg-white/80 p-2 rounded-lg border border-pink-100">
                      <span>• {ci.product.title}</span>
                      <span className="font-bold">{ci.quantity} عدد</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
