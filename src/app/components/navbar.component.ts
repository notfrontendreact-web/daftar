import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuItem } from '../../types';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-pink-200 shadow-sm transition-all dir-rtl">
      <!-- Top Announcement Banner -->
      <div class="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white py-1.5 px-4 text-center text-xs font-bold flex items-center justify-between shadow-inner">
        <div class="flex items-center gap-2 mx-auto">
          <span class="bg-white/20 px-2 py-0.5 rounded-full text-[10px] text-yellow-200">تخفیف ویژه</span>
          <span>🎁 ارسال رایگان سفارش‌های بالای ۴۰۰ هزار تومان با پست پیشتاز به سراسر کشور</span>
        </div>
        <button (click)="openAiModal.emit()" class="hidden md:flex items-center gap-1.5 bg-yellow-300 hover:bg-yellow-400 text-purple-950 px-3 py-0.5 rounded-full text-[11px] font-black transition-transform active:scale-95 shadow-sm">
          <span>✨ مشاور هوشمند هوش مصنوعی</span>
        </button>
      </div>

      <!-- Main Header Bar -->
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <!-- Logo & Store Name -->
        <a href="#" (click)="selectCategory.emit({ catId: null, subId: null }); $event.preventDefault()" class="flex items-center gap-2.5 group">
          <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div class="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-pink-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <div>
            <span class="text-lg md:text-xl font-black font-display text-purple-950 tracking-tight block group-hover:text-pink-600 transition-colors">
              دفترچه و مداد
            </span>
            <span class="text-[10px] font-bold text-pink-600 block -mt-1">
              فروشگاه لوازم تحریر صورتی و بنفش
            </span>
          </div>
        </a>

        <!-- Search Input Bar -->
        <div class="hidden lg:flex flex-1 max-w-md mx-4 relative">
          <input
            type="text"
            [ngModel]="searchQuery"
            (ngModelChange)="onSearchChange($event)"
            placeholder="جستجوی دفتر ۱۰۰ برگ، مداد رنگی، هایلایتر پاستیلی..."
            class="w-full bg-pink-50/60 border-2 border-pink-200 focus:border-purple-500 rounded-2xl py-2 pr-10 pl-4 text-xs focus:outline-none focus:bg-white transition-all shadow-inner"
          />
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-pink-500 absolute right-3.5 top-3 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2">
          <!-- Order Tracker Button -->
          <button
            (click)="openTracker.emit()"
            class="hidden sm:flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-2xl text-xs font-bold transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1a1 1 0 011 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1v5z" />
            </svg>
            <span>پیگیری سفارش</span>
          </button>

          <!-- AI Assistant Button Mobile -->
          <button
            (click)="openAiModal.emit()"
            class="flex md:hidden items-center gap-1 bg-yellow-300 hover:bg-yellow-400 text-purple-950 px-2.5 py-2 rounded-2xl text-xs font-black"
          >
            <span>✨ دستیار AI</span>
          </button>

          <!-- Shopping Cart Button -->
          <button
            (click)="openCart.emit()"
            class="relative bg-gradient-to-r from-pink-500 to-purple-600 hover:brightness-110 text-white p-2.5 sm:px-4 sm:py-2 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span class="hidden sm:inline">سبد خرید</span>
            @if (cartCount > 0) {
              <span class="bg-yellow-300 text-purple-950 font-black text-[11px] px-2 py-0.5 rounded-full shadow-sm">
                {{ cartCount }}
              </span>
            }
          </button>

          <!-- Mobile Menu Toggle -->
          <button
            (click)="toggleMobileMenu()"
            class="lg:hidden p-2 text-slate-600 hover:text-purple-900 rounded-xl bg-slate-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Categories & Submenus Bar (Desktop) -->
      <nav class="hidden lg:block bg-slate-50 border-t border-pink-100 shadow-inner">
        <div class="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div class="flex items-center gap-1">
            <button
              (click)="selectCategory.emit({ catId: null, subId: null })"
              [class]="!activeCategoryId ? 'bg-pink-600 text-white font-black' : 'text-slate-700 hover:bg-pink-100/60 font-bold'"
              class="px-3.5 py-2.5 rounded-t-xl text-xs flex items-center gap-1.5 transition-colors"
            >
              <span>همه محصولات</span>
            </button>

            @for (menu of menus; track menu.id) {
              <div class="relative group">
                <button
                  (click)="selectCategory.emit({ catId: menu.categoryId, subId: null })"
                  [class]="activeCategoryId === menu.categoryId ? 'bg-purple-600 text-white font-black' : 'text-slate-700 hover:bg-pink-100/60 font-bold'"
                  class="px-3.5 py-2.5 rounded-t-xl text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>{{ menu.label }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <!-- Submenu Dropdown -->
                @if (menu.submenus && menu.submenus.length > 0) {
                  <div class="absolute right-0 top-full hidden group-hover:block w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-2 border-pink-200 p-2 z-50 animate-fadeIn">
                    <div class="text-[10px] font-bold text-pink-600 px-3 py-1 border-b border-pink-100 mb-1">
                      {{ menu.label }}
                    </div>
                    @for (sub of menu.submenus; track sub.id) {
                      <button
                        (click)="selectCategory.emit({ catId: menu.categoryId, subId: sub.subcategoryId })"
                        class="w-full text-right px-3 py-2 text-xs font-medium text-slate-700 hover:bg-pink-50 hover:text-purple-900 rounded-xl flex items-center justify-between transition-colors"
                      >
                        <span>{{ sub.label }}</span>
                        @if (sub.badge) {
                          <span class="bg-pink-100 text-pink-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-pink-200">
                            {{ sub.badge }}
                          </span>
                        }
                      </button>
                    }
                  </div>
                }
              </div>
            }
          </div>

          <div class="text-xs text-purple-900 font-bold flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>ارسال پستی سراسری | ۷ روز ضمانت بازگشت</span>
          </div>
        </div>
      </nav>

      <!-- Mobile Search & Menu Drawer -->
      @if (mobileMenuOpen()) {
        <div class="lg:hidden bg-white border-t border-pink-200 p-4 space-y-4 animate-fadeIn">
          <!-- Mobile Search -->
          <div class="relative">
            <input
              type="text"
              [ngModel]="searchQuery"
              (ngModelChange)="onSearchChange($event)"
              placeholder="جستجو در محصولات تحریر..."
              class="w-full bg-pink-50 border border-pink-200 rounded-xl py-2 pr-9 pl-3 text-xs"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-pink-500 absolute right-3 top-2.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <!-- Mobile Menus Accordion -->
          <div class="space-y-1 max-h-80 overflow-y-auto">
            <button
              (click)="selectCategory.emit({ catId: null, subId: null }); toggleMobileMenu()"
              class="w-full text-right p-2.5 text-xs font-bold rounded-xl bg-pink-50 text-pink-700"
            >
              همه محصولات
            </button>
            @for (m of menus; track m.id) {
              <div class="border-b border-pink-100 pb-1">
                <button
                  (click)="selectCategory.emit({ catId: m.categoryId, subId: null }); toggleMobileMenu()"
                  class="w-full text-right p-2.5 text-xs font-bold text-slate-800 flex justify-between items-center"
                >
                  <span>{{ m.label }}</span>
                </button>
                @if (m.submenus) {
                  <div class="pr-4 space-y-1">
                    @for (sub of m.submenus; track sub.id) {
                      <button
                        (click)="selectCategory.emit({ catId: m.categoryId, subId: sub.subcategoryId }); toggleMobileMenu()"
                        class="w-full text-right py-1.5 px-2 text-[11px] text-gray-600 hover:text-pink-600"
                      >
                        • {{ sub.label }}
                      </button>
                    }
                  </div>
                }
              </div>
            }
          </div>
        </div>
      }
    </header>
  `
})
export class NavbarComponent {
  @Input() menus: MenuItem[] = [];
  @Input() cartCount: number = 0;
  @Input() activeCategoryId: string | null = null;
  @Input() activeSubcategoryId: string | null = null;
  @Input() searchQuery: string = '';

  @Output() selectCategory = new EventEmitter<{ catId: string | null; subId: string | null }>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() openCart = new EventEmitter<void>();
  @Output() openTracker = new EventEmitter<void>();
  @Output() openAiModal = new EventEmitter<void>();

  mobileMenuOpen = signal<boolean>(false);

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  onSearchChange(val: string) {
    this.searchChange.emit(val);
  }
}
