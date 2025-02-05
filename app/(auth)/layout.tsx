import Image from "next/image";
import React, { ReactNode } from "react";
import Logo from "@/public/icons/logo.svg";
import Illustration from '@/public/images/auth-illustration.png'
import { auth } from "@/auth";
import { redirect } from "next/navigation";
const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) redirect("/");

  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3">
            <Image src={Logo} width={37} height={37} alt="logo" />
            <h1 className="text-2xl font-semibold text-white">BookWise</h1>
          </div>
          <div>{children}</div>
        </div>
      </section>
      <section className="auth-illustration">
<Image src={Illustration} width={1000} height={1000} className="object-cover size-full" alt="logo" />
      </section>
    </main>
  );
};

export default layout;
