"use client"
import React from "react";
import Image from "next/image";
import { apartmentCardImg } from "../images/commonImages";
import PointsBlock from "./components/PointsBlock";
import MarketBanner from "../market-trends/components/MarketBanner";

export default function Page() {
  return <div className="h-[100%] w-[100%] mt-[70px] flex flex-col overflow-hidden bg-[#F5F7F8] items-center pb-[30px] ">
    <MarketBanner title="SellingTipsBanner" />

    <div className="flex flex-col justify-center items-center w-[96%] md:w-[90%] xl:w-[50%] ">
      <div className="w-full h-[200px] md:h-[300px] shadow-md mb-[30px] rounded-[10px] border-solid border-t-[1px] mt-[30px] ">
          <Image
            src={apartmentCardImg}
            width={800}
            height={800}
            alt="not found"
            className="w-full h-full"
          />
      </div>

      <PointsBlock />
    </div>
  </div>;
}  
