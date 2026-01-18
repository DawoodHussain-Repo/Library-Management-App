import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import React from "react";

const page = async () => {
  const allBooks = await db
    .select()
    .from(books)
    .orderBy(desc(books.createdAt));

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button
          className="bg-primary-admin text-white hover:bg-light-100 hover:text-primary-admin"
          asChild
        >
          <Link href={"/admin/books/new"}>+ Create a New Book</Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th className="px-6 py-3">Title</th>
                        <th className="px-6 py-3">Author</th>
                        <th className="px-6 py-3">Genre</th>
                        <th className="px-6 py-3">Created At</th>
                        <th className="px-6 py-3">Copies (Avail/Total)</th>
                    </tr>
                </thead>
                <tbody>
                    {allBooks.map((book) => (
                        <tr key={book.id} className="border-b bg-white hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900 border-r border-gray-100 min-w-[200px]">
                              <div className="flex items-center gap-3">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={book.coverUrl} alt={book.title} className="h-10 w-8 object-cover rounded-sm" />
                                  <span>{book.title}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">{book.author}</td>
                            <td className="px-6 py-4">{book.genre}</td>
                            <td className="px-6 py-4">{new Date(book.createdAt!).toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-center">{book.availableCopies} / {book.totalCopies}</td>
                        </tr>
                    ))}
                    {allBooks.length === 0 && (
                        <tr>
                            <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No books found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </section>
  );
};

export default page;
