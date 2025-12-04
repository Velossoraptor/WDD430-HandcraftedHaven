import { number } from "zod";

export interface Review {
  id: string;
  listingId: string;
  customerId: string;
  rating: number;
  feedback: string;
  createdAt: Date;
  updatedAt: Date;
  fname: string;
  lname: string;
  productName: string;
}

export interface ReviewProps {
  reviewData: Review[];
}

export interface CreateReviewProps {
  listingId: string;
  customerId: string;
}

export interface ProductSellerInfoProps {
  fname: string;
  lname: string;
  //sellerId: string;
  //sellerImage: string;
}

export interface ProductCartProps {
  listing_id: string;
  product_image: string;
  product_name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

//export interface ProductSummaryProps {
//productInfo: ProductCartProps;
//sellerInfo: ProductSellerInfoProps;
//}
