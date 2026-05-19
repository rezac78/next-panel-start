import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt, buildSession } from "@/lib/session";
import { BASE_URL } from "@/config";

export async function POST() {
  try {
    const cookie = (await cookies()).get("session")?.value;
    if (!cookie) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const session = await decrypt(cookie);
    if (!session?.refreshToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const refreshRes = await fetch(`${BASE_URL}admin/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: session.refreshToken }),
      cache: "no-store",
    });

    const data = await refreshRes.json().catch(() => null);
    const newAccessToken = data?.data?.accessToken;

    if (!refreshRes.ok || !newAccessToken) {
      return NextResponse.json({ message: data?.message ?? "Refresh failed" }, { status: 401 });
    }

    const { token, expiresAt } = await buildSession(newAccessToken, session.refreshToken);

    (await cookies()).set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      path: "/",
      sameSite: "lax",
    });

    return NextResponse.json({ accessToken: newAccessToken });
  } catch {
    return NextResponse.json({ message: "Refresh route crashed" }, { status: 500 });
  }
}
