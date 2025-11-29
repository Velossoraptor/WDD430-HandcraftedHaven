import { NextResponse } from "next/server";
import { getUserByEmail, createUser } from "@/_lib/buyer/db";
import bcrypt from "bcryptjs";
import { createBuyerSession } from "@/_lib/buyer/session";

export async function POST(req) {
   const SALT_ROUNDS = 10;
   const errors = [];

   let body;
   try {
      body = await req.json();
   } catch (e) {
      return NextResponse.json({ success: false, error: ["Invalid JSON body"] }, { status: 400 });
   }

   const { email, name, password } = body;

   // Validate required fields
   if (!email) errors.push("Email address is required");
   if (!name) errors.push("Name is required");
   if (!password) errors.push("Password is required");

   if (errors.length > 0) {
      return NextResponse.json({ success: false, error: errors }, { status: 400 });
   }

   try {
      // Check if user already exists
      const existingBuyer = await getUserByEmail(email);
      if (existingBuyer) {
         return NextResponse.json({ success: false, error: ["Email address already in use."] }, { status: 409 });
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      // Create user account
      const newBuyer = await createUser(email, hashedPassword, name, "local");

      // Create a session here
      await createBuyerSession(newBuyer.buyer_id, newBuyer.email, newBuyer.name);

      return NextResponse.json({ success: true, buyerId: newBuyer.buyer_id }, { status: 200 });
   } catch (err) {
      // Provide a more readable error message
      return NextResponse.json({ error: ["Internal server error"], success: false }, { status: 500 });
   }
}
