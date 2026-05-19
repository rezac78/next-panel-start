import { NextResponse } from "next/server";

// import { deleteSession } from "@/lib/session";

export async function POST(request: Request) {
  try {
    // Delete the session cookie
    // await deleteSession();
    const response = NextResponse.redirect(new URL("/auth", request.url));
    response.cookies.delete("session"); // Clear the Cookie

    return response;

    // return NextResponse.json(
    //   { message: "Logged out successfully" },
    //   {
    //     headers: {
    //       "Set-Cookie": "session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax",
    //     },
    //   }
    // );
  } catch (error) {
    console.error("Failed to delete session:", error);

    return NextResponse.json({ error: "Failed to log out" }, { status: 500 });
  }
}
