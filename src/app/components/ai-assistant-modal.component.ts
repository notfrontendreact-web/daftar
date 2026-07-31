import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../types';
import { StationeryService } from '../services/stationery.service';

@Component({
  selector: 'app-ai-assistant-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (isOpen) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fadeIn dir-rtl">
        <div class="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-pink-300 overflow-hidden my-8 p-6">
          
          <!-- Header -->
          <div class="flex justify-between items-center border-b border-pink-100 pb-3 mb-4">
            <div class="flex items-center gap-2">
              <span class="text-xl">✨</span>
              <h2 class="text-base font-black font-display text-purple-950">
                دستیار هوشمند انتخاب لوازم تحریر (Gemini AI)
              </h2>
            </div>
            <button (click)="onClose.emit()" class="text-gray-400 hover:text-gray-600">✕</button>
          </div>

          <!-- Form -->
          <form (ngSubmit)="getRecommendation()" class="space-y-3 mb-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">مورد استفاده:</label>
                <select [(ngModel)]="req.usage" name="usage" class="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2 text-xs">
                  <option value="مدرسه و دانش‌آموزی">مدرسه و دانش‌آموزی</option>
                  <option value="دانشگاهی و خلاصه‌نویسی">دانشگاهی و خلاصه‌نویسی</option>
                  <option value="طراحی، نقاشی و بولت ژورنال">طراحی، نقاشی و بولت ژورنال</option>
                  <option value="پک هدیه و کادویی">پک هدیه و کادویی</option>
                </select>
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">بودجه تقریبی:</label>
                <input
                  type="text"
                  [(ngModel)]="req.budget"
                  name="budget"
                  placeholder="مثلا ۳۰۰ هزار تومان"
                  class="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2 text-xs"
                />
              </div>
            </div>

            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">توضیحات و سلیقه شخصی:</label>
              <textarea
                rows="2"
                [(ngModel)]="req.notes"
                name="notes"
                placeholder="مثلا دفترهای ۱۰۰ برگ صورتی با جلد سخت و روان‌نویس‌های پاستیلی..."
                class="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2 text-xs"
              ></textarea>
            </div>

            <button
              type="submit"
              [disabled]="loading()"
              class="w-full py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-extrabold text-xs rounded-xl shadow-md hover:brightness-110"
            >
              {{ loading() ? 'در حال تحلیل با هوش مصنوعی Gemini...' : 'دریافت پیشنهاد هوشمند اختصاصی' }}
            </button>
          </form>

          <!-- Result Card -->
          @if (result()) {
            <div class="bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-2xl border border-pink-200 space-y-3 animate-fadeIn">
              <p class="text-xs text-slate-800 leading-relaxed font-bold">
                {{ result()?.recommendationText }}
              </p>

              @if (result()?.studyTip) {
                <div class="bg-yellow-100/70 p-2.5 rounded-xl border border-yellow-300 text-[11px] text-purple-950 font-bold">
                  💡 {{ result()?.studyTip }}
                </div>
              }

              @if (result()?.suggestedProducts && result()?.suggestedProducts?.length > 0) {
                <div>
                  <span class="text-xs font-bold text-purple-900 block mb-2">محصولات کلیدی پیشنهادی:</span>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    @for (prod of result()?.suggestedProducts; track prod.id) {
                      <div (click)="selectProduct.emit(prod)" class="bg-white p-2 rounded-xl border border-pink-200 cursor-pointer hover:border-purple-600 flex items-center gap-2">
                        <img [src]="prod.image" [alt]="prod.title" class="w-10 h-10 rounded-lg object-cover" />
                        <div class="overflow-hidden">
                          <h4 class="text-[11px] font-bold text-slate-800 truncate">{{ prod.title }}</h4>
                          <span class="text-[10px] text-pink-600 font-bold">{{ prod.price.toLocaleString('fa-IR') }} تومان</span>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          }
        </div>
      </div>
    }
  `
})
export class AiAssistantModalComponent {
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() selectProduct = new EventEmitter<Product>();

  req = {
    usage: 'دانشگاهی و خلاصه‌نویسی',
    budget: '۲۵۰,۰۰۰ تومان',
    favoriteColor: 'صورتی و بنفش',
    notes: '',
  };

  loading = signal<boolean>(false);
  result = signal<any>(null);

  constructor(private stationeryService: StationeryService) {}

  getRecommendation() {
    this.loading.set(true);
    this.stationeryService.getAiRecommendation(this.req).subscribe((res) => {
      this.loading.set(false);
      this.result.set(res);
    });
  }
}
