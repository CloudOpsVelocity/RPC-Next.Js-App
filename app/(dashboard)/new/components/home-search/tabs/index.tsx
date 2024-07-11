import clsx from "clsx";
import React, { useState } from "react";

type Props = {};

export default function Tabs({}: Props) {
  const [activeTab, setActiveTab] = useState("buy");
  return (
    <div className="p-4">
      <div className="flex space-x-4">
        <button
          onClick={() => setActiveTab("buy")}
          className={`text-black text-center text-lg not-italic font-semibold min-w-14 relative ${
            activeTab === "buy"
              ? "!text-[#148B16] font-semibold text-lg f5fff6]"
              : ""
          }`}
        >
          <Box active={activeTab === "buy"} />
          Buy
          <div className="h-1">{activeTab === "buy" && config.underLine}</div>
        </button>
        <button
          onClick={() => setActiveTab("rent")}
          className={`text-black text-center text-lg not-italic font-semibold min-w-14 relative ${
            activeTab === "rent"
              ? "!text-[#148B16] font-semibold text-lg f5fff6]"
              : ""
          }`}
        >
          <Box active={activeTab === "rent"} />
          Rent
          <div className="h-1">{activeTab === "rent" && config.underLine}</div>
        </button>
      </div>
    </div>
  );
}
type BoxProps = {
  active: boolean;
};
const Box = ({ active }: BoxProps) => {
  return (
    <div
      className={clsx(
        "flex h-[54px] justify-center items-center self-stretch rounded shadow-[0px_4px_36.5px_0px_rgba(194,194,194,0.60)] p-[11px] border-[0.5px] border-solid border-[#8EA8CF] bg-[#fcfcfc] absolute top-[-56px] min-w-[54px]",
        active &&
          "shadow-[0px_4px_7px_0px_rgba(140,197,63,0.34)_inset,0px_4px_36.5px_0px_rgba(194,194,194,0.60)] border-[0.5px] border-solid border-[#148B16] bg-[#F5FFF6]"
      )}
    ></div>
  );
};
const config = {
  underLine: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="54"
      height="4"
      viewBox="0 0 54 4"
      fill="none"
    >
      <path
        d="M0 4C0 1.79086 1.79086 0 4 0H50C52.2091 0 54 1.79086 54 4H0Z"
        fill="url(#paint0_linear_4037_315)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4037_315"
          x1="31"
          y1="3"
          x2="31"
          y2="-4.85565e-07"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#8CC53F" />
          <stop offset="1" stop-color="#148B16" />
        </linearGradient>
      </defs>
    </svg>
  ),
};
