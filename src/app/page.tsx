import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import Link from "next/link";
import pool from "@/_lib/vendor/db";
import { NextResponse } from "next/server";

export default async function HomePage() {
  // Query the database and return products
  const retrieveData = await pool.query("SELECT * FROM products");
  if (!retrieveData) {
    return NextResponse.json(
      { success: false, message: "Failed to retrieve products" },
      { status: 500 }
    );
  }
  const products = retrieveData.rows;

  return (
    // add mobile nav (visible on small screens) and pad main on mobile to avoid overlap
    <main className="min-h-screen bg-amber-50 text-gray-900 pt-16 md:pt-0">
      <nav className="md:hidden fixed top-0 left-0 right-0 bg-white/90 backdrop-blur border-b z-50">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-around text-sm font-medium">
          <Link href="/" className="text-gray-800">
            Home
          </Link>
          <Link href="/shop" className="text-gray-800">
            Shop
          </Link>
          <Link href="/about" className="text-gray-800">
            About
          </Link>
        </div>
      </nav>
      <Hero />
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Explore Handcrafted Treasures
        </h2>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
