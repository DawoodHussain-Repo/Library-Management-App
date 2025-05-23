"use client";
import AuthForm from "@/components/AuthForm";
import { signInWithCredential } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validation";
import React from "react";

const page = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={signInWithCredential}
    />
  );
};

export default page;
