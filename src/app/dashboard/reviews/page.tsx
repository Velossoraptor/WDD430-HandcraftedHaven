import { Star, MessageSquare } from 'lucide-react';
import React from 'react';

// --- Mock Data ---
interface Review {
  id: number;
  productName: string;
  rating: number;
  comment: string;
  customerName: string;
  date: string;
}

const mockReviews: Review[] = [
  { id: 4, productName: "Ceramic Mug Set", rating: 5, comment: "High quality craftsmanship. Will order again!", customerName: "C. Buyer", date: "2025-11-18" },
  { id: 3, productName: "Rustic Wooden Bowl", rating: 5, comment: "Beautifully made and fast shipping! Thank you.", customerName: "A. Customer", date: "2025-11-17" },
  { id: 2, productName: "Hand-Knitted Scarf", rating: 4, comment: "The color is perfect, but it arrived a day late.", customerName: "B. Shopper", date: "2025-11-16" },
  { id: 1, productName: "Leather Wallet", rating: 3, comment: "Good quality, but smaller than expected from the photos.", customerName: "D. Client", date: "2025-11-15" },
];

const renderStars = (rating: number) => (
    <div className="flex items-center text-amber-500">
        {Array(rating).fill(0).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-500" aria-hidden="true" />
        ))}
        {Array(5 - rating).fill(0).map((_, i) => (
            <Star key={i} className="w-4 h-4 text-gray-300" aria-hidden="true" />
        ))}
    </div>
);

export default function ReviewsPage() {
  return (
    <div className="p-6 md:p-10 space-y-8 bg-gray-50">
        
        {/* Header */}
        <header className="pb-4 border-b">
          <h1 className="text-3xl font-extrabold text-amber-900 flex items-center">
             <Star className="w-8 h-8 mr-3 text-amber-600" aria-hidden="true" />
             Customer Reviews
          </h1>
          <p className="text-gray-600 mt-1">View and respond to all feedback left by your customers.</p>
        </header>

        {/* --- Reviews List --- */}
        <div className="bg-white rounded-xl shadow-lg divide-y divide-gray-100">
          {mockReviews.map((review) => (
            <div key={review.id} className="p-6 hover:bg-amber-50 transition duration-100">
              <div className="flex justify-between items-start">
                {/* Rating and Product Info */}
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    {renderStars(review.rating)}
                    <span className="text-sm font-medium text-gray-700">({review.rating}.0)</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{review.productName}</p>
                </div>

                {/* Date and Customer */}
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">{review.customerName}</p>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>

              {/* Review Comment */}
              <div className="mt-3 p-4 bg-gray-50 border border-gray-100 rounded-lg">
                <div className="flex items-start">
                    <MessageSquare className="w-4 h-4 text-gray-500 mt-1 shrink-0" />
                    <p className="ml-3 text-base text-gray-800 italic">
                        {review.comment}
                    </p>
                </div>
              </div>

              {/* Action Button Placeholder */}
              <div className="mt-4 pt-3 border-t border-dashed text-right">
                <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    Reply to Review
                </button>
              </div>
            </div>
          ))}
          
          {/* Footer/Pagination Placeholder */}
          <div className="p-4 text-sm text-gray-600 flex justify-end">
            Showing 1 to {mockReviews.length} of {mockReviews.length} total reviews.
          </div>
        </div>

      </div>
  );
}