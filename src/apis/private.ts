import { cookies } from "next/headers";
import { extractToken } from "@/lib/session";
import { NEXT_API_URL } from "@/config";

export async function privateApiRequest<T>(
  url: string,
  config: {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    headers?: HeadersInit;
    body?: BodyInit | null;
    cache?: RequestCache;
  } = {},
): Promise<T> {
  const { method = "GET", headers, body, cache } = config;
  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  const makeRequest = (accessToken: string | null) =>
    fetch(url, {
      method,
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        Accept: "application/json",
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...headers,
      },
      body: body ?? undefined,
      cache: cache ?? "no-cache",
    });

  const cookieVal = (await cookies()).get("session")?.value;
  const accessToken = await extractToken(cookieVal);

  let res = await makeRequest(accessToken);
  if (res.status !== 401) return (await res.json()) as T;

  const refreshRes = await fetch(`${NEXT_API_URL}/api/refresh`, {
    method: "POST",
    headers: {
      Cookie: `session=${cookieVal ?? ""}`,
    },
    cache: "no-store",
  });

  const refreshData = await refreshRes.json().catch(() => null);
  const newAccessToken = refreshData?.accessToken;

  if (!refreshRes.ok || !newAccessToken) {
    throw new Error("Unauthorized");
  }

  res = await makeRequest(newAccessToken);

  return (await res.json()) as T;
}
