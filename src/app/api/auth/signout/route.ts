import { deleteSession } from "@/_lib/session";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
export async function POST() {
  try {
    await deleteSession();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        error: "Logout failed",
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  redirect("/");
}
