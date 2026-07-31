import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order } from '../../types';
import { StationeryService } from '../services/stationery.service';

@Component({
  selector: 'app-order-tracker-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (isOpen) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fadeIn dir-rtl">
        <div class="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-pink-300 overflow-hidden my-8 p-6">
          
          <div class="flex justify-between items-center border-b border-pink-100 pb-3 mb-4">
            <h2 class="text-base font-black font-display text-purple-950 flex items-center gap-2">
              <span>🚚 پیگیری لحظه‌ای مرسوله پستی</span>
            </h2>
            <button (click)="onClose.emit()" class="text-gray-400 hover:text-gray-600">✕</button>
          </div>

          <form (ngSubmit)="track()" class="space-y-3 mb-4">
            <label class="text-xs font-bold text-slate-700 block">کد پیگیری سفارش خود را وارد کنید:</label>
            <div class="flex gap-2">
              <input
                type="text"
                required
                [(ngModel)]="trackingCodeInput"
                name="trackingCodeInput"
                placeholder="مثلا TRK-482910"
                class="flex-1 bg-pink-50/50 border border-pink-200 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-pink-500"
              />
              <button
                type="submit"
                class="bg-purple-600 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-purple-700"
              >
                استعلام
              </button>
            </div>
          </form>

          @if (error()) {
            <div class="p-3 bg-red-50 text-red-600 text-xs rounded-xl font-bold mb-3">
              {{ error() }}
            </div>
          }

          @if (trackedOrder()) {
            <div class="bg-pink-50/40 p-4 rounded-2xl border border-pink-200 space-y-2 text-xs">
              <div class="flex justify-between font-bold">
                <span>تحویل گیرنده:</span>
                <span>{{ trackedOrder()?.customerName }}</span>
              </div>
              <div class="flex justify-between font-bold">
                <span>وضعیت مرسوله:</span>
                <span class="text-emerald-600 font-black">{{ trackedOrder()?.status }}</span>
              </div>
              <div class="flex justify-between font-bold">
                <span>مبلغ نهایی:</span>
                <span>{{ trackedOrder()?.finalPrice?.toLocaleString('fa-IR') }} تومان</span>
              </div>
              <div class="flex justify-between font-bold">
                <span>تاریخ ثبت:</span>
                <span>{{ trackedOrder()?.createdAt }}</span>
              </div>
            </div>
          }
        </div>
      </div>
    }
  `
})
export class OrderTrackerModalComponent {
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  trackingCodeInput: string = '';
  trackedOrder = signal<Order | null>(null);
  error = signal<string>('');

  constructor(private stationeryService: StationeryService) {}

  track() {
    if (!this.trackingCodeInput.trim()) return;
    this.error.set('');
    this.stationeryService.trackOrder(this.trackingCodeInput.trim()).subscribe((order) => {
      if (order) {
        this.trackedOrder.set(order);
      } else {
        this.trackedOrder.set(null);
        this.error.set('سفارشی با این کد پیگیری پیدا نشد.');
      }
    });
  }
}
