import React, { useRef, useState } from "react";
import { bhkDetails } from "../../data/projectDetails";
import Button from "../../elements/button";
import FloorplanDetailsCard from "./floorplanDetailsCard";
import cookie from "js-cookie";
import filterDataAtom from "@/app/store/filterdata";
import { useSetAtom } from "jotai";
import { selectedFloorAtom } from "@/app/store/floor";
import { useVirtualizer } from "@tanstack/react-virtual";
import useBhkType from "@/app/hooks/project/mutations/floorplan";
import { ImgCarouselIcon, PrevCarouselIcon } from "@/app/images/commonSvgs";

type Props = {
  propCgId: any;
  data: any;
  setValues: any;
  bhk: string;
  setBhk: (value: string) => void;
};

export default function ByBhkBlock({
  propCgId,
  data,
  setValues,
  bhk,
  setBhk,
}: Props) {
  const filteredData =
    bhk === "0" ? data : data.filter((item: any) => item.bhkName === bhk);
  const parentRef = React.useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: filteredData?.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 180,
    overscan: 5,
  });
  const getOptions = (property: string): string[] => {
    return Array.from(new Set(data.map((item: any) => String(item[property]))));
  };
  // const { data: dto, mutate } = useBhkType({ initialData: data, bhkType: bhk });
  const availBhks = getOptions("bhkName").sort((a, b) => a.localeCompare(b));
  const handleBhkChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string
  ): void => {
    e.stopPropagation();
    setBhk(value);
    // mutate({ input: data, bhkType: value });
  };
  const setCurrentState = useSetAtom(selectedFloorAtom);

  const scrollFiltersRef = useRef<HTMLDivElement>(null);

  const handleArrowClick = (e: any, side: "R" | "L"): void => {
    e.stopPropagation();
    const scrollAmount = side === "R" ? 100 : -100;
    if (scrollFiltersRef.current) {
      scrollFiltersRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="shadow-md sm:shadow-none">
      <div className="lg:h-[100px] px-[2%] border-[#92B2C8] border-solid border-b-[1px] pt-2.5 bg-[#F2FAFF]/50">
        <h3 className=" text-[#001F35]  text-[20px] lg:text-[24px] font-[500]  mb-2">
          Select BHK to see floor plans
        </h3>

        <div className="flex justify-between items-center w-full overflow-x-auto overflow-y-hidden !no-scrollbar ">
          {availBhks && availBhks.length > 4 && (
            <button
              onClick={(e) => handleArrowClick(e, "L")}
              className="flex border border-solid border-gray-400 mr-4 min-h-[32px] min-w-[32px] rounded-[50%] items-center justify-center bg-[#FCFCFC] !cursor-pointer"
            >
              <PrevCarouselIcon />
            </button>
          )}

          <div
            ref={scrollFiltersRef}
            className="flex scroll-smooth justify-start items-start w-full overflow-x-auto overflow-y-hidden !no-scrollbar "
          >
            <style>
              {`
                    /* Hide scrollbar for Chrome, Safari, and Opera */
                    ::-webkit-scrollbar {
                      display: none;
                    }
                    
                    /* Hide scrollbar for Firefox */
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                  `}
            </style>

            {availBhks && availBhks.length > 1 && (
              <Button
                key="all"
                title="All"
                onChange={(e) => {
                  handleBhkChange(e, "0");
                }}
                buttonClass={` text-[18px] lg:text-[18px] mr-[10px] lg:mr-[20px] whitespace-nowrap  ${
                  bhk === "0"
                    ? " font-[600] text-[#148B16] underline "
                    : " font-[500] text-[#737579]"
                } `}
              />
            )}
            {availBhks.map((bhkOption) => (
              <Button
                key={`byUnit_${bhkOption}`}
                title={bhkOption}
                onChange={(e) => {
                  handleBhkChange(e, bhkOption);
                  setCurrentState(() => {
                    const newFilteredData =
                      bhkOption === "0"
                        ? data
                        : data.filter(
                            (item: any) => item.bhkName === bhkOption
                          );
                    return newFilteredData[0];
                  });
                }}
                buttonClass={` text-[18px] lg:text-[18px] mr-[10px] lg:mr-[25px] whitespace-nowrap  ${
                  bhk === bhkOption
                    ? " font-[600] text-[#148B16] underline "
                    : " font-[500] text-[#737579]"
                } `}
              />
            ))}
          </div>
          {availBhks && availBhks.length > 4 && (
            <button
              onClick={(e) => handleArrowClick(e, "R")}
              className="flex  border border-solid border-gray-400 min-h-[32px] ml-8 min-w-[32px] rounded-[50%] items-center justify-center bg-[#FCFCFC] !cursor-pointer"
            >
              <ImgCarouselIcon />
            </button>
          )}
        </div>
      </div>
      <div
        className="w-full h-[195px] sm:h-[440px] overflow-auto relative"
        ref={parentRef}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow: any) => (
          <FloorplanDetailsCard
            key={virtualRow.index}
            data={virtualRow}
            propCgId={propCgId}
            projData={data}
            setValues={setValues}
          />
        ))}
        {/* {filteredData.map((item: any, index: number) => (
          <FloorplanDetailsCard
            key={Math.random()}
            data={item}
            propCgId={propCgId}
            projData={data}
            setValues={setValues}
          />
        ))} */}
      </div>
    </div>
  );
}
