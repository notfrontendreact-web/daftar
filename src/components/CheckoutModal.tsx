import React, { useState } from 'react';
import { X, CheckCircle, Truck, CreditCard, ShieldCheck, Printer, ArrowRight, BookOpen } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedDiscountAmount: number;
  onOrderSuccess: (order: Order) => void;
  onProceedToBankGateway: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  appliedDiscountAmount,
  onOrderSuccess,
  onProceedToBankGateway,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    province: 'تهران',
    city: 'تهران',
    address: '',
    postalCode: '',
    paymentMethod: 'درگاه آنلاین' as 'درگاه آنلاین' | 'پرداخت در محل',
  });

  const [submitting, setSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const finalPrice = Math.max(0, subtotal - appliedDiscountAmount);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.address) {
      setErrorMsg('لطفاً نام، شماره تماس و نشانی تحویل را تکمیل کنید.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          cartItems,
          totalPrice: subtotal,
          discountAmount: appliedDiscountAmount,
        }),
      });

      const data = await res.json();
      if (data.success && data.order) {
        setCreatedOrder(data.order);
        onOrderSuccess(data.order);
        if (formData.paymentMethod === 'درگاه آنلاین') {
          onProceedToBankGateway(data.order);
        }
      } else {
        setErrorMsg(data.error || 'خطا در ثبت سفارش');
      }
    } catch (e) {
      setErrorMsg('خطای ارتباط با سرور.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-pink-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-pink-purple p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-yellow-300" />
            <h2 className="font-bold text-base font-display">
              {createdOrder ? 'فاکتور ثبت سفارش نهائی' : 'تکمیل آدرس و ثبت سفارش'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {createdOrder ? (
            /* Order Success Receipt Layout */
            <div className="text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-purple-950 font-display">
                  سفارش شما با موفقیت ثبت شد! 🎉
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  کد پیگیری اختصاصی ارسال پستی شما:
                </p>
                <div className="inline-block bg-purple-100 border-2 border-purple-400 text-purple-950 font-black text-xl px-6 py-2 rounded-2xl my-3 font-mono dir-ltr shadow-inner">
                  {createdOrder.trackingCode}
                </div>
              </div>

              {/* Receipt Box */}
              <div className="bg-pink-50/60 p-4 rounded-2xl border border-pink-200 text-right space-y-2 text-xs">
                <div className="flex justify-between font-bold text-purple-900 border-b border-pink-200 pb-2">
                  <span>نام تحویل‌گیرنده: {createdOrder.customerName}</span>
                  <span>شماره تماس: {createdOrder.phone}</span>
                </div>
                <p className="text-slate-700">
                  <strong>نشانی ارسال:</strong> {createdOrder.province}، {createdOrder.city}، {createdOrder.address}
                </p>
                <div className="flex justify-between text-slate-700 pt-2 border-t border-pink-200">
                  <span>مبلغ کل پرداختی:</span>
                  <span className="font-black text-pink-600 text-sm">
                    {createdOrder.finalPrice.toLocaleString('fa-IR')} تومان
                  </span>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => window.print()}
                  className="bg-pink-100 text-pink-800 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-pink-200 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>چاپ فاکتور</span>
                </button>
                <button
                  onClick={onClose}
                  className="bg-purple-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md hover:bg-purple-700 transition-colors"
                >
                  بازگشت به فروشگاه
                </button>
              </div>
            </div>
          ) : (
            /* Shipping Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-bold">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    نام و نام خانوادگی <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="مثلاً: مریم احمدی"
                    className="w-full bg-pink-50/50 border border-pink-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    شماره موبایل <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className="w-full bg-pink-50/50 border border-pink-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">استان</label>
                  <input
                    type="text"
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full bg-pink-50/50 border border-pink-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">شهر</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-pink-50/50 border border-pink-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  آدرس دقیق پستی <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="خیابان، کوچه، پلاک، واحد..."
                  className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                ></textarea>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">کد پستی (اختیاری)</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="۱۰ رقمی"
                  className="w-full bg-pink-50/50 border border-pink-200 rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>

              {/* Payment Option */}
              <div className="pt-2 border-t border-pink-100">
                <label className="text-xs font-bold text-slate-700 block mb-2">روش پرداخت:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'درگاه آنلاین' })}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      formData.paymentMethod === 'درگاه آنلاین'
                        ? 'bg-purple-100 border-purple-600 text-purple-950 shadow-sm'
                        : 'bg-pink-50 border-pink-200 text-slate-600'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-purple-600" />
                    <span>پرداخت آنلاین شتاب</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'پرداخت در محل' })}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      formData.paymentMethod === 'پرداخت در محل'
                        ? 'bg-purple-100 border-purple-600 text-purple-950 shadow-sm'
                        : 'bg-pink-50 border-pink-200 text-slate-600'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-purple-600" />
                    <span>پرداخت در محل (تهران)</span>
                  </button>
                </div>
              </div>

              {/* Final Payable */}
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">مبلغ نهایی قابل پرداخت:</span>
                <span className="text-lg font-black text-pink-600 font-display">
                  {finalPrice.toLocaleString('fa-IR')} تومان
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:brightness-110 text-white font-bold text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all"
              >
                {submitting ? 'در حال صدور فاکتور...' : 'تایید نهایی و پرداخت سفارش'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
