"use client";
import React from "react";

import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ShearIcon } from "@/app/images/commonSvgs";

type Props = {};

export default function FirstBlock({}: Props) {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  return (
    <div
      className={`relative rounded-[10px] w-full bg-gray-50 h-[545px] lg:h-[680px] bg-cover flex justify-between items-start flex-col `}
    >
      <div className="absolute m-[2%] z-10">
        <p className="shadow-md rounded-[10px] bg-gradient-to-r p-[8px] from-[#EFF5FF] /0  to-[#F2FAFF]/100 text-[#000] text-[16px] font-[500]">
          Current Project Status:{" "}
          <span className="text-[#148B16] text-[16px] font-[700]">
            {" "}
            On-Going
          </span>{" "}
        </p>
        <p className="shadow-md cursor-pointer gap-[4px] p-[8px] flex justify-center items-center rounded-[20px] bg-[#F3F7FF] text-[#0073C6] text-[14px] font-[600] mt-[13px] max-w-[140px] ">
          <ShearIcon />
          Share Project
        </p>
      </div>
      <div className="relative w-full rounded-[10px]">
        <Carousel
          //   slideSize={"100%"}
          slideGap={{ base: 0, sm: "md" }}
          withIndicators
          slidesToScroll={1}
          align="start"
          dragFree
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
        >
          <Carousel.Slide>
            <div className="w-full rounded-[10px]  h-[545px] lg:h-[680px] bg-gray-100 "></div>
          </Carousel.Slide>

          <Carousel.Slide>
            <div className="w-full rounded-[10px]  h-[545px] lg:h-[680px] bg-red-100 "></div>
          </Carousel.Slide>

          <Carousel.Slide>
            <div className="w-full rounded-[10px]  h-[545px] lg:h-[680px] bg-yellow-100 "></div>
          </Carousel.Slide>
        </Carousel>
      </div>
      <div className="absolute bottom-0 m-[2%] z-10 w-[95%] self-center justify-between items-start border-solid border-white-500 rounded-[10px] bg-gradient-to-l from-[#EFEFEF] /50 to-[#c3c3c3bd]/50  shadow-md flex flex-row ">
        <div className=" w-[40%] ">
          <p className=" rounded-tl-lg text-center text-[24px] font-[600] text-[#FFF] bg-gradient-to-r w-[122px] from-[#148B16] /50 to-[#00370100]/50">
            RERA
          </p>

          <div className=" ml-[2%]">
            <h3 className="text-[24px] lg:text-[32px] font-[700] text-[#00487C]">
              sarang by sumadhura
            </h3>
            <p className="text-[16px] lg:text-[24px] font-[600] text-[#001F35]">
              Start - End Date:
              <span className=" font-[600] text-[#737579]">
                {" "}
                12 March, 2023 - 14 June, 2024
              </span>
            </p>
            <p className="text-[16px] font-[600] text-[#4D6677]">
              Posted By: Builder
            </p>
          </div>
        </div>

        <div className="w-[40%] flex justify-end items-end flex-col p-[2%] ">
          <h2 className="text-[24px] lg:text-[32px] font-[700] text-[#001F35]">
            ₹ 2.52 Cr - ₹ 4.52 Cr
          </h2>
          <p className="text-[16px] lg:text-[24px] font-[600] text-[#00487C] ">
            ₹ 1900/ Price per sqft onwards
          </p>
          <p className="text-[16px] lg:text-[20px] font-[600] text-[#2A4C70] bg-[#FFF] rounded-[10px] shadow-md p-[8px] ">
            20 Floors Plans
          </p>
        </div>
      </div>
    </div>
  );
}
