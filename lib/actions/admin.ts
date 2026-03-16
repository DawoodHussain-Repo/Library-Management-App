"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { and, eq } from "drizzle-orm";
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

export const markBorrowRecordReturned = async (
  borrowRecordId: string,
  bookId: string,
) => {
  try {
    const [record] = await db
      .select({ status: borrowRecords.status })
      .from(borrowRecords)
      .where(eq(borrowRecords.id, borrowRecordId))
      .limit(1);

    if (!record) {
      return { success: false, error: "Borrow record not found" };
    }

    if (record.status === "RETURNED") {
      return { success: true };
    }

    const [book] = await db
      .select({
        totalCopies: books.totalCopies,
        availableCopies: books.availableCopies,
      })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book) {
      return { success: false, error: "Book not found" };
    }

    const nextAvailableCopies = Math.min(
      book.totalCopies,
      book.availableCopies + 1,
    );

    const returnDate = new Date().toISOString().split("T")[0];

    await db
      .update(borrowRecords)
      .set({
        status: "RETURNED",
        returnDate,
      })
      .where(eq(borrowRecords.id, borrowRecordId));

    await db
      .update(books)
      .set({ availableCopies: nextAvailableCopies })
      .where(eq(books.id, bookId));

    revalidatePath("/admin/book-requests");
    revalidatePath("/admin/books");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to mark record as returned" };
  }
};

export const deleteBook = async (bookId: string) => {
  try {
    const [activeBorrow] = await db
      .select({ id: borrowRecords.id })
      .from(borrowRecords)
      .where(
        and(
          eq(borrowRecords.bookId, bookId),
          eq(borrowRecords.status, "BORROWED"),
        ),
      )
      .limit(1);

    if (activeBorrow) {
      return {
        success: false,
        error: "Cannot delete a book that is currently borrowed",
      };
    }

    await db.delete(borrowRecords).where(eq(borrowRecords.bookId, bookId));
    await db.delete(books).where(eq(books.id, bookId));

    revalidatePath("/admin/books");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to delete book" };
  }
};
