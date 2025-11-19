import { Star, MessageSquare } from 'lucide-react';
import Link from 'next/link';

// --- Mock Data ---
interface Review {
  id: number;
  productName: string;
  rating: number;
  comment: string;
  customerName: string;
}

const mockReviews: Review[] = [
  { id: 1, productName: "Rustic Wooden Bowl", rating: 5, comment: "Beautifully made and fast shipping! Thank you.", customerName: "A. Customer" },
  { id: 2, productName: "Hand-Knitted Scarf", rating: 4, comment: "The color is perfect, but it arrived a day late.", customerName: "B. Shopper" },
  { id: 3, productName: "Ceramic Mug Set", rating: 5, comment: "High quality craftsmanship. Will order again!", customerName: "C. Buyer" },
];

const averageRating = 4.7;
const totalReviews = 45;

// --- Component ---
export default function ProfileSummary() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
        <Star className="w-5 h-5 text-amber-500 mr-2" aria-hidden="true" />
        Reviews & Profile
      </h2>

      {/* 📊 Rating Summary */}
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <div>
          <p className="text-5xl font-bold text-gray-900">
            {averageRating.toFixed(1)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Overall Shop Rating
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium text-gray-700">
            {totalReviews} Reviews
          </p>
          {/* 🟢 FIX: Updated Link usage */}
          <Link 
            href="/dashboard/reviews" 
            className="text-sm text-amber-700 hover:text-amber-900 font-medium transition duration-150 mt-1 block"
          >
            View All
          </Link>
        </div>
      </div>
      
      {/* 💬 Recent Reviews Feed */}
      <h3 className="text-base font-semibold mb-3 text-gray-800 flex items-center">
        <MessageSquare className="w-4 h-4 mr-2 text-gray-500" aria-hidden="true" />
        Latest Feedback
      </h3>

      <div className="space-y-4 overflow-y-auto flex-1">
        {mockReviews.map((review) => (
          <div key={review.id} className="border-b last:border-b-0 pb-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm text-gray-900 truncate">
                {review.productName}
              </span>
              <div className="flex items-center text-xs text-amber-500">
                {/* 5-star rating visual placeholder */}
                {Array(review.rating).fill(0).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-500" aria-hidden="true" />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-1 italic line-clamp-2">
              {review.comment}
            </p>
            <p className="text-xs text-gray-500 mt-1">- {review.customerName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}