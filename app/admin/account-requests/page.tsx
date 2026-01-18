import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { approveUser, rejectUser } from "@/lib/actions/admin";
import { desc, eq } from "drizzle-orm";
import React from "react";

const page = async () => {
  const pendingUsers = await db
    .select()
    .from(users)
    .where(eq(users.status, "PENDING"))
    .orderBy(desc(users.createdAt));

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Account Requests</h2>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-6 py-3">Full Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">University ID</th>
                <th className="px-6 py-3">ID Card</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingUsers.map((user) => (
                <tr key={user.id} className="border-b bg-white hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.fullname}
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.universityId}</td>
                  <td className="px-6 py-4">
                    <a
                      href={user.universityCard}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View ID Card
                    </a>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <form
                      action={async () => {
                        "use server";
                        await approveUser(user.id);
                      }}
                    >
                      <Button
                        variant="outline"
                        className="bg-green-100 text-green-700 border-green-200 hover:bg-green-200 hover:text-green-800"
                        type="submit"
                      >
                        Approve
                      </Button>
                    </form>
                    <form
                      action={async () => {
                        "use server";
                        await rejectUser(user.id);
                      }}
                    >
                      <Button
                        variant="outline"
                        className="bg-red-100 text-red-700 border-red-200 hover:bg-red-200 hover:text-red-800"
                        type="submit"
                      >
                        Reject
                      </Button>
                    </form>
                  </td>
                </tr>
              ))}
              {pendingUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No pending account requests.
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
