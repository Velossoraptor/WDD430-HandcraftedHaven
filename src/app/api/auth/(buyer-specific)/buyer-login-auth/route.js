import { NextResponse } from "next/server";
import { getUserByEmail } from "@/_lib/buyer/db";
import bcrypt from "bcryptjs";
import { createBuyerSession } from "@/_lib/buyer/session";

export async function POST(req) {
   const errors = [];

   let body;
   try {
      body = await req.json();
   } catch (e) {
      return NextResponse.json({ success: false, error: ["Invalid JSON body"] }, { status: 400 });
   }

   const { email, password } = body;

   // Validate required fields
   if (!email) errors.push("Email address is required");
   if (!password) errors.push("Password is required");

   if (errors.length > 0) {
      return NextResponse.json({ success: false, error: errors }, { status: 400 });
   }

   try {
      // Check if user already exists
      const existingBuyer = await getUserByEmail(email);
      if (!existingBuyer) {
         return NextResponse.json({ success: false, error: ["You have provided incorrect credentials"] }, { status: 404 });
      }

      const dehashPassword = await bcrypt.compare(password, existingBuyer.password_hash);

      if (!dehashPassword) {
         return NextResponse.json({ success: false, error: ["Incorrect email address or password"] }, { status: 400 });
      }

      // Create a session here
      await createBuyerSession(existingBuyer.buyer_id, existingBuyer.email, existingBuyer.name);

      return NextResponse.json({ success: true, buyerId: existingBuyer.buyer_id }, { status: 200 });
   } catch (err) {
      // Provide a more readable error message
      return NextResponse.json({ error: ["Internal server error"], success: false }, { status: 500 });
   }
}
