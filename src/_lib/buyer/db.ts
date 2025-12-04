import pool from '@/_lib/vendor/db';

// Get user by email
export async function getUserByEmail(email: string) {
	const { rows } = await pool.query('SELECT * FROM buyers WHERE email = $1', [
		email,
	]);
	return rows[0] || null;
}

// Create user
export async function createUser(
	email: string,
	password_hash: string,
	name: string,
	auth_provider: string
) {
	const { rows } = await pool.query(
		`INSERT INTO buyers (email, password_hash, name, auth_provider) 
     VALUES ($1, $2, $3, $4)`,
		[email, password_hash, name, auth_provider]
	);
	return rows[0] || null;
}

// Creat cart items
export async function createCartItem(
	buyer_id: string,
	description: string,
	listing_name: string,
	price: number,
	product_image: string,
	quantity: number
) {
	const { rows } = await pool.query(
		`INSERT INTO customer_orders (buyer_id, description, listing_name, price, product_image, quantity) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
		[buyer_id, description, listing_name, price, product_image, quantity]
	);
	return rows[0] || null;
}

// Insert buyer cart items into the customer_orders table.
export async function createBuyerOrder(
	buyer_id: string,
	total_amount: number,
	status: string,
	payment_method: string,
	delivery_address: string
) {
	const { rows } = await pool.query(
		`INSERT INTO customer_orders (buyer_id, total_amount, status, payment_method, delivery_address) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
		[buyer_id, total_amount, status, payment_method, delivery_address]
	);
	return rows[0] || null;
}

export async function getCartItem(buyer_id: string) {
	const { rows } = await pool.query(
		'SELECT * FROM cart_items WHERE buyer_id = $1',
		[buyer_id]
	);
	return rows[0] || null;
}

export async function addReview(
	listing_id: string,
	customer_id: string,
	rating: number,
	feedback: string
) {
	const createdAtDate = new Date();
	const { rows } = await pool.query(
		`
      INSERT INTO reviews 
      (listing_id, customer_id, rating, feedback, created_at, updated_at) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      ON CONFLICT (listing_id, customer_id)
      DO UPDATE SET
         rating = EXCLUDED.rating,
         feedback = EXCLUDED.feedback,
         updated_at = EXCLUDED.updated_at
      RETURNING *`,
		[listing_id, customer_id, rating, feedback, createdAtDate, createdAtDate]
	);
	return rows[0];
}
