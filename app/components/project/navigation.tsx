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
  const [isSticky, setIsSticky] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY ? "down" : "up";
      setLastScrollY(currentScrollY);
      if (!isScrolling) {
        const sections = topics.map((topic) =>
          document.getElementById(topic.id)
        );
        const sectionTops = sections.map(
          (section) => section?.getBoundingClientRect().top ?? 0
        );
        const windowHeight = window.innerHeight;
        let closestSectionIndex = -1;
        let closestSectionDistance = Number.MAX_VALUE;
        for (let i = 0; i < sections.length; i++) {
          const distance = Math.abs(sectionTops[i] - 0.5 * windowHeight);
          if (distance < closestSectionDistance) {
            closestSectionDistance = distance;
            closestSectionIndex = i;
          }
        }
        if (closestSectionIndex !== -1) {
          setCurrentBlock(sections[closestSectionIndex]?.id ?? "");
        }
        if (currentScrollY > 800) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
        if (scrollDirection === "down") {
          handleArrowClick("R");
        } else {
          handleArrowClick("L");
        }
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [topics, isScrolling, lastScrollY]);
  function handleArrowClick(side: "R" | "L"): void {
    const scrollAmount = side === "R" ? 100 : -100;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollAmount;
    }
  }
  function scrollToTopic(id: string): void {
    setIsScrolling(true);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
      setCurrentBlock(id);
    }
    setTimeout(() => setIsScrolling(false), 3000);
  }
  return (
    <div
      className={clsx(
        "flex justify-center items-center shadow-lg w-full",
        isSticky && "fixed top-[90px] bg-white shadow-md z-[100]"
      )}
    >
      <Image
        src="/auth/arrow.svg"
        alt=""
        className="rotate-180 cursor-pointer"
        width={41}
        height={64}
        onClick={() => handleArrowClick("L")}
      />
      <div
        className="h-[64px] scroll-smooth w-[100%] bg-[#FCFCFC] shadow-sm flex justify-start items-center scrollbar-hide overflow-x-auto lg:px-14"
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
            onClick={() => {
              scrollToTopic(topic.id);
              setCurrentBlock(topic.id);
            }}
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
