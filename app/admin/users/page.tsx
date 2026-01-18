import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { desc } from "drizzle-orm";
import React from "react";

const page = async () => {
  const allUsers = await db
    .select()
    .from(users)
    .orderBy(desc(users.createdAt));

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Users</h2>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th className="px-6 py-3">Full Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Role</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Joined Date</th>
                        <th className="px-6 py-3">University ID</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.map((user) => (
                        <tr key={user.id} className="border-b bg-white hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{user.fullname}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.role}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                                    ${user.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                                      user.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                    {user.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">{new Date(user.createdAt!).toLocaleDateString()}</td>
                            <td className="px-6 py-4">{user.universityId}</td>
                        </tr>
                    ))}
                    {allUsers.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No users found.</td>
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
