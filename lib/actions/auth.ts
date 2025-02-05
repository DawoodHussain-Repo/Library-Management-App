"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { error } from "console";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { redirect } from "next/dist/server/api-utils";

export const signInWithCredential = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
  if (result.error) {
    return { success: false, error: result.error };
  }
  return { success: true };
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
    await signInWithCredential({ email, password });
  } catch (e) {
    return { success: false, error: "Error creating user" };
  }
  return { success: true };
};
