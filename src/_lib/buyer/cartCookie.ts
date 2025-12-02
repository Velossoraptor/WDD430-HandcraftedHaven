"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const CART_COOKIE_NAME = "handcrafted-cart-session";

// Validate secret
if (!process.env.CART_JWT_SECRET) {
  throw new Error("Missing session secret key");
}

const encodedKey = new TextEncoder().encode(process.env.CART_JWT_SECRET);

// Define cart type (customize if needed)
export interface CartItem {
  listing_id: string;
  quantity: number;
  product_image: string;
  product_name: string;
  price: number;
}

// Set cart cookie
export async function setCartCookie(cartData: CartItem[]): Promise<void> {
  const session = await new SignJWT({ cart: cartData })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);

  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    path: "/",
  });
}

// Get cart cookie
export async function getCartFromCookie(): Promise<CartItem[] | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(CART_COOKIE_NAME)?.value;

  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify<{ cart: CartItem[] }>(
      cookie,
      encodedKey,
      {
        algorithms: ["HS256"],
      }
    );

    return payload.cart || [];
  } catch (error) {
    console.error("Failed to verify cart cookie:", error);
    return [];
  }
}

// Clear cart cookie
export async function clearCartCookie(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(CART_COOKIE_NAME);

    // IMPORTANT: You cannot trigger `window` events in a server function.
    // Instead, trigger UI updates using client-side revalidation or context.

    return true;
  } catch (error) {
    console.error("Error clearing cart cookie:", error);
    return false;
  }
}
