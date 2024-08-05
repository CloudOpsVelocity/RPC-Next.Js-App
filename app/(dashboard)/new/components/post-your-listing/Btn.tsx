"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

type Props = {
  text?: string;
};

export default function Btn({ text }: Props) {
  const { data: session } = useSession();
  const url = session
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/property/v1/post`
    : `/login`;

  return (
    <a
      target="_blank"
      className="inline-flex justify-center items-center gap-1.5 rounded shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] text-white text-[16px] not-italic font-bold leading-[normal] px-2.5 py-1.5 bg-[#0073c6] relative pr-8"
      href={url}
    >
      Post <span className="flex sm:hidden">{text}</span>{" "}
      <span className="hidden sm:block">Property</span>{" "}
      <Image
        src="/home/free.svg"
        width={36}
        height={36}
        alt="post"
        className="absolute h-[31px] sm:h-[36] right-0 text-[16px]  "
      />
    </a>
  );
}
