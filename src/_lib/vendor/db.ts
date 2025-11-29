import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
   throw new Error("Missing database connection string. Set POSTGRES_DATABASE_URL or DATABASE_URL in .env");
}

const isLocal = process.env.NODE_ENV === "development";

const pool = new Pool({
   connectionString,
   ssl: isLocal ? { rejectUnauthorized: false } : { rejectUnauthorized: false },
});

export default pool;

// Get user by email
export async function getUserByEmail(email) {
   const { rows } = await pool.query("SELECT * FROM vendors WHERE email = $1", [email]);
   return rows[0] || null;
}

// Create user
export async function createUser(fname, lname, email, phone, user_state, account_type, pword) {
   const { rows } = await pool.query(
      `INSERT INTO vendors (fname, lname, email, phone, user_state, account_type, pword) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [fname, lname, email, phone, user_state, account_type, pword]
   );
   return rows[0] || null; // rows[0].id will give the new user id
}

// Upload vendor profile image
export async function uploadVendorProfileImage(vendor_id, profile_image_url) {
   const existing = await pool.query(`SELECT id FROM vendors WHERE id = $1 LIMIT 1`, [vendor_id]);
   if (existing.rows.length > 0) {
      const updated = await pool.query(`UPDATE vendors SET profile_image_url = $1 WHERE id = $2 RETURNING profile_image_url`, [
         profile_image_url,
         vendor_id,
      ]);
      return updated.rows[0]?.profile_image_url || null;
   }

   const inserted = await pool.query(`INSERT INTO vendors (id, profile_image_url) VALUES ($1, $2) RETURNING profile_image_url`, [
      vendor_id,
      profile_image_url,
   ]);
   return inserted.rows[0]?.profile_image_url || null;
}

// Retrieve updated profile image
export async function getUpdatedProfileImage(vendor_id) {
   const { rows } = await pool.query(`SELECT profile_image_url FROM vendors WHERE id = $1`, [vendor_id]);

   return rows[0]?.profile_image_url || null;
}

// Upsert vendor documents (by vendor_id) including business fields
export async function upsertVendorDocuments(
   vendor_id,
   business_name,
   hot_line_phone_number,
   address,
   business_desc,
   id_front_url,
   id_back_url,
   license_url
) {
   try {
      const existing = await pool.query(`SELECT id FROM vendor_documents WHERE vendor_id = $1 LIMIT 1`, [vendor_id]);
      if (existing.rows.length > 0) {
         const updated = await pool.query(
            `UPDATE vendor_documents SET business_name = COALESCE($2, business_name),
               hot_line_phone_number = COALESCE($3, hot_line_phone_number), address = COALESCE($4, address), business_desc = COALESCE($5, business_desc),
               id_front_url = COALESCE($6, id_front_url), id_back_url = COALESCE($7, id_back_url), license_url = COALESCE($8, license_url) WHERE vendor_id = $1 RETURNING *`,
            [
               vendor_id,
               business_name ?? null,
               hot_line_phone_number ?? null,
               address ?? null,
               business_desc ?? null,
               id_front_url ?? null,
               id_back_url ?? null,
               license_url ?? null,
            ]
         );
         return updated.rows[0];
      } else {
         const inserted = await pool.query(
            `INSERT INTO vendor_documents (vendor_id, business_name, hot_line_phone_number, address, business_desc, id_front_url, id_back_url, license_url)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [
               vendor_id,
               business_name ?? null,
               hot_line_phone_number ?? null,
               address ?? null,
               business_desc ?? null,
               id_front_url ?? null,
               id_back_url ?? null,
               license_url ?? null,
            ]
         );
         return inserted.rows[0];
      }
   } catch (error) {
      return null;
   }
}

// Upsert vendor bank account (by vendor_id)
export async function upsertVendorBankAccount(vendor_id, bank_name, account_name, account_number) {
   try {
      const existing = await pool.query(`SELECT id FROM vendor_bank_accounts WHERE vendor_id = $1 LIMIT 1`, [vendor_id]);
      if (existing.rows.length > 0) {
         // All three fields are NOT NULL in schema, only update when provided
         const updated = await pool.query(
            `UPDATE vendor_bank_accounts SET bank_name = COALESCE($1, bank_name), account_name = COALESCE($2, account_name), account_number = COALESCE($3, account_number) WHERE vendor_id = $4 RETURNING *`,
            [bank_name ?? null, account_name ?? null, account_number ?? null, vendor_id]
         );
         return updated.rows[0];
      } else {
         // Insert requires all three fields
         const inserted = await pool.query(
            `INSERT INTO vendor_bank_accounts (vendor_id, bank_name, account_name, account_number) VALUES ($1, $2, $3, $4) RETURNING *`,
            [vendor_id, bank_name, account_name, account_number]
         );
         return inserted.rows[0];
      }
   } catch (error) {
      return null;
   }
}

// Get the vendor's documents row per vendor_id
export async function getVendorProfileInfo(id) {
   const { rows } = await pool.query(
      "SELECT vendor_id, business_name, hot_line_phone_number, address, business_desc, id_front_status, id_back_status, license_status FROM vendor_documents WHERE vendor_id = $1 ORDER BY id ASC LIMIT 1",
      [id]
   );

   const result = rows?.[0] || [];
   return result;
}

// Create listings
export async function createListings(
   account_id,
   account_type,
   product_image,
   listing_name,
   description,
   price,
   location,
   quantity_value,
   quantity_unit,
   discount
) {
   try {
      const result = await pool.query(
         `INSERT INTO listings (account_id, account_type, product_image, listing_name, description, price, location, quantity_value, quantity_unit, discount) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id, product_image, listing_name, description, price, location, quantity_value, quantity_unit, discount`,
         [account_id, account_type, product_image, listing_name, description, price, location, quantity_value, quantity_unit, discount]
      );
      return result.rows[0];
   } catch (error) {
      console.error("Error creating listing:", error);
      return null;
   }
}

// Create produce details
export async function createProduceDetails(listing_id, data) {
   try {
      const { harvest_date, crop_type, variety, quality, organic } = data;
      const result = await pool.query(
         `INSERT INTO produce_details (listing_id, harvest_date, crop_type, variety, quality, organic) 
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING harvest_date, crop_type, variety, quality, organic`,
         [listing_id, harvest_date, crop_type, variety, quality, organic]
      );
      return result.rows[0];
   } catch (error) {
      console.error("Error creating produce details:", error);
      return null;
   }
}

// Create equipment details
export async function createEquipDetails(listing_id, data) {
   try {
      const { equipment_type, brand, model, condition, warranty } = data;
      const result = await pool.query(
         `INSERT INTO equipment_details (listing_id, equipment_type, brand, model, condition, warranty) VALUES ($1, $2, $3, $4, $5, $6) RETURNING equipment_type, brand, model, condition, warranty`,
         [listing_id, equipment_type, brand, model, condition, warranty]
      );
      return result.rows[0];
   } catch (error) {
      console.error("Error creating equipment details:", error);
      return null;
   }
}

// Fetch all items for a vendor dashboard
export async function fetchListedItems(account_id) {
   const result = await pool.query(
      `SELECT ls.id, ls.account_id, ls.product_image, ls.listing_name, ls.description, ls.price, ls.product_status FROM listings ls WHERE ls.account_id = $1 ORDER BY ls.id DESC`,
      [account_id]
   );
   return result.rows;
}

// Fetch single item for item edit in dashboard by search param
export async function filterItemForSearchParams(account_id, searchParams) {
   const result = await pool.query(
      `SELECT ls.id, ls.account_id, ls.account_type, ls.product_image, ls.listing_name, ls.description, ls.price, ls.location, ls.quantity_value, ls.quantity_unit, ls.discount, pd.harvest_date, pd.crop_type, pd.variety, pd.quality, pd.organic, eq.equipment_type, eq.brand, eq.model, eq.condition, eq.warranty 
     FROM listings AS ls LEFT JOIN produce_details AS pd ON ls.id = pd.listing_id 
     LEFT JOIN equipment_details AS eq ON ls.id = eq.listing_id
     WHERE ls.account_id = $1 AND ls.id = $2`,
      [account_id, searchParams]
   );
   return result.rows[0];
}

// Update listing table
export async function updateListings(
   product_image,
   listing_name,
   description,
   price,
   location,
   quantity_value,
   quantity_unit,
   discount,
   id,
   account_type
) {
   try {
      // Get existing listing data first
      const existingListing = await pool.query("SELECT * FROM listings WHERE id = $1 AND account_type = $2 AND product_status = $3", [
         id,
         account_type,
         "active",
      ]);

      if (existingListing.rows.length === 0) {
         throw new Error("Listing not found or not authorized");
      }

      const current = existingListing.rows[0];

      // Only update fields that have values, otherwise keep existing values
      const result = await pool.query(
         `UPDATE listings 
          SET 
             product_image = COALESCE($1, product_image),
             listing_name = COALESCE($2, listing_name),
             description = COALESCE($3, description),
             price = COALESCE($4, price),
             location = COALESCE($5, location),
             quantity_value = COALESCE($6, quantity_value),
             quantity_unit = COALESCE($7, quantity_unit),
             discount = COALESCE($8, discount),
             updated_at = NOW()
          WHERE id = $9 
          AND account_type = $10 
          AND product_status = $11 
          RETURNING id, product_image, listing_name, description, price, location, quantity_value, quantity_unit, discount`,
         [
            product_image || current.product_image,
            listing_name || current.listing_name,
            description || current.description,
            price || current.price,
            location || current.location,
            quantity_value || current.quantity_value,
            quantity_unit || current.quantity_unit,
            discount !== undefined ? discount : current.discount, // Handle discount=0 case
            id,
            account_type,
            "active",
         ]
      );
      return result.rows[0];
   } catch (error) {
      console.error("Error updating listing:", error);
      throw error;
   }
}

// Update produce details
export async function updateProduceDetails(harvest_date, crop_type, variety, quality, organic, listing_id) {
   try {
      // Get existing produce details first
      const existing = await pool.query("SELECT * FROM produce_details WHERE listing_id = $1", [listing_id]);

      if (existing.rows.length === 0) {
         // If no existing record, create one
         return await createProduceDetails(listing_id, {
            harvest_date,
            crop_type,
            variety,
            quality,
            organic,
         });
      }

      const current = existing.rows[0];

      const result = await pool.query(
         `UPDATE produce_details 
          SET 
             harvest_date = COALESCE($1, harvest_date),
             crop_type = COALESCE($2, crop_type), 
             variety = COALESCE($3, variety), 
             quality = COALESCE($4, quality), 
             organic = COALESCE($5, organic)
          WHERE listing_id = $6 
          RETURNING harvest_date, crop_type, variety, quality, organic`,
         [
            harvest_date || current.harvest_date,
            crop_type || current.crop_type,
            variety || current.variety,
            quality || current.quality,
            organic !== undefined ? organic : current.organic,
            listing_id,
         ]
      );
      return result.rows[0];
   } catch (error) {
      console.error("Error updating produce details:", error);
      throw error;
   }
}

export async function updateEquipmentDetails(equipment_type, brand, model, condition, warranty, listing_id) {
   try {
      // Get existing equipment details first
      const existing = await pool.query("SELECT * FROM equipment_details WHERE listing_id = $1", [listing_id]);

      if (existing.rows.length === 0) {
         // If no existing record, create one
         return await createEquipmentDetails(listing_id, {
            equipment_type,
            brand,
            model,
            condition,
            warranty,
         });
      }

      const current = existing.rows[0];

      const result = await pool.query(
         `UPDATE equipment_details 
          SET 
             equipment_type = COALESCE($1, equipment_type),
             brand = COALESCE($2, brand),
             model = COALESCE($3, model),
             condition = COALESCE($4, condition),
             warranty = COALESCE($5, warranty)
          WHERE listing_id = $6 
          RETURNING equipment_type, brand, model, condition, warranty`,
         [
            equipment_type || current.equipment_type,
            brand || current.brand,
            model || current.model,
            condition || current.condition,
            warranty !== undefined ? warranty : current.warranty,
            listing_id,
         ]
      );
      return result.rows[0];
   } catch (error) {
      console.error("Error updating equipment details:", error);
      throw error;
   }
}

// Delete listed product per vendor
export async function delteListedProduct(account_id, product_id)  {
}