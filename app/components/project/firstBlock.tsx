"use client";
import React, { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ShearIcon } from "@/app/images/commonSvgs";
import { Main } from "@/app/validations/types/project";
import Image from "next/image";

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
            <p className="shadow-md cursor-pointer gap-[4px] p-[8px] flex justify-center items-center rounded-[20px] bg-[#F3F7FF] text-[#0073C6] text-[14px] font-[600] mt-[13px] max-w-[140px] ">
              <ShearIcon />
              Share Project
            </p>
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
              {projectDetails.media.projOtherImagesUrl.map(
                (imageUrl, index) => (
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
                )
              )}
            </Carousel>
          </div>
          <div className="absolute bottom-0 m-[2%] z-10 w-[95%] self-center justify-between items-start border-solid border-white-500 rounded-[10px] bg-gradient-to-l from-[#EFEFEF] /50 to-[#c3c3c3bd]/50 shadow-md flex flex-row">
            <div className="w-[40%]">
              <p className="rounded-tl-lg text-center text-[24px] font-[600] text-[#FFF] bg-gradient-to-r w-[122px] from-[#148B16] /50 to-[#00370100]/50">
                RERA
              </p>
              <div className="ml-[2%]">
                <h3 className="text-[24px] lg:text-[32px] font-[700] text-[#00487C]">
                  {projectDetails.projectName}
                </h3>
                <p className="text-[16px] lg:text-[24px] font-[600] text-[#001F35]">
                  Start - End Date:
                  <span className="font-[600] text-[#737579]">
                    {" "}
                    {projectDetails.startDate} - {projectDetails.endDate}
                  </span>
                </p>
                <p className="text-[16px] font-[600] text-[#4D6677]">
                  Posted By: {projectDetails.postedBy}
                </p>
              </div>
            </div>
            <div className="w-[40%] flex justify-end items-end flex-col p-[2%]">
              <h2 className="text-[24px] lg:text-[32px] font-[700] text-[#001F35]">
                ₹ {projectDetails.minPrice} Cr - ₹ {projectDetails.maxPrice} Cr
              </h2>
              <p className="text-[16px] lg:text-[24px] font-[600] text-[#00487C] ">
                ₹ {projectDetails.basePrice}/ Price per sqft onwards
              </p>
              <p className="text-[16px] lg:text-[20px] font-[600] text-[#2A4C70] bg-[#FFF] rounded-[10px] shadow-md p-[8px] ">
                {projectDetails.phaseList.length} Floors Plans
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FirstBlock;
