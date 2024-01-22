"use client";
import { addShortList } from "@/app/utils/api/actions/shortlist";
import { useToggle } from "@mantine/hooks";
import { useParams } from "next/navigation";
import React from "react";

export default function CompareList() {
  const { slug } = useParams<{ slug: string }>();
  const [value, toggle] = useToggle(["Add to", "Alreay Added"]);

  return (
    <button
      onClick={() => {
        toggle();
        addShortList({ projIdEnc: slug, type: 3 });
      }}
      className="text-[20px] cursor-pointer lg:text-[24px] text-[#0073C6] font-[600] underline whitespace-nowrap decoration-dashed "
    >
      {value} Compare
    </button>
  );
}
