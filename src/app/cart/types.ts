// src/app/cart/types.ts
export interface CartItem {
  listing_id: string;
  quantity: number;
  product_image: string;
  product_name: string;
  price: number;
}

export interface CartContextType<T = CartItem[]> {
  cart: T;
  removeItem: (item: CartItem) => void;
  increaseQuantity: (item: CartItem) => void;
  decreaseQuantity: (item: CartItem) => void;
  loading: boolean;
}

export interface CartItemsProps {
  displayCart: CartItem[];
  removeItem: (item: CartItem) => void;
  increaseQuantity: (item: CartItem) => void;
  decreaseQuantity: (item: CartItem) => void;
}

export interface CartItemSummaryProps {
  cartCount: number;
  cartTotal: number;
}

export interface CartActionButtonProps {
  item: CartItem;
  className?: string;
  increaseQuantity?: (item: CartItem) => void;
  decreaseQuantity?: (item: CartItem) => void;
  removeItem?: (item: CartItem) => void;
}
