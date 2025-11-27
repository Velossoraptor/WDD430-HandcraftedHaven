import Image from 'next/image';

interface ProductCardProps {
  name: string;
  price: number;
  image: string; // This prop is now correctly used
  category: string;
}

export default function ProductCard({ name, price, image, category }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col">
      
      {/* 🖼️ Image Area */}
      <div className="relative w-full aspect-square overflow-hidden rounded-xl mb-4">
        <Image
          src={image} 
          alt={`Handcrafted ${name}`}
          width={400} 
          height={400} 
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* 🏷️ Product Details */}
      <p className="text-sm text-gray-500 mt-1">{category}</p>
      <h3 className="text-lg font-semibold truncate mt-1">{name}</h3>
      <p className="text-xl text-amber-700 font-bold mt-2">${price.toFixed(2)}</p>
    </div>
  );
}