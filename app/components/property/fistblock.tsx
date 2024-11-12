"use client";
import React, { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  DarkCarouseIcon,
  DarkNextCarouselButton,
} from "@/app/images/commonSvgs";
import { Main } from "@/app/validations/property/index";
import Image from "next/image";
import SharePopup from "../atoms/SharePopup";
import { formatCurrency, formatNumberWithSuffix } from "@/app/utils/numbers";
import { formatDate } from "@/app/utils/date";
import { getImageUrls } from "@/app/utils/image";
import { calculatePerSqPrice } from "@/app/utils/price";
import styles from "@/app/styles/Carousel.module.css";
import { NumberFormatter } from "@mantine/core";
import { useSetAtom } from "jotai";
import { currentBlockAtom, isScrollingAtom, stickyAtom } from "./Navigation";
import { get_posted_by } from "@/app/utils/dyanamic/projects";
import BrokerContactTag from "./BrokersFreindly";
import { createProjectLinkUrl } from "@/app/utils/linkRouters/ProjectLink";
import Link from "next/link";
import { useQuery } from "react-query";
import { generateBuilderUrl } from "@/app/utils/linkRouters/Builder";
type Props = {
  projectDetails: Main | null;
  projName: string;
  totalPrice: number;
  isOkWithBrokerContact: boolean;
  isUsed?: string;
};

const PropertyFirstBlock: React.FC<Props> = ({
  projectDetails,
  projName,
  totalPrice,
  isOkWithBrokerContact,
  isUsed,
}) => {
  const images = getImageUrls(projectDetails?.projMedia as any);
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
  const { data } = useQuery<any>({
    queryKey: [`builder/${projectDetails?.postedById}&isBuilderPage=Nproj`],
    enabled: false,
  });

  const projectUrl = createProjectLinkUrl({
    city: projectDetails?.ctName as string,
    locality: projectDetails?.ltName as string,
    slug: projName as string,
  });
  const builderUrl =
    data &&
    generateBuilderUrl({
      slug: data?.data?.userName,
      city: projectDetails?.ctName as string,
    });
  const isBuilder = (projectDetails?.postedByType) === "B";
  return (
    <div
      className={`relative rounded-[10px] w-full m-auto bg-gray-50 sm:h-[549px]  xl:h-[750px] bg-cover flex justify-between items-start flex-col shadow-md break-words`}
    >
      {projectDetails && (
        <>
          {isOkWithBrokerContact ? (
            <BrokerContactTag
              isBrokerAllowed
              className="absolute right-0 bottom-0 sm:right-auto sm:bottom-auto sm:top-0 sm:left-0 z-[1]"
              isUsed={isUsed}
            />
          ) : null}
          <div className="absolute m-[2%] z-10 right-2">
            <p className="shadow-md rounded-[10px] bg-gradient-to-r p-[8px] from-[#EFF5FF] /0  to-[#F2FAFF]/100 text-[#000] text-[12px] sm:text-[16px] xl:text-xl not-italic font-medium leading-[normal]">
              Listing Status:{" "}
              <span className="text-[#148B16] text-[12px] sm:text-[16px]   xl:text-xl not-italic font-bold leading-[normal]">
                {" "}
                {projectDetails.availablityStatus === "U"
                  ? "Under Construction"
                  : "Ready to Move"}
              </span>{" "}
            </p>
            <div className="mt-4">
              <SharePopup
                title="Share Listing"
                className="text-sm   p-[4px]  sm:text-xl hidden sm:flex"
              />
            </div>
          </div>
          <div className="relative w-full !rounded-[10px]">
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
                <Carousel.Slide
                  key={`Listing_Carousel_${index}`}
                  className="relative"
                  /*  h={750} */
                  w={"full"}
                >
                  <picture>
                    <source
                      media="(max-width: 460px)"
                      srcSet={imageUrl.split(",")[1]}
                    />
                    <source
                      media="(max-width: 768px)"
                      srcSet={imageUrl.split(",")[2]}
                    />
                    <source
                      media="(min-width: 1200px)"
                      srcSet={imageUrl.split(",")[3]}
                    />
                    <Image
                      alt="project image"
                      src={imageUrl.split(",")[3]}
                      fill
                      className={`!w-full sm:!rounded-[10px]  h-[330px] sm:max-h-[549px] !xl:h-[750px] xl:max-h-[750px] bg-gray-${
                        index + 1
                      }`}
                      unoptimized
                    />
                  </picture>
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
          <div className="sm:absolute bottom-0 sm:m-[1%] sm:mb-[4%]   xl:mb-[2%] xl:m-[2%] z-10 sm:w-[95%] self-center justify-between items-start flex-col md:flex-row border-solid border-white-500 sm:rounded-[10px] bg-gradient-to-r from-[#EFEFEF] /20 to-[#c3c3c3bd]/80 shadow-md  sm:flex break-words sm:px-6 sm:py-2">
            <div className=" w-full md:w-[60%]">
              <div className={`ml-[2%] mt-1 sm:mt-[6px] xl:mt-[1%] mb-[7px]`}>
                <div className="flex justify-between items-start">
                  <h3 className="text-[18px] sm:text-[22px] xl:text-[28px] font-[700] text-[#001F35] break-words text-wrap w-full">
                    <span className="lowercase">
                      {projectDetails.propTypeName === "Plot"
                        ? formatNumberWithSuffix(projectDetails.plotArea,false) +
                          " sq.ft"
                        : ""}
                    </span>{" "}
                    {projectDetails.bhkName} {projectDetails.propTypeName} For{" "}
                    {projectDetails.cg === "S" ? " Sell" : " Rent"} In{" "}
                    {projectDetails.ltName}{" "}
                  </h3>
                  <SharePopup className="text-sm p-[2px] mr-2 mt-[2px] sm:hidden " />
                </div>
                <Link
                  href={projectUrl}
                  target="_blank"
                  className={`text-[#001F35]  sm:text-[18px] xl:text-2xl not-italic font-semibold mt-1 capitalize ${
                    projectDetails.projIdEnc ? "underline text-blue-600" : ""
                  } `}
                >
                  {projName}
                </Link>
                <p className="text-[#242424]  text-sm sm:text-[18px]  xl:text-[22px] not-italic font-[600] leading-[normal] w-[100%] tracking-[0.32px] capitalize sm:mt-[8px] xl:mt-[14px] ">
                  {`${projectDetails.address}, ${projectDetails.ltName}, ${projectDetails.ctName}, ${projectDetails?.stateName}, ${projectDetails.pinCode}`}
                </p>

                <p className=" text-sm sm:text-[16px] mt-[10px] xl:mt-[14px] xl:text-[22px] font-[600] text-[#242424]">
                  Available From:
                  <span className="font-[600] text-[#202020]">
                    {" "}
                    {formatDate(projectDetails.availableFrom)}
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full md:w-[40%] flex justify-between md:items-end flex-col p-[2%] sm:p-[0%]">
              <h2 className="iinline-flex sm:text-[22px] xl:text-[32px] font-semibold sm:font-[700] text-[#001F35]">
                {`${
                  projectDetails.cg === "R"
                    ? formatCurrency(projectDetails.price)
                    : formatCurrency(projectDetails.price)
                }${projectDetails.cg === "R" ? " / Month" : ""}`}{" "}
              </h2>
              {projectDetails.cg === "S" && (
                <p className="text-[16px] md:text-right sm:text-[14px] xl:text-[24px] font-[600]   text-[#00487C] ">
                  <span className="text-[#001F35] sm:text-[14px] xl:text-[24px] sm:font-[600] text-wrap not-italic font-medium leading-[normal]">
                    ₹{" "}
                    <NumberFormatter
                      thousandSeparator
                      value={calculatePerSqPrice(
                        projectDetails.price,
                        projectDetails.propTypeName === "Plot"
                          ? projectDetails.plotArea
                          : projectDetails.sba
                      )}
                      thousandsGroupStyle="lakh"
                    />{" "}
                    Base Price/sq.ft onwards
                  </span>
                </p>
              )}
              {totalPrice ? (
                <p className=" mb-1 xl:mb-[13px]  text-[12px]  text-[#001F35] font-semibold md:font-bold ">
                  Other Charges Applicable
                </p>
              ) : (
                ""
              )}

              {isBuilder ? (
                <a
                  target="_blank"
                  href={builderUrl}
                  className="text-[#001F35] sm:text-[18px] xl:text-2xl not-italic font-semibold  capitalize sm:mt-1 xl:mt-[8px]"
                >
                  Posted By:{" "}
                  <span className="underline text-blue-600 cursor-pointer">
                    {projectDetails.postedByName}
                  </span>
                </a>
              ) : (
                <p className="text-[#001F35] sm:text-[18px] xl:text-2xl not-italic font-semibold  capitalize sm:mt-1 xl:mt-[8px]">
                  Posted By:{" "}
                  <span className="">{projectDetails.postedByName}</span>
                </p>
              )}
              <p className="mb-[8px] sm:mb-[6px] xl:mb-[13px] text-[12px] md:text-base text-[#001F35] font-semibold md:font-bold ">
                {get_posted_by(projectDetails.postedByType)}
              </p>
              <p
                className="sm:text-[16px] xl:text-[20px] font-[600] mr-auto md:mr-0 text-[#0073C6] bg-[#FFF] rounded-[10px] shadow-md p-[8px] flex items-center gap-2 cursor-pointer"
                onClick={() => scrollToTopic("floorPlans")}
              >
                <Image
                  width={100}
                  height={100}
                  src={"/abc/floorplan.png"}
                  alt="no of floors"
                  className="xl:h-[24px] xl:w-[24px] w-[16px] h-[16px]  sm:h-[16px] sm:w-[16px] "
                />
                Floor Plan
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyFirstBlock;
