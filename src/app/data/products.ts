export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export const products = [
  {
    id: "1",
    name: "Vintage Leather Wallet",
    price: 45,
    category: "Accessories",
    image: "https://picsum.photos/seed/wallet/400/400",
    description: "A handcrafted leather wallet with classic stitching and a premium smooth finish."
  },
  {
    id: "2",
    name: "Handmade Ceramic Mug",
    price: 25,
    category: "Home Decor",
    image: "https://picsum.photos/seed/mug/400/400",
    description: "Artisan ceramic mug glazed at high temperature for durability and style."
  },
  {
    id: "3",
    name: "Organic Cotton Tote Bag",
    price: 30,
    category: "Bags",
    image: "https://picsum.photos/seed/tote/400/400",
    description: "Eco-friendly tote bag made from 100% organic cotton fibers."
  },
  {
    id: "4",
    name: "Wooden Plant Stand",
    price: 55,
    category: "Furniture",
    image: "https://picsum.photos/seed/plantstand/400/400",
    description: "Minimalist wooden plant stand handcrafted using sustainable oak."
  },
  {
    id: "5",
    name: "Aroma Soy Candle",
    price: 18,
    category: "Candles",
    image: "https://picsum.photos/seed/candle/400/400",
    description: "Natural soy candle with lavender and eucalyptus scent."
  },
  {
    id: "6",
    name: "Handwoven Table Runner",
    price: 38,
    category: "Textiles",
    image: "https://picsum.photos/seed/tablerunner/400/400",
    description: "Rustic table runner woven with soft cotton threads."
  },
  {
    id: "7",
    name: "Resin Art Coaster Set",
    price: 28,
    category: "Home Decor",
    image: "https://picsum.photos/seed/coasters/400/400",
    description: "Set of four handmade resin coasters with ocean-themed swirl design."
  },
  {
    id: "8",
    name: "Beaded Minimalist Bracelet",
    price: 15,
    category: "Accessories",
    image: "https://picsum.photos/seed/bracelet/400/400",
    description: "Elegant handmade bracelet using natural stone beads."
  },
  {
    id: "9",
    name: "Crochet Bucket Hat",
    price: 35,
    category: "Apparel",
    image: "https://picsum.photos/seed/buckethat/400/400",
    description: "Colorful crochet bucket hat made with soft wool yarn."
  },
  {
    id: "10",
    name: "Laser-Cut Wooden Keychain",
    price: 12,
    category: "Accessories",
    image: "https://picsum.photos/seed/keychain/400/400",
    description: "Small wooden keychain with unique laser-engraved artwork."
  },
  {
    id: "11",
    name: "Hand-painted Canvas Art",
    price: 60,
    category: "Art",
    image: "https://picsum.photos/seed/canvasart/400/400",
    description: "Original abstract painting created with acrylic on canvas."
  },
  {
    id: "12",
    name: "Macramé Wall Hanging",
    price: 48,
    category: "Home Decor",
    image: "https://picsum.photos/seed/macrame/400/400",
    description: "Bohemian-style macramé wall hanging with organic cotton cords."
  },
  {
    id: "13",
    name: "Handcrafted Wooden Spoon",
    price: 20,
    category: "Kitchenware",
    image: "https://picsum.photos/seed/spoon/400/400",
    description: "Smoothly carved wooden spoon made from high-quality maple wood."
  },
  {
    id: "14",
    name: "Custom Engraved Cutting Board",
    price: 65,
    category: "Kitchenware",
    image: "https://picsum.photos/seed/cuttingboard/400/400",
    description: "Cutting board with personalized engraving, perfect for gifts."
  },
  {
    id: "15",
    name: "Natural Gemstone Necklace",
    price: 32,
    category: "Jewelry",
    image: "https://picsum.photos/seed/necklace/400/400",
    description: "Delicate necklace crafted with real gemstones and gold-plated chain."
  },
  {
    id: "16",
    name: "Handmade Clay Earrings",
    price: 22,
    category: "Jewelry",
    image: "https://picsum.photos/seed/earrings/400/400",
    description: "Lightweight and stylish clay earrings with unique patterns."
  },
  {
    id: "17",
    name: "Crochet Plush Toy",
    price: 40,
    category: "Toys",
    image: "https://picsum.photos/seed/plush/400/400",
    description: "Soft handmade crochet plush toy suitable for kids and collectors."
  },
  {
    id: "18",
    name: "Scented Bath Soap Bar",
    price: 10,
    category: "Bath & Body",
    image: "https://picsum.photos/seed/soap/400/400",
    description: "Organic soap bar blended with essential oils and shea butter."
  },
  {
    id: "19",
    name: "Artisan Journal Notebook",
    price: 28,
    category: "Stationery",
    image: "https://picsum.photos/seed/notebook/400/400",
    description: "Hand-bound journal with recycled paper and leather cover."
  },
  {
    id: "20",
    name: "Wooden Jewelry Box",
    price: 58,
    category: "Home Decor",
    image: "https://picsum.photos/seed/jewelrybox/400/400",
    description: "Beautiful wooden jewelry box with soft felt interior lining."
  },
  {
    id: "21",
    name: "Handcrafted Ceramic Vase",
    price: 42,
    category: "Home Decor",
    image: "https://picsum.photos/seed/vase/400/400",
    description: "Minimalist ceramic vase perfect for dried flowers or decor."
  },
  {
    id: "22",
    name: "Bamboo Desk Organizer",
    price: 34,
    category: "Office",
    image: "https://picsum.photos/seed/organizer/400/400",
    description: "Eco-friendly bamboo organizer for pens, notes, and accessories."
  },
  {
    id: "23",
    name: "Knitted Scarf",
    price: 27,
    category: "Apparel",
    image: "https://picsum.photos/seed/scarf/400/400",
    description: "Warm and cozy scarf hand-knitted with soft wool yarn."
  },
  {
    id: "24",
    name: "Rustic Candle Holder",
    price: 26,
    category: "Home Decor",
    image: "https://picsum.photos/seed/candleholder/400/400",
    description: "Handmade wooden candle holder with a rustic natural finish."
  },
  {
    id: "25",
    name: "Upcycled Denim Pouch",
    price: 19,
    category: "Bags",
    image: "https://picsum.photos/seed/pouch/400/400",
    description: "Eco-friendly pouch crafted from recycled denim materials."
  }
];
