"use client";
import React, { useMemo, useState } from "react";
import { featuredProducts } from "../../lib/featuredProducts"; // new shared products

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  const [selectedSort, setSelectedSort] = useState<string>("Featured");

  // Toggle to true to show image URLs and console warnings for debugging
  const DEBUG_IMAGES = false;

  // Example product list; replace with real data/fetch as needed
  const products = useMemo(
    () => [
      { id: 1, title: "Handwoven Basket", price: 48, category: "Home", image: "https://images.unsplash.com/photo-1622153060419-468f83a0f8f8?q=80&w=1138&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", date: "2025-10-01" },
      { id: 2, title: "Silver Leaf Necklace", price: 78, category: "Jewelry", image: "https://plus.unsplash.com/premium_photo-1709033404514-c3953af680b4?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", date: "2025-11-05" },
      { id: 3, title: "Ceramic Mug Set", price: 32, category: "Home", image: "https://images.unsplash.com/photo-1762417582740-abd534d971b1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", date: "2025-09-20" },
      { id: 4, title: "Leather Wallet", price: 55, category: "Accessories", image: "https://source.unsplash.com/400x300/?wallet", date: "2025-08-14" },
      { id: 5, title: "Abstract Print", price: 120, category: "Art", image: "https://source.unsplash.com/400x300/?art+print", date: "2025-10-25" },
      { id: 6, title: "Beaded Bracelet", price: 22, category: "Jewelry", image: "https://source.unsplash.com/400x300/?bracelet", date: "2025-11-10" },
      { id: 7, title: "Wool Throw", price: 95, category: "Home", image: "https://source.unsplash.com/400x300/?blanket", date: "2025-07-02" },
      { id: 8, title: "Hand-painted Scarf", price: 45, category: "Accessories", image: "https://source.unsplash.com/400x300/?scarf", date: "2025-11-01" },
    ],
    []
  );

  // merge shop products with featuredProducts (featuredProducts take precedence when ids collide)
  const allProducts = useMemo(() => {
    const map = new Map<number, typeof products[0] | typeof featuredProducts[0]>();
    // add shop products first
    for (const p of products) map.set(p.id, p);
    // add featured products (overwrite if same id)
    for (const p of featuredProducts) map.set(p.id, p);
    return Array.from(map.values());
  }, [products]);

  // target categories (enforced order). These are the categories you requested.
  const TARGET_CATEGORIES = ["Pottery", "Wood", "Textiles", "Home", "Jewelry"];

  // helper: normalize a product into one of the target categories using title + original category
  function normalizeCategory(product: { title?: string; category?: string }) {
    const title = (product.title || "").toLowerCase();
    const cat = (product.category || "").toLowerCase();

    // quick heuristics based on title keywords and original category
    if (cat === "pottery" || title.includes("ceramic") || title.includes("mug") || title.includes("pot")) {
      return "Pottery";
    }
    if (cat === "wood" || title.includes("wood") || title.includes("wooden") || title.includes("bowl")) {
      return "Wood";
    }
    if (
      cat === "accessories" ||
      cat === "textiles" ||
      title.includes("wool") ||
      title.includes("scarf") ||
      title.includes("tote") ||
      title.includes("bag") ||
      title.includes("basket") ||
      title.includes("throw") ||
      title.includes("fabric") ||
      title.includes("handwoven") ||
      title.includes("leather")
    ) {
      return "Textiles";
    }
    if (cat === "home" || cat === "art" || title.includes("print") || title.includes("plant") || title.includes("holder")) {
      return "Home";
    }
    if (cat === "jewelry" || title.includes("necklace") || title.includes("bracelet") || title.includes("ring")) {
      return "Jewelry";
    }

    // fallback: if original category string matches one of the TARGET_CATEGORIES
    const normalized = TARGET_CATEGORIES.find((t) => t.toLowerCase() === cat);
    if (normalized) return normalized;

    // default to Home
    return "Home";
  }

  // produce normalizedProducts where every product.category belongs to TARGET_CATEGORIES
  const normalizedProducts = useMemo(() => {
    return allProducts.map((p) => ({ ...p, category: normalizeCategory(p) }));
  }, [allProducts]);

  // categories shown in UI (All + target list)
  const categories = useMemo(() => ["All", ...TARGET_CATEGORIES], []);

  // First filter by category, then apply sorting on normalizedProducts
  const filtered = useMemo(
    () => (selectedCategory === "All" ? normalizedProducts : normalizedProducts.filter((p) => p.category === selectedCategory)),
    [normalizedProducts, selectedCategory]
  );

  const sortedVisible = useMemo(() => {
    const copy = [...filtered];
    if (selectedSort === "Newest") {
      copy.sort((a, b) => new Date((b as any).date).getTime() - new Date((a as any).date).getTime());
    } else if (selectedSort === "Price: Low to High") {
      copy.sort((a, b) => (a as any).price - (b as any).price);
    } else if (selectedSort === "Price: High to Low") {
      copy.sort((a, b) => (b as any).price - (a as any).price);
    } // Featured keeps original order
    return copy;
  }, [filtered, selectedSort]);

  // small inline SVG placeholder (data URI) used as fallback when remote images fail
  const placeholderDataUri =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='#f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9CA3AF' font-size='18'>Image unavailable</text></svg>`
    );

  return (
    // mobile nav + top padding to avoid overlap
    <main className="min-h-screen bg-amber-50 text-gray-900 pt-16 md:pt-0">
      <nav className="md:hidden fixed top-0 left-0 right-0 bg-white/90 backdrop-blur border-b z-50">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-around text-sm font-medium">
          <a href="/" className="text-gray-800">Home</a>
          <a href="/shop" className="text-gray-800">Shop</a>
          <a href="/about" className="text-gray-800">About</a>
        </div>
      </nav>

      <section className="container mx-auto px-6 py-16">
        <header className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-3">Shop All</h1>
          <p className="text-lg text-gray-700">
            Browse our curated selection of handcrafted goods from talented makers.
            Use the filters to refine your search.
          </p>
        </header>

        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    selectedCategory === cat ? "bg-amber-600 text-white" : "bg-white border border-gray-200 text-gray-700 hover:bg-amber-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="category" className="text-sm font-medium text-gray-700">
                Category
              </label>
              <select id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="rounded-md border-gray-200 bg-white px-3 py-2 shadow-sm">
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                Sort
              </label>
              <select id="sort" value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)} className="rounded-md border-gray-200 bg-white px-3 py-2 shadow-sm">
                <option>Featured</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <section className="bg-white/80 dark:bg-gray-800/70 rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedVisible.map((product) => (
                <article key={product.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition">
                  <div className="relative h-44 bg-gray-100 overflow-hidden">
                    <img
                      src={(product as any).image || placeholderDataUri}
                      alt={(product as any).title || "Product image"}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        if (target.src !== placeholderDataUri) target.src = placeholderDataUri;
                        if (DEBUG_IMAGES) {
                          // log failing URL and product id so you can inspect Network tab
                          console.warn(`Product image failed to load`, {
                            id: product.id,
                            url: (product as any).image,
                          });
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition pointer-events-auto flex items-end p-3">
                        <div className="w-full flex items-center justify-between text-white">
                          <span className="font-semibold bg-black/30 px-2 py-1 rounded">${(product as any).price}</span>
                          <a
                            href="#"
                            className="inline-block px-3 py-1 text-sm bg-amber-600 text-white rounded hover:bg-amber-700"
                            onClick={(e) => e.preventDefault()}
                          >
                            View
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {DEBUG_IMAGES && (
                    <div className="px-4 pb-4">
                      <p className="text-xs text-gray-400 break-words">URL: {(product as any).image}</p>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-sm font-semibold">{(product as any).title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{(product as any).category}</p>
                  </div>
                </article>
              ))}
              {sortedVisible.length === 0 && (
                <p className="text-center text-gray-600 col-span-full">No products found for "{selectedCategory}"</p>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
