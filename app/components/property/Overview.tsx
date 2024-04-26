"use client";
import React from "react";
import ProjBasicDetails from "@/app/components/project/projBasicDetails";
import { Main } from "@/app/validations/property/index";
import { generatePropertyOverViewData } from "@/app/data/property/overview";
import Ratings from "./Ratings";
import CompareList from "./actions/compareList";
import ShortList from "./actions/shortList";
import PropertyOverviewBanner from "./OverViewBanner";

export default function PropertyOverView({ data }: { data: Main }) {
  return (
    <div
      className="pt-[2%] scroll-mt-[220px] w-[90%] rounded-[24px] shadow-md mb-[5%] mt-[2%] bg-gradient-to-r from-[#F6F6F6] /0 via-[#FFF] /45 to-[#FEFFFF]/100 "
      id="overview"
    >
      <div className="pl-[2%] pr-[2%] flex justify-between items-center flex-wrap">
        <div>
          <h2 className="text-[24px] lg:text-[32px] text-[#00487C] not-italic font-bold leading-[normal] uppercase">
            {data.bhkName} {data.propTypeName} FOR{" "}
            {data.cg === "S" ? " Sell" : " Rent"} In {data.ltName}
          </h2>
          <p className="text-[16px] lg:text-[24px] text-[#505050] font-[500]">
            {data.address} {`${data.ltName} `}
            {`${data.ctName} `}
            {`${data.stateName ?? ""} `}
            {data.pinCode}
          </p>
        </div>
        <div className="flex justify-center md:items-end flex-col">
          <Ratings slug={data.projIdEnc} />
          <a
            href={`tel:${8766203976}`}
            className="text-[20px] lg:text-[24px] text-[#0073C6] font-[600] decoration-dashed underline whitespace-nowrap "
          >
            Call now
          </a>
        </div>
      </div>

      <div className="pl-[2%] pr-[2%] flex justify-start md:justify-between items-start md:items-end w-full mb-[3%] mt-[3%] flex-col md:flex-row ">
        <div className="flex justify-start items-start flex-wrap w-[100%] md:w-[80%] ">
          {generatePropertyOverViewData(
            data,
            data.propTypeName,
            data.cg,
            data.availablityStatus
          ).map(({ title, Icon, value }) => (
            <ProjBasicDetails
              icon={<Icon />}
              title={title}
              value={value}
              className="mr-[5%] pt-[2%] mb-[3%]  "
            />
          ))}
        </div>
        <div className=" flex justify-start md:justify-end items-start md:items-end flex-col mt-[3%] md:mt-0 ">
          <CompareList />
          <ShortList />
        </div>
      </div>
      <PropertyOverviewBanner {...data} />
    </div>
  );
}
