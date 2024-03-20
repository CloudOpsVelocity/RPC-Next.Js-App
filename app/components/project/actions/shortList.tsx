import { Shorlisted, shortlistIconSvg } from "@/app/images/commonSvgs";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React from "react";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";

export default function ShortList() {
  const { data: session } = useSession();
  const { slug } = useParams<{ slug: string }>();
  const { toggleShortlist, shortlistedItems } = useShortlistAndCompare();
  const [, { open }] = usePopShortList();
  const isItemInShortlist =
    shortlistedItems.length > 0 &&
    shortlistedItems.some((item) => item.id === slug && item.status === "Y");

  const onAddingShortList = () => {
    if (session) {
      toggleShortlist({
        id: slug,
        status: isItemInShortlist ? "N" : "Y",
      });
    } else {
      open();
    }
  };

  return (
    <button
      onClick={() => onAddingShortList()}
      className="text-[20px] flex justify-center items-center gap-[8px]  cursor-pointer lg:text-[24px] text-[#0073C6] font-[600] underline whitespace-nowrap decoration-dashed "
    >
      {isItemInShortlist ? Shorlisted : shortlistIconSvg}
      {isItemInShortlist ? "Remove from" : "Add to"} Shortlist
    </button>
  );
}
