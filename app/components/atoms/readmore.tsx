"use client";
import { readMoreAtom } from "@/app/store/drawer";
import { useAtom } from "jotai";
import React, { useState } from "react";

interface ReadMoreProps {
  text: string;
  maxLines?: number;
}

const ReadMore: React.FC<ReadMoreProps> = ({ text, maxLines = 4 }) => {
  const [{ expanded }, setReadMore] = useAtom(readMoreAtom);

  const handleReadMoreClick = () => {
    setReadMore((prev) => ({
      ...prev,
      expanded: !prev.expanded,
      content: text,
      type: "content",
    }));
  };

  const getClampedText = () => {
    const words = text?.split(" ");
    return words?.slice(0, maxLines * 10).join(" ");
  };

  const shouldShowReadMore = text?.split(" ").length > 50;

  return (
    <div className="w-[90%]">
      <p className="text-[16px] md:text-[20px] lg:text-[24px] font-[500] text-[#233333]">
        {getClampedText()}
        {!expanded && shouldShowReadMore && "... "}
        {shouldShowReadMore && (
          <span
            className="text-[20px] lg:text-[24px] font-[700] text-[#0073C6] cursor-pointer"
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
