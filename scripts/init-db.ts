import fs from 'fs';
import path from 'path';
import postgres from 'postgres';
import bcrypt from 'bcrypt';

// Load .env file manually so this script works outside Next's runtime
const loadDotEnv = () => {
  const envFiles = ['.env.local', '.env'];

  // Candidate directories: current working dir and the script's directory
  const scriptDir = (() => {
    try {
      const p = decodeURIComponent(new URL(import.meta.url).pathname);
      return path.resolve(p);
    } catch (e) {
      return process.cwd();
    }
  })();

  const candidates = [process.cwd(), path.dirname(scriptDir)];

  for (const dir of candidates) {
    for (const file of envFiles) {
      const p = path.join(dir, file);
      if (fs.existsSync(p)) {
        const content = fs.readFileSync(p, 'utf8');
        for (const line of content.split(/\r?\n/)) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) continue;
          const idx = trimmed.indexOf('=');
          if (idx === -1) continue;
          const key = trimmed.slice(0, idx).trim();
          let val = trimmed.slice(idx + 1).trim();
          if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
          if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
          if (!process.env[key]) process.env[key] = val;
        }
        return;
      }
    }
  }
  // Fallback: check inside the project folder if running from parent folder
  const fallback = path.join(process.cwd(), 'wdd430-handcraftedhaven', '.env');
  if (fs.existsSync(fallback)) {
    const content = fs.readFileSync(fallback, 'utf8');
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx).trim();
      let val = trimmed.slice(idx + 1).trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
      if (!process.env[key]) process.env[key] = val;
    }
    return;
  }
};

loadDotEnv();

// Debug: show which DB URL is being used (mask password)
const rawDb = process.env.DATABASE_URL || process.env.DATABASE_URL_NON_POOLING || process.env.DATABASE_URL_UNPOOLED || process.env.POSTGRES_URL;
if (!rawDb) console.warn('No DATABASE_URL found in environment');
else console.log('Using DATABASE_URL:', rawDb.replace(/:(.*)@/, ':***@'));

const sql = postgres(rawDb!);

async function initDatabase() {
  try {
    // Create users table if it doesn't exist (use UUID ids and include role)
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Ensure legacy installations get the `role` column without destructive changes
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) NOT NULL DEFAULT 'customer'`;

    // Add unified `name` and `password` columns if legacy columns exist
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS name VARCHAR(150)`;
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS password TEXT`;

    // Ensure legacy `pword` column exists and is nullable so new inserts that don't set it won't fail
    try {
      await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS pword TEXT`;
    } catch (e) {
      // ignore
    }
    try {
      // Use IF EXISTS defensive form when available; fall back if DB version doesn't support IF EXISTS here.
      await sql`ALTER TABLE users ALTER COLUMN pword DROP NOT NULL`;
    } catch (e) {
      // ignore if column doesn't exist or cannot be altered
    }

    // If unified `password` exists, copy it into legacy `pword` where pword is empty (non-destructive)
    try {
      await sql`UPDATE users SET pword = password WHERE (pword IS NULL OR pword = '') AND (password IS NOT NULL AND password <> '')`;
    } catch (e) {
      // ignore if update fails
    }

    // Debug: list existing columns
    try {
      const cols = await sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'users'`;
      console.log('Existing users columns:', cols.map((r: any) => r.column_name));
    } catch (e) {
      // ignore
    }

    // Populate unified fields from legacy columns when possible
    await sql`UPDATE users SET name = CONCAT_WS(' ', fname, lname) WHERE (name IS NULL OR name = '') AND (COALESCE(fname, '') <> '' OR COALESCE(lname, '') <> '')`;
    // Try to populate password from common legacy column names
    try {
      await sql`UPDATE users SET password = pword WHERE (password IS NULL OR password = '') AND pword IS NOT NULL`;
    } catch (_) {
      try {
        await sql`UPDATE users SET password = password_hash WHERE (password IS NULL OR password = '') AND password_hash IS NOT NULL`;
      } catch (_) {
        // ignore if neither legacy column exists
      }
    }

    // Ensure legacy `fname`/`lname` won't block inserts that use `name`
    try {
      // Copy `name` into `fname` when fname is NULL
      await sql`UPDATE users SET fname = name WHERE (fname IS NULL OR fname = '') AND (name IS NOT NULL AND name <> '')`;
      // Make fname/lname nullable to avoid NOT NULL constraint failures
      await sql`ALTER TABLE users ALTER COLUMN fname DROP NOT NULL`;
      await sql`ALTER TABLE users ALTER COLUMN lname DROP NOT NULL`;
    } catch (_) {
      // ignore if columns don't exist or operations fail
    }

    // If there's an account_type column, map it to role when role is default
    try {
      await sql`UPDATE users SET role = CASE WHEN account_type::text = 'seller' THEN 'seller' ELSE 'customer' END WHERE role IS NULL OR role = ''`;
    } catch (e) {
      // ignore if account_type doesn't exist or casting fails
    }

    // Ensure email uniqueness index exists (non-destructive)
    try {
      await sql`CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique ON users(email)`;
    } catch (e) {
      // ignore failures (e.g., duplicates exist)
    }

    // Optional: Create a test user (insert only if not exists)
    const testPassword = await bcrypt.hash('test123', 10);
    const existing = await sql`SELECT id FROM users WHERE email = ${'test@example.com'}`;
    if (existing.length === 0) {
      try {
        await sql`
          INSERT INTO users (name, email, password, role)
          VALUES ('Test User', 'test@example.com', ${testPassword}, 'customer')
        `;
      } catch (err) {
        // Fallback for legacy schema with fname/lname and pword
        try {
          await sql`
            INSERT INTO users (fname, lname, email, password, pword, role)
            VALUES ('Test', 'User', 'test@example.com', ${testPassword}, ${testPassword}, 'customer')
          `;
        } catch (err) {
          // If that fails too, ignore — DB likely has stricter constraints
        }
      }
    }

    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Database initialization failed:', error);
  } finally {
    await sql.end();
  }
}

initDatabase();