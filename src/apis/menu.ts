"use server";
import { privateApiRequest } from "@/apis/private";
import { BASE_URL } from "@/config";
import { MenuData, MenuItem, MenuResponse } from "@/types/menu";
type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
interface ApiResult<T> {
  success: boolean;
  data?: T;
  message: string;
  errors?: string[];
  statusCode?: number;
}

async function handleRequest<T>(
  url: string,
  options?: {
    method?: ApiMethod;
    headers?: HeadersInit;
    body?: BodyInit | null;
    cache?: RequestCache;
  },
): Promise<ApiResult<T>> {
  try {
    const res = await privateApiRequest<T>(url, options);
    if ((res as any)?.success) {
      return {
        success: true,
        data: (res as any).data,
        message: (res as any).message ?? "عملیات با موفقیت انجام شد",
      };
    }
    return {
      success: false,
      data: (res as any)?.data,
      message: (res as any)?.message ?? "خطای ناشناخته",
      errors: (res as any)?.errors ?? [],
      statusCode: (res as any)?.statusCode,
    };
  } catch (err: any) {
    console.error("API Error:", err);
    return {
      success: false,
      message: err?.message ?? "خطای شبکه یا سرور",
    };
  }
}
export async function getMenu(params: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const { page = 1, limit = 10, search = "" } = params;
  const query = new URLSearchParams();
  query.set("page", String(page));
  query.set("limit", String(limit));
  if (search.trim()) query.set("search", search.trim());

  return handleRequest<MenuData>(
    `${BASE_URL}admin/navigation/menus?${query.toString()}`,
  );
}
export async function getSingleMenu(id: string) {
  return handleRequest<MenuItem>(`${BASE_URL}admin/navigation/menus/${id}`);
}
export async function postMenu(body: Record<string, any>) {
  return handleRequest<MenuItem>(`${BASE_URL}admin/navigation/menus`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
export async function putMenu(id: string, body: Record<string, any>) {
  return handleRequest<MenuItem>(`${BASE_URL}admin/navigation/menus/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}
export async function deletedMenu(id: string) {
  return handleRequest<MenuItem>(`${BASE_URL}admin/navigation/menus/${id}`, {
    method: "DELETE",
  });
}
