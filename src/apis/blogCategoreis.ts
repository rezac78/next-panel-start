"use server";
import { privateApiRequest } from "@/apis/private";
import { BASE_URL } from "@/config";
import { BlogCategoryListResponse } from "@/types/blogCategoreis";
import { AdminProfileResponse } from "@/types/profile";

export async function getBlogCategoreis({
  page = 1,
  perPage = 5,
  search = "",
}: {
  page?: number;
  perPage?: number;
  search?: string;
}) {
  try {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("perPage", String(perPage));
    if (search) params.set("search", search);

    return await privateApiRequest<BlogCategoryListResponse>(
      `${BASE_URL}admin/blog-category?${params.toString()}`
    );
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
export async function postBlogCategoreis(body: FormData) {
  try {
    return await privateApiRequest<AdminProfileResponse>(`${BASE_URL}admin/blog-category`, {
      method: "POST",
      body: body,
    });
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
export async function getSingleBlogCategoreis(id: string) {
  try {
    return await privateApiRequest<AdminProfileResponse>(`${BASE_URL}admin/blog-category/${id}`);
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
export async function putBlogCategoreis(id: string, body: FormData) {
  try {
    return await privateApiRequest<AdminProfileResponse>(`${BASE_URL}admin/blog-category/${id}`, {
      method: "PUT",
      body: body,
    });
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
export async function deletedBlogCategoreis(id: string) {
  try {
    return await privateApiRequest<AdminProfileResponse>(`${BASE_URL}admin/blog-category/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
