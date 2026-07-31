import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowLeft, Ticket, Check, AlertCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: (appliedDiscountAmount: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  const subtotal = cartItems.reduce((sum, item) => {
    const itemPrice = item.product.discountPrice || item.product.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponMessage(null);

    try {
      const res = await fetch('/api/coupon/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, totalPrice: subtotal }),
      });
      const data = await res.json();

      if (data.valid) {
        setDiscountAmount(data.discountAmount);
        setCouponMessage({ type: 'success', text: data.message });
      } else {
        setDiscountAmount(0);
        setCouponMessage({ type: 'error', text: data.message || 'کد تخفیف نامعتبر است' });
      }
    } catch (e) {
      setCouponMessage({ type: 'error', text: 'خطا در بررسی کد تخفیف' });
    } finally {
      setCouponLoading(false);
    }
  };

  const finalTotal = Math.max(0, subtotal - discountAmount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white border-r-2 border-pink-200 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="bg-pink-purple p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-yellow-300" />
              <h2 className="font-bold text-base font-display">سبد خرید لوازم تحریر</h2>
              <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full font-bold">
                {cartItems.length} کالا
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-slate-700 text-base">سبد خرید شما خالی است!</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  از بین دفترچه‌ها، مدادهای رنگی و هایلایترهای پاستیلی فانتزی انتخاب کنید.
                </p>
                <button
                  onClick={onClose}
                  className="bg-purple-600 text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-md hover:bg-purple-700"
                >
                  مشاهده کاتالوگ محصولات
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const price = item.product.discountPrice || item.product.price;
                return (
                  <div
                    key={item.product.id}
                    className="flex gap-3 p-3 rounded-2xl bg-pink-50/60 border border-pink-200 shadow-sm relative group"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 object-cover rounded-xl border border-pink-300"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs line-clamp-2 leading-snug">
                          {item.product.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-purple-600 font-medium mt-1">
                          <span>رنگ: {item.selectedColor || 'اصلی'}</span>
                          <span>•</span>
                          <span>{item.product.brand}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-pink-300">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="w-5 h-5 rounded bg-pink-100 text-pink-700 font-bold text-xs flex items-center justify-center hover:bg-pink-200"
                          >
                            -
                          </button>
                          <span className="font-extrabold text-xs w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="w-5 h-5 rounded bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center hover:bg-purple-200"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-black text-purple-900 text-xs font-display">
                          {(price * item.quantity).toLocaleString('fa-IR')} تومان
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      title="حذف کالا"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Coupon & Checkout Footer */}
          {cartItems.length > 0 && (
            <div className="p-4 bg-gradient-to-b from-white to-pink-50 border-t-2 border-pink-200 space-y-3">
              {/* Coupon input */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-purple-900 flex items-center gap-1">
                  <Ticket className="w-3.5 h-3.5 text-pink-500" />
                  <span>کد تخفیف دارید؟ (کد پیشنهادی: <strong className="text-pink-600">PINK10</strong>)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="مثلاً PINK10"
                    className="flex-1 bg-white border border-pink-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400 uppercase font-mono"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponLoading}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-sm transition-colors"
                  >
                    {couponLoading ? '...' : 'اعمال'}
                  </button>
                </div>

                {couponMessage && (
                  <p
                    className={`text-[10px] font-bold flex items-center gap-1 ${
                      couponMessage.type === 'success' ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {couponMessage.type === 'success' ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <AlertCircle className="w-3 h-3" />
                    )}
                    <span>{couponMessage.text}</span>
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-pink-200">
                <div className="flex justify-between">
                  <span>جمع کل کالاها:</span>
                  <span className="font-bold">{subtotal.toLocaleString('fa-IR')} تومان</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-pink-600 font-bold">
                    <span>مبلغ تخفیف:</span>
                    <span>-{discountAmount.toLocaleString('fa-IR')} تومان</span>
                  </div>
                )}

                <div className="flex justify-between text-sm font-black text-purple-950 pt-1 border-t border-pink-200">
                  <span>مبلغ قابل پرداخت:</span>
                  <span className="text-pink-600 font-display text-base">
                    {finalTotal.toLocaleString('fa-IR')} تومان
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onProceedToCheckout(discountAmount);
                  onClose();
                }}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:brightness-110 text-white font-bold text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-98 transition-all"
              >
                <span>تکمیل خرید و ثبت سفارش</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
