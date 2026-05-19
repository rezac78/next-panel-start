import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { decrypt } from "@/lib/session";

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const cleanPath = path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
  const isProtectedRoute = cleanPath.startsWith("/admin");
  const isPublicRoute = cleanPath === "/auth";

  const cookie = (await cookies()).get("session")?.value;
  let session = null;

  try {
    if (cookie) {
      session = await decrypt(cookie);
    }
  } catch (error) {
    console.error("Session error:", error instanceof Error ? error.message : String(error));
  }
  if (isPublicRoute && session?.accessToken) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }
  const redirect_url_unauthenticated = "/auth";
  // If session is invalid, remove the session cookie
  if (isProtectedRoute && !session?.accessToken) {
    const response = NextResponse.redirect(new URL(redirect_url_unauthenticated, req.nextUrl));
    response.cookies.set("session", "", { maxAge: -1, path: "/" });
    
return response;
  }

  if (isProtectedRoute && !session?.accessToken) {
    return NextResponse.redirect(new URL(redirect_url_unauthenticated, req.nextUrl));
  }

  return NextResponse.next();
}
