"use client";

import Image from "next/image";

// Props type: Simplified for Client Component context
interface ProductDetailProps {
  // params is guaranteed to be an object with the route segment 'id' in a page component
  params: {
    id: string; 
  };
}

// Product type
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Draft" | "Low Stock";
  image: string;
}

const LOADING_PRODUCT: Product = {
  id: 'loading...',
  name: 'Loading Product Details...',
  category: '...',
  price: 0.00,
  stock: 0,
  status: 'Draft',
  image: 'https://placehold.co/400x400/cccccc/333333?text=Loading',
};

// Helper function to get a product by ID
const fetchProduct = (id: string): Product => {
  if (id === 'loading-placeholder') {
      return LOADING_PRODUCT;
  }
  
  // id is now guaranteed to be a string here.
  const num = parseInt(id.replace(/\D/g, "")) || 0; // fallback if parse fails
  return {
    id,
    name: `Product ${id}`,
    category: ["Pottery", "Woodwork", "Jewelry", "Bath & Body", "Art"][num % 5],
    // Ensuring deterministic price calculation
    price: parseFloat(((num + 1) * 5 + 10).toFixed(2)), 
    stock: (num * 3) % 50, // deterministic stock
    status: ["Active", "Draft", "Low Stock"][num % 3] as "Active" | "Draft" | "Low Stock",
    image: `https://picsum.photos/seed/product${num}/400/400`,
  };
};

export default function ProductDetailPage({ params }: ProductDetailProps) {
  // Access params.id directly
  const id: string = params.id || 'loading-placeholder';

  const product = fetchProduct(id);
  
  // Conditional rendering for loading state
  if (id === 'loading-placeholder') {
    return (
      <div className="p-10 text-center bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">
          Loading product information...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center pb-4 border-b">
        <h1 className="text-3xl font-extrabold text-gray-800">{product.name}</h1>
      </header>

      {/* Product Card */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="w-full md:w-1/3 h-64 md:h-80 relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-4">
          <p className="text-gray-700 font-medium">Category: {product.category}</p>
          <p className="text-gray-700 font-semibold text-lg">
            Price: ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 font-bold">
            Stock: <span className={product.stock <= 5 ? "text-red-600" : ""}>{product.stock}</span>
          </p>
          <p>
            Status:{" "}
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                product.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : product.status === "Draft"
                  ? "bg-gray-200 text-gray-700"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
