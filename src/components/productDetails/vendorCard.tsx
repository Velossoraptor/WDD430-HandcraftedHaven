import { ProductSummaryProps } from './interfaces';
import Image from 'next/image';

export default function VendorCard({ productInfo }: ProductSummaryProps) {
	return (
		<div>
			<a
				href='' /* The Link should lead to their seller page by productInfo.sellerId*/
			>
				<Image
					src={productInfo.sellerImage}
					alt={`${productInfo.sellerName}'s Profile Picture`}
					className='rounded-full'
					width={200}
					height={200}
				/>
				<p>Sold by: {productInfo.sellerName}</p>
			</a>
		</div>
	);
}
