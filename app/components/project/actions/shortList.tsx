import {
  Shorlisted,
  infoIcon,
  shortlistIconSvg,
  tagIcon,
} from "@/app/images/commonSvgs";
import { addShortList } from "@/app/utils/api/actions/shortlist";
import { useToggle } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import LoginPopup from "../modals/LoginPop";
import { useShortlistAndCompare } from "@/app/hooks/storage";

export default function ShortList() {
  const { data: session } = useSession();
  const { slug } = useParams<{ slug: string }>();
  const { toggleShortlist, shortlistedItems } = useShortlistAndCompare();
  const isItemInShortlist =
    shortlistedItems.length > 0 &&
    shortlistedItems.some((item) => item.id === slug && item.status === "Y");

  const onAddingShortList = () => {
    if (session) {
      toggleShortlist({
        id: slug,
        status: isItemInShortlist ? "Y" : "N",
      });
    }
  };

  return !session ? (
    <LoginPopup type="Shortlist" />
  ) : (
    <button
      onClick={() => onAddingShortList()}
      className="text-[20px] flex justify-center items-center gap-[8px]  cursor-pointer lg:text-[24px] text-[#0073C6] font-[600] underline whitespace-nowrap decoration-dashed "
    >
      {isItemInShortlist ? Shorlisted : shortlistIconSvg}
      {isItemInShortlist ? "Remove from" : "Add to"} Shortlist
    </button>
  );
}
