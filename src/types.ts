export interface SubCategory {
  id: string;
  name: string;
  count?: number;
  description?: string;
  icon?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: SubCategory[];
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  categoryId?: string;
  subcategoryId?: string;
  submenus?: {
    id: string;
    label: string;
    subcategoryId: string;
    badge?: string;
  }[];
}

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  categoryId: string;
  subcategoryId: string;
  price: number; // in Tomans
  discountPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  additionalImages: string[];
  isNew?: boolean;
  isPopular?: boolean;
  tag?: string;
  brand: string;
  colorOptions?: string[];
  paperType?: string; // e.g. "خط دار", "شطرنجی", "نقطه ای", "ساده"
  inStock: boolean;
  stockQuantity: number;
  description: string;
  features: string[];
  reviews?: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Order {
  id: string;
  trackingCode: string;
  customerName: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  cartItems: CartItem[];
  totalPrice: number;
  discountAmount: number;
  finalPrice: number;
  status: 'در حال پردازش' | 'تایید شده' | 'در حال ارسال' | 'تحویل داده شده';
  createdAt: string;
  paymentMethod: 'درگاه آنلاین' | 'پرداخت در محل';
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  maxDiscount: number;
  isActive: boolean;
}

export interface AiRecommendationRequest {
  usage: string; // e.g., "مدرسه", "دانشگاه", "طراحی و نقاشی", "هدیه فانتزی"
  budget: number;
  favoriteColor?: string;
  notes?: string;
}

export interface AiRecommendationResponse {
  recommendationText: string;
  suggestedProductIds: string[];
  studyTip?: string;
}
