import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem, Order } from '../../types';

@Component({
  selector: 'app-checkout-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (isOpen) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fadeIn dir-rtl">
        <div class="relative w-full max-w-2xl bg-white/95 rounded-3xl shadow-2xl border-2 border-pink-300 overflow-hidden my-8 p-6">
          
          <div class="flex justify-between items-center border-b border-pink-100 pb-4 mb-4">
            <h2 class="text-lg font-black font-display text-purple-950">تکمیل اطلاعات ارسال سفارش</h2>
            <button (click)="onClose.emit()" class="text-gray-400 hover:text-gray-600">✕</button>
          </div>

          <form (ngSubmit)="submitOrder()" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">نام و نام خانوادگی تحویل گیرنده:</label>
                <input
                  type="text"
                  required
                  [(ngModel)]="formData.customerName"
                  name="customerName"
                  placeholder="مثلا سارا علوی"
                  class="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">شماره تماس (همراه):</label>
                <input
                  type="tel"
                  required
                  [(ngModel)]="formData.phone"
                  name="phone"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  class="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">استان:</label>
                <input
                  type="text"
                  [(ngModel)]="formData.province"
                  name="province"
                  placeholder="تهران"
                  class="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">شهر:</label>
                <input
                  type="text"
                  [(ngModel)]="formData.city"
                  name="city"
                  placeholder="تهران"
                  class="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>

            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">نشانی دقیق پستی:</label>
              <textarea
                required
                rows="2"
                [(ngModel)]="formData.address"
                name="address"
                placeholder="خیابان، پلاک، واحد..."
                class="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-pink-500"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">کد پستی ۱۰ رقمی:</label>
                <input
                  type="text"
                  [(ngModel)]="formData.postalCode"
                  name="postalCode"
                  placeholder="۱۲۳۴۵۶۷۸۹۰"
                  class="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">روش پرداخت:</label>
                <select
                  [(ngModel)]="formData.paymentMethod"
                  name="paymentMethod"
                  class="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-pink-500"
                >
                  <option value="درگاه آنلاین">پرداخت آنلاین (شاپرک - تمام کارت‌ها)</option>
                  <option value="پرداخت در محل">پرداخت در محل (ویژه شهر تهران)</option>
                </select>
              </div>
            </div>

            <div class="pt-4 border-t border-pink-100 flex items-center justify-between">
              <div class="text-xs">
                <span class="text-gray-500">مبلغ کل پرداختی:</span>
                <span class="font-black text-pink-600 font-display text-sm mr-1">
                  {{ finalTotal.toLocaleString('fa-IR') }} تومان
                </span>
              </div>

              <button
                type="submit"
                class="bg-gradient-to-r from-pink-500 to-purple-600 hover:brightness-110 text-white font-extrabold text-xs px-6 py-3 rounded-2xl shadow-lg transition-all"
              >
                تایید و اتصال به درگاه پرداخت
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `
})
export class CheckoutModalComponent {
  @Input() isOpen: boolean = false;
  @Input() cartItems: CartItem[] = [];
  @Input() discountAmount: number = 0;

  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmitOrder = new EventEmitter<any>();

  formData = {
    customerName: '',
    phone: '',
    province: 'تهران',
    city: 'تهران',
    address: '',
    postalCode: '',
    paymentMethod: 'درگاه آنلاین',
  };

  get total(): number {
    return this.cartItems.reduce((acc, item) => acc + ((item.product.discountPrice || item.product.price) * item.quantity), 0);
  }

  get finalTotal(): number {
    return Math.max(0, this.total - this.discountAmount);
  }

  submitOrder() {
    this.onSubmitOrder.emit({
      ...this.formData,
      cartItems: this.cartItems,
      totalPrice: this.total,
      discountAmount: this.discountAmount,
    });
  }
}
