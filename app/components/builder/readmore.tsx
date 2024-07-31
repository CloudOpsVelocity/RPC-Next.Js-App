"use client";
import { readMoreAtom } from "@/app/store/drawer";
import { useAtom } from "jotai";
import React, { useState } from "react";

interface ReadMoreProps {
  text: string;
  maxLines?: number;
  title: string;
  showProjName?: boolean;
  builderName?: string;
}

const ReadMore: React.FC<ReadMoreProps> = ({
  text,
  maxLines = 4,
  title,
  showProjName = true,
  builderName,
}) => {
  const [{ expanded }, setReadMore] = useAtom(readMoreAtom);

  const handleReadMoreClick = () => {
    setReadMore((prev) => ({
      ...prev,
      expanded: !prev.expanded,
      content: text,
      type: "content",
      title: title,
      showProjName: showProjName,
      ...(builderName && { builderName }),
    }));
  };

  const getClampedText = () => {
    const words = text?.split(" ");
    return words?.slice(0, maxLines * 10).join(" ");
  };

  const shouldShowReadMore = text?.split(" ").length > 50;

  return (
    <div className="w-full sm:w-[90%]">
      <p className="text-[#202020] sm:text-lg xl:text-2xl not-italic font-medium leading-[normal] tracking-[0.96px]">
        {getClampedText()}
        {!expanded && shouldShowReadMore && "... "}
        {shouldShowReadMore && (
          <span
            className=" sm:text-lg  xl:text-[24px] font-[700] text-[#0073C6] cursor-pointer"
            onClick={handleReadMoreClick}
          >
            {expanded ? "" : "Read More"}
          </span>
        )}
      </p>
    </div>
  );
};

export default ReadMore;
