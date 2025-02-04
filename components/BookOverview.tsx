import Image from "next/image";
import React from "react";
import starIcon from "@/public/icons/star.svg";
import { Button } from "./ui/button";
import bookIcon from "@/public/icons/book.svg";
import BookCover from "./BookCover";
const BookOverview = ({
  title,
  author,
  genre,
  rating,
  total_copies,
  available_copies,
  description,
  color,
  cover,
}: Book) => {
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
            Total Books: <span>{total_copies}</span>
          </p>

          <p>
            Available Books: <span>{available_copies}</span>
          </p>
        </div>
        <p className="book-description">{description}</p>
        <Button className="book-overview_btn">
          <Image src={bookIcon} alt="book" width={20} height={20} />
          <p className="text-dark-100 font-bebas-neue text-xl">Borrow Book</p>
        </Button>
      </div>
      <div className="flex relative flex-1 justify-center ">
        <div className="relative">
          <BookCover
            coverColor={color}
            coverImage={cover}
            variant="wide"
            className="z-10 "
          />
          <div className="absolute left-16 top-10 rotate-12 opacity-40 hidden md:block ">
            <BookCover coverColor={color} coverImage={cover} variant="wide" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
