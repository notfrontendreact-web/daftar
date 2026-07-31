import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw, PenTool, Sparkles, BookOpen } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor?: string, quantity?: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colorOptions?.[0] || 'اصلی'
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const images = product.additionalImages && product.additionalImages.length > 0
    ? product.additionalImages
    : [product.image];

  const handleAdd = () => {
    onAddToCart(product, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const formattedPrice = product.price.toLocaleString('fa-IR');
  const formattedDiscount = product.discountPrice
    ? product.discountPrice.toLocaleString('fa-IR')
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-2 border-pink-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header Ribbon */}
        <div className="bg-pink-purple p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-yellow-300" />
            <h2 className="font-bold text-sm md:text-base font-display">
              مشخصات کامل {product.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Image Gallery with Left-to-Right Carousel */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-pink-50 border-2 border-pink-200 shadow-inner relative">
                <img
                  src={images[activeImageIndex]}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-500 transform scale-100 hover:scale-105"
                />
                <span className="absolute bottom-3 right-3 bg-purple-900/80 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full">
                  تصویر {activeImageIndex + 1} از {images.length}
                </span>
              </div>

              {/* Left to Right Animated Thumbnail Carousel */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-purple-600 scale-105 shadow-md'
                        : 'border-pink-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt="تصویر گالری"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-pink-100 text-xs text-slate-600">
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-pink-50">
                  <Truck className="w-5 h-5 text-pink-600" />
                  <span className="font-medium text-[11px]">ارسال سریع پیشتاز</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-purple-50">
                  <ShieldCheck className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-[11px]">اصالت ۱۰۰٪ کالا</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-pink-50">
                  <RefreshCw className="w-5 h-5 text-pink-600" />
                  <span className="font-medium text-[11px]">۷ روز ضمانت بازگشت</span>
                </div>
              </div>
            </div>

            {/* Right Column: Product Info & Actions */}
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs text-purple-600 font-bold mb-1">
                  <span>برند: {product.brand}</span>
                  <span>•</span>
                  <span>دسته: {product.category}</span>
                </div>
                <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-snug">
                  {product.title}
                </h1>
              </div>

              {/* Price & Rating */}
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-2xl border border-pink-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 block mb-0.5">قیمت مصرف‌کننده:</span>
                  {formattedDiscount ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-pink-600 font-display">
                        {formattedDiscount}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        {formattedPrice}
                      </span>
                      <span className="text-xs font-bold text-slate-700">تومان</span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-purple-900 font-display">
                        {formattedPrice}
                      </span>
                      <span className="text-xs font-bold text-slate-700">تومان</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-amber-200 shadow-sm text-sm font-bold text-amber-700">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-xs text-gray-400 font-normal">({product.reviewsCount} نظر)</span>
                </div>
              </div>

              {/* Color Selector */}
              {product.colorOptions && product.colorOptions.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    انتخاب تنوع رنگ:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colorOptions.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          selectedColor === color
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-pink-50 text-slate-700 hover:bg-pink-100 border border-pink-200'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Counter */}
              <div className="flex items-center justify-between bg-pink-50/60 p-3 rounded-2xl border border-pink-200">
                <span className="text-xs font-bold text-slate-700">تعداد سفارش:</span>
                <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-pink-300">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-lg bg-pink-100 text-pink-700 font-bold flex items-center justify-center hover:bg-pink-200"
                  >
                    -
                  </button>
                  <span className="font-extrabold text-sm w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 font-bold flex items-center justify-center hover:bg-purple-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAdd}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:brightness-110 active:scale-98'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>با موفقیت افزوده شد</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>افزودن به سبد خرید ({ ( (product.discountPrice || product.price) * quantity ).toLocaleString('fa-IR') } تومان)</span>
                  </>
                )}
              </button>

              {/* Features List */}
              <div className="space-y-2 pt-2 border-t border-pink-100">
                <h3 className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-pink-500" />
                  <span>ویژگی‌های کلیدی کالا:</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 flex-shrink-0"></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <div className="bg-pink-50/40 p-3.5 rounded-2xl text-xs text-slate-700 leading-relaxed border border-pink-100">
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
