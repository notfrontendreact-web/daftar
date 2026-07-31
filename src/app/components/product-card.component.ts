import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../types';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      (click)="onSelect.emit(product)"
      class="group relative bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden border-2 border-dashed border-pink-300 hover:border-purple-600 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      <!-- Image Container -->
      <div class="relative aspect-square overflow-hidden bg-pink-50/50">
        <img
          [src]="product.image"
          [alt]="product.title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <!-- Badges -->
        <div class="absolute top-2 right-2 flex flex-col gap-1 z-10">
          @if (product.discountPrice) {
            <span class="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
              حراج {{ calculateDiscountPercent() }}٪
            </span>
          }
          @if (product.tag) {
            <span class="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
              {{ product.tag }}
            </span>
          }
        </div>

        <!-- Rating -->
        <div class="absolute bottom-2 left-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-700 flex items-center gap-1 shadow-sm">
          <span class="text-amber-400">★</span>
          <span>{{ product.rating }}</span>
          <span class="text-gray-400">({{ product.reviewsCount }})</span>
        </div>
      </div>

      <!-- Content -->
      <div class="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div class="text-[10px] text-pink-600 font-bold mb-1 flex items-center justify-between">
            <span>{{ product.category }}</span>
            <span class="text-gray-400 font-normal">{{ product.brand }}</span>
          </div>

          <h3 class="font-bold text-xs sm:text-sm text-slate-800 line-clamp-2 leading-relaxed group-hover:text-purple-900 transition-colors">
            {{ product.title }}
          </h3>

          @if (product.paperType) {
            <p class="text-[10px] text-gray-500 mt-1">
              ویژگی: {{ product.paperType }}
            </p>
          }
        </div>

        <!-- Price & Action -->
        <div class="pt-2 border-t border-pink-100 flex items-end justify-between">
          <div>
            @if (product.discountPrice) {
              <span class="text-[10px] text-gray-400 line-through block font-mono">
                {{ product.price.toLocaleString('fa-IR') }}
              </span>
              <div class="font-black text-sm text-pink-600 font-display">
                {{ product.discountPrice.toLocaleString('fa-IR') }}
                <span class="text-[10px] font-normal text-slate-600 mr-0.5">تومان</span>
              </div>
            } @else {
              <div class="font-black text-sm text-purple-950 font-display">
                {{ product.price.toLocaleString('fa-IR') }}
                <span class="text-[10px] font-normal text-slate-600 mr-0.5">تومان</span>
              </div>
            }
          </div>

          <button
            (click)="onAddToCart($event)"
            class="bg-pink-100 hover:bg-pink-600 text-pink-700 hover:text-white p-2 rounded-2xl transition-all shadow-sm active:scale-90 flex items-center justify-center"
            title="افزودن به سبد خرید"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() onSelect = new EventEmitter<Product>();
  @Output() addToCart = new EventEmitter<Product>();

  calculateDiscountPercent(): number {
    if (!this.product.discountPrice) return 0;
    return Math.round(((this.product.price - this.product.discountPrice) / this.product.price) * 100);
  }

  onAddToCart(event: Event) {
    event.stopPropagation();
    this.addToCart.emit(this.product);
  }
}
