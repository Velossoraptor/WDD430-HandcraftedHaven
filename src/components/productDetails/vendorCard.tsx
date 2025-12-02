import { ProductSellerInfoProps, ProductCartProps } from "./interfaces";
import Image from "next/image";

export default function VendorCard({
  sellerInfo,
}: {
  sellerInfo: ProductSellerInfoProps;
}) {
  return (
    <div>
      <a
        href="" /* The Link should lead to their seller page by productInfo.sellerId*/
      >
        {/* <Image
         src={sellerInfo.sellerImage}
          alt={`${sellerInfo.sellerName}'s Profile Picture`}
          className="rounded-full"
          width={200}
          height={200}
        />*/}
        <p>
          Sold by: {sellerInfo.fname} {sellerInfo.lname}
        </p>
      </a>
    </div>
  );
}
