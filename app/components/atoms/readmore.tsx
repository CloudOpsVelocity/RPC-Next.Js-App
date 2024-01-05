"use client";
import React, { useState } from "react";

interface ReadMoreProps {
  text: string;
  maxLines?: number;
}

const ReadMore: React.FC<ReadMoreProps> = ({ text, maxLines = 4 }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleReadMore = () => {
    setShowMore(!showMore);
  };

  const getClampedText = () => {
    const words = text.split(" ");
    return words.slice(0, maxLines * 10).join(" "); // Assuming an average of 10 characters per word
  };

  return (
    <div className="w-[90%] mb-[5%]">
      <p className="text-[24px] font-[500] text-[#233333]">
        {showMore ? text : getClampedText()}
        {!showMore && "... "}
        <span
          className="text-[24px] font-[700] text-[#0073C6]"
          onClick={toggleReadMore}
        >
          {showMore ? "Read Less" : "Read More"}
        </span>
      </p>
    </div>
  );
};

export default ReadMore;
