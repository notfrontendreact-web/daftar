import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../types';

@Component({
  selector: 'app-product-detail-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (product) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fadeIn dir-rtl">
        <div class="relative w-full max-w-3xl bg-white/95 rounded-3xl shadow-2xl border-2 border-pink-300 overflow-hidden my-8 max-h-[90vh] flex flex-col md:flex-row">
          
          <!-- Close Button -->
          <button
            (click)="onClose.emit()"
            class="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold transition-colors"
          >
            ✕
          </button>

          <!-- Product Image & Gallery -->
          <div class="md:w-1/2 p-6 bg-pink-50/50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-l border-pink-100">
            <div class="relative w-full aspect-square rounded-2xl overflow-hidden shadow-inner bg-white mb-4">
              <img
                [src]="selectedImg()"
                [alt]="product.title"
                class="w-full h-full object-cover"
              />
            </div>

            @if (product.additionalImages && product.additionalImages.length > 0) {
              <div class="flex gap-2">
                @for (img of [product.image, ...product.additionalImages]; track img) {
                  <button
                    (click)="selectedImg.set(img)"
                    [class]="selectedImg() === img ? 'ring-2 ring-pink-500 scale-105' : 'opacity-70'"
                    class="w-12 h-12 rounded-xl overflow-hidden border border-pink-200 transition-all"
                  >
                    <img [src]="img" class="w-full h-full object-cover" />
                  </button>
                }
              </div>
            }
          </div>

          <!-- Product Details -->
          <div class="md:w-1/2 p-6 flex flex-col justify-between space-y-4 overflow-y-auto">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="bg-pink-100 text-pink-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-pink-200">
                  {{ product.category }}
                </span>
                <span class="text-xs text-gray-500">برند: {{ product.brand }}</span>
              </div>

              <h2 class="text-lg font-black text-slate-900 font-display mb-2">
                {{ product.title }}
              </h2>

              <div class="flex items-center gap-2 text-xs mb-3">
                <span class="text-amber-400 font-bold">★ {{ product.rating }}</span>
                <span class="text-gray-400">({{ product.reviewsCount }} دیدگاه خریداران)</span>
              </div>

              <p class="text-xs text-slate-600 leading-relaxed mb-4">
                {{ product.description }}
              </p>

              <!-- Features List -->
              @if (product.features) {
                <div class="bg-pink-50/60 p-3 rounded-2xl border border-pink-100 mb-4">
                  <span class="text-xs font-bold text-purple-900 block mb-2">ویژگی‌های برجسته:</span>
                  <ul class="text-[11px] text-slate-700 space-y-1">
                    @for (feat of product.features; track feat) {
                      <li class="flex items-center gap-1.5">
                        <span class="text-pink-500">✓</span>
                        <span>{{ feat }}</span>
                      </li>
                    }
                  </ul>
                </div>
              }

              <!-- Color Selection -->
              @if (product.colorOptions && product.colorOptions.length > 0) {
                <div class="mb-4">
                  <span class="text-xs font-bold text-slate-700 block mb-2">انتخاب رنگ:</span>
                  <div class="flex gap-2">
                    @for (color of product.colorOptions; track color) {
                      <button
                        (click)="selectedColor.set(color)"
                        [class]="selectedColor() === color ? 'bg-purple-600 text-white font-bold' : 'bg-slate-100 text-slate-700'"
                        class="px-3 py-1.5 text-xs rounded-xl border border-slate-200 transition-colors"
                      >
                        {{ color }}
                      </button>
                    }
                  </div>
                </div>
              }
            </div>

            <!-- Price & Add to Cart CTA -->
            <div class="pt-4 border-t border-pink-100 flex items-center justify-between">
              <div>
                @if (product.discountPrice) {
                  <span class="text-xs text-gray-400 line-through block">
                    {{ product.price.toLocaleString('fa-IR') }}
                  </span>
                  <div class="text-lg font-black text-pink-600 font-display">
                    {{ product.discountPrice.toLocaleString('fa-IR') }}
                    <span class="text-xs font-normal text-slate-600">تومان</span>
                  </div>
                } @else {
                  <div class="text-lg font-black text-purple-950 font-display">
                    {{ product.price.toLocaleString('fa-IR') }}
                    <span class="text-xs font-normal text-slate-600">تومان</span>
                  </div>
                }
              </div>

              <button
                (click)="onAdd()"
                class="bg-gradient-to-r from-pink-500 to-purple-600 hover:brightness-110 text-white font-bold text-xs px-6 py-3 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center gap-2"
              >
                <span>افزودن به سبد خرید</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class ProductDetailModalComponent {
  @Input() product: Product | null = null;
  @Output() onClose = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<{ product: Product; color?: string }>();

  selectedImg = signal<string>('');
  selectedColor = signal<string>('صورتی پاستیلی');

  ngOnChanges() {
    if (this.product) {
      this.selectedImg.set(this.product.image);
      if (this.product.colorOptions && this.product.colorOptions.length > 0) {
        this.selectedColor.set(this.product.colorOptions[0]);
      }
    }
  }

  onAdd() {
    if (this.product) {
      this.addToCart.emit({ product: this.product, color: this.selectedColor() });
      this.onClose.emit();
    }
  }
}
