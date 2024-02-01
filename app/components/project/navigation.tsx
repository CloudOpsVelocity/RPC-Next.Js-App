"use client";
import { topics } from "@/app/data/projectDetails";
import useRatings from "@/app/hooks/useRatings";
import Image from "next/image";
import React, { useState, useRef } from "react";

export default function Navigation() {
  const { data } = useRatings();
  const [currentBlock, setCurrentBlock] = useState("overview");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToTopic = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
      setCurrentBlock(id);
    }
  };

  const handleArrowClick = (side: "R" | "L"): void => {
    const scrollAmount = side === "R" ? 100 : -100;

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="flex justify-center items-center shadow-lg w-full">
      <Image
        src="/auth/arrow.svg"
        alt=""
        className="rotate-180 cursor-pointer"
        width={41}
        height={64}
        onClick={() => handleArrowClick("L")}
      />
      <div
        className="h-[64px] scroll-smooth pl-[24px] pr-[24px] w-[100%] bg-[#FCFCFC] shadow-sm flex justify-start items-center scrollbar-hide overflow-x-auto"
        ref={scrollContainerRef}
      >
        {topics.map((topic) => (
          <div
            key={topic.id}
            className={`cursor-pointer text-[24px] mr-[40px]  whitespace-nowrap ${
              currentBlock === topic.id
                ? "text-[#0073C6] font-[700] decoration-solid underline"
                : "text-[#4D6677] font-[500]"
            }`}
            onClick={() => scrollToTopic(topic.id)}
          >
            {topic.id === "ratings" && data?.status && <span>Ratings</span>}

            {topic.id !== "ratings" && topic.label}
          </div>
        ))}
      </div>
      <Image
        src="/auth/arrow.svg"
        alt=""
        className="cursor-pointer"
        width={41}
        height={64}
        onClick={() => handleArrowClick("R")}
      />
    </div>
  );
}
