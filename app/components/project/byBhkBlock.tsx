import React, { useState } from "react";
import { bhkDetails } from "../../data/projectDetails";
import Button from "../../elements/button";
import FloorplanDetailsCard from "./floorplanDetailsCard";
import cookie from "js-cookie";

type Props = {
  propCgId: any;
  data: any;
};

export default function ByBhkBlock({ propCgId, data }: Props) {
  const [bhk, setBhk] = useState("0");

  // Filter data based on selected BHK
  const filteredData =
    bhk === "0" ? data : data.filter((item: any) => item.bhkName === bhk);

  const getOptions = (property: string): string[] => {
    return Array.from(new Set(data.map((item: any) => String(item[property]))));
  };

  const availBhks = getOptions("bhkName").sort((a, b) => a.localeCompare(b));

  return (
    <div className="">
      <div className="lg:h-[100px] px-[2%] border-[#92B2C8] border-solid border-b-[1px] border-r-[1px] ">
        <h3 className=" text-[#001F35]  text-[20px] lg:text-[24px] font-[500] ">
          Select BHK to see floor plans
        </h3>

        <div className="flex justify-start items-start flex-wrap ">
          <Button
            key="all"
            title="All"
            onChange={() => setBhk("0")}
            buttonClass={` text-[18px] lg:text-[24px] mr-[10px] lg:mr-[20px] whitespace-nowrap  ${
              bhk === "0"
                ? " font-[600] text-[#148B16] underline "
                : " font-[500] text-[#737579]"
            } `}
          />
          {availBhks.map((bhkOption, ind) => (
            <Button
              key={ind}
              title={bhkOption}
              onChange={() => setBhk(bhkOption)}
              buttonClass={` text-[18px] lg:text-[24px] mr-[10px] lg:mr-[20px] whitespace-nowrap  ${
                bhk === bhkOption
                  ? " font-[600] text-[#148B16] underline "
                  : " font-[500] text-[#737579]"
              } `}
            />
          ))}
        </div>
      </div>

      <div className="h-full max-h-[468px] border-solid overflow-auto scrollbar-hide">
        {filteredData.map((eachItem: any, ind: number) => (
          <FloorplanDetailsCard key={ind} data={eachItem} propCgId={propCgId} />
        ))}
      </div>
    </div>
  );
}
