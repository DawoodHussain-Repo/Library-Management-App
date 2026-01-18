"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const approveUser = async (userId: string) => {
  try {
    await db
      .update(users)
      .set({ status: "APPROVED" })
      .where(eq(users.id, userId));

    revalidatePath("/admin/account-requests");
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to approve user" };
  }
};

export const rejectUser = async (userId: string) => {
  try {
    await db
      .update(users)
      .set({ status: "REJECTED" })
      .where(eq(users.id, userId));

    revalidatePath("/admin/account-requests");
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to reject user" };
  }
};
