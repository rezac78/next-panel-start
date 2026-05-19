// 📦 جزئیات فیلدهای اضافی (additionalData)
export interface DashboardProductAdditionalData {
  id: string;
  value: string | number | null;
  code: string;
  label: string;
}

// 🖼️ تصاویر محصول
export interface DashboardProductImage {
  id?: number;
  type?: string;
  path?: string;
  product_id?: number;
  position?: number;
  url?: string;
  large_image_url?: string;
}

// 🎥 ویدیوهای محصول
export interface DashboardProductVideo {
  id?: number;
  url?: string;
  path?: string;
  type?: string;
  product_id?: number;
}

// 🧾 اطلاعات قیمت HTML
export interface DashboardProductPriceHtml {
  formattedFinalPrice: string;
  priceHtml: string;
  priceWithoutHtml: string;
}

// ⏰ ساختار اسلات در محصول رزروی (bookings-new)
export interface BookingSlot {
  id?: number | string;
  from: string;
  to: string;
  status: "0" | "1";
}

// 📅 ساختار time range داخل bookings-new
export interface AppointmentSlot {
  id?: number | string;
  slots: BookingSlot[];
}

// 📖 ساختار bookings-new محصول
export interface BookingData {
  id?: number | string;
  appointmentSlot: AppointmentSlot;
}

// 🏷️ داده اصلی محصول
export interface DashboardProduct {
  id: number;
  category: number[];
  category_name: string[]; // ✅ string[]
  sku: string;
  name: string | null;
  marketplace_name: string | null;
  type: string; // "bookings-new" | "sales" | ...
  parentId: number | null;
  attributeFamilyId: number | null;
  product_number: string;
  short_description: string | null;
  description: string | null;
  urlKey: string | null;
  shareURL: string;
  new: boolean;
  featured: boolean;
  status: boolean; // ✅ boolean, نه number
  guest_checkout: boolean;
  visible_individually: boolean;
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
  price: string;
  specialPrice: string;
  special_price_from: string | null;
  special_price_to: string | null;
  priceDifference: string;
  daysDifference: string | null;
  weight: string | null;
  createdAt: string;
  updatedAt: string;
  inventories: { qty: number }[]; // ✅ typed, چون در جدول استفاده میشه
  reviews: unknown[];
  averageRating: string;
  priceHtml: DashboardProductPriceHtml;
  specialPriceHtml: string | null;
  images: DashboardProductImage[];
  videos: DashboardProductVideo[];
  additionalData: DashboardProductAdditionalData[];
  crossSells: unknown[];
  upSells: unknown[];
  relatedProducts: unknown[];
  downloadableLinks: unknown[];
  downloadableSamples: unknown[];
  booking: BookingData[];
  superAttributes: unknown[];
}

export interface DashboardPaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface DashboardProductsResponse {
  current_page: number;
  data: DashboardProduct[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: DashboardPaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
