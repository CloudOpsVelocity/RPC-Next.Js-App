"use client";
import { topics } from "@/app/data/projectDetails";
import useRatings from "@/app/hooks/useRatings";
import clsx from "clsx";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

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
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    function handleScroll() {
      // const sections = topics.map((topic) => document.getElementById(topic.id));
      // const sectionOffsets = Array.from(sections).map(
      //   (section) => section.getBoundingClientRect().top
      // );
      // console.log(sectionOffsets);
      // const currentSectionIndex = sectionOffsets.findIndex(
      //   (offset) => offset > 0
      // );
      // if (currentSectionIndex !== -1) {
      //   setCurrentBlock(sections[currentSectionIndex].id);
      // }
      if (window.scrollY > 800) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [topics]);

  return (
    <div
      className={clsx(
        "flex justify-center items-center shadow-lg w-full",
        isSticky && "fixed top-[90px] bg-white shadow-md z-10"
      )}
    >
      <Image
        src="/auth/arrow.svg"
        alt=""
        className="rotate-180 cursor-pointer lg:hidden"
        width={41}
        height={64}
        onClick={() => handleArrowClick("L")}
      />
      <div
        className="h-[64px] scroll-smooth   w-[100%] bg-[#FCFCFC] shadow-sm flex justify-start items-center scrollbar-hide overflow-x-auto lg:px-14"
        ref={scrollContainerRef}
      >
        {topics.map((topic) => (
          <div
            key={topic.id}
            className={`cursor-pointer text-[20px] mr-[36px]  whitespace-nowrap  ${
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
        className="cursor-pointer lg:hidden"
        width={41}
        height={64}
        onClick={() => handleArrowClick("R")}
      />
    </div>
  );
}
