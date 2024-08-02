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
      <ShareIcon className={"w-[24px] h-[24px] "} />
    </button>
  );
}
