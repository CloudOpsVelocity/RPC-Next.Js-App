"use client";
import Button from "@/app/elements/button";
import ButtonLink from "@/app/elements/link";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

export default function AuthButton() {
  const { data: session } = useSession();
  return session?.user ? (
    <Button
      onChange={() => signOut()}
      buttonClass="login-btn text-[20px] font-semibold px-5 py-2 rounded-full text-[#0073C6] border-none underline bg-gradient-to-r from-[#EFF8FF] to-[#FFF] shadow-md"
      title="Logout"
    />
  ) : (
    <ButtonLink
      href="/login"
      buttonClass="login-btn text-[20px] font-semibold px-5 py-2 rounded-full text-[#0073C6] border-none underline bg-gradient-to-r from-[#EFF8FF] to-[#FFF] shadow-md"
      title="Login/ Sign up"
    />
  );
}
