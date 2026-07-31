import React, { useState } from 'react';
import { ShoppingBag, Eye, Star, Check, Sparkles, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, selectedColor?: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colorOptions?.[0] || 'اصلی'
  );
  const [isLiked, setIsLiked] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const formattedPrice = product.price.toLocaleString('fa-IR');
  const formattedDiscount = product.discountPrice
    ? product.discountPrice.toLocaleString('fa-IR')
    : null;

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group relative bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden border-2 border-dashed border-pink-300 hover:border-purple-600 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* Product Image Container with Animated Left-to-Right Hover Slide */}
      <div className="relative aspect-square overflow-hidden bg-pink-50/50">
        <img
          src={product.image}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Subtle Notebook Paper Overlay Texture */}
        <div className="absolute inset-0 bg-notebook-paper opacity-20 pointer-events-none"></div>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          {product.tag && (
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
              {product.tag}
            </span>
          )}
          {product.discountPrice && (
            <span className="bg-yellow-400 text-purple-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
              تخفیف ویژه
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-md shadow-md transition-all ${
            isLiked ? 'bg-pink-500 text-white' : 'bg-white/80 text-gray-500 hover:text-pink-600'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-purple-950/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="bg-white text-purple-900 font-bold text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 hover:bg-pink-100 transition-colors"
          >
            <Eye className="w-4 h-4 text-pink-600" />
            <span>مشاهده جزییات</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand & Paper Type */}
          <div className="flex items-center justify-between text-[11px] text-purple-600 font-medium mb-1">
            <span>{product.brand}</span>
            {product.paperType && (
              <span className="bg-pink-50 text-pink-700 px-2 py-0.5 rounded-md border border-pink-200">
                {product.paperType}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-800 text-sm md:text-base leading-snug line-clamp-2 group-hover:text-pink-600 transition-colors">
            {product.title}
          </h3>
        </div>

        {/* Color Swatches if available */}
        {product.colorOptions && product.colorOptions.length > 0 && (
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <span className="text-[10px] text-gray-500 font-medium">رنگ:</span>
            <div className="flex items-center gap-1">
              {product.colorOptions.map((col, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(col)}
                  title={col}
                  className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${
                    selectedColor === col
                      ? 'bg-purple-600 text-white border-purple-600 font-bold'
                      : 'bg-pink-50 text-slate-700 border-pink-200 hover:border-pink-400'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Rating and Price */}
        <div className="pt-2 border-t border-pink-100 flex items-center justify-between">
          <div>
            {formattedDiscount ? (
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 line-through">
                  {formattedPrice} تومان
                </span>
                <span className="text-base font-extrabold text-pink-600 font-display">
                  {formattedDiscount} <span className="text-xs font-normal">تومان</span>
                </span>
              </div>
            ) : (
              <span className="text-base font-extrabold text-purple-900 font-display">
                {formattedPrice} <span className="text-xs font-normal">تومان</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-lg border border-amber-200 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleQuickAdd}
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
            addedAnimation
              ? 'bg-green-600 text-white'
              : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:brightness-110 active:scale-98'
          }`}
        >
          {addedAnimation ? (
            <>
              <Check className="w-4 h-4" />
              <span>به سبد اضافه شد!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>افزودن به سبد خرید</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
