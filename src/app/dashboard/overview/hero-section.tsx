import Image from "next/image";
export function HeroSection() {
  return (
    <section className="relative w-full h-48 md:h-56 lg:h-64">
      <Image
        src="/dashboard-hero-img.jpg"
        alt="Dashboard Hero"
        fill
        className="object-cover rounded-md"
        priority
      />
      <div className="absolute inset-0 bg-black/40 rounded-md"></div>

      <div className="relative z-10 h-full flex flex-col justify-center items-center p-4 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Welcome Back, Vendor
        </h1>
        <p className="text-lg md:text-xl">Manage your products and orders</p>
      </div>
    </section>
  );
}
