"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const CART_JWT_SECRET = new TextEncoder().encode(process.env.CART_JWT_SECRET);
const CART_COOKIE_NAME = "cart-session";

if (!CART_JWT_SECRET) {
   throw new Error("Missing session secret key");
}
const encodedKey = new TextEncoder().encode(CART_JWT_SECRET);

// Set cart cookie
export async function setCartCookie(cartData) {
   const session = await new SignJWT({ cart: cartData }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(encodedKey);

   const cookieStore = await cookies();
   cookieStore.set(CART_COOKIE_NAME, session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
   });
}

// Get cart cookie
export async function getCartFromCookie() {
   const cookieStore = await cookies();
   const cookie = cookieStore.get(CART_COOKIE_NAME)?.value;

   if (!cookie) return null;

   try {
      const { payload } = await jwtVerify(cookie, encodedKey, {
         algorithms: ["HS256"],
      });

      return payload?.cart || [];
   } catch {
      return [];
   }
}

// Clear cart cookie
export async function clearCartCookie() {
   try {
      const cookieStore = await cookies();
      cookieStore.delete(CART_COOKIE_NAME);

      // Dispatch storage event to update the same tab
      window.dispatchEvent(new Event("storage"));
      return true;
   } catch (error) {
      return false;
   }
}
