import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StationeryService } from './services/stationery.service';
import { MenuItem, Category, Product, CartItem, Order } from '../types';
import { NavbarComponent } from './components/navbar.component';
import { ProductCardComponent } from './components/product-card.component';
import { ProductDetailModalComponent } from './components/product-detail-modal.component';
import { CartDrawerComponent } from './components/cart-drawer.component';
import { CheckoutModalComponent } from './components/checkout-modal.component';
import { BankGatewayModalComponent } from './components/bank-gateway-modal.component';
import { OrderTrackerModalComponent } from './components/order-tracker-modal.component';
import { AiAssistantModalComponent } from './components/ai-assistant-modal.component';
import { StationeryBackgroundComponent } from './components/stationery-background.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    ProductCardComponent,
    ProductDetailModalComponent,
    CartDrawerComponent,
    CheckoutModalComponent,
    BankGatewayModalComponent,
    OrderTrackerModalComponent,
    AiAssistantModalComponent,
    StationeryBackgroundComponent,
  ],
  template: `
    <div class="min-h-screen relative flex flex-col font-vazir text-slate-800 bg-[#fcf8fc] dir-rtl">
      <!-- Animated Background Canvas -->
      <app-stationery-background />

      <!-- Top Toast Message -->
      @if (toastMessage()) {
        <div class="fixed bottom-5 right-5 z-50 bg-purple-950 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border-2 border-pink-400 flex items-center gap-2 animate-bounce">
          <span>🌸</span>
          <span>{{ toastMessage() }}</span>
        </div>
      }

      <!-- Header & Navbar -->
      <app-navbar
        [menus]="menus()"
        [cartCount]="cartCount"
        [activeCategoryId]="activeCategoryId()"
        [activeSubcategoryId]="activeSubcategoryId()"
        [searchQuery]="searchQuery()"
        (selectCategory)="onSelectCategory($event)"
        (searchChange)="onSearchChange($event)"
        (openCart)="cartOpen.set(true)"
        (openTracker)="trackerOpen.set(true)"
        (openAiModal)="aiModalOpen.set(true)"
      />

      <!-- Hero Header Banner -->
      <div class="max-w-7xl mx-auto px-4 pt-6 w-full">
        <div class="relative bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden">
          <div class="relative z-10 max-w-xl space-y-3">
            <span class="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-yellow-300">
              جدیدترین کلکسیون ۱۴۰۵
            </span>
            <h1 class="text-2xl sm:text-4xl font-black font-display tracking-tight leading-tight">
              دنیای فانتزی لوازم تحریر صورتی و بنفش
            </h1>
            <p class="text-xs sm:text-sm text-pink-100 leading-relaxed font-medium">
              انواع دفترچه‌های ۱۰۰ برگ، کلاسورهای جلد سخت، مداد رنگی‌های حرفه‌ای، هایلایترهای پاستیلی معطر و ست‌های هدیه با تضمین اصالت کالا
            </p>
            <div class="flex flex-wrap gap-2 pt-2">
              <button
                (click)="aiModalOpen.set(true)"
                class="bg-yellow-300 hover:bg-yellow-400 text-purple-950 px-5 py-2.5 rounded-2xl font-black text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
              >
                <span>✨ مشاوره خرید با هوش مصنوعی</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content & Catalog -->
      <main class="max-w-7xl mx-auto px-4 mt-6 flex-1 w-full pb-16">
        <!-- Filter & Heading Bar -->
        <div class="bg-white/95 backdrop-blur-md rounded-3xl p-5 border-2 border-dashed border-pink-300 shadow-md mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="bg-pink-100 text-pink-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-pink-300">
                {{ activeMenuLabel() }}
              </span>
              <span class="bg-purple-100 text-purple-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-purple-300">
                ۲۵ محصول اختصاصی این منو
              </span>
            </div>
            
            <h2 class="text-lg md:text-xl font-black font-display text-purple-950 mt-1">
              {{ headingTitle() }}
            </h2>
            <p class="text-xs text-gray-500 mt-0.5">
              نمایش {{ products().length }} محصول با کیفیت عالی و دور کادر نقطه‌چین ممتد
            </p>
          </div>

          <!-- Sorting Controls -->
          <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span class="text-xs font-bold text-slate-600 whitespace-nowrap">مرتب‌سازی:</span>
            <select
              [ngModel]="sortBy()"
              (ngModelChange)="onSortChange($event)"
              class="bg-pink-50 border border-pink-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-pink-500"
            >
              <option value="newest">جدیدترین‌ها</option>
              <option value="price-low">ارزان‌ترین</option>
              <option value="price-high">گران‌ترین</option>
              <option value="rating">محبوب‌ترین (امتیاز)</option>
            </select>
          </div>
        </div>

        <!-- Loading Skeleton -->
        @if (loading()) {
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            @for (i of [1,2,3,4,5,6,7,8,9,10]; track i) {
              <div class="h-80 bg-pink-100/50 rounded-3xl animate-pulse border-2 border-dashed border-pink-300"></div>
            }
          </div>
        } @else if (products().length === 0) {
          <div class="text-center py-16 bg-white/80 rounded-3xl border-2 border-dashed border-pink-300 p-8 space-y-3">
            <span class="text-4xl block">✏️</span>
            <h3 class="font-bold text-slate-700 text-base">محصولی در این بخش یافت نشد!</h3>
            <button
              (click)="onSelectCategory({ catId: null, subId: null })"
              class="bg-purple-600 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md"
            >
              مشاهده همه ۲۵ محصول منو
            </button>
          </div>
        } @else {
          <!-- Products Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            @for (product of products(); track product.id) {
              <app-product-card
                [product]="product"
                (onSelect)="selectedProduct.set($event)"
                (addToCart)="addToCart($event)"
              />
            }
          </div>
        }
      </main>

      <!-- Footer -->
      <footer class="bg-slate-900 text-slate-300 py-10 border-t-4 border-pink-500 mt-auto dir-rtl">
        <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="font-black text-white text-base font-display mb-2">فروشگاه لوازم تحریر صورتی و بنفش</h3>
            <p class="text-xs text-slate-400 leading-relaxed">
              مرکز تخصصی عرضه انواع نوشت‌افزار فانتزی، دفترچه‌های یادداشت، کلاسورهای جلد سخت و لوازم طراحی پاستیلی با بهترین کیفیت و ارسال به تمام نقاط ایران.
            </p>
          </div>

          <div>
            <h4 class="font-bold text-white text-xs mb-3">دسترسی سریع</h4>
            <ul class="text-xs space-y-2 text-slate-400">
              <li>• دفتر و کاغذ</li>
              <li>• نوشت‌افزار و هایلایتر</li>
              <li>• لوازم طراحی و هنری</li>
              <li>• پکیج‌های کادویی و هدیه</li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-white text-xs mb-3">پشتیبانی و تماس</h4>
            <div class="text-xs space-y-2 text-slate-400">
              <p>📍 آدرس: تهران، خیابان انقلاب، مجتمع تحریر، واحد ۳۰۴</p>
              <p>📞 تلفن پشتیبانی: ۰۲۱-۸۸۹۹۰۰۱۱</p>
              <p>⏰ ساعات کاری: شنبه تا پنجشنبه ۹ تا ۲۰</p>
            </div>
          </div>
        </div>
      </footer>

      <!-- Modals & Drawers -->
      <app-product-detail-modal
        [product]="selectedProduct()"
        (onClose)="selectedProduct.set(null)"
        (addToCart)="addToCartWithColor($event)"
      />

      <app-cart-drawer
        [isOpen]="cartOpen()"
        [cartItems]="cartItems()"
        [discountAmount]="discountAmount()"
        (onClose)="cartOpen.set(false)"
        (removeItem)="removeItem($event)"
        (updateQuantity)="updateQuantity($event)"
        (applyCouponCode)="applyCoupon($event)"
        (onCheckout)="openCheckout()"
      />

      <app-checkout-modal
        [isOpen]="checkoutOpen()"
        [cartItems]="cartItems()"
        [discountAmount]="discountAmount()"
        (onClose)="checkoutOpen.set(false)"
        (onSubmitOrder)="handleOrderSubmit($event)"
      />

      <app-bank-gateway-modal
        [isOpen]="bankGatewayOpen()"
        [order]="bankOrder()"
        (onClose)="bankGatewayOpen.set(false)"
      />

      <app-order-tracker-modal
        [isOpen]="trackerOpen()"
        (onClose)="trackerOpen.set(false)"
      />

      <app-ai-assistant-modal
        [isOpen]="aiModalOpen()"
        (onClose)="aiModalOpen.set(false)"
        (selectProduct)="selectedProduct.set($event)"
      />
    </div>
  `
})
export class AppComponent implements OnInit {
  menus = signal<MenuItem[]>([]);
  categories = signal<Category[]>([]);
  products = signal<Product[]>([]);

  activeCategoryId = signal<string | null>(null);
  activeSubcategoryId = signal<string | null>(null);
  searchQuery = signal<string>('');
  sortBy = signal<string>('newest');

  selectedProduct = signal<Product | null>(null);
  cartOpen = signal<boolean>(false);
  checkoutOpen = signal<boolean>(false);
  bankGatewayOpen = signal<boolean>(false);
  bankOrder = signal<Order | null>(null);
  trackerOpen = signal<boolean>(false);
  aiModalOpen = signal<boolean>(false);

  loading = signal<boolean>(false);
  toastMessage = signal<string>('');

  constructor(private stationeryService: StationeryService) {}

  ngOnInit() {
    this.loadMenus();
    this.loadProducts();
  }

  get cartItems() {
    return this.stationeryService.cartItems;
  }

  get discountAmount() {
    return this.stationeryService.appliedDiscountAmount;
  }

  get cartCount(): number {
    return this.cartItems().reduce((acc, item) => acc + item.quantity, 0);
  }

  loadMenus() {
    this.stationeryService.getMenus().subscribe(res => {
      this.menus.set(res.mainMenus);
    });
    this.stationeryService.getCategories().subscribe(cats => {
      this.categories.set(cats);
    });
  }

  loadProducts() {
    this.loading.set(true);
    this.stationeryService.getProducts({
      category: this.activeCategoryId() || undefined,
      subcategory: this.activeSubcategoryId() || undefined,
      search: this.searchQuery() || undefined,
      sort: this.sortBy(),
    }).subscribe(prods => {
      this.loading.set(false);
      this.products.set(prods);
    });
  }

  onSelectCategory(evt: { catId: string | null; subId: string | null }) {
    this.activeCategoryId.set(evt.catId);
    this.activeSubcategoryId.set(evt.subId);
    this.loadProducts();
  }

  onSearchChange(q: string) {
    this.searchQuery.set(q);
    this.loadProducts();
  }

  onSortChange(s: string) {
    this.sortBy.set(s);
    this.loadProducts();
  }

  addToCart(product: Product) {
    this.stationeryService.addToCart(product);
    this.showToast(`«${product.title}» به سبد خرید اضافه شد.`);
  }

  addToCartWithColor(evt: { product: Product; color?: string }) {
    this.stationeryService.addToCart(evt.product, evt.color);
    this.showToast(`«${evt.product.title}» به سبد اضافه شد.`);
  }

  removeItem(idx: number) {
    this.stationeryService.removeFromCart(idx);
  }

  updateQuantity(evt: { index: number; qty: number }) {
    this.stationeryService.updateQuantity(evt.index, evt.qty);
  }

  applyCoupon(code: string) {
    const total = this.stationeryService.getCartTotal();
    this.stationeryService.validateCoupon(code, total).subscribe(res => {
      if (res.valid && res.discountAmount) {
        this.stationeryService.appliedDiscountAmount.set(res.discountAmount);
        this.showToast(res.message);
      } else {
        this.showToast(res.message);
      }
    });
  }

  openCheckout() {
    this.cartOpen.set(false);
    this.checkoutOpen.set(true);
  }

  handleOrderSubmit(orderData: any) {
    this.stationeryService.createOrder(orderData).subscribe(res => {
      if (res.success && res.order) {
        this.checkoutOpen.set(false);
        this.stationeryService.clearCart();
        if (orderData.paymentMethod === 'درگاه آنلاین') {
          this.bankOrder.set(res.order);
          this.bankGatewayOpen.set(true);
        } else {
          this.showToast(`سفارش شما با کد پیگیری ${res.order.trackingCode} ثبت گردید!`);
        }
      }
    });
  }

  showToast(msg: string) {
    this.toastMessage.set(msg);
    setTimeout(() => {
      this.toastMessage.set('');
    }, 3500);
  }

  activeMenuLabel(): string {
    if (!this.activeCategoryId()) return 'صفحه اصلی و کاتالوگ جامع';
    const found = this.menus().find(m => m.categoryId === this.activeCategoryId());
    return found ? found.label : 'محصولات منو';
  }

  headingTitle(): string {
    if (this.searchQuery()) return `نتایج جستجو برای "${this.searchQuery()}"`;
    if (this.activeCategoryId()) {
      const found = this.menus().find(m => m.categoryId === this.activeCategoryId());
      return found ? `صفحه اختصاصی: ${found.label}` : 'محصولات انتخاب شده';
    }
    return 'جدیدترین و محبوب‌ترین لوازم تحریر صورتی و بنفش';
  }
}
