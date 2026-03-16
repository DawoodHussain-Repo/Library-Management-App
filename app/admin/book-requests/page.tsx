import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { markBorrowRecordReturned } from "@/lib/actions/admin";
import { desc, eq } from "drizzle-orm";
import React from "react";

const page = async () => {
  // Join borrowRecords with books and users
  const records = await db
    .select({
      id: borrowRecords.id,
      bookId: borrowRecords.bookId,
      user: users.fullname,
      email: users.email,
      book: books.title,
      cover: books.coverUrl,
      borrowDate: borrowRecords.borrowDate,
      dueDate: borrowRecords.dueDate,
      status: borrowRecords.status,
    })
    .from(borrowRecords)
    .leftJoin(users, eq(borrowRecords.userId, users.id))
    .leftJoin(books, eq(borrowRecords.bookId, books.id))
    .orderBy(desc(borrowRecords.createdAt));

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Borrow Requests / Records</h2>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Book</th>
                <th className="px-6 py-3">Borrow Date</th>
                <th className="px-6 py-3">Due Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr
                  key={record.id}
                  className="border-b bg-white hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <span className="block font-medium text-gray-900">
                      {record.user}
                    </span>
                    <span className="block text-xs text-gray-500">
                      {record.email}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={record.cover!}
                      alt={record.book!}
                      className="w-8 h-10 object-cover rounded-sm"
                    />
                    <span>{record.book}</span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(record.borrowDate!).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(record.dueDate!).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                                    ${record.status === "BORROWED" ? "bg-indigo-100 text-indigo-800" : "bg-green-100 text-green-800"}`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {record.status === "BORROWED" ? (
                      <form
                        action={async () => {
                          "use server";
                          await markBorrowRecordReturned(
                            record.id,
                            record.bookId,
                          );
                        }}
                      >
                        <Button
                          variant="outline"
                          className="bg-green-100 text-green-700 border-green-200 hover:bg-green-200 hover:text-green-800"
                          type="submit"
                        >
                          Mark Returned
                        </Button>
                      </form>
                    ) : (
                      <span className="text-xs text-gray-400">No actions</span>
                    )}
                  </td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No borrow records found.
                  </td>
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
