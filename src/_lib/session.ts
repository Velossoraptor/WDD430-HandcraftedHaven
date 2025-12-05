// src/_lib/session.ts
"use server";

import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.SESSION_SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error("SESSION_SECRET_KEY is not defined in environment variables");
}

const encodedKey = new TextEncoder().encode(SECRET_KEY);

export interface SessionPayload {
  id: string;
  account_type: string;
  fname: string;
  lname: string;
  email: string;
}

/**
 * Create session cookie
 */
export async function createSession(payload: SessionPayload): Promise<void> {
  const expiresAt = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 hours in seconds

  // jose expects the payload to be a generic object (record<string, unknown>), not a typed interface.
  // Do NOT cast to SessionPayload, just pass payload directly as an object.
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(encodedKey);

  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    // 'expires' expects a Date
    expires: new Date(expiresAt * 1000),
    path: "/",
  });
}

/**
 * Verify and decode session
 */
export async function verifySession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  try {
    // The payload returned by jose is JWTPayload (Record<string, unknown>).
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });

    // Validate that the essential fields exist and are strings
    const requiredFields = ["id", "account_type", "fname", "lname", "email"];
    for (const field of requiredFields) {
      if (typeof payload[field] !== "string") {
        throw new Error(
          `Invalid session: missing or malformed field "${field}"`
        );
      }
    }

    // Type assertion is now safe
    return {
      id: payload.id as string,
      account_type: payload.account_type as string,
      fname: payload.fname as string,
      lname: payload.lname as string,
      email: payload.email as string,
    };
  } catch (error) {
    console.error("Invalid or expired session:", error);
    return null;
  }
}

/**
 * Delete session cookie
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
