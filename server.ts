import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { MOCK_PRODUCTS, MAIN_MENUS, CATEGORIES, MOCK_COUPONS } from './src/data/mockData';
import { Order, Product } from './src/types';

// In-memory order storage
const ordersStore: Order[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client on the server side
  const ai = process.env.GEMINI_API_KEY
    ? new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      })
    : null;

  // --- REST API ENDPOINTS ---

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', storeName: 'فروشگاه لوازم تحریر بنفش و صورتی' });
  });

  // Get Menus
  app.get('/api/menus', (req: Request, res: Response) => {
    res.json({
      mainMenus: MAIN_MENUS,
      submenusCount: 8,
      mainMenusCount: 6,
    });
  });

  // Get Categories
  app.get('/api/categories', (req: Request, res: Response) => {
    res.json(CATEGORIES);
  });

  // Get Products with filtering & search
  app.get('/api/products', (req: Request, res: Response) => {
    const { category, subcategory, search, tag, sort } = req.query;

    let filtered = [...MOCK_PRODUCTS];

    if (category && typeof category === 'string') {
      filtered = filtered.filter(
        (p) => p.categoryId === category || p.category.includes(category)
      );
    }

    if (subcategory && typeof subcategory === 'string') {
      filtered = filtered.filter((p) => p.subcategoryId === subcategory);
    }

    if (tag && typeof tag === 'string') {
      filtered = filtered.filter((p) => p.tag === tag || p.isPopular || p.isNew);
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sort === 'price-low') {
      filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sort === 'price-high') {
      filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'popular') {
      filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }

    res.json(filtered);
  });

  // Get single product details
  app.get('/api/products/:id', (req: Request, res: Response) => {
    const product = MOCK_PRODUCTS.find((p) => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'محصول یافت نشد' });
    }
    res.json(product);
  });

  // Validate coupon
  app.post('/api/coupon/validate', (req: Request, res: Response) => {
    const { code, totalPrice } = req.body;
    const coupon = MOCK_COUPONS.find(
      (c) => c.code.toUpperCase() === (code || '').toUpperCase().trim() && c.isActive
    );

    if (!coupon) {
      return res.status(400).json({ valid: false, message: 'کد تخفیف نامعتبر است' });
    }

    const calculatedDiscount = Math.round((totalPrice * coupon.discountPercentage) / 100);
    const finalDiscount = Math.min(calculatedDiscount, coupon.maxDiscount);

    res.json({
      valid: true,
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
      discountAmount: finalDiscount,
      message: `کد تخفیف ${coupon.discountPercentage}٪ با موفقیت اعمال شد`,
    });
  });

  // Create order
  app.post('/api/orders', (req: Request, res: Response) => {
    const { customerName, phone, province, city, address, postalCode, cartItems, totalPrice, discountAmount, paymentMethod } = req.body;

    if (!customerName || !phone || !address || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'لطفاً تمام اطلاعات ضروری فرم سفارش را وارد کنید.' });
    }

    const trackingCode = 'TRK-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      id: 'ORD-' + Date.now(),
      trackingCode,
      customerName,
      phone,
      province: province || 'تهران',
      city: city || 'تهران',
      address,
      postalCode: postalCode || '۱۲۳۴۵۶۷۸۹۰',
      cartItems,
      totalPrice,
      discountAmount: discountAmount || 0,
      finalPrice: Math.max(0, totalPrice - (discountAmount || 0)),
      status: 'تایید شده',
      createdAt: new Date().toLocaleDateString('fa-IR'),
      paymentMethod: paymentMethod || 'درگاه آنلاین',
    };

    ordersStore.unshift(newOrder);

    res.json({
      success: true,
      message: 'سفارش شما با موفقیت ثبت شد!',
      order: newOrder,
    });
  });

  // Track order
  app.get('/api/orders/track/:code', (req: Request, res: Response) => {
    const code = req.params.code.trim().toUpperCase();
    const order = ordersStore.find((o) => o.trackingCode.toUpperCase() === code);

    if (!order) {
      return res.status(404).json({ error: 'سفارشی با این کد پیگیری پیدا نشد.' });
    }

    res.json(order);
  });

  // AI Assistant for Stationery Recommendations (Gemini Server-Side)
  app.post('/api/ai/recommend', async (req: Request, res: Response) => {
    try {
      const { usage, budget, favoriteColor, notes } = req.body;

      if (!ai) {
        // Fallback response if process.env.GEMINI_API_KEY is not configured
        const filtered = MOCK_PRODUCTS.slice(0, 3);
        return res.json({
          recommendationText: `پیشنهاد هوشمند برای کاربرد ${usage || 'عمومی'}: پکیج پیشنهادی ما شامل دفتر کلاسوری جلد سخت صورتی-بنفش، ست هایلایتر ۶ رنگ پاستیلی و روان‌نویس‌های ژله‌ای فانتزی است که تطابق عالی با بودجه شما دارد.`,
          suggestedProducts: filtered,
          studyTip: 'نکته مطالعه: استفاده از هایلایترهای پاستیلی با کدگذاری رنگی، سرعت یادگیری و یادآوری نکات کلیدی را تا ۴۰٪ افزایش می‌دهد!',
        });
      }

      const productsContext = MOCK_PRODUCTS.map(
        (p) => `- ID: ${p.id} | عنوان: ${p.title} | قیمت: ${p.price} تومان | دسته‌بندی: ${p.category} | ویژگی: ${p.tag}`
      ).join('\n');

      const prompt = `شما مشاور ارشد و مهربان فروشگاه لوازم تحریر فانتزی "صورتی و بنفش" هستید.
اطلاعات درخواست خریدار:
- کاربرد: ${usage || 'عمومی/مدرسه/دانشگاه/طراحی'}
- بودجه تقریبی: ${budget ? budget + ' تومان' : 'مشخص نشده'}
- رنگ علاقه مندی: ${favoriteColor || 'صورتی و بنفش'}
- نکات اضافی خریدار: ${notes || 'ندارد'}

لیست کاتالوگ محصولات موجود در فروشگاه:
${productsContext}

لطفاً به زبان فارسی صمیمی، محترمانه و جذاب، یک پاسخ کوتاه شامل موارد زیر آماده کنید:
1. راهنمایی و پیشنهاد ویژه برای این خریدار
2. شناسه ID محصولات پیشنهادی (حداکثر 3 شناسه ID مثل prod-1, prod-2)
3. یک نکته تحصیلی/مطالعه یا نگهداری لوازم تحریر مرتبط.

پاسخ را دقیقاً به فرمت JSON زیر برگردانید:
{
  "recommendationText": "متن راهنمایی صمیمی",
  "suggestedProductIds": ["prod-1", "prod-2"],
  "studyTip": "نکته تحصیلی کوتاه"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text || '';
      const parsed = JSON.parse(text);

      const suggestedProducts = MOCK_PRODUCTS.filter((p) =>
        (parsed.suggestedProductIds || []).includes(p.id)
      );

      res.json({
        recommendationText: parsed.recommendationText || 'پیشنهاد اختصاصی لوازم تحریر برای شما آماده گردید.',
        suggestedProducts: suggestedProducts.length > 0 ? suggestedProducts : MOCK_PRODUCTS.slice(0, 3),
        studyTip: parsed.studyTip || 'استفاده از دفترهای خط دار و پاستیلی، حس شادابی را موقع مطالعه دوچندان می‌کند.',
      });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      res.json({
        recommendationText: 'پیشنهاد ویژه پکیج صورتی بنفش: دفتر کلاسوری جلد سخت + ست هایلایتر ۶ رنگ پاستیلی بهترین انتخاب برای شماست.',
        suggestedProducts: MOCK_PRODUCTS.slice(0, 3),
        studyTip: 'مطالعه منظم با دفترهای فانتزی تمرکز شما را افزایش می‌دهد.',
      });
    }
  });

  // --- VITE MIDDLEWARE SETUP ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌸 Express Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
