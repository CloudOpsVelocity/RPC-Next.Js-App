"use client";
import Button from "@/app/elements/button";
import ButtonLink from "@/app/elements/link";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

export default function AuthButton() {
  const logOut = async () => {
    // await axios.post("/auth/logout");
    signOut();
  };
  const { data: session } = useSession();
  console.log(session);

  const postProjectLink = session
    ? `${process.env.NEXT_PUBLIC_PROJECT_URL}/project/postProject`
    : "/login";

  const postListingLink = session
    ? `${process.env.NEXT_PUBLIC_PROJECT_URL}/property/v1/post`
    : "/login";

  const logoutButton = session?.user ? (
    <Button
      onChange={logOut}
      buttonClass="login-btn text-[20px] font-semibold px-5 py-2 rounded-full text-[#0073C6] border-none underline bg-gradient-to-r from-[#EFF8FF] to-[#FFF] shadow-md"
      title={`${session.user.userName} Logout`}
    />
  ) : (
    <ButtonLink
      href="/login"
      buttonClass="login-btn text-[20px] font-semibold px-5 py-2 rounded-full text-[#0073C6] border-none underline bg-gradient-to-r from-[#EFF8FF] to-[#FFF] shadow-md"
      title="Login/ Sign up"
    />
  );

  return (
    <>
      {session && (
        <Link
          href={postProjectLink}
          className="text-[20px] font-semibold px-5 bg-[#227FBC] py-1.5 rounded-xl text-white"
        >
          Post Your Project
        </Link>
      )}
      <Link
        href={postListingLink}
        className="text-[20px] font-semibold px-5 bg-[#227FBC] py-1.5 rounded-xl text-white"
      >
        Post Listing
      </Link>
      {logoutButton}
    </>
  );
}
