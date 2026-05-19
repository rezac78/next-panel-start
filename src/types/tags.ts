export type Tags = {
  _id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TagsMeta = {
  totalItems: number;
  page: number;
  perPage: number;
  blogCategoryItems: number;
  blogCategoryPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};
export type TagsPaginatedData = {
  length: number;
  data: Tags[];
  meta: TagsMeta;
};
export type TableColumn = {
  id: string;
  label: string;
  visible: boolean;
  sortable?: boolean;
  hideable?: boolean;
  checkbox?: boolean;
};
export type TagsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: TagsPaginatedData;
  columns: TableColumn[];
};
