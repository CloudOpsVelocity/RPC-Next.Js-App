"use client";

import Button from "@/app/elements/button";
import Image from "next/image";
import React from "react";

const YourList = () => {
  return (
    <div className="w-[100%] flex justify-center items-center h-auto lg:h-[500px] md:h-[480px] bg-white [background:linear-gradient(180deg,rgb(249,252,255)_0%,rgb(255,255,255)_100%)]">
      <div className="inline-flex items-center justify-center gap-[10%] ">
        <Image className="!w-[30%] h-[443.03px]" alt="Vector" src="/home/yourListingRight.svg" width={371.81} height={443.03} />
        <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
          <p className="relative [font-family:'Montserrat-SemiBold',Helvetica] sm:mb-[20px] md:mb-[24px] lg:mb-[45px]  font-normal text-transparent sm:text-[24px] md:text-[36px] lg:text-[46px] tracking-[1.84px] leading-[59.8px]">
            <span className="font-semibold text-[#1f1f1f]">Post Your </span>
            <span className="[font-family:'Montserrat-Bold',Helvetica] font-bold text-[#138b16]">Listing Today!</span>
          </p>
          <div className="relative">
            <div className="inline-flex flex-col items-start">
              <p className="relativ [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#B5ABAC] sm:text-[16px] md:text-[24px] lg:text-[36px] tracking-[1.44px] leading-[46.8px]">
                Your listings deserves the spotlight. <br />
                Add it to our platform today!
              </p>
              <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                <div className="relative text-[#A3AED0] [font-family:'Montserrat-Medium',Helvetica] font-medium text-blue-grey sm:text-[16px] md:text-[26px] lg:text-[32px] tracking-[1.28px] leading-[41.6px]">
                  Post Your Residential Property
                </div>
                <div className="relative text-[#666] [font-family:'Montserrat-Medium',Helvetica] font-medium text-grey-1 sm:text-[16px] md:text-[26px] lg:text-[32px] tracking-[1.28px] leading-[41.6px]">
                  Sell | Rent
                </div>
              </div>
            </div>
            {/* <Frame className="!absolute !left-0 !top-[265px]" property1="default" /> */}
            
          </div>
          <Button
              key="yourShortlistBtn"
              title="POST LISTING"
              onChange={()=>("")}
              buttonClass = " md:text-[28px] text-[18px] text-white font-semibold leading-[36.4px] relative bg-[#148b16] p-[10px] pl-[10%] pr-[10%] rounded-xl whitespace-nowrap"
          />
        </div>
      </div>
    </div>
  );
};
export default YourList