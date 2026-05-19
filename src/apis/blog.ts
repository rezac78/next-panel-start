"use server";
import { privateApiRequest } from "@/apis/private";
import { BASE_URL } from "@/config";
import { AdminProfileResponse } from "@/types/profile";
import { TagsResponse } from "@/types/tags";

export async function getBlog({
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

    return await privateApiRequest<TagsResponse>(`${BASE_URL}admin/blog?${params.toString()}`);
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
export async function postBlog(body: FormData) {
  try {
    return await privateApiRequest<AdminProfileResponse>(`${BASE_URL}admin/blog`, {
      method: "POST",
      body: body,
    });
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
export async function getSingleBlog(id: string) {
  try {
    return await privateApiRequest<AdminProfileResponse>(`${BASE_URL}admin/blog/${id}`);
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
export async function putBlog(id: string, body: FormData) {
  try {
    return await privateApiRequest<AdminProfileResponse>(`${BASE_URL}admin/blog/${id}`, {
      method: "PUT",
      body: body,
    });
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
export async function deletedBlog(id: string) {
  try {
    return await privateApiRequest<AdminProfileResponse>(`${BASE_URL}admin/blog/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
