export type BlogCategory = {
  _id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  metaDescription: string;
  metaTitle: string;
  image: string;
  publishDate: string;
  views: number;
  readingTime: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type BlogCategoryMeta = {
  totalItems: number;
  page: number;
  perPage: number;
  blogCategoryItems: number;
  blogCategoryPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};
export type BlogCategoryPaginatedData = {
  length: number;
  data: BlogCategory[];
  meta: BlogCategoryMeta;
};
export type TableColumn = {
  id: string;
  label: string;
  visible: boolean;
  sortable?: boolean;
  hideable?: boolean;
  checkbox?: boolean;
};
export type BlogCategoryListResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: BlogCategoryPaginatedData;
  columns: TableColumn[];
};
