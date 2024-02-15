"use client";
import { comparingIcon, infoIcon } from "@/app/images/commonSvgs";
import { addShortList } from "@/app/utils/api/actions/shortlist";
import { useToggle } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import LoginPopup from "../modals/LoginPop";
import { useShortlistAndCompare } from "@/app/hooks/storage";

export default function CompareList() {
  const { data: session } = useSession();
  const { slug } = useParams<{ slug: string }>();
  const { toggleCompare, compareItems } = useShortlistAndCompare();
  const isItemCompared =
    compareItems.length > 0 &&
    compareItems.some((item) => item.id === slug && item.status === "Y");
  const onAddingCompare = () => {
    if (session) {
      toggleCompare({
        id: slug,
        status: isItemCompared ? "N" : "Y",
      });
    } else {
      open();
    }
  };

  return !session ? (
    <LoginPopup type="Compare" />
  ) : (
    <button
      onClick={() => onAddingCompare()}
      className="text-[20px] flex justify-center items-center gap-[8px] cursor-pointer lg:text-[24px] text-[#0073C6] font-[600] underline whitespace-nowrap decoration-dashed "
    >
      {comparingIcon}
      {isItemCompared ? "Remove from" : "Add to"} Compare
    </button>
  );
}
