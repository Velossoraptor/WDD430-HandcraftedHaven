import { NextResponse } from "next/server";
import { addReview } from "@/_lib/buyer/db";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const listing_id = form.get("listing_id") as string;
    const customer_id = form.get("customer_id") as string;
    const rating = Number(form.get("rating"));
    const feedback = (form.get("feedback") as string) || "";

    if (!listing_id || !customer_id) {
      return NextResponse.json(
        { message: "Missing listing_id or customer_id" },
        { status: 400 }
      );
    }

    const result = await addReview(listing_id, customer_id, rating, feedback);

    return NextResponse.json({ success: true, review: result });
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json(
      { message: "Failed to submit review" },
      { status: 500 }
    );
  }
}