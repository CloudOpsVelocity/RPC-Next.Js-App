"use client";
import { useMessagePopup } from "@/app/hooks/project/useMessagePopup";
import {
  AvailListSideSvg,
  RentSvg,
  SellSvg,
  StockIcon,
  postDetailsIcon,
} from "@/app/images/commonSvgs";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import SubHeading from "./headings/SubHeading";

export default function ListingRentAvail({
  projName,
  r,
  s,
}: {
  projName: string;
  r: string;
  s: string;
}) {
  return (
    <div className="w-[90%] mb-[5%] scroll-mt-[350px]" id="listings">
      <h1 className="text-[20px] lg:text-[32px] font-[600] text-[#001F35] mb-[12px]">
        Listings Available in{" "}
        <span className="text-[#148B16] font-[700]  text-[20px] lg:text-[32px]">
          {projName}
        </span>{" "}
      </h1>

      <SubHeading text="Unlock the door to your dream home: explore our array of available properties today!" />
      <div className="flex  items-center gap-[28px] sm:gap-[58px] mt-[35px] flex-wrap">
        <Card type="sell" s={s} r={r} projName={projName} block={s === "0"} />
        <Card type="rent" s={s} r={r} projName={projName} block={r === "0"} />
      </div>
    </div>
  );
}

const Card = ({
  type,
  r,
  s,
  projName,
  block,
}: {
  type: "sell" | "rent";
  r: string;
  s: string;
  projName: string;
  block: boolean;
}) => {
  const [opened, { close, open: openSuccesPopup }] = useMessagePopup(
    type === "rent" ? "Rlisting" : "Slisting"
  );
  const handleBoxClick = (value: string) => {
    value === "0" && openSuccesPopup();
  };
  return (
    <div
      className={clsx(
        " sm:h-[85px] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.15)] rounded-[10px] relative cursor-pointer",
        type === "sell"
          ? "border border-solid border-[#FBE885]"
          : "border border-solid border-[#B1DEFF] "
      )}
      onClick={() => handleBoxClick(block ? r : s)}
    >
      <AvailListSideSvg type={type} />
      <div className="block sm:inline-flex justify-center items-center gap-[22px] h-full ">
        {type === "rent" ? <RentSvg /> : <SellSvg />}
        <div className="pl-5 md:pl-0">
          <h2 className="text-[#242424] text-2xl not-italic font-medium leading-[31px]">
            <span className="capitalize">{type}</span> Listings in{" "}
          </h2>
          <h2
            className={clsx(
              "text-[#242424] text-2xl not-italic font-bold leading-[31px] mt-1"
            )}
          >
            {projName}
          </h2>
        </div>
        <div
          className={clsx(
            "flex justify-center items-center p-2 gap-[12px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[10px] border-[3px] border-solid max-w-[80px] mt-[14px] ml-5 mb-5 mr-5 text-[#303030] text-2xl not-italic font-semibold",
            type === "sell"
              ? "border-[#FFD600] bg-[#ffef9b]"
              : "border-[#0073C6] bg-[#DBF0FF]"
          )}
        >
          {type === "rent" ? r : s}{" "}
          <Image
            src={type === "rent" ? config.rentIcon : config.sellIcon}
            className="w-[24px] h-[23px]"
            alt=""
            width={24}
            height={23}
          />
        </div>
      </div>
    </div>
  );
};

let config = {
  sellIcon:
    "https://d2l0lb5gc1bw3t.cloudfront.net/staticmedia-images-icons/project-detail/yellowarrow.png",
  rentIcon:
    "https://d2l0lb5gc1bw3t.cloudfront.net/staticmedia-images-icons/project-detail/bluearrow.png",
};
