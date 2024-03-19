"use client";
import { readMoreAtom } from "@/app/store/drawer";
import { useAtom } from "jotai";
import React from "react";

interface ReadMoreProps {
  text: string;
  maxLines?: number;
  title: string;
}

const FaqReadMore: React.FC<ReadMoreProps> = ({
  text,
  maxLines = 4,
  title,
}) => {
  const [{ expanded }, setReadMore] = useAtom(readMoreAtom);

  const handleReadMoreClick = () => {
    setReadMore((prev) => ({
      ...prev,
      expanded: !prev.expanded,
      content: text,
      type: "content",
      title: title,
      showProjName: false,
    }));
  };

  const getClampedText = () => {
    const words = text?.split(" ");
    return words?.slice(0, maxLines * 10).join(" ");
  };

  const shouldShowReadMore = text?.split(" ").length > 50;

  return (
    <div className="w-[90%]">
      <p className="text-[#303A42] text-[28px] not-italic font-normal leading-9">
        {getClampedText()}

        {shouldShowReadMore && (
          <span
            className=" text-[28px] not-italic font-normal leading-9 text-greenPrimary cursor-pointer"
            onClick={handleReadMoreClick}
          >
            {expanded ? "" : " Read More"}
            {!expanded && shouldShowReadMore && "... "}
          </span>
        )}
      </p>
    </div>
  );
};

export default FaqReadMore;
