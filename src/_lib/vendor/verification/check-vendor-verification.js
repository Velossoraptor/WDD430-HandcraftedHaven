import pool from "@/_lib/vendor/db";

export async function checkVendorVerification(vendorId) {
   try {
      const { rows } = await pool.query("SELECT is_verified FROM vendors WHERE id = $1", [vendorId]);
      return rows?.[0]?.is_verified === true;
   } catch (error) {
      console.error("Error checking vendor verification:", error);
      return false;
   }
}