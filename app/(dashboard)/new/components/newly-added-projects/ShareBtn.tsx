"use client";
import { searchShareAtom } from "@/app/(dashboard)/search/components/SharePopup";
import { ShareIcon } from "@/app/images/HomePageIcons";
import { useAtom } from "jotai";
import React from "react";

type Props = {
  url: string;
};

export default function ShareBtn({ url }: Props) {
  const [shareAtomData, setShareAtomData] = useAtom(searchShareAtom);
  return (
    <button
      onClick={() =>
        setShareAtomData({
          ...shareAtomData,
          opened: true,
          url,
        })
      }
      className="cursor-pointer"
    >
      <ShareIcon className={"cursor-pointer w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] "} />
    </button>
  );
}
