import { NextResponse, NextRequest } from "next/server";
import pool from "@/_lib/vendor/db";

/**
 * Handle cart operations for authenticated users
 * Operations: add, remove, update quantity
 */
export async function POST(req: NextRequest) {
  try {
    const { buyerId, operation, item } = await req.json();

    if (!buyerId) {
      return NextResponse.json({ error: "Missing buyerId" }, { status: 400 });
    }

    if (!operation || !item) {
      return NextResponse.json(
        { error: "Missing operation or item data" },
        { status: 400 }
      );
    }

    // Ensure the user's cart exists
    const { rows: existingCart } = await pool.query(
      "SELECT cart_id FROM carts WHERE buyer_id = $1",
      [buyerId]
    );
    let cartId = existingCart.length
      ? existingCart[0].cart_id
      : (
          await pool.query(
            "INSERT INTO carts (buyer_id) VALUES ($1) RETURNING cart_id",
            [buyerId]
          )
        ).rows[0].cart_id;

    switch (operation) {
      case "add":
        // Insert new item
        await pool.query(
          `INSERT INTO cart_items 
                   (cart_id, description, listing_name, price, product_image, quantity, listing_id)
                   VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            cartId,
            item.listing_name,
            item.price,
            item.product_image,
            item.quantity || 1,
            item.listing_id,
          ]
        );

        break;

      case "remove":
        await pool.query(
          "DELETE FROM cart_items WHERE cart_id = $1 AND listing_id = $2",
          [cartId, item.listing_id]
        );
        break;

      case "update_quantity":
        if (item.quantity <= 0) {
          // Remove item if quantity is 0 or negative
          await pool.query(
            "DELETE FROM cart_items WHERE cart_id = $1 AND listing_id = $2",
            [cartId, item.listing_id]
          );
        } else {
          // Update quantity
          await pool.query(
            "UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND listing_id = $3",
            [item.quantity, cartId, item.listing_id]
          );
        }
        break;

      default:
        return NextResponse.json(
          { error: "Invalid operation" },
          { status: 400 }
        );
    }

    // Fetch updated cart
    const { rows: updatedCart } = await pool.query(
      `SELECT listing_name, description, price, product_image, quantity, listing_id
          FROM cart_items WHERE cart_id = $1`,
      [cartId]
    );

    return NextResponse.json({
      success: true,
      message: `Item ${operation} successful`,
      cart: updatedCart,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
