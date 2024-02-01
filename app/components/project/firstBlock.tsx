"use client";
import React, { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  FlooringIcon,
  FloorsIcon,
  ReraIcon,
  ShearIcon,
} from "@/app/images/commonSvgs";
import { Main } from "@/app/validations/types/project";
import Image from "next/image";
import SharePopup from "../atoms/SharePopup";
import { formatCurrency } from "@/app/utils/numbers";
import { formatDate } from "@/app/utils/date";
import { getImageUrls } from "@/app/utils/image";
import usePhaseWiseOverview from "@/app/hooks/usePhaseWiseOverview";

type Props = {
  projectDetails: Main | null;
};

const FirstBlock: React.FC<Props> = ({ projectDetails }) => {
  const images = getImageUrls(projectDetails?.media as any);
  const autoplay = useRef(Autoplay({ delay: 10000 }));
  const { hasReraStatus } = usePhaseWiseOverview();
  const scrollToTopic = (): void => {
    const element = document.getElementById("floorPlans");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }
  };

  return (
    <div
      className={`relative rounded-[10px] w-full bg-gray-50 h-[545px] lg:h-[680px] bg-cover flex justify-between items-start flex-col`}
    >
      {projectDetails && (
        <>
          <div className="absolute m-[2%] z-10 right-2">
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
              {images.map((imageUrl, index) => (
                <Carousel.Slide key={index} className="relative">
                  <Image
                    width={1000}
                    height={200}
                    alt="project image"
                    src={imageUrl}
                    className={`!w-full rounded-[10px] bg-cover h-[545px] lg:h-[680px] bg-gray-${
                      index + 1
                    }00`}
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
          <div className="absolute bottom-0 m-[2%] z-10 w-[95%] self-center justify-between items-start flex-col md:flex-row border-solid border-white-500 rounded-[10px] bg-gradient-to-r from-[#EFEFEF] /20 to-[#c3c3c3bd]/80 shadow-md flex">
            <div className=" w-full md:w-[60%]">
              {hasReraStatus && (
                <p className=" flex items-center pl-[8px] rounded-tl-lg text-center text-[24px] font-[600] text-[#FFF] bg-gradient-to-r w-[122px] from-[#148B16] /0 to-[#EFEFEF]/50">
                  <ReraIcon />
                  RERA
                </p>
              )}

              <div className={`ml-[2%] ${!hasReraStatus && "mt-8"}`}>
                <h3 className="text-[24px] lg:text-[28px] font-[700] text-[#00487C] uppercase">
                  {projectDetails.projectName}
                </h3>

                <p className="text-[#202020] text-[20px] not-italic font-[500] leading-[normal] w-[100%] tracking-[0.32px] capitalize">
                  {projectDetails.address} {`${projectDetails.localityName} `}
                  {`${projectDetails.cityName} `}
                  {`${projectDetails?.stateName ?? ""} `}
                  {projectDetails.pinCode}
                </p>

                <p className="text-[16px] mt-[7px] mb-[7px] lg:text-[20px] font-[600] text-[#001F35]">
                  Start - End Date:
                  <span className="font-[600] text-[#202020]">
                    {" "}
                    {formatDate(projectDetails.startDate)} -{" "}
                    {formatDate(projectDetails.endDate)}
                  </span>
                </p>

                <p className="text-[20px] font-[600] text-[#666]">
                  Posted By: Builder
                </p>
              </div>
            </div>
            <div className="w-full md:w-[40%] flex justify-between md:items-end flex-col p-[2%]">
              <h2 className="text-[20px] md:text-[28px] lg:text-[32px] font-[700] text-[#001F35]">
                {formatCurrency(projectDetails.minPrice)} -{" "}
                {formatCurrency(projectDetails.maxPrice)}
              </h2>
              <p className="text-[16px] md:text-right lg:text-[24px] font-[600] mb-[10px] md:mb-[20px] text-[#00487C] ">
                ₹ {projectDetails.basePrice}/ Price per sqft onwards
              </p>

              <p
                className="text-[16px] lg:text-[20px] font-[600] mr-auto md:mr-0 text-[#2A4C70] bg-[#FFF] rounded-[10px] shadow-md p-[8px] flex items-center gap-2 cursor-pointer"
                onClick={scrollToTopic}
              >
                <Image
                  width={100}
                  height={100}
                  src={"/project/floorplan.png"}
                  alt="no of floors"
                  className="h-[24px] w-[24px] "
                />
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
