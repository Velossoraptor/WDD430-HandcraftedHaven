import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product_name: string;
  price: number;
  product_image: string; // This prop is now correctly used
  category: string;
  listing_id: string;
}

export default function ProductCard({
  product_name,
  price,
  product_image,
  category,
  listing_id,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col">
      {/* 🖼️ Image Area */}
      <Link href={`/products/${listing_id}`}>
        <div className="relative w-full aspect-square overflow-hidden rounded-xl mb-4">
          <Image
            src={product_image}
            alt={`Handcrafted ${product_name}`}
            width={400}
            height={400}
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* 🏷️ Product Details */}
        <p className="text-sm text-gray-500 mt-1">{category}</p>
        <h3 className="text-lg font-semibold truncate mt-1">{product_name}</h3>
        <p className="text-xl text-amber-700 font-bold mt-2">${price}</p>
      </Link>
    </div>
  );
}
