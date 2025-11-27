import { getUserByEmail, createUser } from "@/_lib/vendor/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
   const SALT_ROUNDS = 10;
   const errors = [];

   let body;
   try {
      body = await req.json();
   } catch (e) {
      return NextResponse.json({ success: false, error: ["Invalid JSON body"] }, { status: 400 });
   }

   const payload = body;
   const { fname, lname, email, phone, user_state, account_type, pword, confirmPword, terms } = payload || {};

   try {
      if (!fname) errors.push("First name is required");
      if (!lname) errors.push("Last name is required");
      if (!email) errors.push("Email address is required");
      if (!phone) errors.push("Phone number is required");
      if (!user_state) errors.push("State is required");
      if (!account_type) errors.push("Account type is required");
      if (!pword) errors.push("Password is required");
      if (!confirmPword) errors.push("Confirm password is required");
      if (pword && confirmPword && pword !== confirmPword) errors.push("Passwords do not match");
      if (terms !== true) errors.push("You must accept the terms of service");

      if (errors.length > 0) {
         return NextResponse.json({ success: false, error: errors }, { status: 400 });
      }

      const normalizedEmail = email.trim().toLowerCase();

      // Checking existing user
      const existingUser = await getUserByEmail(normalizedEmail);
      if (existingUser) {
         return NextResponse.json({ success: false, error: ["Email address already in use."] }, { status: 409 });
      }

      const hashedPassword = await bcrypt.hash(pword, SALT_ROUNDS);

      // Create user account
      const registerUser = await createUser(
         fname.trim(),
         lname.trim(),
         normalizedEmail,
         phone.trim(),
         user_state.trim(),
         account_type,
         hashedPassword
      );

      if (!registerUser) {
         return NextResponse.json({ success: false, error: ["Registration failed. Try again."] }, { status: 500 });
      }

      return NextResponse.json({ success: true }, { status: 200 });
   } catch (err) {
      console.error("register-auth error", err);
      return NextResponse.json({ success: false, error: ["Internal server error. Try again."] }, { status: 500 });
   }
}
