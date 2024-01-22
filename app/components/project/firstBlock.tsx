"use client";
import React, { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ReraIcon, ShearIcon } from "@/app/images/commonSvgs";
import { Main } from "@/app/validations/types/project";
import Image from "next/image";
import SharePopup from "../atoms/SharePopup";

type Props = {
  projectDetails: Main | null;
};

const FirstBlock: React.FC<Props> = ({ projectDetails }) => {
  const autoplay = useRef(Autoplay({ delay: 10000 }));

  return (
    <div
      className={`relative rounded-[10px] w-full bg-gray-50 h-[545px] lg:h-[680px] bg-cover flex justify-between items-start flex-col`}
    >
      {projectDetails && (
        <>
          <div className="absolute m-[2%] z-10">
            <p className="shadow-md rounded-[10px] bg-gradient-to-r p-[8px] from-[#EFF5FF] /0  to-[#F2FAFF]/100 text-[#000] text-[16px] font-[500]">
              Current Project Status:{" "}
              <span className="text-[#148B16] text-[16px] font-[700]">
                {" "}
                {projectDetails.projectStatus}
              </span>{" "}
            </p>
            <SharePopup />
          </div>
          <div className="relative w-full rounded-[10px]">
            <Carousel
              slideGap={{ base: 0, sm: "md" }}
              withIndicators
              slidesToScroll={1}
              align="start"
              dragFree
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.reset}
            >
              {projectDetails?.media?.otherImgUrl?.map((imageUrl, index) => (
                <Carousel.Slide key={index} className="relative">
                  <Image
                    width={1000}
                    height={200}
                    alt="project image"
                    src={imageUrl}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`w-full rounded-[10px] h-[545px] lg:h-[680px] bg-gray-${
                      index + 1
                    }00`}
                  />
                  {/* {JSON.stringify(imageUrl)} */}
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
          <div className="absolute bottom-0 m-[2%] z-10 w-[95%] self-center justify-between items-start border-solid border-white-500 rounded-[10px] bg-gradient-to-l from-[#EFEFEF] /50 to-[#c3c3c3bd]/50 shadow-md flex flex-row">
            <div className="w-[60%]">
              <p className=" flex items-center pl-[8px] rounded-tl-lg text-center text-[24px] font-[600] text-[#FFF] bg-gradient-to-r w-[122px] from-[#148B16] /0 to-[#EFEFEF]/50">
                <ReraIcon />
                RERA
              </p>
              <div className="ml-[2%]">
                <h3 className="text-[24px] lg:text-[28px] font-[700] text-[#00487C] uppercase">
                  {projectDetails.projectName} sarang by sumadhura
                </h3>

                <p className="text-[#202020] text-[16px] not-italic font-[500] leading-[normal] w-[100%] tracking-[0.32px]">
                  {projectDetails.address}
                  Folium by Sumadhura, Borewell Rd, Whitefield, Palm Meadows,
                  Ramagondanahalli, Bengaluru, Karnataka 560066
                </p>

                <p className="text-[16px] mt-[7px] mb-[7px] lg:text-[16px] font-[600] text-[#001F35]">
                  Start - End Date:
                  <span className="font-[600] text-[#202020]">
                    {" "}
                    {projectDetails.startDate} - {projectDetails.endDate}
                    12 March, 2023 - 14 June, 2024
                  </span>
                </p>

                <p className="text-[16px] font-[600] text-[#666]">
                  Posted By: {projectDetails.postedBy}
                </p>
              </div>
            </div>
            <div className="w-[40%] flex justify-between items-end flex-col p-[2%]">
              <h2 className="text-[24px] lg:text-[28px] font-[700] text-[#001F35]">
                ₹ {projectDetails.minPrice} Cr - ₹ {projectDetails.maxPrice} Cr
              </h2>
              <p className="text-[16px] text-right lg:text-[20px] font-[600] mb-[20px] text-[#00487C] ">
                ₹ {projectDetails.basePrice}/ Price per sqft onwards
              </p>

              <p className="text-[16px] lg:text-[20px] font-[600] text-[#2A4C70] bg-[#FFF] rounded-[10px] shadow-md p-[8px] ">
                {projectDetails?.floorPlanCount || 0} Floors Plans
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FirstBlock;
