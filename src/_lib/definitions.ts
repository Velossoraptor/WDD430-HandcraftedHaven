import { z } from "zod";

// Vlidation for vendor register form
export const registerFormSchema = z
  .object({
    fname: z
      .string()
      .min(2, { message: "First Name must be at least 2 characters long." })
      .regex(/^[A-Za-z\s]+$/, {
        message: "First name must contain only letters",
      }),
    lname: z
      .string()
      .min(2, { message: "Last Name must be at least 2 characters long." })
      .regex(/^[A-Za-z\s]+$/, {
        message: "Last name must contain only letters",
      }),
    email: z
      .string()
      .min(2, { message: "Email address is required" })
      .email({ message: "Invalid email address format" }),
    phone: z
      .string()
      .min(11, { message: "Phone number is required" })
      .max(11, { message: "Phone number must be 11 characters long" }),
    user_state: z.string().min(2, { message: "State is required" }),
    account_type: z.enum(["Farmer", "Seller"], {
      message: "Select an account type",
    }),
    pword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPword: z
      .string()
      .min(8, { message: "Confirm your password" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    terms: z.literal(true, { message: "Accept the terms of service" }),
  })
  .refine((data) => data.pword === data.confirmPword, {
    message: "Passwords do not match",
    path: ["confirmPword"],
  });

// Validation for vendor signin form
export const signinSchema = z.object({
  email: z
    .string()
    .min(2, { message: "Email address is required" })
    .email({ message: "Invalid email format" }),
  password: z.string().min(2, { message: "Password is required" }),
});

// Validation for buyer register form
export const buyerSignupSchema = z.object({
  email: z
    .string()
    .min(2, { message: "Email address is required" })
    .email({ message: "Invalid email format" }),
  name: z
    .string()
    .min(2, { message: "Full Name is required" })
    .regex(/^[A-Za-z\s]+$/, { message: "Full name must contain only letters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, {
      message:
        "Password must contain at least one uppercase and lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});
// Validation for buyer signin form
export const buyerSigninSchema = z.object({
  email: z
    .string()
    .min(2, { message: "Email address is required" })
    .email({ message: "Invalid email format" }),
  password: z.string().min(2, { message: "Password is required" }),
});

//Export types
export type RegisterFormData = z.infer<typeof registerFormSchema>;
export type SigninFormData = z.infer<typeof signinSchema>;
export type RegisterFormState = Omit<
  RegisterFormData,
  "terms" | "account_type"
> & {
  account_type: RegisterFormData["account_type"] | "";
  terms: boolean;
};
