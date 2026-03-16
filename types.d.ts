interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  createdAt: Date | null;
  isLoanedBook?: boolean;
}

interface AuthCredentials {
  fullname: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}
interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl: string;
  summary: string;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    role?: "USER" | "ADMIN";
  }

  interface Session {
    user: {
      id: string;
      role?: "USER" | "ADMIN";
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "USER" | "ADMIN";
  }
}
