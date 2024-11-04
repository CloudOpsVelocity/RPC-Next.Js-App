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
  const charLimit = maxLines * 100;
  const shouldShowReadMore = text?.length > charLimit;

  const handleReadMoreClick = () => {
    if (shouldShowReadMore) {
      setReadMore((prev) => ({
        ...prev,
        expanded: !prev.expanded,
        content: text,
        type: "content",
        title,
        showProjName,
        ...(builderName && { builderName }),
      }));
    }
  };



  return (
    <div className="w-full" onClick={handleReadMoreClick}>
        {!expanded && shouldShowReadMore && "... "}
        {shouldShowReadMore && (
          <span className="text-[#0073C6] text-[14px] sm:text-[18px] xl:text-[22px] not-italic font-semibold cursor-pointer">
            {expanded ? "" : "Read More"}
          </span>
        )}
    </div>
  );
};

export default ReadMore;
