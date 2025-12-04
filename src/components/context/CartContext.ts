"use client";

import {
  useContext,
  createContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import { toast } from "react-toastify";
import { getCartFromCookie, setCartCookie } from "@/_lib/buyer/cartCookie";
import React from "react";

// -------------------------
// Cart Context
// -------------------------
const CartContext = createContext<CartContextType | undefined>(undefined);

// -------------------------
// Types
// -------------------------
export interface CartItem {
  listing_id: string;
  product_image: string;
  product_name: string;
  price: number;
  quantity: number;
}

type CartAddItem = Omit<CartItem, "quantity">;
type CartOpItem = { listing_id: string };

interface CartContextType {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  cartCount: number;
  loading: boolean;
  addToCart: (item: CartAddItem) => void;
  removeItem: (item: CartOpItem) => void;
  increaseQuantity: (item: CartOpItem) => void;
  decreaseQuantity: (item: CartOpItem) => void;
  mergeCartFromServer: (buyerId: string) => Promise<void>;
}

interface CartProviderProps {
  buyerId?: string | null;
  children: ReactNode;
}

// -------------------------
// Utility Functions
// -------------------------
async function getCart(): Promise<CartItem[]> {
  if (typeof window === "undefined") return [];
  try {
    return (await getCartFromCookie()) ?? [];
  } catch {
    return [];
  }
}

async function saveCart(cart: CartItem[]): Promise<void> {
  if (typeof window !== "undefined") {
    await setCartCookie(cart);
  }
}

function getCartCount(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + (item.quantity || 1), 0);
}

// -------------------------
// Cart Provider Component
// -------------------------
export function CartProvider({ buyerId, children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // -------------------------
  // Load cart from secure cookie
  // -------------------------
  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        const storedCart = await getCart();
        setCart(storedCart);
        setCartCount(getCartCount(storedCart));
      } catch {
        setCart([]);
        setCartCount(0);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  // -------------------------
  // Sync across browser tabs
  // -------------------------
  useEffect(() => {
    const handleStorageChange = async (e: StorageEvent) => {
      if (e.key === "handcrafted-cart-session") {
        const storedCart = await getCart();
        setCart(storedCart);
        setCartCount(getCartCount(storedCart));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // -------------------------
  // Load cart from DB when logged in
  // -------------------------
  const loadCartFromDatabase = useCallback(async () => {
    if (!buyerId) return;

    try {
      const response = await fetch("/api/buyer/cart/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buyerId, cart: [] }),
      });

      const data = await response.json();

      if (data.success && data.cart) {
        setCart(data.cart);
        setCartCount(getCartCount(data.cart));
        await saveCart(data.cart);
      }
    } catch {
      setCart([]);
      setCartCount(0);
    }
  }, [buyerId]);

  useEffect(() => {
    if (buyerId) loadCartFromDatabase();
  }, [buyerId, loadCartFromDatabase]);

  // -------------------------
  // Save cart to cookie when cart updates
  // -------------------------
  useEffect(() => {
    saveCart(cart);
    setCartCount(getCartCount(cart));
  }, [cart]);

  // -------------------------
  // Sync timer
  // -------------------------
  const syncTimerRef = useRef<NodeJS.Timeout | null>(null);

  function scheduleSync() {
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);

    syncTimerRef.current = setTimeout(() => {
      syncCartToServer();
    }, 60);
  }

  const syncCartToServer = useCallback(async () => {
    if (!buyerId) return;

    const latestCart = await getCart();
    if (latestCart.length === 0) return;

    try {
      await fetch("/api/buyer/cart/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buyerId, cart: latestCart }),
      });
    } catch {}
  }, [buyerId]);

  const syncOperationToServer = useCallback(
    async (operation: string, item: CartItem) => {
      if (!buyerId) return;

      try {
        await fetch("/api/buyer/cart/operations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ buyerId, operation, item }),
        });
      } catch {}
    },
    [buyerId]
  );

  // Helper to map CartOpItem to CartItem or vice versa
  function findCartItemById(item: CartOpItem): CartItem | undefined {
    return cart.find((c) => c.listing_id === item.listing_id);
  }
  function mapAddItemToCartItem(item: CartAddItem): CartItem {
    return {
      ...item,
      quantity: 1,
    };
  }

  // -------------------------
  // Cart Actions
  // -------------------------
  const addToCart = (item: CartAddItem) => {
    // If already exists in cart, increase quantity instead
    const existing = cart.find((n) => n.listing_id === item.listing_id);
    if (existing) {
      increaseQuantity({ listing_id: item.listing_id });
      toast.success("Product added successfully");
      return;
    }
    const cartItem = mapAddItemToCartItem(item);
    setCart((prev) => [...prev, cartItem]);
    buyerId ? syncOperationToServer("add", cartItem) : scheduleSync();

    toast.success("Product added successfully");
  };

  const removeItem = (item: CartOpItem) => {
    setCart((prev) => prev.filter((n) => n.listing_id !== item.listing_id));

    if (buyerId) {
      const cartItem = findCartItemById(item);
      if (cartItem) syncOperationToServer("remove", cartItem);
    } else {
      scheduleSync();
    }
    toast.success("Product removed successfully");
  };

  const increaseQuantity = (item: CartOpItem) => {
    setCart((prev) => {
      const updated = prev.map((n) =>
        n.listing_id === item.listing_id
          ? { ...n, quantity: (n.quantity || 1) + 1 }
          : n
      );
      const updatedItem = updated.find((n) => n.listing_id === item.listing_id);
      if (buyerId && updatedItem)
        syncOperationToServer("update_quantity", updatedItem);
      else scheduleSync();
      return updated;
    });
    toast.success("Item quantity updated");
  };

  const decreaseQuantity = (item: CartOpItem) => {
    setCart((prev) => {
      const existing = prev.find((n) => n.listing_id === item.listing_id);
      if (!existing) return prev;

      if (existing.quantity > 1) {
        const updated = prev.map((n) =>
          n.listing_id === item.listing_id
            ? { ...n, quantity: n.quantity - 1 }
            : n
        );
        const updatedItem = updated.find(
          (n) => n.listing_id === item.listing_id
        );
        if (buyerId && updatedItem)
          syncOperationToServer("update_quantity", updatedItem);
        else scheduleSync();
        return updated;
      } else {
        if (buyerId) {
          const cartItem = findCartItemById(item);
          if (cartItem) syncOperationToServer("remove", cartItem);
        } else {
          scheduleSync();
        }
        return prev.filter((n) => n.listing_id !== item.listing_id);
      }
    });
    toast.success("Item quantity updated");
  };

  const mergeCartFromServer = useCallback(async (buyerId: string) => {
    try {
      const response = await fetch("/api/buyer/cart/cartMerge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buyerId }),
      });

      const data = await response.json();

      if (data.success && data.mergedCart) {
        setCart(data.mergedCart);
      }
    } catch {
      toast.error("Failed to sync cart");
    }
  }, []);

  return React.createElement(
    CartContext.Provider,
    {
      value: {
        cart,
        setCart,
        cartCount,
        loading,
        addToCart,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        mergeCartFromServer,
      },
    },
    children
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
