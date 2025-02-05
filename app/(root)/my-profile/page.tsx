import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import { signOut } from "@/auth";
import React from "react";

const page = () => {
  return (
    <div>
      <form
        action={async () => {
          "use server"
          await signOut();
        }}
      >
        <Button>Logout</Button>
      </form>
      <BookList title="Borrowed Books" books={sampleBooks} />
    </div>
  );
};

export default page;
