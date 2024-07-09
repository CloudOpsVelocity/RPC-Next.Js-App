"use client";
import React from "react";
import ProjBasicDetails from "@/app/components/project/projBasicDetails";
import { Main } from "@/app/validations/property/index";
import { generatePropertyOverViewData } from "@/app/data/property/overview";
import Ratings from "./Ratings";
import PropertyOverviewBanner from "./OverViewBanner";
import { footerPhoneIcon } from "@/app/images/commonSvgs";
import CompareList from "./actions/compareList";
import ShortList from "./actions/shortList";
import Message from "./actions/Message";

export default function PropertyOverView({ data }: { data: Main }) {
  return (
    <div
      className="pt-[2%] scroll-mt-[220px] w-[90%] rounded-[24px] shadow-md mb-[5%] mt-[2%] bg-gradient-to-r from-[#F6F6F6] /0 via-[#FFF] /45 to-[#FEFFFF]/100 "
      id="overview"
    >
      <div className="pl-[2%] pr-[2%] flex justify-between items-center flex-wrap">
        <div>
          <h2 className="text-[22px] sm:text-[24px] lg:text-[32px] text-[#001F35] font-[700] capitalize">
            <span className="lowercase">
              {data.propTypeName === "Plot" ? data.plotArea + " sq.ft" : ""}
            </span>{" "}
            {data.bhkName} {data.propTypeName} For{" "}
            {data.cg === "S" ? " Sell" : " Rent"} In {data.ltName}
          </h2>
          <p className="text-[#242424]  text-sm sm:text-[22px] not-italic font-[600] leading-[normal] w-[100%] tracking-[0.32px]  mt-[14px] capitalize  sm:max-w-[1400px]">
            {`${data.address}, ${data.ltName}, ${data.ctName}, ${data?.stateName}, ${data.pinCode}`}
          </p>
        </div>
        <div className="flex justify-center md:items-end flex-col">
          <a
            href={`tel:${8766203976}`}
            className="text-[13px] sm:text-[20px]  mt-3  text-[#0073C6] lg:text-2xl not-italic font-semibold leading-[normal] inline-flex justify-center items-center gap-1.5 p-1.5 md:p-2 rounded-lg border-[0.8px] border-solid border-[#0073C6] bg-[#fafafa]"
          >
            {footerPhoneIcon}
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
              key={title}
              icon={<Icon />}
              title={title}
              value={value}
              className="mr-[5%] pt-[2%] mb-[3%]  "
            />
          ))}
        </div>
        <div className=" flex justify-start md:justify-end items-start md:items-end flex-col mt-[3%] md:mt-0 relative pb-10">
          <ShortList {...data} />
          <CompareList {...data} />
          <Message {...data} />
        </div>
      </div>
      <PropertyOverviewBanner {...data} />
    </div>
  );
}
