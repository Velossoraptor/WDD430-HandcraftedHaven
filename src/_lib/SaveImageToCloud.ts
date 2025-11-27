import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
   cloud_url: process.env.CLOUDINARY_URL,
});

// This function handles uploading image to the cloudinary
export async function saveImageToCloudinary(image) {
   try {
      // Convert file to base64 for Cloudinary upload
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString("base64");
      const dataURI = `data:${image.type};base64,${base64}`;

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
         resource_type: "image",
      });

      return result.secure_url;
   } catch (error) {
      throw error; // Re-throw the error so it can be handled upstream
   }
}
