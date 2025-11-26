import { Star } from 'lucide-react';
import { Review, ReviewProps } from './interfaces';

export default function reviews({ reviewData }: ReviewProps) {
	return (
		<div className='space-y-4 overflow-y-auto flex-1  container mx-auto '>
			<h3 className='text-xl font-bold mb-6'>Reviews</h3>
			{/* Need to figure out pagination here so that loading times decrease on products with a lot of reviews */}
			{reviewData.map((review) => (
				<div key={review.id} className='border-b last:border-b-0 pb-3'>
					<div className='flex justify-between items-center'>
						<span className='font-medium text-sm text-gray-900 truncate'>
							{review.productName}
						</span>
						<div className='flex items-center text-xs text-amber-500'>
							{/* 5-star rating visual placeholder */}
							{Array(review.rating)
								.fill(0)
								.map((_, i) => (
									<Star
										key={i}
										className='w-3 h-3 fill-amber-500'
										aria-hidden='true'
									/>
								))}
						</div>
					</div>
					<p className='text-sm text-gray-700 mt-1 italic line-clamp-2'>
						{review.comment}
					</p>
					<p className='text-xs text-gray-500 mt-1'>- {review.customerName}</p>
				</div>
			))}
		</div>
	);
}
