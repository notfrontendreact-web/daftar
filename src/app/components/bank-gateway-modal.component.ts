import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order } from '../../types';

@Component({
  selector: 'app-bank-gateway-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (isOpen && order) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn dir-rtl">
        <div class="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-blue-600 overflow-hidden my-4">
          
          <!-- Bank Gateway Header -->
          <div class="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-4 sm:p-5 flex items-center justify-between shadow-lg">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-yellow-300 border border-white/20">
                🏛️
              </div>
              <div>
                <h2 class="font-extrabold text-sm sm:text-base font-display flex items-center gap-2">
                  <span>درگاه پرداخت اینترنتی شاپرک</span>
                  <span class="bg-blue-600 text-[10px] px-2 py-0.5 rounded-full border border-blue-400">شتاب</span>
                </h2>
                <p class="text-[11px] text-blue-200">
                  پرداخت امن متصل به شبکه شتاب بانک مرکزی
                </p>
              </div>
            </div>

            <button (click)="onClose.emit()" class="text-blue-300 hover:text-white font-bold">✕</button>
          </div>

          <!-- Merchant Info Banner -->
          <div class="bg-slate-50 border-b border-slate-200 p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div>
              <span class="text-gray-400 block text-[10px]">پذیرنده:</span>
              <strong class="text-slate-800 text-[11px]">فروشگاه صورتی و بنفش</strong>
            </div>
            <div>
              <span class="text-gray-400 block text-[10px]">ترمینال:</span>
              <strong class="text-slate-800 font-mono text-[11px]">8492019</strong>
            </div>
            <div>
              <span class="text-gray-400 block text-[10px]">کد پیگیری:</span>
              <strong class="text-slate-800 font-mono text-[11px]">{{ order.trackingCode }}</strong>
            </div>
            <div>
              <span class="text-gray-400 block text-[10px]">مبلغ قابل پرداخت:</span>
              <strong class="text-pink-600 font-black text-sm font-display">
                {{ order.finalPrice.toLocaleString('fa-IR') }} تومان
              </strong>
            </div>
          </div>

          <!-- Main Form Body -->
          <div class="p-5 sm:p-6 space-y-4">
            @if (paymentDone()) {
              <div class="text-center space-y-4 py-4 animate-fadeIn">
                <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner border-2 border-green-300 text-2xl font-bold">
                  ✓
                </div>
                <div>
                  <h3 class="text-xl font-black text-slate-900 font-display">تراکنش با موفقیت انجام شد!</h3>
                  <p class="text-xs text-gray-500 mt-1">پرداخت سفارش شما در شاپرک تایید گردید.</p>
                </div>

                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-right space-y-2 text-xs max-w-md mx-auto">
                  <div class="flex justify-between border-b border-slate-200 pb-2">
                    <span class="text-gray-500">شماره ارجاع (Ref):</span>
                    <strong class="font-mono text-blue-700 text-sm">{{ refCode() }}</strong>
                  </div>
                  <div class="flex justify-between border-b border-slate-200 pb-2">
                    <span class="text-gray-500">کد پیگیری پستی:</span>
                    <strong class="font-mono text-purple-900">{{ order.trackingCode }}</strong>
                  </div>
                </div>

                <button
                  (click)="onClose.emit()"
                  class="bg-blue-600 text-white font-bold text-xs px-8 py-3 rounded-2xl shadow-xl hover:bg-blue-700"
                >
                  بازگشت به فروشگاه صورتی و بنفش
                </button>
              </div>
            } @else {
              <form (ngSubmit)="handlePay()" class="space-y-4">
                @if (errorMsg()) {
                  <div class="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-bold">
                    {{ errorMsg() }}
                  </div>
                }

                <div>
                  <label class="text-xs font-bold text-slate-700 block mb-1">شماره کارت ۱۶ رقمی شتاب:</label>
                  <input
                    type="text"
                    required
                    maxLength="19"
                    [(ngModel)]="cardNumber"
                    name="cardNumber"
                    placeholder="۶۰۳۷ - ۹۹۷۵ - ۱۲۳۴ - ۵۶۷۸"
                    class="w-full bg-slate-50 border-2 border-slate-300 rounded-2xl px-4 py-3 text-sm font-mono dir-ltr text-center font-bold focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="text-xs font-bold text-slate-700 block mb-1">کد CVV2 کارت:</label>
                    <input
                      type="password"
                      required
                      maxLength="4"
                      [(ngModel)]="cvv2"
                      name="cvv2"
                      placeholder="۳ یا ۴ رقم"
                      class="w-full bg-slate-50 border-2 border-slate-300 rounded-2xl px-3 py-2.5 text-xs font-mono text-center"
                    />
                  </div>

                  <div>
                    <label class="text-xs font-bold text-slate-700 block mb-1">رمز دوم پویا:</label>
                    <div class="flex gap-2">
                      <input
                        type="password"
                        required
                        [(ngModel)]="secondPassword"
                        name="secondPassword"
                        placeholder="رمز پیامک"
                        class="flex-1 bg-slate-50 border-2 border-slate-300 rounded-2xl px-2 py-2.5 text-xs font-mono text-center"
                      />
                      <button
                        type="button"
                        (click)="requestOtp()"
                        class="bg-blue-100 text-blue-900 font-bold text-[11px] px-3 py-2 rounded-xl"
                      >
                        درخواست رمز
                      </button>
                    </div>
                  </div>
                </div>

                <div class="flex gap-3 pt-2">
                  <button
                    type="submit"
                    [disabled]="processing()"
                    class="flex-1 py-3.5 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-xl hover:brightness-110"
                  >
                    {{ processing() ? 'در حال تایید شتاب...' : 'پرداخت نهایی و صدور فاکتور' }}
                  </button>
                  <button
                    type="button"
                    (click)="onClose.emit()"
                    class="px-5 py-3.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-2xl"
                  >
                    انصراف
                  </button>
                </div>
              </form>
            }
          </div>
        </div>
      </div>
    }
  `
})
export class BankGatewayModalComponent {
  @Input() isOpen: boolean = false;
  @Input() order: Order | null = null;
  @Output() onClose = new EventEmitter<void>();

  cardNumber: string = '';
  cvv2: string = '';
  secondPassword: string = '';

  processing = signal<boolean>(false);
  paymentDone = signal<boolean>(false);
  refCode = signal<string>('');
  errorMsg = signal<string>('');

  requestOtp() {
    this.secondPassword = Math.floor(100000 + Math.random() * 900000).toString();
  }

  handlePay() {
    if (!this.cardNumber || this.cardNumber.length < 16) {
      this.errorMsg.set('شماره کارت ۱۶ رقمی را وارد نمایید.');
      return;
    }
    if (!this.cvv2) {
      this.errorMsg.set('کد CVV2 الزامی است.');
      return;
    }
    if (!this.secondPassword) {
      this.errorMsg.set('رمز دوم پویا الزامی است.');
      return;
    }

    this.processing.set(true);
    setTimeout(() => {
      this.processing.set(false);
      this.refCode.set('REF-' + Math.floor(10000000 + Math.random() * 90000000));
      this.paymentDone.set(true);
    }, 1500);
  }
}
