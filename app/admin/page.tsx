import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { count, desc, eq } from "drizzle-orm";
import React from "react";

const page = async () => {
  const [userCount] = await db.select({ value: count() }).from(users);
  const [bookCount] = await db.select({ value: count() }).from(books);
  const [borrowCount] = await db
    .select({ value: count() })
    .from(borrowRecords)
    .where(eq(borrowRecords.status, "BORROWED"));

  const recentUsers = await db
    .select()
    .from(users)
    .orderBy(desc(users.createdAt))
    .limit(5);

  return (
    <div className="w-full rounded-2xl bg-white p-7">
      <h2 className="text-xl font-semibold mb-5">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Stat Cards */}
        <div className="rounded-xl bg-gray-50 p-5 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Total Books</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{bookCount.value}</p>
        </div>
        
        <div className="rounded-xl bg-gray-50 p-5 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Total Users</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{userCount.value}</p>
        </div>
        
        <div className="rounded-xl bg-gray-50 p-5 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Books Borrowed</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{borrowCount.value}</p>
        </div>
      </div>

      <div className="mt-10">
         <h3 className="text-lg font-semibold mb-4">Recently Joined Users</h3>
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Date Joined</th>
                        <th className="px-6 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {recentUsers.map((user) => (
                        <tr key={user.id} className="border-b bg-white hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{user.fullname}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{new Date(user.createdAt!).toLocaleDateString()}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                                    ${user.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                                      user.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                    {user.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default page;
