import React, { useState } from 'react';
import { X, Sparkles, BookOpen, Heart, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const [usage, setUsage] = useState('مدرسه و دانشگاه');
  const [budget, setBudget] = useState(300000);
  const [favoriteColor, setFavoriteColor] = useState('ترکیبی صورتی بنفش');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<{
    recommendationText: string;
    suggestedProducts: Product[];
    studyTip: string;
  } | null>(null);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usage,
          budget,
          favoriteColor,
          notes,
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-pink-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-spin-slow" />
            <h2 className="font-bold text-base font-display">
              مشاور هوشمند خرید لوازم تحریر صورتی و بنفش
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!result ? (
            <form onSubmit={handleConsult} className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed bg-pink-50/70 p-3 rounded-2xl border border-pink-200">
                🌸 با هوش مصنوعی هوشمند ما صحبت کنید! نیازمندی، بودجه و تم رنگی خود را انتخاب کنید تا بهترین پکیج اختصاصی دفترچه و مداد برای شما چیده شود.
              </p>

              {/* Usage */}
              <div>
                <label className="text-xs font-bold text-purple-900 block mb-1">
                  هدف اصلی استفاده:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['مدرسه و کنکور', 'دانشگاه و دفتر', 'طراحی و نقاشی', 'هدیه فانتزی'].map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setUsage(u)}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                        usage === u
                          ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                          : 'bg-pink-50 text-slate-700 border-pink-200 hover:border-pink-300'
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget slider */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-purple-900 mb-1">
                  <span>حدود بودجه شما:</span>
                  <span className="text-pink-600 font-display text-sm">
                    {budget.toLocaleString('fa-IR')} تومان
                  </span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={1000000}
                  step={50000}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>

              {/* Color preference */}
              <div>
                <label className="text-xs font-bold text-purple-900 block mb-1">
                  سلیقه رنگی:
                </label>
                <div className="flex gap-2">
                  {['ترکیبی صورتی بنفش', 'صورتی پاستیلی', 'بنفش یاسی'].map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setFavoriteColor(col)}
                      className={`flex-1 p-2 rounded-xl text-xs font-bold border transition-all ${
                        favoriteColor === col
                          ? 'bg-pink-500 text-white border-pink-500 shadow-sm'
                          : 'bg-pink-50 text-slate-700 border-pink-200'
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional notes */}
              <div>
                <label className="text-xs font-bold text-purple-900 block mb-1">
                  توضیحات یا علاقه خاص (اختیاری):
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="مثلاً: حتماً هایلایتر معطر داشته باشه یا برگه بولت ژورنال..."
                  className="w-full bg-pink-50/50 border border-pink-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:brightness-110 text-white font-bold text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span>{loading ? 'در حال تحلیل هوشمند کاتالوگ...' : 'پیشنهاد هوشمند پکیج تحریر'}</span>
              </button>
            </form>
          ) : (
            /* AI Results Layout */
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-200 space-y-2">
                <span className="text-xs font-bold text-purple-900 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-pink-500" />
                  <span>توصیه اختصاصی هوش مصنوعی:</span>
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {result.recommendationText}
                </p>
              </div>

              {result.studyTip && (
                <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200 text-xs text-amber-900 flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block mb-0.5">💡 نکته طلایی مطالعه:</strong>
                    <span>{result.studyTip}</span>
                  </div>
                </div>
              )}

              {/* Suggested Products List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800">
                  محصولات پیشنهادی هماهنگ با درخواست شما:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {result.suggestedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 bg-white rounded-2xl border border-pink-200 shadow-sm flex flex-col justify-between"
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-24 object-cover rounded-xl mb-2"
                      />
                      <h5 className="font-bold text-xs text-slate-800 line-clamp-2 mb-1">
                        {p.title}
                      </h5>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-pink-100">
                        <span className="text-xs font-black text-purple-900 font-display">
                          {(p.discountPrice || p.price).toLocaleString('fa-IR')} تومان
                        </span>
                        <button
                          onClick={() => onAddToCart(p)}
                          className="p-1.5 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition-colors"
                          title="افزودن مستقیم به سبد"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setResult(null)}
                className="w-full py-2.5 bg-pink-100 hover:bg-pink-200 text-purple-900 font-bold text-xs rounded-xl transition-colors"
              >
                تغییر معیارهای درخواست
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
