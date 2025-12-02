import { number } from "zod";

export interface Review {
  id: number;
  productName: string;
  rating: number;
  comment: string;
  customerName: string;
}

export interface ReviewProps {
  reviewData: Review[];
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
