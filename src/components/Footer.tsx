import React from 'react';
import { BookOpen, PenTool, Phone, Mail, MapPin, Heart, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (categoryId: string | null, subcategoryId: string | null) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-slate-900 text-pink-100 mt-16 border-t-4 border-pink-400 relative overflow-hidden">
      {/* Notebook Line Texture Accent */}
      <div className="absolute inset-0 bg-notebook-paper opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10 space-y-10">
        {/* Top Trust Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 border-b border-slate-800 text-center">
          <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
            <Truck className="w-6 h-6 text-pink-400" />
            <span className="font-bold text-xs text-white">ارسال سریع به سراسر کشور</span>
            <span className="text-[10px] text-gray-400">پست پیشتاز و تیپاکس</span>
          </div>

          <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
            <span className="font-bold text-xs text-white">ضمانت اصالت و سلامت</span>
            <span className="text-[10px] text-gray-400">تضمین کیفیت کالا</span>
          </div>

          <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
            <RefreshCw className="w-6 h-6 text-pink-400" />
            <span className="font-bold text-xs text-white">۷ روز ضمانت بازگشت</span>
            <span className="text-[10px] text-gray-400">تعویض بدون قید و شرط</span>
          </div>

          <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="font-bold text-xs text-white">بسته‌بندی کادویی صورتی</span>
            <span className="text-[10px] text-gray-400">ارسال با پوشال و بسته شیک</span>
          </div>
        </div>

        {/* Middle Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-pink-500 flex items-center justify-center text-white">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-display text-white">
                دفترچه & مداد
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              فروشگاه تخصصی انواع دفتر، نوشت‌افزار، هایلایترهای پاستیلی و ست‌های فانتزی صورتی بنفش. طراحی شده برای ایجاد حس شادابی در مطالعه و خلق آثار هنری زیبا.
            </p>
          </div>

          {/* 6 Main Menus Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-pink-400 font-display border-r-2 border-pink-500 pr-2">
              منوهای اصلی فروشگاه
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>
                <button onClick={() => onSelectCategory(null, null)} className="hover:text-pink-400 transition-colors">
                  • صفحه اصلی
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('cat-notebooks', null)} className="hover:text-pink-400 transition-colors">
                  • دفتر و کاغذ
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('cat-writing', null)} className="hover:text-pink-400 transition-colors">
                  • نوشت‌افزار
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('cat-art', null)} className="hover:text-pink-400 transition-colors">
                  • لوازم طراحی و هنری
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('cat-gifts', null)} className="hover:text-pink-400 transition-colors">
                  • پکیج‌های فانتزی و هدیه
                </button>
              </li>
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-pink-400 transition-colors">
                  • درباره ما و تماس
                </button>
              </li>
            </ul>
          </div>

          {/* 8 Integrated Submenus Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-purple-400 font-display border-r-2 border-purple-500 pr-2">
              ۸ زیرمنوی یکپارچه
            </h4>
            <ul className="grid grid-cols-1 gap-1 text-[11px] text-slate-300">
              <li><button onClick={() => onSelectCategory('cat-notebooks', 'sub-notebooks-binders')} className="hover:text-purple-300">• ۱. دفترچه یادداشت و کلاسور</button></li>
              <li><button onClick={() => onSelectCategory('cat-notebooks', 'sub-a4-paper')} className="hover:text-purple-300">• ۲. کاغذ A4 و خط‌دار</button></li>
              <li><button onClick={() => onSelectCategory('cat-writing', 'sub-pencils-etudes')} className="hover:text-purple-300">• ۳. مداد رنگی و اتود</button></li>
              <li><button onClick={() => onSelectCategory('cat-writing', 'sub-gel-pens')} className="hover:text-purple-300">• ۴. روان‌نویس و خودکار فانتزی</button></li>
              <li><button onClick={() => onSelectCategory('cat-writing', 'sub-highlighters')} className="hover:text-purple-300">• ۵. ماژیک و هایلایتر پاستیلی</button></li>
              <li><button onClick={() => onSelectCategory('cat-art', 'sub-watercolors')} className="hover:text-purple-300">• ۶. آبرنگ و مداد شمعی</button></li>
              <li><button onClick={() => onSelectCategory('cat-art', 'sub-tools')} className="hover:text-purple-300">• ۷. تراش، پاک‌کن و خط‌کش</button></li>
              <li><button onClick={() => onSelectCategory('cat-gifts', 'sub-pencil-cases-stickers')} className="hover:text-purple-300">• ۸. جامدادی و استیکر فانتزی</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 text-xs text-slate-300">
            <h4 className="text-sm font-bold text-pink-400 font-display border-r-2 border-pink-500 pr-2">
              ارتباط با دفتر فروشگاه
            </h4>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-pink-400" />
                <span>۰۲۱-۸۸۹۹۰۰۱۱ (پشتیبانی تلفنی)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400" />
                <span>support@pinkpurple-stationery.ir</span>
              </p>
              <p className="flex items-start gap-2 leading-relaxed">
                <MapPin className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                <span>تهران، خیابان انقلاب، مجتمع اداری تجاری تحریر، طبقه ۳، واحد ۳۰۴</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© ۱۴۰۵ کلیه حقوق برای فروشگاه لوازم تحریر بنفش و صورتی محفوظ است.</p>
          <p className="flex items-center gap-1 text-pink-300">
            <span>طراحی شده با عشق</span>
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 inline" />
            <span>برای عاشقان دفاتر و مدادهای فانتزی</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
