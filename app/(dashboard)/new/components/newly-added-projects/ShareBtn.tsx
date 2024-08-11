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
  const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); 

    setShareAtomData({
      ...shareAtomData,
      opened: true,
      url,
    });
  };
  return (
    <button
      onClick={handleClick}
      className="cursor-pointer"
    >
      <ShareIcon className={"cursor-pointer w-[22px] h-[22px] xl:w-[26px] xl:h-[26px] "} />
    </button>
  );
}
