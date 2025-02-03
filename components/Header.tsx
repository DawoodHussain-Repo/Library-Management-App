'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Logo from '../public/icons/logo.svg'
const Header = () => {
  const currentPath= usePathname();
  return (
    <header className="my-10 flex justify-between gap-5 ">
      <Link href="/" className="text-base capitalize cursor-pointer">
        <Image src={Logo} alt="logo" width={40} height={40} />
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/library"
            className={cn('text-base capitalize cursor-pointer',currentPath === '/library' ? 'text-light-200' : 'text-light-100')}
          >
            Library
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
