"use client";
import { topics } from "@/app/data/projectDetails";
import Button from "@/app/elements/button";
import Image from "next/image";
import React, { useState } from "react";

export default function Navigation() {
  const [currentBlock, setCurrentBlock] = useState("Overview");
  const scrollTopics = (side: string) => {
    console.log(side);
  };
  return (
    <div className=" flex justify-center items-center w-full ">
      <Image
        src="/auth/arrow.svg"
        alt=""
        className=" rotate-180 "
        width={41}
        height={64}
        onClick={() => scrollTopics("L")}
      />
      <div className="h-[64px] pl-[24px] pr-[24px] w-[100%] bg-[#FCFCFC] shadow-sm flex justify-start items-center overflow-hidden ">
        {topics.map((each, index) => {
          return (
            <Button
              key={index}
              title={each}
              onChange={() => setCurrentBlock(each)}
              buttonClass={` text-[24px]  mr-[40px] whitespace-nowrap ${
                currentBlock == each
                  ? "text-[#0073C6] font-[700] decoration-solid underline "
                  : "text-[#4D6677] font-[500]"
              } `}
            />
          );
        })}
      </div>
      <Image
        src="/auth/arrow.svg"
        alt=""
        className=" "
        width={41}
        height={64}
        onClick={() => scrollTopics("R")}
      />
    </div>
  );
}
