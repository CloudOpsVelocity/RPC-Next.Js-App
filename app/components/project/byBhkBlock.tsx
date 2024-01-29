import React, { useState } from "react";
import { bhkDetails } from "../../data/projectDetails";
import Button from "../../elements/button";
import FloorplanDetailsCard from "./floorplanDetailsCard";
import cookie from "js-cookie";

type Props = {
  propCgId: any;
  data: any;
};

const dummyProptypesList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export default function ByBhkBlock({ propCgId, data }: Props) {
  const getOptions = (property: string): string[] => {
    return Array.from(new Set(data.map((item: any) => String(item[property]))));
  };
  const [bhk, setBhk] = useState("0");

  // Filter data based on selected BHK
  const filteredData =
    bhk === "0"
      ? data
      : data.filter((item: any) => item.bhk === parseInt(bhk, 10));
  const test = getOptions("bhkName");

  return (
    <div className="">
      <div className="h-[100] lg:h-[100px] p-[2%] border-[#92B2C8] border-solid border-b-[1px] border-r-[1px] ">
        <h3 className=" text-[#001F35]  text-[20px] lg:text-[24px] font-[500] ">
          Select BHK to see floor plans
        </h3>

        <div className="flex justify-start items-start flex-wrap ">
          {bhkDetails.map((eachBhk, ind) => (
            <Button
              key={ind}
              title={eachBhk.title}
              onChange={() => setBhk(`${eachBhk.value}`)}
              buttonClass={` text-[18px] lg:text-[24px] mr-[10px] lg:mr-[20px] whitespace-nowrap  ${
                bhk === `${eachBhk.value}`
                  ? " font-[600] text-[#148B16] underline "
                  : " font-[500] text-[#737579]"
              } `}
            />
          ))}
        </div>
      </div>

      <div className="h-full max-h-[468px] border-solid overflow-auto ">
        {filteredData.map((eachItem: any, ind: number) => (
          <FloorplanDetailsCard key={ind} data={eachItem} propCgId={propCgId} />
        ))}
      </div>
    </div>
  );
}
