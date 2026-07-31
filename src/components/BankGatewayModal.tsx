import React, { useState, useEffect } from 'react';
import { ShieldCheck, CreditCard, Lock, RefreshCw, CheckCircle2, AlertCircle, ArrowRight, Building2, Clock, Sparkles } from 'lucide-react';
import { Order } from '../types';

interface BankGatewayModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
  onPaymentSuccess: (orderId: string, referenceCode: string) => void;
}

export const BankGatewayModal: React.FC<BankGatewayModalProps> = ({
  isOpen,
  order,
  onClose,
  onPaymentSuccess,
}) => {
  if (!isOpen || !order) return null;

  const [cardNumber, setCardNumber] = useState('');
  const [cvv2, setCvv2] = useState('');
  const [expMonth, setExpMonth] = useState('08');
  const [expYear, setExpYear] = useState('06');
  const [secondPassword, setSecondPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('4829');

  // OTP Timer State
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);

  // Session Timer (10 mins)
  const [sessionTimer, setSessionTimer] = useState(600);

  // Processing & Errors
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentDone, setPaymentDone] = useState(false);
  const [refCode, setRefCode] = useState('');

  // Refresh Captcha
  const handleRefreshCaptcha = () => {
    const random = Math.floor(1000 + Math.random() * 9000).toString();
    setCaptchaCode(random);
  };

  // OTP Countdown Effect
  useEffect(() => {
    let interval: any = null;
    if (otpSent && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setOtpSent(false);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  // Session Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRequestOtp = () => {
    setOtpSent(true);
    setOtpTimer(60);
    const testOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setSecondPassword(testOtp);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' - ');
    } else {
      return value;
    }
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanCard = cardNumber.replace(/\s|-/g, '');
    if (cleanCard.length < 16) {
      setErrorMessage('شماره کارت باید ۱۶ رقم باشد.');
      return;
    }
    if (!cvv2 || cvv2.length < 3) {
      setErrorMessage('کد CVV2 را به درستی وارد کنید.');
      return;
    }
    if (!secondPassword) {
      setErrorMessage('رمز دوم پویا الزامی است.');
      return;
    }
    if (captchaInput !== captchaCode) {
      setErrorMessage('کد امنیتی اشتباه است.');
      handleRefreshCaptcha();
      return;
    }

    setProcessing(true);

    // Simulate Bank Authorization
    setTimeout(() => {
      setProcessing(false);
      const generatedRef = 'REF-' + Math.floor(10000000 + Math.random() * 90000000);
      setRefCode(generatedRef);
      setPaymentDone(true);
      onPaymentSuccess(order.id, generatedRef);
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn dir-rtl">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-blue-600 overflow-hidden my-4">
        
        {/* Bank Gateway Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-4 sm:p-5 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-yellow-300 border border-white/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm sm:text-base font-display flex items-center gap-2">
                <span>درگاه پرداخت اینترنتی شاپرک</span>
                <span className="bg-blue-600 text-[10px] px-2 py-0.5 rounded-full border border-blue-400">شتاب</span>
              </h2>
              <p className="text-[11px] text-blue-200">
                پرداخت امن متصل به بانک سامان و الکترونیک کارت
              </p>
            </div>
          </div>

          <div className="text-left bg-blue-950/60 px-3 py-1.5 rounded-xl border border-blue-700/50">
            <span className="text-[10px] text-blue-300 block">زمان باقی‌مانده:</span>
            <span className="font-mono font-bold text-yellow-300 text-sm flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(sessionTimer)}</span>
            </span>
          </div>
        </div>

        {/* Merchant Info Banner */}
        <div className="bg-slate-50 border-b border-slate-200 p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div>
            <span className="text-gray-400 block text-[10px]">پذیرنده:</span>
            <strong className="text-slate-800 text-[11px]">فروشگاه صورتی و بنفش</strong>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">ترمینال:</span>
            <strong className="text-slate-800 font-mono text-[11px]">8492019</strong>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">کد سفارش:</span>
            <strong className="text-slate-800 font-mono text-[11px]">{order.trackingCode}</strong>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">مبلغ قابل پرداخت:</span>
            <strong className="text-pink-600 font-black text-sm font-display">
              {order.finalPrice.toLocaleString('fa-IR')} تومان
            </strong>
          </div>
        </div>

        {/* Main Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {paymentDone ? (
            /* Bank Receipt State */
            <div className="text-center space-y-5 py-4 animate-fadeIn">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner border-2 border-green-300">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900 font-display">
                  تراکنش با موفقیت انجام شد!
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  پرداخت سفارش شما در شاپرک تایید گردید.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-right space-y-2 text-xs max-w-md mx-auto">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-gray-500">شماره ارجاع تراکنش (Ref):</span>
                  <strong className="font-mono text-blue-700 text-sm">{refCode}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-gray-500">کد پیگیری پستی:</span>
                  <strong className="font-mono text-purple-900">{order.trackingCode}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">مبلغ کسر شده:</span>
                  <strong className="font-bold text-pink-600">
                    {order.finalPrice.toLocaleString('fa-IR')} تومان
                  </strong>
                </div>
              </div>

              <button
                onClick={onClose}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:brightness-110 text-white font-bold text-xs px-8 py-3 rounded-2xl shadow-xl transition-all"
              >
                بازگشت به فروشگاه صورتی و بنفش
              </button>
            </div>
          ) : (
            /* Card Input Form */
            <form onSubmit={handlePay} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl flex items-center gap-2 font-bold">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Card Number */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block flex items-center justify-between">
                  <span>شماره کارت ۱۶ رقمی شتاب:</span>
                  <span className="text-[10px] text-blue-600">پشتیبانی از تمام بانک‌ها</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={25}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="۶۰۳۷ - ۹۹۷۵ - ۱۲۳۴ - ۵۶۷۸"
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-2xl px-4 py-3 text-sm font-mono dir-ltr text-center font-bold focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner"
                  />
                  <CreditCard className="w-5 h-5 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* CVV2 and Expiry Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    کد CVV2 کارت:
                  </label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    value={cvv2}
                    onChange={(e) => setCvv2(e.target.value)}
                    placeholder="۳ یا ۴ رقم پشت کارت"
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-2xl px-3 py-2.5 text-xs font-mono text-center focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    تاریخ انقضای کارت (ماه / سال):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={2}
                      value={expMonth}
                      onChange={(e) => setExpMonth(e.target.value)}
                      placeholder="ماه"
                      className="w-1/2 bg-slate-50 border-2 border-slate-300 rounded-2xl px-2 py-2.5 text-xs font-mono text-center focus:outline-none focus:border-blue-600"
                    />
                    <span className="self-center font-bold text-gray-400">/</span>
                    <input
                      type="text"
                      maxLength={2}
                      value={expYear}
                      onChange={(e) => setExpYear(e.target.value)}
                      placeholder="سال"
                      className="w-1/2 bg-slate-50 border-2 border-slate-300 rounded-2xl px-2 py-2.5 text-xs font-mono text-center focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Second Password OTP */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  رمز دوم پویا (اینترنتی):
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    required
                    value={secondPassword}
                    onChange={(e) => setSecondPassword(e.target.value)}
                    placeholder="رمز دریافتی از پیامک"
                    className="flex-1 bg-slate-50 border-2 border-slate-300 rounded-2xl px-3 py-2.5 text-xs font-mono text-center focus:outline-none focus:border-blue-600"
                  />
                  <button
                    type="button"
                    onClick={handleRequestOtp}
                    disabled={otpSent}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-900 border border-blue-300 font-bold text-xs px-4 py-2.5 rounded-2xl shadow-sm transition-all flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>{otpSent ? `ارسال شد (${otpTimer}ثانیه)` : 'درخواست رمز پویا'}</span>
                  </button>
                </div>
              </div>

              {/* Captcha Code */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  کد امنیتی تصویر:
                </label>
                <div className="flex items-center gap-3">
                  <div className="bg-slate-200 px-4 py-2 rounded-2xl font-mono text-lg tracking-widest font-black text-slate-700 select-none border border-slate-300 flex items-center gap-2">
                    <span className="line-through decoration-blue-500">{captchaCode}</span>
                    <button
                      type="button"
                      onClick={handleRefreshCaptcha}
                      className="p-1 text-gray-500 hover:text-slate-800"
                      title="بروزرسانی تصویر"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>

                  <input
                    type="text"
                    required
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="کد بالا را وارد کنید"
                    className="flex-1 bg-slate-50 border-2 border-slate-300 rounded-2xl px-3 py-2.5 text-xs font-mono text-center focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Security Shield Note */}
              <div className="bg-blue-50/70 p-3 rounded-2xl border border-blue-200 text-[11px] text-blue-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>
                  این پرداخت توسط پروتکل رمزنگاری SSL ۲۵۶ بیتی و شبکه شتاب شاپرک محافظت می‌شود.
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={processing}
                  className="flex-1 py-3.5 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 hover:brightness-110 text-white font-extrabold text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <Lock className="w-4 h-4" />
                  <span>{processing ? 'در حال تایید نهایی شاپرک...' : 'پرداخت نهایی و صدور فاکتور'}</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-colors"
                >
                  انصراف
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
