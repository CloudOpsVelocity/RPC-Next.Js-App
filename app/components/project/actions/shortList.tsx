"use client";
import { addShortList } from "@/app/utils/api/actions/shortlist";
import { useParams } from "next/navigation";
import React from "react";

export default function ShortList() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <button
      onClick={() => addShortList({ projIdEnc: slug, type: 1 })}
      className="text-[20px] cursor-pointer lg:text-[24px] text-[#0073C6] font-[600] underline whitespace-nowrap decoration-dashed "
    >
      Add to Shortlist
    </button>
  );
}
