import Link from "next/link";

interface CartItemSummaryProps {
  cartCount: number;
  cartTotal: number;
}

export default function CartItemSummary({
  cartCount,
  cartTotal,
}: CartItemSummaryProps) {
  return (
    <div className="w-full h-full md:w-[30%] bg-white dark:bg-gray-700 rounded-md">
      <div className="divide-y divide-gray-700 font-normal">
        <h1 className="p-2 text-lg">Cart Summary</h1>
        <div className="flex justify-between p-2">
          <p>Item's total ({cartCount})</p>
          <p className="text-sm">
            &#x20A6; {new Intl.NumberFormat().format(cartTotal)}
          </p>
        </div>
        <div className="flex justify-between p-2 ">
          <p>Subtotal</p>
          <p className="text-lg">
            {" "}
            &#x20A6; {new Intl.NumberFormat().format(cartTotal)}
          </p>
        </div>
        <div className="p-2">
          <Link
            href="/checkout/summary"
            className="cursor-pointer text-center block mx-auto shadow hover:shadow-md transition transition-background bg-amber-500 hover:bg-amber-600 p-2 rounded text-white"
          >
            Checkout &#x20A6; {new Intl.NumberFormat().format(cartTotal)}
          </Link>
        </div>
      </div>
    </div>
  );
}
