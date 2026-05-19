"use server";
import { privateApiRequest } from "@/apis/private";
import { BASE_URL } from "@/config";
import { AdminProfileResponse } from "@/types/profile";
import { GetProjectsResponse } from "@/types/project";
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
export async function getProject() {
  try {
    return await privateApiRequest<GetProjectsResponse>(`${BASE_URL}admin/projects`);
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
export async function getSingleProject(id: string) {
  try {
    return await privateApiRequest<AdminProfileResponse>(`${BASE_URL}admin/projects/${id}`);
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
export async function postProject(body: FormData) {
  try {
    return await privateApiRequest<AdminProfileResponse>(`${BASE_URL}admin/projects`, {
      method: "POST",
      body: body,
    });
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
export async function putProject(id: string, body: FormData) {
  try {
    return await privateApiRequest<AdminProfileResponse>(`${BASE_URL}admin/projects/${id}`, {
      method: "PUT",
      body: body,
    });
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
export async function deletedProject(id: string) {
  try {
    return await privateApiRequest<AdminProfileResponse>(`${BASE_URL}admin/projects/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
