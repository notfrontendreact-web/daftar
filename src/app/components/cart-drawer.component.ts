import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../types';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (isOpen) {
      <div class="fixed inset-0 z-50 overflow-hidden dir-rtl">
        <div (click)="onClose.emit()" class="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"></div>

        <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div class="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l-2 border-pink-200">
            
            <!-- Header -->
            <div class="p-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-between shadow-md">
              <div class="flex items-center gap-2">
                <span class="font-black text-base font-display">سبد خرید شما</span>
                <span class="bg-yellow-300 text-purple-950 text-[11px] font-black px-2 py-0.5 rounded-full">
                  {{ cartItems.length }} کالا
                </span>
              </div>

              <button (click)="onClose.emit()" class="p-1 hover:bg-white/20 rounded-full text-white">
                ✕
              </button>
            </div>

            <!-- Cart Items List -->
            <div class="flex-1 overflow-y-auto p-4 space-y-3">
              @if (cartItems.length === 0) {
                <div class="text-center py-16 text-gray-400 space-y-3">
                  <span class="text-4xl block">🛍️</span>
                  <p class="text-xs font-bold">سبد خرید شما خالی است!</p>
                  <p class="text-[11px] text-gray-400">محصولات صورتی بنفش مورد علاقه خود را اضافه کنید.</p>
                </div>
              } @else {
                @for (item of cartItems; track $index) {
                  <div class="bg-pink-50/40 p-3 rounded-2xl border border-pink-100 flex gap-3 items-center">
                    <img [src]="item.product.image" [alt]="item.product.title" class="w-16 h-16 rounded-xl object-cover border border-pink-200" />
                    <div class="flex-1">
                      <h4 class="text-xs font-bold text-slate-800 line-clamp-1">{{ item.product.title }}</h4>
                      @if (item.selectedColor) {
                        <span class="text-[10px] text-pink-600 block">رنگ: {{ item.selectedColor }}</span>
                      }
                      <div class="text-xs font-black text-purple-900 font-display mt-1">
                        {{ (item.product.discountPrice || item.product.price).toLocaleString('fa-IR') }} تومان
                      </div>
                    </div>

                    <!-- Quantity Control -->
                    <div class="flex items-center gap-1.5 bg-white px-2 py-1 rounded-xl border border-pink-200 shadow-xs">
                      <button (click)="updateQuantity.emit({ index: $index, qty: item.quantity + 1 })" class="text-xs font-bold text-pink-600">+</button>
                      <span class="text-xs font-bold px-1">{{ item.quantity }}</span>
                      <button (click)="updateQuantity.emit({ index: $index, qty: item.quantity - 1 })" class="text-xs font-bold text-gray-500">-</button>
                    </div>

                    <button (click)="removeItem.emit($index)" class="text-red-400 hover:text-red-600 text-xs p-1">
                      🗑️
                    </button>
                  </div>
                }
              }
            </div>

            <!-- Footer & Checkout -->
            @if (cartItems.length > 0) {
              <div class="p-4 bg-slate-50 border-t border-pink-100 space-y-3">
                <!-- Coupon Input -->
                <div class="flex gap-2">
                  <input
                    type="text"
                    [(ngModel)]="couponInput"
                    placeholder="کد تخفیف (مثلا PINK10)"
                    class="flex-1 bg-white border border-pink-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-pink-500"
                  />
                  <button
                    (click)="applyCoupon()"
                    class="bg-purple-600 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-purple-700"
                  >
                    اعمال
                  </button>
                </div>

                <!-- Totals Breakdown -->
                <div class="space-y-1 text-xs text-slate-600">
                  <div class="flex justify-between">
                    <span>جمع کل:</span>
                    <span>{{ total.toLocaleString('fa-IR') }} تومان</span>
                  </div>
                  @if (discountAmount > 0) {
                    <div class="flex justify-between text-pink-600 font-bold">
                      <span>سود شما از تخفیف:</span>
                      <span>{{ discountAmount.toLocaleString('fa-IR') }}- تومان</span>
                    </div>
                  }
                  <div class="flex justify-between font-black text-sm text-purple-950 pt-2 border-t border-slate-200">
                    <span>مبلغ قابل پرداخت:</span>
                    <span class="text-pink-600 font-display">{{ finalTotal.toLocaleString('fa-IR') }} تومان</span>
                  </div>
                </div>

                <button
                  (click)="onCheckout.emit()"
                  class="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:brightness-110 text-white font-extrabold text-xs rounded-2xl shadow-lg transition-all"
                >
                  ادامه و تکمیل فرآیند خرید
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    }
  `
})
export class CartDrawerComponent {
  @Input() isOpen: boolean = false;
  @Input() cartItems: CartItem[] = [];
  @Input() discountAmount: number = 0;

  @Output() onClose = new EventEmitter<void>();
  @Output() removeItem = new EventEmitter<number>();
  @Output() updateQuantity = new EventEmitter<{ index: number; qty: number }>();
  @Output() applyCouponCode = new EventEmitter<string>();
  @Output() onCheckout = new EventEmitter<void>();

  couponInput: string = '';

  get total(): number {
    return this.cartItems.reduce((acc, item) => acc + ((item.product.discountPrice || item.product.price) * item.quantity), 0);
  }

  get finalTotal(): number {
    return Math.max(0, this.total - this.discountAmount);
  }

  applyCoupon() {
    if (this.couponInput.trim()) {
      this.applyCouponCode.emit(this.couponInput.trim());
    }
  }
}
