"use client";
import React from "react";
import Image from "next/image";
import logo from "@/public/icons/admin/logo.svg";
import { adminSideBarLinks } from "@/constants/index";
import Link from "next/link";
import { cn, getInitials } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Session } from "next-auth";
const Sidebar = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  return (
    <div className="admin-sidebar">
      <div>
        <div className="logo">
          <Image src={logo} alt="logo" width={37} height={37} />

          <h1>BookWise</h1>
        </div>
        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname === link.route;
            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn(
                    "link",
                    isSelected && "bg-primary-admin shadow-sm"
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt={link.text}
                      fill
                      className={`${
                        isSelected ? "brightness-0 invert" : ""
                      } object-contain`}
                    />
                  </div>
                  <p
                    className={cn(isSelected ? "text-white" : "text-dark-100")}
                  >
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div>
        <div className="user ">
          <Avatar>
            <AvatarFallback className="text-dark-100 bg-cyan-300 font-semibold border-1 ">
              {getInitials(session?.user?.name || "")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col max-md:hidden ">
            <p className="font-semibold text-dark-200">{session?.user?.name}</p>
            <p className="text-xs text-light-500">{session?.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
