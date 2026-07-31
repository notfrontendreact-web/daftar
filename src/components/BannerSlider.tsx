import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, BookOpen, PenTool, Gift, Star, Zap } from 'lucide-react';

interface BannerSliderProps {
  onSelectSubcategory: (subcategoryId: string) => void;
  onOpenAiModal: () => void;
}

const HERO_SLIDES = [
  {
    id: 1,
    title: 'دنیای فانتزی دفترچه‌ها و نوشت‌افزار صورتی بنفش',
    subtitle: 'انواع دفتر کلاسوری جلد سخت، هایلایترهای پاستیلی و ست‌های لاکچری تحریر',
    badge: 'تخفیف ویژه آغاز فصل',
    buttonText: 'مشاهده کلکسیون دفترچه‌ها',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    subcategoryId: 'sub-notebooks-binders',
    colorGradient: 'from-pink-600 via-purple-600 to-indigo-600',
  },
  {
    id: 2,
    title: 'ست مداد رنگی و اتودهای فانتزی با بدنه متالیک',
    subtitle: '۲۴ و ۳۶ رنگ خوشرنگ در جعبه‌های شیک فلزی صورتی بنفش برای هنرمندان',
    badge: 'ارسال رایگان سراسری',
    buttonText: 'دیدن لوازم طراحی و مداد',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80',
    subcategoryId: 'sub-pencils-etudes',
    colorGradient: 'from-purple-600 via-pink-600 to-rose-500',
  },
  {
    id: 3,
    title: 'پکیج‌های کادویی ۱۰ تکه و استیکرهای ضدآب fyn',
    subtitle: 'بهترین هدیه برای دانش‌آموزان، دانشجویان و عاشقان لوازم تحریر فانتزی',
    badge: 'پک هدیه صورتی بنفش',
    buttonText: 'خرید پکیج هدیه',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1200&q=80',
    subcategoryId: 'sub-pencil-cases-stickers',
    colorGradient: 'from-fuchsia-600 via-pink-600 to-purple-700',
  },
];

const MARQUEE_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80', title: 'دفتر کلاسوری' },
  { url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=400&q=80', title: 'هایلایتر پاستیلی' },
  { url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80', title: 'مداد رنگی ۲۴ رنگ' },
  { url: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=400&q=80', title: 'جامدادی یاسی' },
  { url: 'https://images.unsplash.com/photo-1585336261026-875a60a1c96b?auto=format&fit=crop&w=400&q=80', title: 'روان‌نویس ۱۰ رنگ' },
  { url: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=400&q=80', title: 'بولت ژورنال' },
  { url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=400&q=80', title: 'تراش رومیزی' },
  { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80', title: 'استیکر ضدآب' },
];

export const BannerSlider: React.FC<BannerSliderProps> = ({
  onSelectSubcategory,
  onOpenAiModal,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="space-y-6 my-4">
      {/* 1. Continuous Left-to-Right Animated Image Showcase (Marquee Strip) */}
      <div className="bg-white/80 backdrop-blur-sm border-y-2 border-pink-200 py-3 overflow-hidden shadow-sm relative group">
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex items-center gap-2 mb-2 px-6">
          <Zap className="w-4 h-4 text-pink-600 animate-pulse" />
          <span className="text-xs font-bold text-purple-900 font-display">
            گالری محصولات محبوب تحریر (انیمیشن حرکت زنده از چپ به راست):
          </span>
        </div>

        {/* Continuous Marquee Scrolling Left to Right */}
        <div className="animate-marquee-ltr flex items-center gap-4">
          {[...MARQUEE_IMAGES, ...MARQUEE_IMAGES, ...MARQUEE_IMAGES].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 bg-pink-50/90 border border-pink-200 rounded-2xl p-1.5 pl-4 shadow-sm hover:scale-105 transition-transform duration-300 cursor-pointer min-w-[200px]"
            >
              <img
                src={item.url}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-14 h-14 object-cover rounded-xl border border-pink-300 shadow-inner"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 block">{item.title}</span>
                <span className="text-[10px] text-pink-600 font-medium">مشاهده سریع ←</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Main Hero Banner Carousel with Left-to-Right Sliding Animations */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white min-h-[380px] md:min-h-[420px] flex items-center">
          
          {/* Animated Background Image Slide from Left to Right */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              key={slide.id}
              src={slide.image}
              alt={slide.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-35 transform transition-all duration-1000 scale-105 translate-x-0 animate-pulse"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-950/90 via-pink-900/80 to-transparent"></div>
          </div>

          {/* Notebook Lined Texture Accent */}
          <div className="absolute inset-0 bg-notebook-ruled opacity-10 pointer-events-none"></div>

          {/* Banner Content */}
          <div className="relative z-10 p-6 md:p-12 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-yellow-300 text-purple-950 font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-md animate-bounce">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{slide.badge}</span>
            </div>

            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-display text-white leading-tight drop-shadow-md">
              {slide.title}
            </h2>

            <p className="text-sm md:text-base text-pink-100 font-medium leading-relaxed max-w-xl">
              {slide.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectSubcategory(slide.subcategoryId)}
                className="flex items-center gap-2 bg-white text-purple-900 hover:bg-pink-100 font-bold text-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-x-1 transition-all"
              >
                <span>{slide.buttonText}</span>
                <ArrowLeft className="w-4 h-4 text-pink-600" />
              </button>

              <button
                onClick={onOpenAiModal}
                className="flex items-center gap-2 bg-purple-900/60 backdrop-blur-md border border-purple-300 text-yellow-200 hover:bg-purple-900 font-medium text-xs md:text-sm px-4 py-3 rounded-full transition-all"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>مشاوره هوشمند خرید</span>
              </button>
            </div>
          </div>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-4 left-6 z-20 flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-8 bg-yellow-300 shadow-md' : 'w-2.5 bg-white/50'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Submenu Quick-Access Integrated Cards */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-pink-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold text-purple-900 font-display flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-pink-500" />
              <span>دسترسی مستقیم به ۸ زیرمنوی لوازم تحریر:</span>
            </span>
            <span className="text-[11px] text-pink-600 font-bold">۸ زیرمنوی یکپارچه</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {[
              { id: 'sub-notebooks-binders', label: 'دفتر و کلاسور', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'sub-a4-paper', label: 'کاغذ و برگه', icon: <PenTool className="w-4 h-4" /> },
              { id: 'sub-pencils-etudes', label: 'مداد و اتود', icon: <PenTool className="w-4 h-4" /> },
              { id: 'sub-gel-pens', label: 'روان‌نویس ژله‌ای', icon: <PenTool className="w-4 h-4" /> },
              { id: 'sub-highlighters', label: 'هایلایتر پاستیلی', icon: <Sparkles className="w-4 h-4" /> },
              { id: 'sub-watercolors', label: 'آبرنگ و مداد شمعی', icon: <Gift className="w-4 h-4" /> },
              { id: 'sub-tools', label: 'تراش و پاک‌کن', icon: <Zap className="w-4 h-4" /> },
              { id: 'sub-pencil-cases-stickers', label: 'جامدادی و استیکر', icon: <Gift className="w-4 h-4" /> },
            ].map((subItem) => (
              <button
                key={subItem.id}
                onClick={() => onSelectSubcategory(subItem.id)}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-pink-50/80 hover:bg-gradient-to-tr hover:from-pink-500 hover:to-purple-600 hover:text-white text-slate-700 border border-pink-200 hover:border-transparent transition-all duration-300 text-center group"
              >
                <div className="p-2 rounded-lg bg-white group-hover:bg-white/20 text-pink-600 group-hover:text-white mb-1 shadow-sm">
                  {subItem.icon}
                </div>
                <span className="text-[11px] font-bold leading-tight">{subItem.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
