"use client";
import React from "react";
import MainCarousel from "../molecules/carousel/main";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import Image from "next/image";
import Button from "../../elements/button";
import {
  Phone,
  RERAsvg,
  ReraIcon,
  shortlistIconSvg,
} from "@/app/images/commonSvgs";
import { formatCurrency } from "@/app/utils/numbers";
import { useToggle } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { addShortList } from "@/app/utils/api/actions/shortlist";
import LoginPopup from "./modals/LoginPop";
import { popupStateAtom, useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { useAtomValue } from "jotai";
// import { formatDate } from "@/app/utils/date";

type Props = {
  type: string;
  title: string;
  projName?: string;
  content: string;
  data?: any;
};

type CardProps = {
  type: string;
  projName?: string;
  cardData?: any;
};

export function ProjectCard({ type, cardData }: CardProps) {
  console.log(cardData);
  const [, { open }] = useReqCallPopup();
  const { data: session } = useSession();
  const { toggleShortlist, shortlistedItems } = useShortlistAndCompare();

  const isItemInShortlist =
    shortlistedItems.length > 0 &&
    shortlistedItems.some(
      (item) => item.id === cardData.projIdEnc && item.status === "Y"
    );

  const onAddingShortList = () => {
    if (session) {
      toggleShortlist({
        id: cardData.projIdEnc,
        status: isItemInShortlist ? "Y" : "N",
      });
    }
  };
  return (
    <>
      <div
        key={cardData.projIdEnc}
        className="border text-card-foreground min-w-[350px] bg-[#FAFAFA]  min-h-[400px] overflow-hidden  shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[14px]"
      >
        {type == "proj" && (
          <div className="flex space-y-1.5 p-6  px-4 pt-2 pb-3 justify-between items-center">
            <a
              target="_blank"
              className="tracking-tight text-[18px] font-[600] text-[#565D70] cursor-pointer"
              href={`/abc/karnataka/banglore/${cardData.projIdEnc}`}
            >
              {cardData.projName}
            </a>
            <div className="text-xs font-semibold text-right ">
              <span className="text-[16px] font-[700] text-[#148B16]">
                {formatCurrency(cardData.minPrice)}
              </span>{" "}
              -{" "}
              <span className="text-[16px] font-[700] text-[#148B16]">
                {formatCurrency(cardData.maxPrice)}
              </span>
            </div>
          </div>
        )}

        <div className="px-3 pb-3">
          {type != "proj" && (
            <p className="mb-[-30px] relative z-10 p-[2px] text-[#148B16] text-[14px] font-[700] w-[40%] flex pl-[4px] justify-center items-center bg-gradient-to-r from-[#EFF5FF] /0 to-[#F2FAFF]/100 shadow-md rounded-[18px] border-[#92B2C8] border-[0.5px] border-solid ">
              Ready to move
            </p>
          )}
          <div className="relative  max-h-[212px]">
            <Image
              src="/property.jpeg"
              alt="Sobha Dream Acres"
              className="w-full  mb-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[5px] max-h-[212px]"
              width={300}
              height={212}
            />
            {type == "proj" && (
              <p className="absolute top-[1px] left-[0.8px]">
                <Image src={"/r.svg"} alt="rera" width={100} height={100} />
              </p>
            )}

            <div className=" right-2 absolute ">
              {!session ? (
                <LoginPopup type="Shortlist" card={true} />
              ) : (
                <button
                  className="mt-[-30px] rounded-[10px] relative bottom-[35px] z-10 p-[8px] text-[#0073C6] text-[18px] font-[700] flex pl-[4px] justify-center items-center bg-gradient-to-r from-[#EFF5FF] /0 to-[#F2FAFF]/100"
                  onClick={() => onAddingShortList()}
                >
                  <span className=" w-[24px] h-[24px] ">
                    {shortlistIconSvg}
                  </span>
                  {isItemInShortlist ? "Shortlisted" : "Shortlist"}
                </button>
              )}
            </div>
          </div>

          <div className="text-sm">
            {type != "proj" && (
              <p className="text-[18px] font-[600] text-[#303030] mb-[8px] ">
                3BHK Villa for Sale in {cardData.cityName},{" "}
                <span className="text-[18px] font-[700] text-[#148B16] ">
                  {" "}
                  Rs 3.2 Lakh
                </span>{" "}
              </p>
            )}

            {type == "proj" && (
              <p className="mb-[6px] text-[#565D70] text-sm not-italic font-semibold leading-[normal]">
                Start - End Date:
                <span className="ml-[4px] text-[#001F35] text-sm not-italic font-semibold leading-[normal]">
                  {formatDate(cardData.launchDate)} -{" "}
                  {formatDate(cardData.possassionDate)}
                </span>
              </p>
            )}

            {cardData.propTypes && (
              <p className="mb-[6px] text-[#00487C] text-sm not-italic font-semibold leading-[normal] tracking-[0.56px]">
                {cardData.propTypes.map((eachCity: string) => eachCity)}
              </p>
            )}

            {type != "proj" && (
              <p className="text-[16px] mb-[6px] font-[600] text-[#4D6677]">
                Available From: 12/ 02/ 2023
              </p>
            )}

            <p className="text-[#565D70]  not-italic font-semibold leading-[normal] tracking-[0.56px]">
              {cardData?.cityv ?? "N/A"} {cardData.pinCode}
            </p>

            {type != "proj" && (
              <p className="text-[16px] font-[500] text-[#4D6677]">
                Posted by Agent
              </p>
            )}
            <Button
              icon={<Phone />}
              title="Request a Callback"
              buttonClass=" text-[#FFF] mt-[12px] text-[16px] font-[600] bg-[#0073C6] rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[6px]  "
              onChange={() => open("card", cardData.projIdEnc)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const ProjectCarousel = ({ type, content, title, projName, data }: Props) => {
  console.log(data);
  return (
    <div className="w-[100%] mb-[5%]">
      <h2 className="text-[24px] lg:text-[32px] font-semibold uppercase cursor-pointer">
        {/* <span className="!text-green-600">SARANG BY SUMADHARA </span> */}
        {title}
        <span className="text-[#148B16] font-[700] uppercase ml-4 ">
          {projName}
        </span>
      </h2>
      <p className="mt-3 mb-[44px]  text-[#4D6677] text-2xl italic font-medium leading-[normal] tracking-[0.96px]">
        {content}
      </p>

      <MainCarousel>
        {data &&
          data?.map((project: any, index: number) => {
            return (
              <CarouselSlide>
                <ProjectCard key={index} type={type} cardData={project} />
              </CarouselSlide>
            );
          })}
      </MainCarousel>
    </div>
  );
};

export default ProjectCarousel;
function formatDate(inputDate: string | undefined): string {
  if (inputDate == null) {
    return ""; // You can return an empty string or any default value
  }

  const date = new Date(inputDate.replace(/IST/, "GMT+0530"));

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const day = date.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    date
  );
  const year = date.getFullYear();

  const formattedDate = `${day} ${month}, ${year}`;

  return formattedDate;
}
