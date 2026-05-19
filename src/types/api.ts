export type ApiValidationError = {
  message: string;
  errors: Record<string, string[]>;
};

export type ApiSuccess<T> = T & {
  message?: string;
};

export type ApiResponse<T> = ApiOkResponse<T> | ApiFail;

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: Record<string, string>;
};

export type ApiOkResponse<T> = {
  success: true;
  statusCode: number;
  message: string;
  data: T;
  errors: null;
};
export type ApiFail = {
  success: false;
  statusCode: number;
  message: string;
  data: null;
  errors: Record<string, string> | null;
};
