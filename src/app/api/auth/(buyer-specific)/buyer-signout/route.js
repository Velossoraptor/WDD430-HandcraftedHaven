import { deleteBuyerSession } from "@/_lib/buyer/session";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function signout() {
   try {
      const res = await deleteBuyerSession();
      if (res) {
         redirect("/");
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
