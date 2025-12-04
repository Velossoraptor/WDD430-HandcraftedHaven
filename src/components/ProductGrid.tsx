import ProductCard from "./ProductCard";

/*
const products = [
  {
    name: "Handwoven Basket",
    price: 25.99,
    image: "/images/basket.jpg",
    category: "Home Decor",
  },
  {
    name: "Clay Pot",
    price: 40.0,
    image: "/images/pot.jpg",
    category: "Art",
  },
  {
    name: "Beaded Necklace",
    price: 18.5,
    image: "/images/necklace.jpg",
    category: "Jewelry",
  },
  {
    name: "Crystal Cristos",
    price: 55.75,
    image: "/images/sculpture.jpg",
    category: "Art",
  },
];*/

interface Product {
  listing_id: string;
  product_name: string;
  price: number;
  product_image: string;
  category: string;
}

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div id="products" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
}
