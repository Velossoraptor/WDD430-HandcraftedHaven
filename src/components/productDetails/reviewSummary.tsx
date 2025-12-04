'use client';
import { CreateReviewProps } from './interfaces';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ReviewSummary({
	listingId,
	customerId,
}: CreateReviewProps) {
	const router = useRouter();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const response = await fetch('/api/buyer/review/operations', {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			toast.error('Failed to submit review');
			return;
		}

		toast.success('Review submitted!');

		//refresh page to update reviews
		router.refresh();
	};
	return (
		<div className='space-y-4 overflow-y-auto flex-1  container mx-auto mb-10'>
			<form onSubmit={handleSubmit}>
				<input type='hidden' name='listing_id' value={listingId} />
				<input type='hidden' name='customer_id' value={customerId} />
				<legend className='text-xl font-bold mb-6'>Write Review</legend>
				{/* Change name and id to match the column name in db */}
				<label className='block text-gray-700 text-sm font-bold mb-2'>
					Stars (required){' '}
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='number'
						name='rating'
						id='rating'
						max='5'
						min='0'
						required
					/>
				</label>
				<label className='block text-gray-700 text-sm font-bold mb-2'>
					Review{' '}
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='text'
						name='feedback'
						id='feedback'
					/>
				</label>
				<input
					className='bg-transparent hover:bg-amber-900 text-amber-800 font-semibold hover:text-white py-2 px-4 border border-amber-900 hover:border-transparent rounded hover:cursor-pointer'
					type='submit'
					value='Submit Review'
					title='submit'
				/>
			</form>
		</div>
	);
}
