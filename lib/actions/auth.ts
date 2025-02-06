"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { error } from "console";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export const signInWithCredential = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    redirect("/too-fast");
  }
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
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    redirect("/too-fast");
  }
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
