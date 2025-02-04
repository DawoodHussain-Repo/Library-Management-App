import Link from "next/link";
import React from "react";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import calendarIcon from "@/public/icons/calendar.svg";
import { Button } from "./ui/button";
const BookCard = ({
  id,
  title,
  genre,
  color,
  cover,
  isLoanedBook = false,
}: Book) => {
  return (
    <li className={cn(isLoanedBook && "sm:w-52 w-full")}>
      <Link
        href={`/books/${id}`}
        className={cn(isLoanedBook && "flex flex-col items-center w-full")}
      >
        <BookCover coverColor={color} coverImage={cover} />
        <div className={cn("mt-4", !isLoanedBook && "xs:w-40 max-w-28")}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>
        {isLoanedBook && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <Image
                src={calendarIcon}
                className="object-contain"
                width={18}
                height={18}
                alt="calendar"
              />
              <p className="text-light-100 ">11 Days Left to return</p>
            </div>
            <Button className="book-btn text-dark-100 ">Download Receipt</Button>
          </div>
        )}
      </Link>
    </li>
  );
};

export default BookCard;
