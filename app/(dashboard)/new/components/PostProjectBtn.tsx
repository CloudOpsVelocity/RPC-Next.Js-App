"use client";
import { useSession } from "next-auth/react";
import React from "react";

type Props = {};

export default function PostProjectBtn({}: Props) {
  const { data: session } = useSession();
  const url = session
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/postProject`
    : `/login`;

  return (
    session?.user.userType === "B" && (
      <a
        target="_blank"
        className="inline-flex justify-center items-center gap-1.5 rounded shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] text-white text-xl not-italic font-bold leading-[normal] px-2.5 py-1.5 bg-[#0073c6]"
        href={url}
      >
        Post Project{" "}
        <span className="flex justify-center items-center gap-2.5 rounded px-[5px] py-0.5 bg-[#F0C811]">
          Free
        </span>
      </a>
    )
  );
}
