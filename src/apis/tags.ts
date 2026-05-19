"use server";
import { privateApiRequest } from "@/apis/private";
import { BASE_URL } from "@/config";
import { AdminProfileResponse } from "@/types/profile";
import { TagsResponse } from "@/types/tags";
export type UserFormValues = {
  name: string;
  username: string;
  email: string;
  password: string;
  image: string;
  country: string;
  city: string;
  jobStatus: string;
  description: string;
  age: string;
  phone: string;
  whatIveBeenWorkingOn: string;
};
export async function getTags({
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

    return await privateApiRequest<TagsResponse>(`${BASE_URL}admin/blog-tag?${params.toString()}`);
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
export async function postTags(body: { title: string; slug: string }) {
  try {
    return await privateApiRequest<AdminProfileResponse>(`${BASE_URL}admin/blog-tag`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
export async function getSingleTags(id: string) {
  try {
    return await privateApiRequest<AdminProfileResponse>(`${BASE_URL}admin/blog-tag/${id}`);
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
export async function putTags(id: string, body: { title: string; slug: string }) {
  try {
    return await privateApiRequest<AdminProfileResponse>(`${BASE_URL}admin/blog-tag/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
export async function deletedTags(id: string) {
  try {
    return await privateApiRequest<AdminProfileResponse>(`${BASE_URL}admin/blog-tag/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
