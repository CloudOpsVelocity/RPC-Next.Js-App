"use client";
import { comparingIcon, infoIcon } from "@/app/images/commonSvgs";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React from "react";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";

export default function CompareList() {
  const { data: session } = useSession();
  const { slug } = useParams<{ slug: string }>();
  const { toggleCompare, compareItems } = useShortlistAndCompare();
  const [, { open }] = usePopShortList();
  const isItemCompared =
    compareItems.length > 0 &&
    compareItems.some((item) => item.id === slug && item.status === "Y");
  const onAddingCompare = () => {
    if (session) {
      toggleCompare({
        id: slug,
        status: isItemCompared ? "N" : "Y",
        source: "prop",
      });
    } else {
      open();
    }
  };

  return (
    <button
      onClick={() => onAddingCompare()}
      className="text-[20px] flex justify-center items-center gap-[8px] cursor-pointer lg:text-[24px] text-[#0073C6] font-[600] underline whitespace-nowrap decoration-dashed "
    >
      {comparingIcon}
      {isItemCompared ? "Remove from" : "Add to"} Compare
    </button>
  );
}
