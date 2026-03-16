import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { and, desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const borrowedBookRows = await db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      genre: books.genre,
      rating: books.rating,
      totalCopies: books.totalCopies,
      availableCopies: books.availableCopies,
      description: books.description,
      coverColor: books.coverColor,
      coverUrl: books.coverUrl,
      videoUrl: books.videoUrl,
      summary: books.summary,
      createdAt: books.createdAt,
    })
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(
      and(
        eq(borrowRecords.userId, session.user.id),
        eq(borrowRecords.status, "BORROWED"),
      ),
    )
    .orderBy(desc(borrowRecords.borrowDate));

  const borrowedBooks: Book[] = borrowedBookRows.map((book) => ({
    ...book,
    isLoanedBook: true,
  }));

  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button>Logout</Button>
      </form>
      <BookList title="Borrowed Books" books={borrowedBooks} />
    </div>
  );
};

export default page;
