"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secureKey = process.env.SESSION_SECRET_KEY;
if (!secureKey) {
   throw new Error("Missing session secret key");
}
const encodedKey = new TextEncoder().encode(secureKey);

/* This function creates a session for the user using the userId and the encoded key */
export async function createSession(id, rememberMe = false, fname, lname, email) {
   // 30 days for rememberMe, 24 hours for regular login
   const expirationDays = rememberMe ? 30 : 1;
   const expiresAt = new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000);

   const session = await new SignJWT({ id, fname, lname, email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expiresAt)
      .sign(encodedKey);

   const cookieStore = await cookies();
   cookieStore.set("handcrafted-vendor-session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
   });
}

/* This function verifies the session using the encoded key */
export async function verifySession() {
   const cookieStore = await cookies();
   const cookie = cookieStore.get("handcrafted-vendor-session")?.value;

   if (!cookie) return null;

   try {
      const { payload } = await jwtVerify(cookie, encodedKey, {
         algorithms: ["HS256"],
      });
      return {
         userId: payload.id,
         authenticated: true,
         fname: payload.fname,
         lname: payload.lname,
         email: payload.email,
      };
   } catch (error) {
      return { userId: null, authenticated: false };
   }
}

/* This function deletes the session */
export async function deleteSession() {
   const cookieStore = await cookies();
   cookieStore.delete("handcrafted-vendor-session");
   return true;
}
