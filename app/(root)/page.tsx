import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
import { Book } from "lucide-react";
import React from "react";

const Home = async () => {
const session =await auth();

const latestBooks= (await db.select().from(books).limit(10).orderBy(desc(books.createdAt)))as Book[];
  return (
    <div>
   <BookOverview {...latestBooks[0]} userId ={session?.user?.id as string}/>
   <BookList title='Latest Books' books={latestBooks.slice(1)} containerClassname = "mt-28"/>
    </div>
  );
};

export default Home;
