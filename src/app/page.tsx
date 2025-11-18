import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid"; // The path was corrected here

export default function HomePage() {
  return (
    <main className="min-h-screen bg-amber-50 text-gray-900">
      <Hero />
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Explore Handcrafted Treasures
        </h2>
        <ProductGrid />
      </section>
    </main>
  );
}