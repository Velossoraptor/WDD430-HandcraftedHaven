import { Button } from "@/components/ui/Button";
import { Plus, Minus, Trash } from "lucide-react";
import { CartItem } from "../types";

interface CartActionButtonProps {
  item: CartItem;
  className?: string;
  increaseQuantity?: (item: CartItem) => void;
  decreaseQuantity?: (item: CartItem) => void;
  removeItem?: (item: CartItem) => void;
}

export function IncrementItemBtn({
  increaseQuantity,
  item,
}: CartActionButtonProps) {
  if (!increaseQuantity) return null;

  return (
    <Button
      onClick={() => increaseQuantity(item)}
      className="bg-amber-500 hover:bg-amber-600 text-white p-1 rounded-md"
      aria-label="Increase quantity"
    >
      <Plus size={16} />
    </Button>
  );
}

export function DecrementItemBtn({
  decreaseQuantity,
  item,
}: CartActionButtonProps) {
  if (!decreaseQuantity) return null;

  return (
    <Button
      onClick={() => decreaseQuantity(item)}
      className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-md"
      aria-label="Decrease quantity"
      disabled={item.quantity <= 1}
    >
      <Minus size={16} />
    </Button>
  );
}

export function RemoveItemBtn({
  removeItem,
  item,
  className = "",
}: CartActionButtonProps) {
  if (!removeItem) return null;

  return (
    <Button
      onClick={() => removeItem(item)}
      className={`text-red-400 dark:text-red-300 hover:bg-red-300 hover:text-red-700 rounded transition px-2 flex items-center gap-2 transition-background cursor-pointer ${className}`}
      aria-label="Remove item"
    >
      <Trash size={16} className="mr-1" />
      Remove
    </Button>
  );
}
