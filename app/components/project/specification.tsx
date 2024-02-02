"use client";
import React, { useRef, useState } from "react";
import { useScrollIntoView } from "@mantine/hooks";
import { SpecificationList } from "@/app/validations/types/project";
import { Box, Group, Paper, ScrollArea, Stack } from "@mantine/core";
import { specificationsList } from "@/app/images/commonSvgs";

export default function Specifications({
  data,
  projName,
}: {
  data: SpecificationList[];
  projName: string;
}) {
  const [selectedSpecIndex, setSelectedSpecIndex] = useState<number | null>(
    null
  );

  const handleSpecClick = (index: number) => {
    setSelectedSpecIndex(index);
    scrollWhereIsSelected(index);
  };
  const viewport = useRef<HTMLDivElement>(null);
  const scrollWhereIsSelected = (index: number) => {
    // @ts-ignore
    const selectedSpecId = data[index]?.specName.toLowerCase();
    const selectedElement = document.getElementById(selectedSpecId);

    if (selectedElement) {
      const titleElement = selectedElement.querySelector("h2"); // Assuming the title is wrapped in an <h1> tag
      const titleHeight = titleElement?.offsetHeight || 0;
      const position = selectedElement.offsetTop - titleHeight; // Adjust the position by subtracting the title height

      viewport.current!.scrollTo({
        top: position,
        behavior: "smooth",
      });
    }
  };

  //console.log(specs)

  return (
    <div
      className="w-[90%] scroll-mt-[90px] mx-auto mb-[5%]"
      id="specifications"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden ">
        <div className="flex-1 bg-gradient-to-tr from-blue-100 p-8">
          <h2 className="text-[24px] lg:text-[32px] font-semibold mb-[12px]">
            SPECIFICATION OF
            <span className="!text-green-600"> {projName}</span>
          </h2>
          <p className="text-[16px] text-[#212C33] md:text-[22px] italic font-semibold leading-[normal] tracking-[0.88px]  mb-4 flex justify-start items-start ">
            <span>
              {" "}
              Vital Details: Size, Amenities, Features- Unveiling your dream
              project{" "}
            </span>
          </p>
          <div className="flex flex-wrap gap-4">
            {data?.map((spec, index) => (
              <a
                key={index}
                className={` px-5 py-2 text-[20px] flex gap-2 bg-[#fafafafa] items-center cursor-pointer rounded-[10px] border-[0.5px] border-solid border-[#76AEFF] ${
                  selectedSpecIndex == index
                    ? "shadow-md text-[#00487C] font-[700]"
                    : "shadow-none text-[#233] font-[500]"
                }`}
                onClick={() => handleSpecClick(index)}
              >
                {spec.specName}
              </a>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-gray-50 rounded-lg">
          <Stack align="center">
            <ScrollArea w={"100%"} h={458} viewportRef={viewport}>
              {data?.map((spec, index) => (
                <div
                  key={index}
                  // @ts-ignore
                  id={spec.specName.toLowerCase()}
                  className="px-[2%] mt-10 w-full items-start justify-start flex-col"
                >
                  <h1
                    className={` flex items-center gap-2 text-[#00487C] min-w-[10%] max-w-[15%] text-[24px] italic font-[600] py-2 px-2 rounded-xl  ${
                      selectedSpecIndex == index
                        ? "specification"
                        : "specificationRemove"
                    }  `}
                  >
                    {specificationsList?.get(spec?.specId)?.url}{" "}
                    <span className="">{spec.specName}</span>
                  </h1>
                  <div>
                    <ul className="list-disc ml-8 grid gap-2 my-2 text-[#233333] text-[20px] font-[500]">
                      {spec.values.map((value, valueIndex) => (
                        <li key={valueIndex}>{value}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </Stack>
        </div>
      </div>
    </div>
  );
}
