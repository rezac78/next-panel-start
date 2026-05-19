import { SignJWT, jwtVerify } from "jose";
import "server-only";

const secretKey = process.env.SESSION_SECRET!;
const encodedKey = new TextEncoder().encode(secretKey);

export type SessionPayload = {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
};

export async function buildSession(accessToken: string, refreshToken: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const token = await new SignJWT({
    accessToken,
    refreshToken,
    expiresAt: expiresAt.toISOString(),
  })
  .setProtectedHeader({ alg: "HS256" })
  .setIssuedAt()
  .setExpirationTime("604800s")
  .sign(encodedKey);
    
  return { token, expiresAt };
}

export async function decrypt(session?: string) {
  try {
    if (!session) return null;

    const { payload } = await jwtVerify(session, encodedKey);
    const expiry = new Date(payload.expiresAt as string).getTime();

    if (expiry < Date.now()) return null;

    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export async function extractToken(session?: string) {
  const payload = await decrypt(session);
  
  return payload?.accessToken ?? null;
}
