import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Sparkles,
  BookOpen,
  PenTool,
  Palette,
  Gift,
  Home,
  Info,
  ChevronDown,
  Package,
  Menu,
  X,
  Phone,
  Bookmark,
} from 'lucide-react';
import { MenuItem } from '../types';

interface NavbarProps {
  menus: MenuItem[];
  activeCategoryId: string | null;
  activeSubcategoryId: string | null;
  onSelectCategory: (categoryId: string | null, subcategoryId: string | null) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAiModal: () => void;
  onOpenTrackerModal: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  menus,
  activeCategoryId,
  activeSubcategoryId,
  onSelectCategory,
  cartCount,
  onOpenCart,
  onOpenAiModal,
  onOpenTrackerModal,
  searchQuery,
  setSearchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const getMenuIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-4 h-4" />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4" />;
      case 'PenTool':
        return <PenTool className="w-4 h-4" />;
      case 'Palette':
        return <Palette className="w-4 h-4" />;
      case 'Gift':
        return <Gift className="w-4 h-4" />;
      case 'Info':
        return <Info className="w-4 h-4" />;
      default:
        return <Bookmark className="w-4 h-4" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-pink-200 shadow-sm transition-all duration-300">
      {/* Top Pink-Purple Announcement Ribbon */}
      <div className="bg-pink-purple text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block animate-bounce text-yellow-200">✨</span>
            <span className="font-medium">
              تخفیف ویژه جشنواره لوازم تحریر فانتزی | ارسال رایگان خریدهای بالای ۵۰۰,۰۰۰ تومان با کد تخفیف <strong className="bg-white/20 px-1.5 py-0.5 rounded text-yellow-200 dir-ltr">PINK10</strong>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-pink-100 text-xs">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> پشتیبانی: ۰۲۱-۸۸۹۹۰۰۱۱
            </span>
            <span>پاسخگویی ۹ تا ۱۸</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo with Notebook and Pencil Theme */}
          <div
            onClick={() => onSelectCategory(null, null)}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-pink-600 relative overflow-hidden">
                <BookOpen className="w-6 h-6 text-pink-600 absolute" />
                <PenTool className="w-4 h-4 text-purple-600 absolute bottom-1 right-1 transform rotate-45" />
              </div>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-display tracking-wide">
                دفترچه & مداد
              </h1>
              <p className="text-[10px] text-purple-600 font-medium -mt-1">
                فروشگاه تخصصی لوازم تحریر صورتی و بنفش
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی دفترچه، مداد رنگی، روان‌نویس، هایلایتر..."
              className="w-full bg-pink-50/70 border border-pink-200 rounded-full py-2.5 pr-11 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white text-slate-700 transition-all shadow-inner"
            />
            <Search className="w-5 h-5 text-pink-400 absolute right-3.5 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-2.5 text-xs text-gray-400 hover:text-pink-600"
              >
                پاک کردن
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* AI Assistant Button */}
            <button
              onClick={onOpenAiModal}
              className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs md:text-sm font-medium px-3 md:px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 animate-spin-slow text-yellow-300" />
              <span className="hidden sm:inline">مشاور هوشمند AI</span>
            </button>

            {/* Order Tracking Button */}
            <button
              onClick={onOpenTrackerModal}
              className="hidden lg:flex items-center gap-1.5 bg-pink-100 hover:bg-pink-200 text-pink-800 text-xs font-medium px-3 py-2 rounded-full transition-colors border border-pink-300"
            >
              <Package className="w-4 h-4 text-pink-600" />
              <span>پیگیری سفارش</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium px-3.5 py-2 rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline text-xs md:text-sm">سبد خرید</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-purple-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-pink-100 text-pink-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="mt-3 md:hidden relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی لوازم تحریر..."
            className="w-full bg-pink-50 border border-pink-200 rounded-full py-2 pr-10 pl-4 text-xs focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <Search className="w-4 h-4 text-pink-400 absolute right-3 top-2.5" />
        </div>
      </div>

      {/* Integrated 6 Main Menus + 8 Submenus Navigation Bar */}
      <nav className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 border-t border-pink-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-between gap-1 py-1">
            {menus.map((menu) => {
              const isActive =
                (menu.id === 'menu-home' && !activeCategoryId && !activeSubcategoryId) ||
                (menu.categoryId && activeCategoryId === menu.categoryId);

              return (
                <li
                  key={menu.id}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(menu.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() => {
                      if (menu.id === 'menu-home') {
                        onSelectCategory(null, null);
                      } else if (menu.categoryId) {
                        onSelectCategory(menu.categoryId, null);
                      }
                    }}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm'
                        : 'text-slate-700 hover:text-pink-600 hover:bg-pink-100/60'
                    }`}
                  >
                    <span className={isActive ? 'text-white' : 'text-pink-500'}>
                      {getMenuIcon(menu.icon)}
                    </span>
                    <span>{menu.label}</span>
                    {menu.submenus && menu.submenus.length > 0 && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === menu.id ? 'rotate-180' : ''}`} />
                    )}
                  </button>

                  {/* Dropdown Submenus (8 Integrated Submenus) */}
                  {menu.submenus && menu.submenus.length > 0 && (
                    <div
                      className={`absolute right-0 top-full pt-1.5 w-64 z-50 transition-all duration-200 ${
                        openDropdown === menu.id
                          ? 'opacity-100 scale-100 pointer-events-auto'
                          : 'opacity-0 scale-95 pointer-events-none'
                      }`}
                    >
                      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-pink-200 p-2 space-y-1">
                        <div className="px-3 py-1.5 text-[11px] font-bold text-purple-400 border-b border-pink-100">
                          زیرمنوهای یکپارچه {menu.label}
                        </div>
                        {menu.submenus.map((sub) => {
                          const isSubActive = activeSubcategoryId === sub.subcategoryId;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => {
                                onSelectCategory(menu.categoryId || null, sub.subcategoryId);
                                setOpenDropdown(null);
                              }}
                              className={`w-full flex items-center justify-between text-right px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                                isSubActive
                                  ? 'bg-purple-100 text-purple-900 font-bold border-r-4 border-purple-600'
                                  : 'text-slate-700 hover:bg-pink-50 hover:text-pink-600'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                                <span>{sub.label}</span>
                              </div>
                              {sub.badge && (
                                <span className="bg-pink-100 text-pink-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                                  {sub.badge}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-pink-200 p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-pink-100">
            <span className="font-bold text-sm text-purple-900">۶ منوی اصلی و ۸ زیرمنو</span>
            <button
              onClick={onOpenTrackerModal}
              className="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full flex items-center gap-1"
            >
              <Package className="w-3.5 h-3.5" />
              <span>پیگیری سفارش</span>
            </button>
          </div>

          <div className="space-y-1">
            {menus.map((menu) => (
              <div key={menu.id} className="space-y-1">
                <button
                  onClick={() => {
                    if (menu.id === 'menu-home') {
                      onSelectCategory(null, null);
                      setMobileMenuOpen(false);
                    } else if (menu.categoryId) {
                      onSelectCategory(menu.categoryId, null);
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-pink-50 text-slate-800 text-xs font-bold"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-pink-600">{getMenuIcon(menu.icon)}</span>
                    <span>{menu.label}</span>
                  </div>
                  {menu.submenus && <ChevronDown className="w-4 h-4 text-pink-400" />}
                </button>

                {menu.submenus && (
                  <div className="pr-6 space-y-1 border-r-2 border-pink-200 mr-2 my-1">
                    {menu.submenus.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          onSelectCategory(menu.categoryId || null, sub.subcategoryId);
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-right py-1.5 px-2 text-xs text-slate-600 hover:text-pink-600 flex items-center justify-between"
                      >
                        <span>• {sub.label}</span>
                        {sub.badge && (
                          <span className="text-[9px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">
                            {sub.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
