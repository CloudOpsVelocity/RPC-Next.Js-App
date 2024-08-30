"use client";
import {
  listingProps,
  Propertytopics as topics,
} from "@/app/data/projectDetails";
import useNearbyProjects from "@/app/hooks/useNearby";
import useNearby from "@/app/hooks/property/useNearBy";
import useRatings from "@/app/hooks/useRatings";
import { Main } from "@/app/validations/types/project";
import { useMediaQuery } from "@mantine/hooks";
import clsx from "clsx";
import { atom, useAtom } from "jotai";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
export const isScrollingAtom = atom(false);
export const stickyAtom = atom(false);
export const currentBlockAtom = atom("overview");
export default function Navigation({
  detailsData,
  projData,
  relateProjData,
  lat,
  lng,
  projId,
  cg,
  propTypeName,
  bhkId,
}: {
  detailsData: any;
  projData: boolean;
  relateProjData: any;
  projName: string;
  lat: string;
  lng: string;
  projId?: string;
  cg: string;
  propTypeName: string;
  bhkId: number;
}) {
  const isTab = useMediaQuery("(max-width: 1600px)");
  const { data } = useRatings();
  const [currentBlock, setCurrentBlock] = useAtom(currentBlockAtom);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useAtom(stickyAtom);
  const [isScrolling, setIsScrolling] = useAtom(isScrollingAtom);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [leftScroll, setLeftScroll] = useState(0);
  function handleArrowClick(side: "R" | "L"): void {
    const scrollAmount = side === "R" ? 100 : -100;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollAmount;
      setLeftScroll((scrollContainerRef.current.scrollLeft += scrollAmount));
    }
  }

  const { data: similarData } = useNearby({
    lat,
    lng,
    projId,
    cg,
    bhkId,
    propType: listingProps[propTypeName.trim() as keyof typeof listingProps],
  });
  const { data: similarProjects, mutate } = useNearbyProjects({
    lat,
    lng,
    projId,
    builderId: relateProjData?.builderId,
  });

  let similarAvl = similarData?.otherListing.length > 1;
  let SimilatListingAvl =
    similarData?.otherListing.length > 1 || similarData?.projListing.length > 1;
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
        if (currentScrollY > (isTab ? 600 : 800)) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
        if (scrollDirection === "down" && window.scrollY > 900) {
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
      if (id !== "overview") {
        setIsSticky(true);
      }
    }
    setTimeout(() => setIsScrolling(false), 2000);
  }
  const conditionsArray = [
    {
      key: "ratings",
      condtion:
        data?.status &&
        data?.reviewDataList?.filter((item: any) => item.userReview).length > 0
          ? true
          : false,
    },
    { condtion: true, key: "overview" },
    { condtion: data?.usp, key: "about" },
    { condtion: true, key: "propertyDetails" },
    { condtion: true, key: "floorPlans" },
    { condtion: true, key: "galleria" },
    {
      condtion: detailsData?.amenities?.length > 0,
      key: "amenities",
    },
    { condtion: true, key: "nearBy" },
    {
      condtion:
        detailsData.cg === "S" &&
        detailsData?.postedById === relateProjData?.builderId &&
        relateProjData?.banks?.length > 0,
      key: "loans",
    },
    { condtion: projData, key: "projectDetails" },
    { condtion: projData, key: "aboutBuilder" },
    {
      condtion:
        projData &&
        detailsData.postedById === relateProjData.builderId &&
        relateProjData.faqs.length > 0,
      key: "faq",
    },
    { condtion: SimilatListingAvl, key: "similarListing" },
    { condtion: similarAvl, key: "similar" },
  ];

  console.log(relateProjData?.faqs);

  return (
    <div
      className={clsx(
        "flex justify-center items-center shadow-lg w-full",
        isSticky && "fixed top-[70px] bg-white shadow-md z-[100]"
      )}
    >
      {leftScroll > 0 && (
        <Image
          src="/auth/arrow.svg"
          alt=""
          className="rotate-180 cursor-pointer"
          width={41}
          height={64}
          onClick={() => handleArrowClick("L")}
        />
      )}
      <div
        className="h-[64px] scroll-smooth w-[100%] bg-[#FCFCFC] shadow-sm flex justify-start items-center scrollbar-hide overflow-x-auto lg:px-14"
        ref={scrollContainerRef}
      >
        {topics.map((topic) => {
          const conditions = conditionsArray.find(
            (item) => item.key === topic.id
          );

          return (
            conditions?.condtion && (
              <div
                key={topic.id}
                className={clsx(
                  `cursor-pointer text-[22px] mr-[36px]  whitespace-nowrap`,
                  currentBlock === topic.id
                    ? "text-[#0073C6] font-[700] decoration-solid underline"
                    : "text-[#4D6677] font-[500]"
                )}
                onClick={() => {
                  scrollToTopic(topic.id);
                  setCurrentBlock(topic.id);
                }}
              >
                {topic.id === "ratings" && data?.status && (
                  <span>Customer Reviews</span>
                )}
                {topic.id === "brochure" && <span>{topic.label}</span>}
                {topic.id !== "ratings" &&
                  topic.id !== "brochure" &&
                  topic.label}
              </div>
            )
          );
        })}
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
