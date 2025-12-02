"use client";
import { useCartContext } from "@/components/context/CartContext";
import EmptyCart from "@/app/cart/components/EmptyCart";
import CartItems from "@/app/cart/components/CartItems";
import CartItemSummary from "@/app/cart/components/CartItemSummary";

export function CartDetails() {
  // Use cart context for all cart state and actions
  const { cart, removeItem, increaseQuantity, decreaseQuantity, loading } =
    useCartContext();

  if (loading) return <p>Loading...</p>;

  const displayCart = cart;

  if (!displayCart || displayCart.length < 1) {
    return <EmptyCart />;
  }

  // Calculate cart total
  const cartTotal = displayCart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const cartCount = displayCart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <div className="m-4 md:m-10 gap-4 flex flex-col md:flex-row pb-10 text-(--foreground)">
      {/* Left side */}
      <CartItems
        displayCart={displayCart}
        removeItem={removeItem}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />

      {/* Right side */}
      <CartItemSummary cartCount={cartCount} cartTotal={cartTotal} />
    </div>
  );
}
