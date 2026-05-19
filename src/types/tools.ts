export type ToolsMeta = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type ToolsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Tool[];
  meta: ToolsMeta;
  errors: null;
};

export type Tool = {
  _id: string;
  name: string;
  slug: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
