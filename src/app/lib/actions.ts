'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { SignupFormSchema, type FormState } from '@/app/lib/definitions';
import { redirect } from 'next/navigation';
import { signOut } from '@/auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const callbackUrl = formData.get('redirectTo') as string || '/dashboard';

    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    // This will only be reached if redirect fails
    throw error;
  }
}

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password, role } = validatedFields.data;

  try {
    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return {
        message: 'User already exists with this email.',
      };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    // Provide `account_type` as well to satisfy legacy schemas that require it.
    // Map role -> account_type (use same value). Adjust mapping here if your DB expects different strings.
    const account_type = role;
    await sql`
      INSERT INTO users (name, email, password, pword, role, account_type)
      VALUES (${name}, ${email}, ${hashedPassword}, ${hashedPassword}, ${role}, ${account_type})
    `;

  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to create user.',
    };
  }

  // Redirect to login page after successful signup
  redirect('/login');
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}