"use client";
import { tagIcon } from "@/app/images/commonSvgs";
import { addShortList } from "@/app/utils/api/actions/shortlist";
import { useToggle } from "@mantine/hooks";
import { useParams } from "next/navigation";
import React from "react";

export default function ShortList() {
  const { slug } = useParams<{ slug: string }>();
  const [value, toggle] = useToggle(["Add to", "Remove From"]);
  return (
    <button
      onClick={() => {
        toggle();
        addShortList({ projIdEnc: slug, type: 1 });
      }}
      className="text-[20px] flex justify-center items-center gap-[8px]  cursor-pointer lg:text-[24px] text-[#0073C6] font-[600] underline whitespace-nowrap decoration-dashed "
    >
      {tagIcon}{value} Shortlist
    </button>
  );
}
