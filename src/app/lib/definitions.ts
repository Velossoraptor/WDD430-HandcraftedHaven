import * as z from "zod";

// User Role Type
//export type UserRole = "customer" | "seller";

// User Interface
//export interface User {
//id: string;
// name: string;
//email: string;
//password: string;
//role: UserRole;
//}

// Session Payload Type
//export type SessionPayload = {
//userId: string;
//email: string;
//name?: string;
//role: UserRole;
//};

// Signup Form Schema with Role field
export const registerFormSchema = z.object({
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
  account_type: z.enum(["customer", "seller"], {
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
});

// Form State Type
export type FormState =
  | {
      errors?: {
        fname?: string[];
        lname?: string[];
        email?: string[];
        account_type?: string[];
        pword?: string[];
        general?: string[];
      };
      success?: {
        message?: string[];
      };
    }
  | undefined;

// Login Form Schema
export const signinFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  pword: z.string().min(1, { message: "Password is required." }),
});

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        pword?: string[];
        general?: string[];
      };
    }
  | undefined;

// Extended User types for specific roles
//export interface Customer extends User {
//role: "customer";
//}

//export interface Seller extends User {
// role: "seller";
//}
