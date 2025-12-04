// In src/components/productDetails/ProductCartActionBtns.tsx
"use client";
import { useCartContext } from "@/components/context/CartContext";
import { ShoppingCart, Plus, Minus, Trash } from "lucide-react";
import React from "react";

interface CartItem {
  listing_id: string;
  quantity: number;
  product_image: string;
  product_name: string;
  price: number;
}

interface ProductCartActionsProps {
  product: CartItem;
}

export function ProductCartActions({ product }: ProductCartActionsProps) {
  const {
    cart,
    addToCart,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    loading,
  } = useCartContext();

  const itemForCart = {
    listing_id: product.listing_id,
    product_image: product.product_image,
    product_name: product.product_name,
    price: product.price,
    quantity: product.quantity || 1,
  };

  const cartItem = cart.find((n) => n.listing_id === itemForCart.listing_id);
  const itemInCart = !!cartItem;
  const itemQuantity = cartItem?.quantity || 0;

  if (loading) {
    return (
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="h-10 w-10 mt-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
          <div className="h-10 w-10 mt-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
        </div>
        <div className="h-10 w-10 mt-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
      </div>
    );
  }

  if (itemInCart) {
    return (
      <div className="flex justify-between items-center mt-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              decreaseQuantity({ listing_id: itemForCart.listing_id })
            }
            className="bg-amber-500 hover:bg-amber-600 text-white shadow-md p-2 flex items-center cursor-pointer rounded-md"
          >
            <Minus size={16} />
          </button>
          <span className="text-lg">{itemQuantity}</span>
          <button
            onClick={() =>
              increaseQuantity({ listing_id: itemForCart.listing_id })
            }
            className="bg-amber-500 hover:bg-amber-600 text-white shadow-md p-2 flex items-center cursor-pointer rounded-md"
          >
            <Plus size={16} />
          </button>
        </div>
        <button
          className="text-red-400 dark:text-red-300 hover:bg-red-100 hover:text-red-700 rounded transition px-3 py-2 flex items-center gap-2 cursor-pointer"
          onClick={() => removeItem({ listing_id: itemForCart.listing_id })}
        >
          <Trash size={16} />
          <span>Remove</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => addToCart(itemForCart)}
      className="w-full hover:bg-amber-900 text-amber-800 font-semibold hover:text-white py-2 px-4 border border-amber-900 hover:border-transparent rounded hover:cursor-pointer flex items-center justify-center gap-4"
    >
      <ShoppingCart size={18} />
      <span>Add to Cart</span>
    </button>
  );
}
