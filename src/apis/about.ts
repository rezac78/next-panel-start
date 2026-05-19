"use server";

import { privateApiRequest } from "@/apis/private";
import { BASE_URL } from "@/config";
import { AboutPageValues } from "@/types/about";
import { ApiResponse } from "@/types/api";

export async function getAbout() {
  try {
    return await privateApiRequest<ApiResponse<AboutPageValues>>(`${BASE_URL}admin/about`);
  } catch {
    return null;
  }
}

export async function putAbout(body: FormData) {
  try {
    return await privateApiRequest<ApiResponse<AboutPageValues>>(`${BASE_URL}admin/about`, {
      method: "PUT",
      body:body,
    });
  } catch {
    return null;
  }
}
