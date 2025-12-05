"use client";

import Image from "next/image";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Draft" | "Low Stock";
  image: string;
}

// Generate 50 mock products
const mockProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: `P${(i + 1).toString().padStart(3, "0")}`,
  name: `Product ${(i + 1).toString().padStart(2, "0")}`,
  category: ["Pottery", "Woodwork", "Jewelry", "Bath & Body", "Art"][i % 5],
  price: parseFloat((Math.random() * 100 + 5).toFixed(2)),
  stock: Math.floor(Math.random() * 50),
  status: ["Active", "Draft", "Low Stock"][i % 3] as "Active" | "Draft" | "Low Stock",
  image: `https://picsum.photos/seed/product${i + 1}/400/400`,
}));

const getStatusBadge = (status: Product["status"]) => {
  switch (status) {
    case "Active":
      return (
        <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
          Active
        </span>
      );
    case "Draft":
      return (
        <span className="px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">
          Draft
        </span>
      );
    case "Low Stock":
      return (
        <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">
          Low Stock
        </span>
      );
  }
};

export default function MarketplacePage() {
  return (
    <div className="p-6 md:p-10 space-y-6 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center pb-4 border-b">
        <h1 className="text-3xl font-extrabold text-gray-800">Marketplace</h1>
        <Link
          href="/dashboard/products/new"
          className="flex items-center bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-150"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Product
        </Link>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockProducts.map((product) => (
          <Link
            key={product.id}
            href={`/marketplace/${product.id}`}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <div className="relative w-full h-64">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-sm font-semibold text-gray-700">${product.price.toFixed(2)}</p>
              <p className="text-sm font-bold text-gray-700">
                Stock: <span className={product.stock <= 5 ? "text-red-600" : ""}>{product.stock}</span>
              </p>
              <div>{getStatusBadge(product.status)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
