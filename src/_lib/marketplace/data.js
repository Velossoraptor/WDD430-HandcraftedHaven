// In lib/data.js or similar
import { unstable_cache } from "next/cache";
import pool from "@/_lib/vendor/db";

export async function getMarketplaceProducts() {
   return unstable_cache(
      async () => {
         const { rows } = await pool.query(
            `SELECT id, product_image, listing_name, price, description 
            FROM listings 
            ORDER BY id DESC`
         );
         return rows;
      },
      ["marketplace-products"],
      { revalidate: 60 }
   )();
}
