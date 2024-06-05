"use client";
import React, { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  DarkCarouseIcon,
  FlooringIcon,
  FloorsIcon,
  NextCarouselButton,
  PrevCarouselButton,
  ReraIcon,
  ShearIcon,
  DarkNextCarouselButton,
} from "@/app/images/commonSvgs";
import { Main } from "@/app/validations/property/index";
import Image from "next/image";
import SharePopup from "../atoms/SharePopup";
import { formatCurrency } from "@/app/utils/numbers";
import { formatDate } from "@/app/utils/date";
import { getImageUrls } from "@/app/utils/image";
import { calculatePerSqPrice } from "@/app/utils/price";
import styles from "@/app/styles/Carousel.module.css";
import { NumberFormatter } from "@mantine/core";
const realData = [{ test: "hello" }, 2, 3, 4, 5, 6, 77];
type Props = {
  projectDetails: Main | null;
  projName: string;
};

const PropertyFirstBlock: React.FC<Props> = ({ projectDetails, projName }) => {
  const images = getImageUrls(projectDetails?.projMedia as any);
  const autoplay = useRef(Autoplay({ delay: 10000 }));
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
            <p className="shadow-md rounded-[10px] bg-gradient-to-r p-[8px] from-[#EFF5FF] /0  to-[#F2FAFF]/100 text-[#000] text-[14px] sm:text-[16px] md:text-xl not-italic font-medium leading-[normal]">
              Listing Status:{" "}
              <span className="text-[#148B16] text-[14px] sm:text-[16px]   md:text-xl not-italic font-bold">
                {" "}
                {projectDetails.availablityStatus === "U"
                  ? "Under Construction"
                  : "Ready to Move"}
              </span>{" "}
            </p>
            <div className="mt-4">
              <SharePopup title="Share Listing" className="text-xl" />
            </div>
          </div>
          <div className="relative w-full rounded-[10px]">
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
              <div className={`ml-[2%] mt-8`}>
                <h3 className="text-[24px] lg:text-[32px] font-[700] text-[#00487C] capitalize ">
                  {projectDetails.bhkName} {projectDetails.propTypeName} For{" "}
                  {projectDetails.cg === "S" ? " Sell" : " Rent"} In{" "}
                  {projectDetails.ltName}
                </h3>
                <p className="text-[#001F35] text-2xl not-italic font-semibold mt-1 capitalize">
                  {projName}
                </p>
                <p className="text-[#202020] text-[22px] not-italic font-medium capitalize mt-2 ">
                  {`${projectDetails.address}, ${projectDetails.ltName}, ${projectDetails.ctName}, ${projectDetails?.stateName}, ${projectDetails.pinCode}`}
                </p>

                <p className=" mt-[7px] mb-[7px] text-[#001F35] text-2xl not-italic font-semibold">
                  Available From:
                  <span className="font-[600] text-[#202020]">
                    {" "}
                    {formatDate(projectDetails.availableFrom)}
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full md:w-[40%] flex justify-between md:items-end flex-col p-[2%]">
              <h2 className="text-[20px] md:text-[28px] lg:text-[32px] font-[700] text-[#001F35]">
                {`${formatCurrency(projectDetails.price)}${
                  projectDetails.cg === "R" ? " / Month" : ""
                }`}{" "}
              </h2>
              {projectDetails.cg === "S" && (
                <p className="text-[16px] md:text-right lg:text-[24px] font-[600] mb-[10px] md:mb-[10px] text-[#00487C] ">
                  ₹{" "}
                  {calculatePerSqPrice(
                    projectDetails.price,
                    projectDetails.propTypeName === "Plot"
                      ? projectDetails.plotArea
                      : projectDetails.sba
                  )}
                  /- Price per sqft onwards
                </p>
              )}
              <p className="text-[#001F35] text-xl not-italic font-semibold leading-[normal] mb-[13px]">
                Posted By: {projectDetails.postedByName}
              </p>
              <p
                className="text-[16px] lg:text-[20px] font-[600] mr-auto md:mr-0 text-[#2A4C70] bg-[#FFF] rounded-[10px] shadow-md p-[8px] flex items-center gap-2 cursor-pointer"
                onClick={scrollToTopic}
              >
                <Image
                  width={100}
                  height={100}
                  src={"/abc/floorplan.png"}
                  alt="no of floors"
                  className="h-[24px] w-[24px] "
                />
                Floors Plan
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyFirstBlock;
