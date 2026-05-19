import { type ReactNode } from "react";

export type ApiResponse<T> = {
  name: ReactNode;
  id: string | number | null | undefined;
  status: boolean;
  message: string;
  data: T;
};

// Pagination type
export type PaginationType = {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};
export type AxiosApiError = {
  message: string;
  code: number;
  debug: {
    environment: string;
    message: string;
    file: string;
    line: number;
    input: Record<string, never>;
  };
};

// Type where pagination is spread within data
export type ApiResponseWithPagination<T> = ApiResponse<
  T & PaginationType // Combines the data type with the pagination type
>;

// A more generic function that can handle all methods
export async function apiRequest<T>(
  url: string,
  config: {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: HeadersInit;
    body?: unknown;
    cache?: RequestCache;
  } = {}
): Promise<T> {
  const { method = "GET", headers, body, cache } = config;

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: cache ?? "no-cache", // or "default", up to you
      next: { revalidate: cache === "default" ? 60 : 0 }, // 3600 = 1h
    });

    if (!res.ok) {
      console.error(`Failed to fetch: ${res.status} ${res.statusText}`);
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
}

// Example usage:

// For GET: Assuming the response includes items and pagination info spread within data
/*
await apiRequest<ApiResponseWithPagination<{ items: Blog[] }>>(`${BASE_URL}blogs`);
*/

// For POST: Standard response without pagination
/*
await apiRequest<ApiResponse<Blog>>(`${BASE_URL}blogs`, {
  method: "POST",
  body: { title: "My new blog", content: "Content here" },
});
*/

// For PUT: Standard response without pagination
/*
await apiRequest<ApiResponse<Blog>>(`${BASE_URL}blogs/123`, {
  method: "PUT",
  body: { title: "Updated Title" },
});
*/

// For DELETE: Standard response without pagination
/*
await apiRequest<ApiResponse<void>>(`${BASE_URL}blogs/123`, {
  method: "DELETE",
});
*/
