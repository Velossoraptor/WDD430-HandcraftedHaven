"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secureKey = process.env.BUYER_SESSION_SECRET_KEY;
if (!secureKey) {
   throw new Error("Missing session secret key");
}
const encodedKey = new TextEncoder().encode(secureKey);

/* This function creates a session for the user using the userId and the encoded key */
export async function createBuyerSession(buyer_id, email, name) {
   // 24 hours for regular login
   const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

   const session = await new SignJWT({ buyer_id, email, name })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expiresAt)
      .sign(encodedKey);

   const cookieStore = await cookies();
   cookieStore.set("buyer-session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
   });
}

/* This function verifies the session using the encoded key */
export async function verifyBuyerSession() {
   const cookieStore = await cookies();
   const cookie = cookieStore.get("buyer-session")?.value;

   if (!cookie) return null;

   try {
      const { payload } = await jwtVerify(cookie, encodedKey, {
         algorithms: ["HS256"],
      });

      // console.log(payload.buyer_id);

      return {
         authenticated: true,
         buyerId: payload.buyer_id,
         email: payload.email,
         name: payload.name,
      };
   } catch (error) {
      return { email: null, buyerId: null, name: null, authenticated: false };
   }
}

/* This function deletes the session */
export async function deleteBuyerSession() {
   const cookieStore = await cookies();
   cookieStore.delete("buyer-session");
   return true;
}
