"use server";
import { cookies } from "next/headers";

export async function createTeamCookie(id: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = JSON.stringify({
    teamID: id,
    expiresAt: expiresAt.toISOString(),
  });

  (await cookies()).set("teamCookie", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteTeamCookie() {
  (await cookies()).delete("teamCookie");
}

type SessionPayload = {
  token: string;
  expiresAt: string; // Use ISO string for serialization
  user?: string;
};

/**
 * Validates and extracts the token from the session payload.
 */
export async function extractTeamCookie() {
  const raw = (await cookies()).get("teamCookie")?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);

    return {
      id: parsed.teamID,
      expiresAt: parsed.expiresAt,
    };
  } catch {
    return null;
  }
}
