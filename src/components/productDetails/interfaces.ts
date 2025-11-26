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

export interface ProductInformation{
  productName: string;
  productId: number;
  productImage: string;
  productDesc: string;
  productPrice: number;
  sellerName: string;
  sellerId: number;
  sellerImage: string;
}

export interface ProductSummaryProps {
  productInfo: ProductInformation;
}