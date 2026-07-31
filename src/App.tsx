import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BannerSlider } from './components/BannerSlider';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { BankGatewayModal } from './components/BankGatewayModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { StationeryBackground } from './components/StationeryBackground';
import { Footer } from './components/Footer';
import { Product, CartItem, MenuItem, Order } from './types';
import { MAIN_MENUS, MOCK_PRODUCTS } from './data/mockData';
import { Sparkles, SlidersHorizontal, BookOpen, PenTool, Check, ArrowUp, Layers } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [menus, setMenus] = useState<MenuItem[]>(MAIN_MENUS);
  const [loading, setLoading] = useState(false);

  // Active Filter State
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeSubcategoryId, setActiveSubcategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  // Shopping Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Modal States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [appliedDiscountAmount, setAppliedDiscountAmount] = useState(0);

  // Bank Payment Gateway Modal
  const [bankGatewayOpen, setBankGatewayOpen] = useState(false);
  const [bankOrder, setBankOrder] = useState<Order | null>(null);

  const [trackerOpen, setTrackerOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Fetch Products from Express Backend
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (activeCategoryId) params.append('category', activeCategoryId);
        if (activeSubcategoryId) params.append('subcategory', activeSubcategoryId);
        if (searchQuery) params.append('search', searchQuery);
        if (sortBy) params.append('sort', sortBy);

        const res = await fetch(`/api/products?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          setProducts(MOCK_PRODUCTS);
        }
      } catch (err) {
        console.warn('Using local products fallback:', err);
        setProducts(MOCK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategoryId, activeSubcategoryId, searchQuery, sortBy]);

  // Handle Category & Subcategory Select
  const handleSelectCategory = (catId: string | null, subId: string | null) => {
    setActiveCategoryId(catId);
    setActiveSubcategoryId(subId);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  // Add to Cart
  const handleAddToCart = (product: Product, selectedColor?: string, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedColor: selectedColor || product.colorOptions?.[0] || 'اصلی',
        },
      ];
    });

    showToast(`🌸 ${product.title} به سبد خرید اضافه شد!`);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove Item from Cart
  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Active Menu Label
  const activeMenuObj = menus.find((m) => m.categoryId === activeCategoryId);

  return (
    <div className="min-h-screen relative flex flex-col font-vazir text-slate-800 bg-[#fcf8fc]">
      {/* Stationery Notebook & Pencil Floating Canvas Background */}
      <StationeryBackground />

      {/* Navigation Header with 6 Main Menus + 8 Submenus Integrated */}
      <Navbar
        menus={menus}
        activeCategoryId={activeCategoryId}
        activeSubcategoryId={activeSubcategoryId}
        onSelectCategory={handleSelectCategory}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenAiModal={() => setAiModalOpen(true)}
        onOpenTrackerModal={() => setTrackerOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-purple-900 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-2xl border border-pink-300 flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-green-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="flex-1 relative z-10 pb-12">
        {/* Banner Showcase with Left-to-Right Animated Image Slider & Marquee */}
        {!activeCategoryId && !activeSubcategoryId && !searchQuery && (
          <BannerSlider
            onSelectSubcategory={(subId) => handleSelectCategory(null, subId)}
            onOpenAiModal={() => setAiModalOpen(true)}
          />
        )}

        {/* Main Products Section */}
        <div className="max-w-7xl mx-auto px-4 mt-6">
          {/* Section Heading & Sorting Bar */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border-2 border-dashed border-pink-300 shadow-md mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-pink-100 text-pink-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-pink-300">
                  {activeMenuObj ? activeMenuObj.label : 'صفحه اختصاصی محصولات'}
                </span>
                <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-purple-300 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-purple-600" />
                  <span>۲۵ محصول اختصاصی این منو</span>
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-black font-display text-purple-950 flex items-center gap-2 mt-1">
                <BookOpen className="w-6 h-6 text-pink-500" />
                <span>
                  {activeSubcategoryId
                    ? 'محصولات زیرمنوی انتخابی'
                    : activeCategoryId
                    ? `صفحه اختصاصی: ${activeMenuObj?.label || 'محصولات منو'}`
                    : searchQuery
                    ? `نتایج جستجو برای "${searchQuery}"`
                    : 'صفحه اصلی و کاتالوگ جامع لوازم تحریر'}
                </span>
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                نمایش دقیق {products.length} محصول اختصاصی در این صفحه همراه با دور کادر نقطه‌چین ممتد
              </p>
            </div>

            {/* Sorting Controls */}
            <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
              <SlidersHorizontal className="w-4 h-4 text-pink-500" />
              <span className="font-bold text-slate-700">مرتب‌سازی:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-pink-50 border border-pink-200 rounded-xl px-3 py-1.5 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="popular">محبوب‌ترین‌ها</option>
                <option value="price-low">ارزان‌ترین</option>
                <option value="price-high">گران‌ترین</option>
                <option value="rating">بالاترین امتیاز</option>
              </select>

              {(activeCategoryId || activeSubcategoryId || searchQuery) && (
                <button
                  onClick={() => {
                    setActiveCategoryId(null);
                    setActiveSubcategoryId(null);
                    setSearchQuery('');
                  }}
                  className="bg-pink-100 text-pink-700 text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-pink-200"
                >
                  بازگشت به همه
                </button>
              )}
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-80 bg-pink-100/50 rounded-3xl animate-pulse border-2 border-dashed border-pink-300"
                ></div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-white/80 rounded-3xl border-2 border-dashed border-pink-300 p-8 space-y-3">
              <PenTool className="w-12 h-12 text-pink-400 mx-auto" />
              <h3 className="font-bold text-slate-700 text-base">محصولی در این بخش یافت نشد!</h3>
              <p className="text-xs text-gray-500">
                لطفاً عبارت دیگری را جستجو کنید یا فیلتر دسته‌بندی را تغییر دهید.
              </p>
              <button
                onClick={() => {
                  setActiveCategoryId(null);
                  setActiveSubcategoryId(null);
                  setSearchQuery('');
                }}
                className="bg-purple-600 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md hover:bg-purple-700"
              >
                مشاهده همه ۲۵ محصول منو
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Floating AI Assistant Trigger Button at Bottom-Right */}
      <button
        onClick={() => setAiModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold text-xs p-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 border-2 border-white"
        title="مشاور هوشمند خرید لوازم تحریر"
      >
        <Sparkles className="w-5 h-5 text-yellow-300 animate-spin-slow" />
        <span className="hidden md:inline font-display text-sm">مشاور هوشمند AI</span>
      </button>

      {/* Footer */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* Modals */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={(discount) => {
          setAppliedDiscountAmount(discount);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cartItems}
        appliedDiscountAmount={appliedDiscountAmount}
        onOrderSuccess={(order) => {
          setCartItems([]);
          setAppliedDiscountAmount(0);
        }}
        onProceedToBankGateway={(order) => {
          setCheckoutOpen(false);
          setBankOrder(order);
          setBankGatewayOpen(true);
        }}
      />

      {/* Shaparak Bank Gateway Payment Modal */}
      <BankGatewayModal
        isOpen={bankGatewayOpen}
        order={bankOrder}
        onClose={() => setBankGatewayOpen(false)}
        onPaymentSuccess={(orderId, refCode) => {
          showToast(`💳 پرداخت درگاه بانکی با موفقیت ثبت شد! شماره ارجاع: ${refCode}`);
        }}
      />

      <OrderTrackerModal
        isOpen={trackerOpen}
        onClose={() => setTrackerOpen(false)}
      />

      <AiAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        onAddToCart={(p) => handleAddToCart(p)}
      />
    </div>
  );
}

