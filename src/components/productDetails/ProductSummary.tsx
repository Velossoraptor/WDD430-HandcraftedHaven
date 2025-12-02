import { ProductSellerInfoProps, ProductCartProps } from "./interfaces";
import VendorCard from "./vendorCard";
import Image from "next/image";
import { ProductCartActions } from "./ProductCartActionBtns";

export default function ProductSummary({
  productInfo,
  sellerInfo,
}: {
  productInfo: ProductCartProps;
  sellerInfo: ProductSellerInfoProps;
}) {
  return (
    <section className="container mx-auto mb-3">
      <div className="flex">
        {/* Left section; Contains product image */}
        <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-[300px] aspect-square">
          <Image
            src={productInfo.product_image}
            alt={`${productInfo.product_name} picture`}
            width={800}
            height={800}
            className="h-[300px] object-cover"
          />
        </div>

        {/* Right section; Contains vendor info, and product info */}
        <div className="w-1/2 flex flex-col justify-between p-6">
          {/* Top Right Section; Vendor */}
          <div className="self-start">
            <VendorCard sellerInfo={sellerInfo} />
          </div>

          {/* Bottom Right Section; Product */}
          <div className="self-start mt-4">
            <div className="mb-4">
              <h1 className="text-2xl font-bold">{productInfo.product_name}</h1>
              <p className="text-xl font-semibold mt-2">${productInfo.price}</p>
            </div>
            <p className="mb-6">{productInfo.description}</p>
            <ProductCartActions
              product={{
                listing_id: productInfo.listing_id,
                quantity: 1,
                product_image: productInfo.product_image,
                product_name: productInfo.product_name,
                price: productInfo.price,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
