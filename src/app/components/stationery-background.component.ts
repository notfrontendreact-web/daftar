import { Component } from '@angular/core';

@Component({
  selector: 'app-stationery-background',
  standalone: true,
  template: `
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-notebook-paper">
      <!-- Glow Orbs -->
      <div class="absolute top-10 right-10 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div class="absolute bottom-20 left-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-100 rounded-full blur-3xl opacity-40"></div>

      <!-- Moving Marquee Banner Strip (Left-to-Right Image Animation) -->
      <div class="absolute top-36 inset-x-0 overflow-hidden opacity-15 pointer-events-none">
        <div class="animate-marquee-ltr flex items-center gap-6 whitespace-nowrap">
          @for (img of marqueeImages; track $index) {
            <div class="flex items-center gap-4 bg-white/60 p-2 rounded-2xl shadow-sm border border-pink-300/50 shrink-0">
              <img [src]="img" alt="تصویر لوازم تحریر" class="w-20 h-20 object-cover rounded-xl" referrerpolicy="no-referrer" />
              <div class="text-xs font-black text-purple-900 pr-2">
                ✏️ دفترچه و مداد صورتی بنفش
              </div>
            </div>
          }
          @for (img of marqueeImages; track $index) {
            <div class="flex items-center gap-4 bg-white/60 p-2 rounded-2xl shadow-sm border border-pink-300/50 shrink-0">
              <img [src]="img" alt="تصویر لوازم تحریر" class="w-20 h-20 object-cover rounded-xl" referrerpolicy="no-referrer" />
              <div class="text-xs font-black text-purple-900 pr-2">
                🌸 کلکسیون جدید ۱۴۰۵
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class StationeryBackgroundComponent {
  marqueeImages = [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1585336261026-61e778f29280?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80',
  ];
}
