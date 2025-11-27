import { deleteSession } from "@/_lib/vendor/session";
import { NextResponse } from "next/server";

export async function signout() {
   try {
      const res = await deleteSession();
      if (res) {
         return NextResponse.redirect("/");
      }
   } catch (error) {
      return NextResponse.json(
         {
            success: false,
            error: error.message || "Logout failed",
         },
         {
            status: 500,
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
   }
}
