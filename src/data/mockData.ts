import { Category, MenuItem, Product, Coupon } from '../types';

// ALL 6 MAIN MENUS NOW HAVE INTEGRATED SUBMENUS & DEDICATED CATEGORIES
export const MAIN_MENUS: MenuItem[] = [
  {
    id: 'menu-home',
    label: 'صفحه اصلی و منتخب‌ها',
    icon: 'Home',
    categoryId: 'cat-home',
    submenus: [
      { id: 'sub-home-1', label: 'پرفروش‌ترین‌های تحریر', subcategoryId: 'sub-home-bestsellers', badge: 'داغ' },
      { id: 'sub-home-2', label: 'تخفیف‌های ویژه صورتی', subcategoryId: 'sub-home-discounts', badge: 'تخفیف' },
      { id: 'sub-home-3', label: 'جدیدترین محصولات فانتزی', subcategoryId: 'sub-home-new', badge: 'جدید' },
      { id: 'sub-home-4', label: 'پک‌های پیشنهادی طلایی', subcategoryId: 'sub-home-golden' },
    ],
  },
  {
    id: 'menu-notebooks',
    label: 'دفتر و کاغذ',
    icon: 'BookOpen',
    categoryId: 'cat-notebooks',
    submenus: [
      { id: 'sub-nb-1', label: 'دفترچه یادداشت و کلاسور', subcategoryId: 'sub-notebooks-binders', badge: 'محبوب' },
      { id: 'sub-nb-2', label: 'دفتر بولت ژورنال و برنامه‌ریزی', subcategoryId: 'sub-notebooks-bullet' },
      { id: 'sub-nb-3', label: 'دفتر نقاشی و اسکچ‌بوک', subcategoryId: 'sub-notebooks-sketch' },
      { id: 'sub-nb-4', label: 'کاغذ A4 و برگه‌های خط‌دار', subcategoryId: 'sub-a4-paper' },
    ],
  },
  {
    id: 'menu-writing',
    label: 'نوشت‌افزار',
    icon: 'PenTool',
    categoryId: 'cat-writing',
    submenus: [
      { id: 'sub-wr-1', label: 'مداد رنگی و اتود حرفه‌ای', subcategoryId: 'sub-pencils-etudes', badge: 'فروش ویژه' },
      { id: 'sub-wr-2', label: 'روان‌نویس و خودکار فانتزی', subcategoryId: 'sub-gel-pens' },
      { id: 'sub-wr-3', label: 'ماژیک و هایلایتر پاستیلی', subcategoryId: 'sub-highlighters', badge: 'جدید' },
      { id: 'sub-wr-4', label: 'خودنویس و جوهر خوشنویسی', subcategoryId: 'sub-fountain-pens' },
    ],
  },
  {
    id: 'menu-art',
    label: 'لوازم طراحی و هنری',
    icon: 'Palette',
    categoryId: 'cat-art',
    submenus: [
      { id: 'sub-art-1', label: 'آبرنگ، گواش و مداد شمعی', subcategoryId: 'sub-watercolors' },
      { id: 'sub-art-2', label: 'پاستل گچی و زغال طراحی', subcategoryId: 'sub-pastels' },
      { id: 'sub-art-3', label: 'تراش، پاک‌کن و خط‌کش ژله‌ای', subcategoryId: 'sub-tools', badge: 'محبوب' },
      { id: 'sub-art-4', label: 'بوم نقاشی و قلم‌مو', subcategoryId: 'sub-canvases' },
    ],
  },
  {
    id: 'menu-gifts',
    label: 'پکیج‌های فانتزی و هدیه',
    icon: 'Gift',
    categoryId: 'cat-gifts',
    submenus: [
      { id: 'sub-gf-1', label: 'جامدادی و استیکر فانتزی', subcategoryId: 'sub-pencil-cases-stickers', badge: 'صورتی بنفش' },
      { id: 'sub-gf-2', label: 'ست هدیه صورتی بنفش', subcategoryId: 'sub-pink-sets' },
      { id: 'sub-gf-3', label: 'گیره کاغذ و واشی‌تیپ‌های تزئینی', subcategoryId: 'sub-washi-tapes' },
      { id: 'sub-gf-4', label: 'چراغ مطالعه و اکسسوری میز', subcategoryId: 'sub-desk-accessories' },
    ],
  },
  {
    id: 'menu-support',
    label: 'خدمات، پشتیبانی و سفارشی',
    icon: 'Info',
    categoryId: 'cat-support',
    submenus: [
      { id: 'sub-sp-1', label: 'پک‌های تحریر سفارشی مدارس', subcategoryId: 'sub-custom-school' },
      { id: 'sub-sp-2', label: 'گیفت‌باکس‌های شرکتی', subcategoryId: 'sub-corporate-gifts' },
      { id: 'sub-sp-3', label: 'کلاسورها و جلد چرمی هک اسم', subcategoryId: 'sub-shopping-guide' },
      { id: 'sub-sp-4', label: 'نوشت‌افزار و حکاکی هدیه', subcategoryId: 'sub-custom-engraved' },
    ],
  },
];

export const CATEGORIES: Category[] = [
  {
    id: 'cat-home',
    name: 'صفحه اصلی و منتخب‌ها',
    icon: 'Home',
    subcategories: [
      { id: 'sub-home-bestsellers', name: 'پرفروش‌ترین‌های تحریر' },
      { id: 'sub-home-discounts', name: 'تخفیف‌های ویژه صورتی' },
      { id: 'sub-home-new', name: 'جدیدترین محصولات فانتزی' },
      { id: 'sub-home-golden', name: 'پک‌های پیشنهادی طلایی' },
    ],
  },
  {
    id: 'cat-notebooks',
    name: 'دفتر و کاغذ',
    icon: 'BookOpen',
    subcategories: [
      { id: 'sub-notebooks-binders', name: 'دفترچه یادداشت و کلاسور' },
      { id: 'sub-notebooks-bullet', name: 'دفتر بولت ژورنال و برنامه‌ریزی' },
      { id: 'sub-notebooks-sketch', name: 'دفتر نقاشی و اسکچ‌بوک' },
      { id: 'sub-a4-paper', name: 'کاغذ A4 و برگه‌های خط‌دار' },
    ],
  },
  {
    id: 'cat-writing',
    name: 'نوشت‌افزار',
    icon: 'PenTool',
    subcategories: [
      { id: 'sub-pencils-etudes', name: 'مداد رنگی و اتود حرفه‌ای' },
      { id: 'sub-gel-pens', name: 'روان‌نویس و خودکار فانتزی' },
      { id: 'sub-highlighters', name: 'ماژیک و هایلایتر پاستیلی' },
      { id: 'sub-fountain-pens', name: 'خودنویس و جوهر خوشنویسی' },
    ],
  },
  {
    id: 'cat-art',
    name: 'لوازم طراحی و هنری',
    icon: 'Palette',
    subcategories: [
      { id: 'sub-watercolors', name: 'آبرنگ، گواش و مداد شمعی' },
      { id: 'sub-pastels', name: 'پاستل گچی و زغال طراحی' },
      { id: 'sub-tools', name: 'تراش، پاک‌کن و خط‌کش ژله‌ای' },
      { id: 'sub-canvases', name: 'بوم نقاشی و قلم‌مو' },
    ],
  },
  {
    id: 'cat-gifts',
    name: 'پکیج‌های فانتزی و هدیه',
    icon: 'Gift',
    subcategories: [
      { id: 'sub-pencil-cases-stickers', name: 'جامدادی و استیکر فانتزی' },
      { id: 'sub-pink-sets', name: 'ست هدیه صورتی بنفش' },
      { id: 'sub-washi-tapes', name: 'گیره کاغذ و واشی‌تیپ‌های تزئینی' },
      { id: 'sub-desk-accessories', name: 'چراغ مطالعه و اکسسوری میز' },
    ],
  },
  {
    id: 'cat-support',
    name: 'خدمات، پشتیبانی و سفارشی',
    icon: 'Info',
    subcategories: [
      { id: 'sub-custom-school', name: 'پک‌های تحریر سفارشی مدارس' },
      { id: 'sub-corporate-gifts', name: 'گیفت‌باکس‌های شرکتی' },
      { id: 'sub-shopping-guide', name: 'کلاسورها و جلد چرمی هک اسم' },
      { id: 'sub-custom-engraved', name: 'نوشت‌افزار و حکاکی هدیه' },
    ],
  },
];

// GENERATE EXACTLY 25 HIGH QUALITY PRODUCTS PER MENU CATEGORY (150 TOTAL PRODUCTS)
const generateCategoryProducts = (
  catId: string,
  catName: string,
  subIds: string[],
  prefix: string,
  templates: { title: string; price: number; discountPrice?: number; brand: string; tag: string; paperType?: string; img: string }[]
): Product[] => {
  const products: Product[] = [];
  for (let i = 1; i <= 25; i++) {
    const tmpl = templates[(i - 1) % templates.length];
    const subId = subIds[(i - 1) % subIds.length];
    const isNewVal = i % 3 === 0;
    const isPopVal = i % 2 === 0;

    products.push({
      id: `${prefix}-${i}`,
      title: `${tmpl.title} - کد ${100 + i}`,
      category: catName,
      categoryId: catId,
      subcategoryId: subId,
      price: tmpl.price + (i * 2000),
      discountPrice: tmpl.discountPrice ? tmpl.discountPrice + (i * 1500) : undefined,
      rating: Number((4.5 + (i % 5) * 0.1).toFixed(1)),
      reviewsCount: 12 + i * 3,
      image: tmpl.img,
      additionalImages: [
        tmpl.img,
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
      ],
      isNew: isNewVal,
      isPopular: isPopVal,
      tag: i % 4 === 0 ? 'ویژه صورتی' : tmpl.tag,
      brand: tmpl.brand,
      colorOptions: ['صورتی پاستیلی', 'بنفش یاسی', 'ترکیبی'],
      paperType: tmpl.paperType || '۸۰ گرم سفید',
      inStock: true,
      stockQuantity: 15 + i,
      description: `این محصول تخصصی از دسته‌بندی ${catName} با بالاترین کیفیت ساخت، طراحی فانتزی صورتی بنفش و ارگونومی استاندارد جهت افزایش حس شادابی در مطالعه و خلق آثار هنری ارائه می‌شود.`,
      features: [
        'طراحی ارگونومیک با رنگ‌بندی پاستیلی صورتی و بنفش',
        'کیفیت ساخت بالا مطابق استانداردهای بین‌المللی تحریر',
        'مناسب استفاده در مدرسه، دانشگاه، دفتر کار و هدیه',
      ],
    });
  }
  return products;
};

// 1. Category 1: Home/Bestsellers (25 Products)
const homeProducts = generateCategoryProducts(
  'cat-home',
  'صفحه اصلی و منتخب‌ها',
  ['sub-home-bestsellers', 'sub-home-discounts', 'sub-home-new', 'sub-home-golden'],
  'prod-home',
  [
    { title: 'کلاسور ۱۰۰ برگ جلد سخت صورتی رویایی', price: 185000, discountPrice: 155000, brand: 'پاپکو صورتی', tag: 'پرفروش‌ترین', paperType: '۱۰۰ برگ - خط دار', img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80' },
    { title: 'ست هایلایتر ۶ رنگ پاستیلی معطر بنفش', price: 95000, discountPrice: 79000, brand: 'استابیلو پاستیل', tag: 'تخفیف داغ', img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80' },
    { title: 'دفترچه یادداشت مگنتی فانتزی یاسی', price: 68000, brand: 'پنتر صورتی', tag: 'جدید', paperType: 'نقطه‌ای', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
    { title: 'روان‌نویس ۱۰ رنگ نوک نمدی پاستیلی', price: 140000, discountPrice: 120000, brand: 'ساکورا ژاپن', tag: 'پیشنهاد طلایی', img: 'https://images.unsplash.com/photo-1585336261026-61e778f29280?auto=format&fit=crop&w=800&q=80' },
    { title: 'پک هدیه کامل لوازم تحریر صورتی بنفش', price: 420000, discountPrice: 380000, brand: 'صورتی بنفش', tag: 'ویژه کادویی', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80' },
  ]
);

// 2. Category 2: Notebooks & Paper (25 Products)
const notebookProducts = generateCategoryProducts(
  'cat-notebooks',
  'دفتر و کاغذ',
  ['sub-notebooks-binders', 'sub-notebooks-bullet', 'sub-notebooks-sketch', 'sub-a4-paper'],
  'prod-nb',
  [
    { title: 'دفتر بولت ژورنال نقطه‌ای ۱۶۰ صفحه صورتی', price: 160000, discountPrice: 138000, brand: 'سیمین ژورنال', tag: 'بولت ژورنال', paperType: 'نقطه‌ای ۱۰۰ گرم', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
    { title: 'کلاسور ۲۶ حلقه پلاستیکی بنفش یاسی', price: 195000, discountPrice: 170000, brand: 'پاپکو', tag: 'کلاسور', paperType: 'کلاسوری فرنگ', img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80' },
    { title: 'دفتر نقاشی فیلی ۸۰ برگ فنر دوبل صورتی', price: 90000, brand: 'کلیپس', tag: 'اسکچ بوک', paperType: 'بدون خط ۱۲۰ گرم', img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80' },
    { title: 'بسته کاغذ A4 رنگی صورتی و بنفش ۱۰۰ عددی', price: 110000, discountPrice: 95000, brand: 'دبل آ', tag: 'کاغذ A4', paperType: '۸۰ گرم پاستیلی', img: 'https://images.unsplash.com/photo-1585336261026-61e778f29280?auto=format&fit=crop&w=800&q=80' },
    { title: 'دفتر برنامه‌ریزی روزانه دیلی پلنر صورتی', price: 125000, brand: 'سیب اسکتش', tag: 'پلنر', paperType: 'برنامه‌ریزی چاپ شده', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80' },
  ]
);

// 3. Category 3: Writing Supplies (25 Products)
const writingProducts = generateCategoryProducts(
  'cat-writing',
  'نوشت‌افزار',
  ['sub-pencils-etudes', 'sub-gel-pens', 'sub-highlighters', 'sub-fountain-pens'],
  'prod-wr',
  [
    { title: 'مداد رنگی ۲۴ رنگ جعبه فلزی صورتی فابرکاستل', price: 290000, discountPrice: 250000, brand: 'فابرکاستل', tag: 'مدادرنگی', img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80' },
    { title: 'اتود ۰.۵ میلی‌متری بدنه فلزی بنفش یاسی', price: 85000, brand: 'روترینگ', tag: 'اتود', img: 'https://images.unsplash.com/photo-1585336261026-61e778f29280?auto=format&fit=crop&w=800&q=80' },
    { title: 'روان‌نویس ژله‌ای زبرا ساراسا ۴ رنگ پاستیلی', price: 165000, discountPrice: 140000, brand: 'زبرا ژاپن', tag: 'روان‌نویس', img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80' },
    { title: 'ماژیک هایلایتر قلمی پاستیلی ۶ عددی', price: 88000, brand: 'استابیلو', tag: 'هایلایتر', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
    { title: 'خودنویس فانتزی بدنه شفاف با جوهر بنفش', price: 175000, discountPrice: 150000, brand: 'لامی', tag: 'خودنویس', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80' },
  ]
);

// 4. Category 4: Art Supplies (25 Products)
const artProducts = generateCategoryProducts(
  'cat-art',
  'لوازم طراحی و هنری',
  ['sub-watercolors', 'sub-pastels', 'sub-tools', 'sub-canvases'],
  'prod-art',
  [
    { title: 'قرص آبرنگ ۱۲ رنگ افرا با پالت صورتی', price: 210000, discountPrice: 185000, brand: 'افرا', tag: 'آبرنگ', img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80' },
    { title: 'ست مداد شمعی ۲۴ رنگ پاستیلی آریا', price: 95000, brand: 'آریا', tag: 'مداد شمعی', img: 'https://images.unsplash.com/photo-1585336261026-61e778f29280?auto=format&fit=crop&w=800&q=80' },
    { title: 'تراش مخزن‌دار طرح خرگوش صورتی', price: 45000, brand: 'فکتیس', tag: 'تراش', img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80' },
    { title: 'پاک‌کن خمیری هنری بنفش حرفه‌ای', price: 38000, brand: 'وینزور', tag: 'پاک‌کن', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
    { title: 'ست قلم‌مو ۶ تایی موی گربه جهت آبرنگ', price: 180000, discountPrice: 155000, brand: 'خرم', tag: 'قلم‌مو', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80' },
  ]
);

// 5. Category 5: Gift Packages & Fantasy (25 Products)
const giftProducts = generateCategoryProducts(
  'cat-gifts',
  'پکیج‌های فانتزی و هدیه',
  ['sub-pencil-cases-stickers', 'sub-pink-sets', 'sub-washi-tapes', 'sub-desk-accessories'],
  'prod-gift',
  [
    { title: 'جامدادی بزرگ ۳ زیپ برزنتی صورتی بنفش', price: 165000, discountPrice: 145000, brand: 'فابریانو', tag: 'جامدادی', img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80' },
    { title: 'پک ۵۰ عددی استیکر ضدآب لپ‌تاپ و دفتر صورتی', price: 65000, brand: 'استیکرباز', tag: 'استیکر', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
    { title: 'پکیج لوکس هدیه تحریر صورتی کامل', price: 580000, discountPrice: 490000, brand: 'صورتی بنفش', tag: 'ست کامل هدیه', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80' },
    { title: 'ست ۱۰ رول نوار چسب واشی‌تیپ پاستیلی', price: 89000, brand: 'واشی رز', tag: 'چسب تزئینی', img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80' },
    { title: 'چراغ مطالعه شارژی لمسی صورتی رومیزی', price: 280000, discountPrice: 240000, brand: 'شیائومی تحریر', tag: 'اکسسوری میز', img: 'https://images.unsplash.com/photo-1585336261026-61e778f29280?auto=format&fit=crop&w=800&q=80' },
  ]
);

// 6. Category 6: Custom & Services (25 Products)
const supportProducts = generateCategoryProducts(
  'cat-support',
  'خدمات، پشتیبانی و سفارشی',
  ['sub-custom-school', 'sub-corporate-gifts', 'sub-shopping-guide', 'sub-custom-engraved'],
  'prod-sup',
  [
    { title: 'پک کامل تحریر سفارشی مقطع دبستان صورتی', price: 340000, discountPrice: 295000, brand: 'سفارشی مدرسه', tag: 'پک دبستان', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
    { title: 'گیفت‌باکس سازمانی تحریر و تقویم بنفش', price: 620000, discountPrice: 550000, brand: 'سازمانی بنفش', tag: 'گیفت شرکتی', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80' },
    { title: 'کلاسور چرمی سفارشی با حک نام اسم خریدار', price: 260000, brand: 'چرم تحریر', tag: 'حکاکی اسم', img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80' },
    { title: 'خودکار فلزی لوکس حکاکی شده صورتی هدیه', price: 190000, discountPrice: 165000, brand: 'پارکر سفارشی', tag: 'خودکار حک اسم', img: 'https://images.unsplash.com/photo-1585336261026-61e778f29280?auto=format&fit=crop&w=800&q=80' },
    { title: 'پک کامل لوازم تحریر کنکوری‌های صورتی', price: 450000, discountPrice: 390000, brand: 'ویژه کنکور', tag: 'پک کنکوری', img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80' },
  ]
);

// COMBINE ALL 150 PRODUCTS (6 CATEGORIES * 25 PRODUCTS)
export const MOCK_PRODUCTS: Product[] = [
  ...homeProducts,
  ...notebookProducts,
  ...writingProducts,
  ...artProducts,
  ...giftProducts,
  ...supportProducts,
];

export const MOCK_COUPONS: Coupon[] = [
  { code: 'PINK10', discountPercentage: 10, maxDiscount: 50000, isActive: true },
  { code: 'PURPLE20', discountPercentage: 20, maxDiscount: 100000, isActive: true },
  { code: 'NOROOZ', discountPercentage: 15, maxDiscount: 70000, isActive: true },
];
