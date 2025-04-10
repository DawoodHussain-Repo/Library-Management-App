"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Logo from "../public/icons/logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Session } from "next-auth";
const Header = ({ session }: { session: Session }) => {
  const currentPath = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5 ">
      <Link href="/" className="text-base capitalize cursor-pointer">
        <Image src={Logo} alt="logo" width={40} height={40} />
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/library"
            className={cn(
              "text-base capitalize cursor-pointer",
              currentPath === "/library" ? "text-light-200" : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>
        <li>
          <Link href={"/my-profile"}>
            <Avatar>
              <AvatarFallback className="text-dark-100 bg-cyan-300 font-semibold border-1 ">
                {getInitials(session?.user?.name || "")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
