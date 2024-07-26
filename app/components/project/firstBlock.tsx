"use client";
import React, { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  DarkCarouseIcon,
  DarkNextCarouselButton,
  ReraIcon,
} from "@/app/images/commonSvgs";
import { Main } from "@/app/validations/types/project";
import Image from "next/image";
import SharePopup from "../atoms/SharePopup";
import { formatCurrency } from "@/app/utils/numbers";
import { formatDate } from "@/app/utils/date";
import { getImageUrls } from "@/app/utils/image";
import usePhaseWiseOverview from "@/app/hooks/usePhaseWiseOverview";
import styles from "@/app/styles/Carousel.module.css";
import { currentBlockAtom, isScrollingAtom, stickyAtom } from "./navigation";
import { useSetAtom } from "jotai";
import Link from "next/link";
type Props = {
  projectDetails: Main | null;
  companyName: string;
  builderId: number;
  hasReraStatus: boolean;
};

const FirstBlock: React.FC<Props> = ({
  projectDetails,
  companyName,
  builderId,
  hasReraStatus,
}) => {
  const images = getImageUrls(projectDetails?.media as any);
  const autoplay = useRef(Autoplay({ delay: 10000 }));
  const setIsScrolling = useSetAtom(isScrollingAtom);
  const setSticky = useSetAtom(stickyAtom);
  const setC = useSetAtom(currentBlockAtom);

  function scrollToTopic(id: string): void {
    setIsScrolling(true);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });

      setSticky(true);
    }
    setC("floorPlans");
    setTimeout(() => setIsScrolling(false), 3000);
  }
  return (
    <div
      className={`relative rounded-[10px] w-full m-auto bg-gray-50  lg:h-[750px] bg-cover flex justify-between items-start flex-col shadow-md break-words`}
    >
      {projectDetails && (
        <>
          {hasReraStatus && (
            <p className="hidden sm:flex items-center pl-[8px] rounded-tl-lg text-center text-[12px] sm:text-[24px] font-[600] text-[#FFF] bg-gradient-to-r w-[122px] from-[#148B16] /0 to-[#EFEFEF]/50  z-10 left-0 absolute">
              <ReraIcon />
              RERA
            </p>
          )}
          <div className="absolute m-[2%] z-10 right-[1px] sm:right-2">
            <p className="shadow-md rounded-[10px] bg-gradient-to-r p-[8px] from-[#EFF5FF] /0  to-[#F2FAFF]/100 text-[#000] text-[12px] sm:text-[16px] md:text-xl not-italic font-medium leading-[normal]">
              Project Status:{" "}
              <span className="text-[#148B16] text-[12px] sm:text-[16px]   md:text-xl not-italic font-bold leading-[normal]">
                {" "}
                {projectDetails.projectStatus}
              </span>{" "}
            </p>
            <SharePopup className="text-sm p-[4px]  sm:text-xl hidden sm:flex" />
          </div>
          <div className="relative w-full sm:!rounded-[10px]">
            <Carousel
              classNames={styles}
              slideGap={{ base: 0, sm: "md" }}
              withIndicators
              slidesToScroll={1}
              align="start"
              dragFree
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.reset}
              nextControlIcon={<DarkNextCarouselButton />}
              previousControlIcon={<DarkCarouseIcon />}
            >
              {images.map((imageUrl, index) => (
                <Carousel.Slide key={index} className="relative" w={"auto"}>
                  <Image
                    alt="project image"
                    src={imageUrl}
                    fill
                    className={`!w-full sm:!rounded-[10px]  h-[330px] lg:h-[750px] bg-gray-${
                      index + 1
                    }`}
                    quality={100}
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
          <div className="sm:absolute bottom-0  sm:m-[2%] z-10 sm:w-[95%] self-center justify-between items-start flex-col md:flex-row border-solid border-white-500 sm:rounded-[10px] bg-gradient-to-r from-[#EFEFEF] /20 to-[#c3c3c3bd]/80 shadow-md  sm:flex break-words">
            <div className="w-full md:w-[60%]">
              <div className={`ml-[2%] mt-1 sm:mt-10 mb-[7px]`}>
                <div className="flex justify-between items-start">
                  <h1 className="text-[22px] sm:text-[24px] lg:text-[28px] font-[700] text-[#001F35] break-words text-wrap w-full">
                    {projectDetails.projectName}
                  </h1>
                  <SharePopup className="text-sm p-[2px] mr-2 mt-[2px] sm:hidden " />
                </div>

                <p className="text-[#242424]  text-sm sm:text-[22px] not-italic font-[600] leading-[normal] w-[100%] tracking-[0.32px] capitalize mt-[14px] ">
                  {`${projectDetails.address}, ${projectDetails.localityName}, ${projectDetails.cityName}, ${projectDetails.state}, ${projectDetails.pinCode}`}
                </p>

                <p className="text-sm sm:text-[16px] mt-[14px] lg:text-[22px] font-[600] text-[#242424]">
                  Start - End Date:
                  <span className="font-[600] text-[#242424]">
                    {" "}
                    {formatDate(projectDetails.startDate)} -{" "}
                    {formatDate(projectDetails.endDate)}
                  </span>
                </p>

                <p className="text-[#242424] sm:text-2xl not-italic font-semibold leading-[normal] mt-[14px]">
                  Posted By:{" "}
                  <a
                    href={`/builder/${builderId}`}
                    target="_blank"
                    className="text-btnPrimary sm:text-2xl  font-bold leading-[normal] underline"
                  >
                    {companyName ?? "Builder"}
                  </a>
                </p>
              </div>
            </div>
            <div className="w-full md:w-[40%] flex justify-between md:items-end flex-col p-[2%]">
              <h2 className="inline-flex md:text-[28px] lg:text-[32px] font-semibold sm:font-[700] text-[#001F35]">
                <span className=" mr-1 sm:hidden">Price range: </span>
                {"  "}
                {formatCurrency(projectDetails.minPrice)} -{" "}
                {formatCurrency(projectDetails.maxPrice)}
              </h2>
              <p className=" md:text-right lg:text-[24px] sm:font-[600] mb-[10px] md:mb-[20px] text-[#242424] ">
                ₹ {projectDetails.basePrice}/- Price per sqft onwards
              </p>

              <p
                className=" lg:text-[20px] font-[600] mr-auto md:mr-0 text-[#0073C6] bg-[#FFF] rounded-[10px] shadow-md p-[8px] flex items-center gap-2 cursor-pointer"
                onClick={() => scrollToTopic("floorPlansdiv")}
              >
                <Image
                  width={100}
                  height={100}
                  src={"/abc/floorplan.png"}
                  alt="no of floors"
                  className="h-[24px] w-[24px] "
                />
                {projectDetails?.floorPlanCount || 0} Floor Plan
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FirstBlock;
