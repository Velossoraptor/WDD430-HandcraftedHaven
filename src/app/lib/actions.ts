"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { getUserByEmail, createUser } from "@/_lib/vendor/db";
import {
  FormState,
  LoginFormState,
  registerFormSchema,
  signinFormSchema,
} from "./definitions";
import { createSession } from "@/_lib/session";

export async function signin(
  prevState: LoginFormState | undefined,
  formData: FormData
): Promise<LoginFormState> {
  const validatedFields = signinFormSchema.safeParse({
    email: formData.get("email"),
    pword: formData.get("pword"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, pword } = validatedFields.data;

  try {
    if (!email || !pword) {
      return {
        errors: { email: ["All input fields are required."] },
      };
    }

    // Check whether user exists in the database
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      // Return a generic error message for security
      return {
        errors: { general: ["Incorrect email address or password"] },
      };
    }

    const passwordsMatch = await bcrypt.compare(pword, existingUser.pword);

    if (!passwordsMatch) {
      return {
        errors: { general: ["Incorrect email address or password"] },
      };
    }

    // Pass a single, structured object to createSession instead of spreading 5 args
    await createSession({
      id: existingUser.id,
      account_type: existingUser.account_type,
      fname: existingUser.fname,
      lname: existingUser.lname,
      email: existingUser.email,
    });
  } catch (error) {
    console.error("Authentication Error:", error);
    throw error;
  }
  redirect("/dashboard");
}

export async function signup(
  prevState: FormState | undefined,
  formData: FormData
): Promise<FormState> {
  // Validate form fields
  const validatedFields = registerFormSchema.safeParse({
    fname: formData.get("fname"),
    lname: formData.get("lname"),
    email: formData.get("email"),
    account_type: formData.get("account_type"),
    pword: formData.get("pword"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { fname, lname, email, account_type, pword } = validatedFields.data;

  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        errors: { general: ["A user with this email already exists."] },
      };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(pword, 10);

    // Insert new user into the database
    const result = await createUser(
      fname,
      lname,
      email,
      account_type,
      hashedPassword
    );

    if (!result) {
      return {
        errors: { general: ["Failed to create user account."] },
      };
    }

    console.error("Successful");
    return {
      success: {
        message: ["Account created successfully. Proceed to sign in."],
      },
    };
  } catch (error) {
    console.error("Signup Error:", error);
    return {
      errors: { general: ["Internal server error. Try again."] },
    };
  }
}
