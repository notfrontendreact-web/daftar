import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product, MenuItem, Category, CartItem, Order } from '../../types';
import { MOCK_PRODUCTS, MAIN_MENUS, CATEGORIES } from '../../data/mockData';

@Injectable({
  providedIn: 'root',
})
export class StationeryService {
  // Signals for state management
  cartItems = signal<CartItem[]>([]);
  appliedDiscountAmount = signal<number>(0);
  activeCouponCode = signal<string>('');

  constructor(private http: HttpClient) {}

  getMenus(): Observable<{ mainMenus: MenuItem[] }> {
    return this.http.get<{ mainMenus: MenuItem[] }>('/api/menus').pipe(
      catchError(() => of({ mainMenus: MAIN_MENUS }))
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/categories').pipe(
      catchError(() => of(CATEGORIES))
    );
  }

  getProducts(params?: { category?: string; subcategory?: string; search?: string; tag?: string; sort?: string }): Observable<Product[]> {
    let queryParams: any = {};
    if (params?.category) queryParams.category = params.category;
    if (params?.subcategory) queryParams.subcategory = params.subcategory;
    if (params?.search) queryParams.search = params.search;
    if (params?.tag) queryParams.tag = params.tag;
    if (params?.sort) queryParams.sort = params.sort;

    return this.http.get<Product[]>('/api/products', { params: queryParams }).pipe(
      catchError(() => {
        let filtered = [...MOCK_PRODUCTS];
        if (params?.category) {
          filtered = filtered.filter(p => p.categoryId === params.category || p.category.includes(params.category!));
        }
        if (params?.subcategory) {
          filtered = filtered.filter(p => p.subcategoryId === params.subcategory);
        }
        if (params?.tag) {
          filtered = filtered.filter(p => p.tag === params.tag || p.isPopular || p.isNew);
        }
        if (params?.search) {
          const q = params.search.toLowerCase().trim();
          filtered = filtered.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
        }
        if (params?.sort === 'price-low') {
          filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        } else if (params?.sort === 'price-high') {
          filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        } else if (params?.sort === 'rating') {
          filtered.sort((a, b) => b.rating - a.rating);
        }
        return of(filtered);
      })
    );
  }

  getProductById(id: string): Observable<Product | null> {
    return this.http.get<Product>(`/api/products/${id}`).pipe(
      catchError(() => of(MOCK_PRODUCTS.find(p => p.id === id) || null))
    );
  }

  validateCoupon(code: string, totalPrice: number): Observable<{ valid: boolean; discountAmount?: number; message: string }> {
    return this.http.post<{ valid: boolean; discountAmount?: number; message: string }>('/api/coupon/validate', { code, totalPrice }).pipe(
      catchError(() => {
        if (code.toUpperCase() === 'PINK10') {
          const discount = Math.min(Math.round(totalPrice * 0.1), 50000);
          return of({ valid: true, discountAmount: discount, message: 'کد تخفیف ۱۰٪ اعمال شد' });
        }
        if (code.toUpperCase() === 'PURPLE20') {
          const discount = Math.min(Math.round(totalPrice * 0.2), 100000);
          return of({ valid: true, discountAmount: discount, message: 'کد تخفیف ۲۰٪ اعمال شد' });
        }
        return of({ valid: false, message: 'کد تخفیف نامعتبر است' });
      })
    );
  }

  createOrder(orderData: any): Observable<{ success: boolean; message: string; order?: Order }> {
    return this.http.post<{ success: boolean; message: string; order?: Order }>('/api/orders', orderData).pipe(
      catchError(() => {
        const trackingCode = 'TRK-' + Math.floor(100000 + Math.random() * 900000);
        const order: Order = {
          id: 'ORD-' + Date.now(),
          trackingCode,
          customerName: orderData.customerName,
          phone: orderData.phone,
          province: orderData.province || 'تهران',
          city: orderData.city || 'تهران',
          address: orderData.address,
          postalCode: orderData.postalCode || '۱۲۳۴۵۶۷۸۹۰',
          cartItems: orderData.cartItems,
          totalPrice: orderData.totalPrice,
          discountAmount: orderData.discountAmount || 0,
          finalPrice: Math.max(0, orderData.totalPrice - (orderData.discountAmount || 0)),
          status: 'تایید شده',
          createdAt: new Date().toLocaleDateString('fa-IR'),
          paymentMethod: orderData.paymentMethod || 'درگاه آنلاین',
        };
        return of({ success: true, message: 'سفارش شما ثبت شد', order });
      })
    );
  }

  trackOrder(trackingCode: string): Observable<Order | null> {
    return this.http.get<Order>(`/api/orders/track/${trackingCode}`).pipe(
      catchError(() => of(null))
    );
  }

  getAiRecommendation(req: { usage: string; budget: string; favoriteColor: string; notes: string }): Observable<any> {
    return this.http.post<any>('/api/ai/recommend', req).pipe(
      catchError(() => of({
        recommendationText: 'پکیج پیشنهادی هوشمند صورتی-بنفش: دفتر کلاسوری جلد سخت، هایلایتر پاستیلی و ست روان‌نویس ژله‌ای.',
        suggestedProducts: MOCK_PRODUCTS.slice(0, 3),
        studyTip: 'استفاده از رنگ‌های پاستیلی در خلاصه‌نویسی تمرکز را دوچندان می‌کند.'
      }))
    );
  }

  // Cart operations
  addToCart(product: Product, selectedColor?: string) {
    const current = this.cartItems();
    const existingIndex = current.findIndex(item => item.product.id === product.id && item.selectedColor === selectedColor);
    
    if (existingIndex > -1) {
      const updated = [...current];
      updated[existingIndex].quantity += 1;
      this.cartItems.set(updated);
    } else {
      this.cartItems.set([...current, { product, quantity: 1, selectedColor }]);
    }
  }

  removeFromCart(index: number) {
    const current = [...this.cartItems()];
    current.splice(index, 1);
    this.cartItems.set(current);
  }

  updateQuantity(index: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(index);
      return;
    }
    const current = [...this.cartItems()];
    current[index].quantity = quantity;
    this.cartItems.set(current);
  }

  clearCart() {
    this.cartItems.set([]);
    this.appliedDiscountAmount.set(0);
    this.activeCouponCode.set('');
  }

  getCartTotal(): number {
    return this.cartItems().reduce((acc, item) => {
      const price = item.product.discountPrice || item.product.price;
      return acc + (price * item.quantity);
    }, 0);
  }
}
