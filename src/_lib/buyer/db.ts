import pool from "@/_lib/vendor/db";

// Get user by email
export async function getUserByEmail(email: string) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
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
  password_hash: string
) {
  const { rows } = await pool.query(
    `INSERT INTO users (fname, lname, email, account_type, pword) 
     VALUES ($1, $2, $3, $4, $5 ) RETURNING *`,
    [fname, lname, email, account_type, password_hash]
  );
  return rows[0] || null;
}
