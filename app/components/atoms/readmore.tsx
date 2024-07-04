"use client";
import { readMoreAtom } from "@/app/store/drawer";
import { useAtom } from "jotai";
import React from "react";

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
  const shouldShowReadMore = text?.length > maxLines * 100;
  const handleReadMoreClick = () => {
    shouldShowReadMore &&
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
    const charLimit = maxLines * 100; // Estimate character limit based on lines
    return text?.length > charLimit ? text.slice(0, charLimit) : text;
  };

  return (
    <div className="w-full" onClick={handleReadMoreClick}>
      <p className="text-[14px] md:text-[20px] lg:text-[24px] font-[500] text-[#233333] break-words">
        {getClampedText()}
        {!expanded && shouldShowReadMore && "... "}
        {shouldShowReadMore && (
          <span className="text-[14px] lg:text-[24px] font-[700] text-[#0073C6] cursor-pointer">
            {expanded ? "" : "Read More"}
          </span>
        )}
      </p>
    </div>
  );
};

export default ReadMore;
