import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/_lib/vendor/db";
import { createSession } from "@/_lib/vendor/session";

export async function POST(req) {
   let body;
   try {
      body = await req.json();
   } catch (e) {
      return NextResponse.json({ success: false, error: ["Invalid JSON body"] }, { status: 400 });
   }

   const { email, password, rememberMe } = body || {};

   // Server side validation
   if (!email || !password) {
      return NextResponse.json({ success: false, error: ["Email and password are required"] }, { status: 400 });
   }

   try {
      // Check for email truthy
      const user = await getUserByEmail(email);
      if (!user) {
         return NextResponse.json(
            {
               success: false,
               error: ["You've provided an incorrect credentials"],
            },
            { status: 404 }
         );
      }

      // Dehash and compare password
      const ok = await bcrypt.compare(password, user.pword);
      if (!ok) {
         return NextResponse.json({ success: false, error: ["Incorrect email address or password"] }, { status: 400 });
      }

      // Create session for all logins (different expiration based on rememberMe)
      await createSession(user.id, rememberMe, user.account_type, user.fname, user.lname, user.email);

      return NextResponse.json({ success: true, account_type: user.account_type }, { status: 200 });
   } catch (err) {
      return NextResponse.json({ success: false, error: [err.message] }, { status: 500 });
   }
}
