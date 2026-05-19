"use server";
import { privateApiRequest } from "@/apis/private";
import { BASE_URL } from "@/config";
import { AdminProfileResponse } from "@/types/profile";
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
export async function getProfile() {
  try {
    return await privateApiRequest<AdminProfileResponse>(`${BASE_URL}admin/profile`);
  } catch (err) {
    console.error(err);
    
    return null;
  }
}
export async function putProfile(form: FormData) {
  try {
    return await privateApiRequest<AdminProfileResponse>(`${BASE_URL}admin/profile`, {
      method: "PUT",
      body: form,
    });
  } catch (err) {
    // await handleApiError(err, '❌ Error creating group');
    return null;
  }
}
