// -------------------- Dashboard Types --------------------

// 📊 عدد با وضعیت مقایسه‌ای (قبلی / فعلی / درصد تغییر)
export interface DashboardProgressMetric {
  previous: number | null;
  current: number | null;
  progress: number;
  formatted_total?: string;
  total?: number;
}
export interface DashboardOverallStats {
  total_customers: DashboardProgressMetric;
  total_orders: DashboardProgressMetric;
  total_sales: DashboardProgressMetric;
  avg_sales: DashboardProgressMetric;
  total_unpaid_invoices: {
    total: number;
    formatted_total: string;
  };
  total_service_sales: {
    total_sales_sum: string;
    total_qty_sum: string;
  };
  total_product_sales: {
    total_sales_sum: string;
    total_qty_sum: string;
  };
  total_tips: number;
}
export interface DashboardTodayOrder {
  id: number;
  increment_id: number;
  status: string;
  status_label: string;
  payment_method: string;
  base_grand_total: string;
  formatted_base_grand_total: string;
  channel_name: string;
  customer_email: string;
  customer_name: string;
  items: string; // HTML snippet از محصول‌ها
  billing_address: string;
  created_at: string; // "20 Oct 2025, 03:53:03"
}
export interface DashboardTodayStats {
  total_sales: DashboardProgressMetric;
  total_orders: DashboardProgressMetric;
  total_customers: DashboardProgressMetric;
  orders: DashboardTodayOrder[];
  seat_summery: {
    total_reservations: number;
    available_bookings: number;
  };
  orders_count: number;
  customers_count: number;
  products_count: number;
}
export interface DashboardStockThresholdProduct {
  id: number;
  sku: string;
  name: string;
  price: string;
  formatted_price: string;
  total_qty: string;
  image: string;
}
export interface DashboardSalesOverTime {
  label: string; // مثل "01 Oct"
  total: string | number;
  count: number;
}

export interface DashboardSalesStats {
  total_orders: DashboardProgressMetric;
  total_sales: DashboardProgressMetric;
  over_time: DashboardSalesOverTime[];
}
export interface DashboardOverTimeItem {
  label: string;
  total: number | string;
}

export interface DashboardVisitorStats {
  total: DashboardProgressMetric;
  unique: DashboardProgressMetric;
  over_time: DashboardOverTimeItem[];
}
export interface DashboardTopSellingProductImage {
  id: number;
  type: string;
  path: string;
  product_id: number;
  position: number;
  url: string;
}

export interface DashboardTopSellingProduct {
  id: number;
  name: string;
  price: string;
  formatted_price: string;
  revenue: string;
  formatted_revenue: string;
  images: DashboardTopSellingProductImage[];
}
export interface DashboardTopCustomer {
  id: number;
  email: string;
  full_name: string;
  total: string;
  orders: number;
  formatted_total: string;
  datetime: string | null;
}
export interface AdminDashboardResponse {
  get_over_all_stats: DashboardOverallStats;
  get_today_stats: DashboardTodayStats;
  get_stock_threshold_products: DashboardStockThresholdProduct[];
  get_sales_stats: DashboardSalesStats;
  get_visitor_stats: DashboardVisitorStats;
  get_payment_method_stats: DashboardVisitorStats;
  get_customer_stats: DashboardVisitorStats;
  get_top_selling_products: DashboardTopSellingProduct[];
  get_top_customers: DashboardTopCustomer[];
}
