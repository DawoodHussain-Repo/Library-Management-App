"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const signInWithCredential = async (
  params: Pick<AuthCredentials, "email" | "password">,
) => {
  const { email, password } = params;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    const [user] = await db
      .select({ role: users.role })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return { success: true, role: user?.role };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { success: false, error: "Invalid email or password" };
      }

      return { success: false, error: "Authentication failed" };
    }

    return { success: false, error: "Something went wrong. Please try again." };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullname, email, password, universityId, universityCard } = params;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await db.insert(users).values({
      fullname,
      email,
      password: hashedPassword,
      universityId,
      universityCard,
    });

    const signInResult = await signInWithCredential({ email, password });
    if (!signInResult.success) {
      return signInResult;
    }
  } catch (e) {
    return { success: false, error: "Error creating user" };
  }
  return { success: true };
};
