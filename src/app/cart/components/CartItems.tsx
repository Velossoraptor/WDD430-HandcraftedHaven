import Image from "next/image";
import {
  IncrementItemBtn,
  DecrementItemBtn,
  RemoveItemBtn,
} from "./productCartActionBtns";
import { CartItem } from "../types";

interface CartItemsProps {
  displayCart: CartItem[];
  removeItem: (item: CartItem) => void;
  increaseQuantity: (item: CartItem) => void;
  decreaseQuantity: (item: CartItem) => void;
}

export default function CartItems({
  displayCart,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
}: CartItemsProps) {
  return (
    <div className="w-full md:w-[70%]">
      {displayCart.map((item) => (
        <div
          key={item.product_name}
          className="mb-4 py-2 bg-white dark:bg-gray-700 rounded h-fit "
        >
          <p className="font-semibold p-3 text-(--foreground) text-lg border-b border-(--background)">
            Cart ({item.quantity})
          </p>
          <div className="flex relative justify-between p-3 pb-15">
            <div className="flex gap-3">
              <div>
                <Image
                  priority
                  src={item.product_image}
                  alt={`${item.product_name} Image`}
                  width={500}
                  height={500}
                  style={{
                    objectFit: "cover",
                    width: "100px",
                    height: "auto",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div className="text-lg">
                <p className="font-semibold">{item.product_name}</p>
              </div>
              <RemoveItemBtn
                className="absolute left-3 bottom-0"
                removeItem={removeItem}
                item={item}
              />
            </div>

            <div>
              <p className="font-normal text-lg">
                &#x20A6; {new Intl.NumberFormat().format(item.price)}
              </p>
              <div className="absolute bottom-0 right-3 flex items-center">
                <div className="flex items-center gap-4">
                  <DecrementItemBtn
                    decreaseQuantity={decreaseQuantity}
                    item={item}
                  />
                  <span className="text-lg">{item.quantity}</span>
                  <IncrementItemBtn
                    increaseQuantity={increaseQuantity}
                    item={item}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
