import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import React from "react";

const Home = async () => {

  return (
    <div>
   <BookOverview {...sampleBooks[0]}/>
   <BookList title='Latest Books' books={sampleBooks} containerClassname = "mt-28"/>
    </div>
  );
};

export default Home;
