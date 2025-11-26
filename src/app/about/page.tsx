import React from "react";

export default function AboutPage() {
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
      <section className="container mx-auto px-6 py-20">
        <div className="bg-white/80 dark:bg-gray-800/70 rounded-xl shadow-lg p-8 md:p-12">
          <header className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold mb-3">About Us</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Handcrafted Haven is a community-driven marketplace celebrating artisans and makers.
              We curate unique, high-quality handmade goods and connect creators with customers who value craft.
            </p>
          </header>

          <div className="mt-10 grid gap-8 md:grid-cols-2 items-start">
            <article className="prose max-w-none dark:prose-invert">
              <h2 className="text-2xl font-semibold">Our Mission</h2>
              <p>
                To support independent makers by providing a platform that amplifies their work
                and helps buyers discover meaningful, responsibly made products. We prioritize
                fairness, transparency, and sustainability in every connection we facilitate.
              </p>

              <h3 className="mt-6 text-xl font-medium">What We Value</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Quality craftsmanship</li>
                <li>Transparent, fair practices</li>
                <li>Sustainable materials and processes</li>
                <li>Supporting small creative businesses</li>
              </ul>
            </article>

            <aside className="flex flex-col gap-6">
              <div className="rounded-lg border border-gray-100 p-6 bg-amber-50">
                <h4 className="text-lg font-semibold mb-2">Why choose us?</h4>
                <p className="text-sm text-gray-700">
                  Every item is selected with care. We spotlight makers who create with intention,
                  use quality materials, and treat customers and suppliers with respect.
                </p>
              </div>

              <div className="rounded-lg p-6 bg-white shadow-sm">
                <h4 className="text-lg font-semibold mb-2">Contact</h4>
                <p className="text-sm text-gray-700 mb-4">
                  For inquiries or to join our maker community, email:
                  <br />
                  <a
                    className="text-amber-600 hover:underline"
                    href="mailto:hello@handcraftedhaven.example"
                  >
                    hello@handcraftedhaven.example
                  </a>
                </p>
                <a
                  className="inline-block px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
                  href="mailto:hello@handcraftedhaven.example"
                >
                  Get in touch
                </a>
              </div>

              <div className="rounded-lg p-6 bg-white/50 border border-dashed border-gray-200 text-sm text-gray-600">
                <strong className="block mb-1">Community</strong>
                <p>Join our newsletter and maker events to stay connected.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
