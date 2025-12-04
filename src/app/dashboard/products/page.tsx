// This file assumes it is located at: src/app/dashboard/products/page.tsx
"use client";

import DashboardLayout from "@/app/layout/DashboardLayout";
import Link from "next/link";
import { PlusCircle, Edit, Trash2, Package } from "lucide-react";

// --- Mock Data ---
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Draft" | "Low Stock";
}

const mockProducts: Product[] = [
  {
    id: "P001",
    name: "Hand-Painted Ceramic Mug",
    category: "Pottery",
    price: 25.5,
    stock: 15,
    status: "Active",
  },
  {
    id: "P002",
    name: "Rustic Oak Cutting Board",
    category: "Woodwork",
    price: 55.0,
    stock: 3,
    status: "Low Stock",
  },
  {
    id: "P003",
    name: "Beaded Leather Bracelet",
    category: "Jewelry",
    price: 18.0,
    stock: 0,
    status: "Draft",
  },
  {
    id: "P004",
    name: "Lavender Scented Soap Bar",
    category: "Bath & Body",
    price: 7.99,
    stock: 40,
    status: "Active",
  },
];

// Helper function for status badges
const getStatusBadge = (status: Product["status"]) => {
  switch (status) {
    case "Active":
      return (
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-800">
          Active
        </span>
      );
    case "Draft":
      return (
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
          Draft
        </span>
      );
    case "Low Stock":
      return (
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-800">
          Low Stock
        </span>
      );
  }
};

export default function ProductListingsPage() {
  // Functionality placeholders (these would call your Node.js API)
  const handleEdit = (id: string) => {
    console.log(`Editing product: ${id}`);
  };
  const handleDelete = (id: string) => {
    if (confirm(`Are you sure you want to delete product ${id}?`)) {
      console.log(`Deleting product: ${id}`);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 md:p-10 space-y-8 bg-gray-50">
        {/* Header and Actions */}
        <header className="flex justify-between items-center pb-4 border-b">
          <h1 className="text-3xl font-extrabold text-amber-900 flex items-center">
            <Package
              className="w-8 h-8 mr-3 text-amber-600"
              aria-hidden="true"
            />
            My Product Listings
          </h1>

          {/* Create New Product Button */}
          <Link
            href="/dashboard/products/new"
            className="flex items-center bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-150"
          >
            <PlusCircle className="w-5 h-5 mr-2" aria-hidden="true" />
            New Listing
          </Link>
        </header>

        {/* --- Product Table --- */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {mockProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-amber-50 transition duration-100"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                      ${product.price.toFixed(2)}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm font-bold"
                      style={{
                        color:
                          product.stock <= 5 && product.stock > 0
                            ? "#cc3300"
                            : "inherit",
                      }}
                    >
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(product.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 transition duration-150"
                        aria-label={`Edit ${product.name}`}
                      >
                        <Edit className="w-5 h-5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition duration-150"
                        aria-label={`Delete ${product.name}`}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer/Pagination Placeholder */}
          <div className="p-4 border-t text-sm text-gray-600 flex justify-end">
            Showing 1 to {mockProducts.length} of {mockProducts.length} results.
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
