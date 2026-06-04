export interface MenuItem {
  id: string;
  titleFa: string;
  titleEn: string;
  slug: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MenuMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface MenuData {
  items: MenuItem[];
  meta: MenuMeta;
}

export interface MenuResponse {
  success: boolean;
  data: MenuData;
  message: string;
}
