import { NextRequest, NextResponse } from "next/server";
import pool, { createListings } from "@/_lib/vendor/db";
//import { verifySession } from "@/_lib/vendor/session";
import { saveImageToCloudinary } from "@/_lib/SaveImageToCloud";
import { revalidatePath } from "next/cache";

interface FormDataFields {
  [key: string]: FormDataEntryValue | null;
  product_image: File | null;
}

export async function POST(req: NextRequest) {
  //const session = await verifySession();

  //if (!session?.authenticated || !session.userId) {
  //return NextResponse.json(
  //{ success: false, message: "Unauthorized" },
  //{ status: 401 }
  //);
  //}

  try {
    const formData = await req.formData();
    const formDataObj = Object.fromEntries(
      formData.entries()
    ) as FormDataFields;

    // Common fields with type conversion
    const account_id = formData.get("account_id") as string;
    const product_image = formData.get("product_image") as File | null;
    const product_name = formData.get("product_name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string, 10);
    const category = formData.get("category") as string;

    // Server-side validation
    const requiredFields = {
      account_id: "Account Id",
      product_image: "Product Image",
      product_name: "Product Name",
      description: "Description",
      price: "Price",
      stock: "Stock",
      category: "Category",
    };

    // Check for missing required fields
    const missingFields = Object.entries(requiredFields).filter(
      ([key]) => !formDataObj[key]
    );

    if (missingFields.length > 0) {
      const missingFieldNames = missingFields
        .map(([_, name]) => name)
        .join(", ");
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFieldNames}`,
        },
        { status: 400 }
      );
    }

    // Validate numeric fields
    if (isNaN(price) || price <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid price" },
        { status: 400 }
      );
    }

    if (isNaN(stock) || stock < 0) {
      return NextResponse.json(
        { success: false, message: "Invalid stock quantity" },
        { status: 400 }
      );
    }

    // Save image to Cloudinary
    let product_img_url = "";
    if (product_image) {
      try {
        product_img_url = await saveImageToCloudinary(product_image);
        if (!product_img_url) {
          console.log("Failed to upload image");
          throw new Error("Failed to upload image");
        }
      } catch (error) {
        console.error("Image upload error:", error);
        return NextResponse.json(
          { success: false, message: "Failed to upload product image" },
          { status: 500 }
        );
      }
    }

    // Create product listing
    const listing = await createListings(
      account_id,
      product_img_url,
      product_name,
      description,
      price,
      stock,
      category
    );

    if (!listing) {
      return NextResponse.json(
        { success: false, message: "Failed to create product listing" },
        { status: 500 }
      );
    }

    // Revalidate the products page
    revalidatePath("/dashboard/products");

    return NextResponse.json(
      { success: true, message: "Product created successfully", data: listing },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in product creation:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
