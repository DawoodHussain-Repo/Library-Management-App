import Image from "next/image";
import React from "react";
import starIcon from "@/public/icons/star.svg";
import { Button } from "./ui/button";
import bookIcon from "@/public/icons/book.svg";
import BookCover from "./BookCover";
import BorrowButton from "./BorrowButton";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
interface Props extends Book {
  userId: string;
}
const BookOverview = async ({
  id,
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  userId,
}: Props) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  if (!user) {
    return null;
  }
  const borrowEligibility = {
    isEligible: availableCopies > 0 && user.status === "APPROVED",
    message:
      availableCopies > 0
        ? "Books Not Available"
        : "You Are Not Eligible To Borrow Books",
  };
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col  gap-5">
        <h1>{title}</h1>
        <div className="book-info">
          <p>
            By: <span className="text-light-200 font-semibold">{author}</span>
          </p>
          <p>
            Category:{" "}
            <span className="text-light-200 font-semibold">{genre}</span>
          </p>
          <div className="flex flex-row gap-1">
            <Image src={starIcon} alt="star" width={20} height={20} />
            <p>{rating}</p>
          </div>
        </div>
        <div className="book-copies">
          <p>
            Total Books: <span>{totalCopies}</span>
          </p>

          <p>
            Available Books: <span>{availableCopies}</span>
          </p>
        </div>
        <p className="book-description">{description}</p>
        <BorrowButton
          bookId={id}
          userId={userId}
          borrowingEligibility={borrowEligibility}
        />
      </div>
      <div className="flex relative flex-1 justify-center ">
        <div className="relative">
          <BookCover
            coverColor={coverColor}
            coverImage={coverUrl}
            variant="wide"
            className="z-10 "
          />
          <div className="absolute left-16 top-10 rotate-12 opacity-40 hidden md:block ">
            <BookCover
              coverColor={coverColor}
              coverImage={coverUrl}
              variant="wide"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
