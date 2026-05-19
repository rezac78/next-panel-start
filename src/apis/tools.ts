"use server";
import { privateApiRequest } from "@/apis/private";
import { BASE_URL } from "@/config";
import { AdminProfileResponse } from "@/types/profile";
import { ToolsResponse } from "@/types/tools";
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
export async function getTools({
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

    return await privateApiRequest<ToolsResponse>(`${BASE_URL}admin/tools?${params.toString()}`);
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
export async function postTools(body: FormData) {
  try {
    return await privateApiRequest<AdminProfileResponse>(`${BASE_URL}admin/tools`, {
      method: "POST",
      body: body,
    });
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
export async function getSingleTools(id: string) {
  try {
    return await privateApiRequest<AdminProfileResponse>(`${BASE_URL}admin/tools/${id}`);
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
export async function putTools(id: string, body: FormData) {
  try {
    return await privateApiRequest<AdminProfileResponse>(`${BASE_URL}admin/tools/${id}`, {
      method: "PUT",
      body: body,
    });
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
export async function deletedTools(id: string) {
  try {
    return await privateApiRequest<AdminProfileResponse>(`${BASE_URL}admin/tools/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
