"use client";
import { infoIcon, tagIcon } from "@/app/images/commonSvgs";
import { addShortList } from "@/app/utils/api/actions/shortlist";
import { useToggle } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import LoginPopup from "../modals/LoginPop";
import { useShortlistAndCompare } from "@/app/hooks/storage";

export default function ShortList() {
  const { data: session } = useSession();

  const { slug } = useParams<{ slug: string }>();
  const { toggleShortlist, shortlistedItems } = useShortlistAndCompare();
  const [value, toggle] = useToggle(
    shortlistedItems.some((item) => item.id === slug)
      ? ["Remove From", "Add to"]
      : ["Add to", "Remove From"]
  );

  const onAddingShortList = () => {
    if (session) {
      toggle();
      toggleShortlist({
        id: slug,
        status: value === "Add to" ? "Y" : "N",
        type: 3,
      });
      // addShortList({
      //   projIdEnc: slug,
      //   type: 3,
      //   isactive: value == "Add to" ? "Y" : "N",
      // });
    }
  };

  return !session ? (
    <LoginPopup type="Shortlist" />
  ) : (
    <button
      onClick={() => onAddingShortList()}
      className="text-[20px] flex justify-center items-center gap-[8px]  cursor-pointer lg:text-[24px] text-[#0073C6] font-[600] underline whitespace-nowrap decoration-dashed "
    >
      {tagIcon}
      {value} Shortlist
    </button>
  );
}
