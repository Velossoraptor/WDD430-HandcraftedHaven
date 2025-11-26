import { ProductSummaryProps } from './interfaces';
import VendorCard from './vendorCard';
import Image from 'next/image';

export default function ProductSummary({ productInfo }: ProductSummaryProps) {
	return (
		<section className='container mx-auto mb-3'>
			<div className='flex'>
				{/* Left section; Contains product image */}
				<div className='w-1/2'>
					<Image
						src={productInfo.productImage}
						alt={`${productInfo.productName} picture`}
						width={800}
						height={800}
						className='w-full h-full object-cover'
					/>
				</div>

				{/* Right section; Contains vendor info, and product info */}
				<div className='w-1/2 flex flex-col justify-between p-6'>
					{/* Top Right Section; Vendor */}
					<div className='self-start'>
						<VendorCard productInfo={productInfo} />
					</div>

					{/* Bottom Right Section; Product */}
					<ul className='self-start mt-4'>
						<li>
							<b>Price:</b> ${productInfo.productPrice}
						</li>
						<li>
							<b>Description:</b> {productInfo.productDesc}
						</li>
						<li>
							{/* This button should provide a function to add to cart with a message indicating success/fail and either return to main shopping view, or to see the cart. */}
							<button id="addToCart" className="bg-transparent hover:bg-amber-900 text-amber-800 font-semibold hover:text-white py-2 px-4 border border-amber-900 hover:border-transparent rounded hover:cursor-pointer">Add to Cart</button>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
}
