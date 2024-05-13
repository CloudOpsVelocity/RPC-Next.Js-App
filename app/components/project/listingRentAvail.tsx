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
import React from "react";

export default function ListingRentAvail({
  projName,
  r,
  s,
}: {
  projName: string;
  r: string;
  s: string;
}) {
  const [opened, { close, open: openSuccesPopup }] = useMessagePopup("listing");
  const handleBoxClick = (value: string) => {
    value === "0" && openSuccesPopup();
  };
  return (
    <div className="w-[90%] mb-[5%] scroll-mt-[350px]" id="listings">
      <h1 className="text-[20px] lg:text-[32px] font-[600] text-[#001F35] mb-[12px]">
        Listings Available in{" "}
        <span className="text-[#148B16] font-[700] uppercase text-[20px] lg:text-[32px]">
          {projName}
        </span>{" "}
      </h1>

      <p className="text-[#4D6677] text-[16px] md:text-2xl italic font-medium leading-[normal] capitalize">
        "Unlock the Door to Your Dream Home: Explore Our Array of Available
        Properties Today!"
      </p>
      <div className="flex  items-center gap-[28px] sm:gap-[58px] mt-[35px] flex-wrap">
        <Card
          type="sell"
          s={s}
          r={r}
          projName={projName}
          block={s === "0"}
          onClick={() => handleBoxClick(s)}
        />
        <Card
          type="rent"
          s={s}
          r={r}
          projName={projName}
          block={r === "0"}
          onClick={() => handleBoxClick(r)}
        />
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
  onClick,
}: {
  type: "sell" | "rent";
  r: string;
  s: string;
  projName: string;
  block: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={
        " sm:h-[85px] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.15)] rounded-[31px] relative cursor-pointer"
      }
      onClick={onClick}
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
            "flex justify-center items-center p-2 gap-[12px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-lg border-[3px] border-solid max-w-[80px] mt-[14px] ml-5 mb-5 mr-5",
            type === "sell"
              ? "border-[#FFD600] bg-[#ffef9b]"
              : "border-[#0073C6] bg-[#DBF0FF]"
          )}
        >
          {type === "rent" ? r : s} <StockIcon />
        </div>
      </div>
    </div>
  );
};
