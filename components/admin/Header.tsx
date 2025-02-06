import { Session } from "next-auth";
import React from "react";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header">
      <div className="">
        <h2 className="text-2xl text-dark-400 font-semibold">
          {session?.user?.name}
        </h2>
        <p className="text-slate-500 text-base">
          Monitor all of your users and books here
        </p>
      </div>
    </header>
  );
};

export default Header;
