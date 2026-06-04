"use server";

import axios from "axios";
import { BASE_URL } from "@/config";
import { buildSession } from "@/lib/session";
import { cookies } from "next/headers";
import { ApiFail, ApiResponse } from "@/types/api";
type AdminLoginData = {
  admin: { id: string; email: string; name: string };
  accessToken: string;
  refreshToken: string;
};
export async function loginApi(
  email: string,
  password: string
): Promise<ApiResponse<AdminLoginData>> {
  try {
    const response = await axios.post(`${BASE_URL}auth/admin/login`, {
      email,
      password,
    });
    const { accessToken, refreshToken } = response.data.data;
    const { token, expiresAt } = await buildSession(accessToken, refreshToken);
    
    (await cookies()).set("session", token, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      path: "/",
    });

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const data = err.response?.data as Partial<ApiFail> | undefined;

      return {
        success: false,
        statusCode: (err.response?.status ?? 500) as number,
        message: data?.message ?? "خطا در ورود",
        data: null,
        errors: (data?.errors as Record<string, string> | null) ?? null,
      };
    }

    return {
      success: false,
      statusCode: 500,
      message: "خطای غیرمنتظره",
      data: null,
      errors: null,
    };
  }
}
