import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "Missing database connection string. Set POSTGRES_DATABASE_URL or DATABASE_URL in .env"
  );
}

const isLocal = process.env.NODE_ENV === "development";

const pool = new Pool({
  connectionString,
  ssl: isLocal ? { rejectUnauthorized: false } : { rejectUnauthorized: false },
});

export default pool;

// Get user by email
export async function getUserByEmail(email: string) {
  const { rows } = await pool.query("SELECT * FROM vendors WHERE email = $1", [
    email,
  ]);
  return rows[0] || null;
}

// Create user
export async function createUser(
  fname: string,
  lname: string,
  email: string,
  account_type: string,
  pword: string
) {
  const { rows } = await pool.query(
    `INSERT INTO vendors (fname, lname, email, account_type, pword) 
     VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    [fname, lname, email, account_type, pword]
  );
  return rows[0] || null; // rows[0].id will give the new user id
}

// Create listings
export async function createListings(
  account_id: string,
  product_image: string,
  product_name: string,
  description: string,
  price: number,
  stock: number,
  category: string
) {
  try {
    const result = await pool.query(
      `INSERT INTO products 
       (account_id, product_image, product_name, description, price, stock, category) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [
        account_id,
        product_image,
        product_name,
        description,
        price,
        stock,
        category,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Database error in createListings:", error);
    return null;
  }
}

// Fetch all items for a vendor dashboard
export async function fetchListedItems(account_id: number) {
  const result = await pool.query(
    `SELECT p.id, p.account_id, p.product_image, p.product_name, p.description, p.price, p.stock, p.category FROM products p WHERE p.account_id = $1 ORDER BY p.id DESC`,
    [account_id]
  );
  return result.rows;
}

// Fetch single item for item edit in dashboard by search param
export async function filterItemForSearchParams(
  account_id: number,
  searchParams: number
) {
  const result = await pool.query(
    `SELECT p.id, p.account_id, p.product_image, p.product_name, p.description, p.price, p.stock, p.category 
     FROM products p WHERE p.account_id = $1 AND p.id = $2`,
    [account_id, searchParams]
  );
  return result.rows[0];
}
