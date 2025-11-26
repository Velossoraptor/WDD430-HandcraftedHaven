export default function reviewSummary() {
	return (
		<div className='space-y-4 overflow-y-auto flex-1  container mx-auto mb-10'>
			<form action='' method='post'>
                <legend className="text-xl font-bold mb-6">Write Review</legend>
				{/* Change name and id to match the column name in db */}
				<label className="block text-gray-700 text-sm font-bold mb-2">
					Stars (required){' '}
					<input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						type='number'
						name='stars'
						id='stars'
						max='5'
						min='0'
						required
					/>
				</label>
				<label className="block text-gray-700 text-sm font-bold mb-2">
					Title (required){' '}
					<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='text' name='title' id='title' required />
				</label>
				<label className="block text-gray-700 text-sm font-bold mb-2">
					Review <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='text' name='review' id='review' />
				</label>
				<input className="bg-transparent hover:bg-amber-900 text-amber-800 font-semibold hover:text-white py-2 px-4 border border-amber-900 hover:border-transparent rounded hover:cursor-pointer" type='submit' value='Submit Review' title='submit' />
			</form>
		</div>
	);
}
