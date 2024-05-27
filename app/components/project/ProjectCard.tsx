"use client";
import React from "react";
import MainCarousel from "../molecules/carousel/main";
import { CarouselSlide } from "@mantine/carousel";
import Image from "next/image";
import Button from "../../elements/button";
import { Phone, Shorlisted, shortlistIconSvg } from "@/app/images/commonSvgs";
import { formatCurrency } from "@/app/utils/numbers";
import { useSession } from "next-auth/react";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import clsx from "clsx";
import { GlobalPageType } from "@/app/validations/global";
import { useSetAtom } from "jotai";
import { NearByDataAtom } from "@/app/store/nearby";

type Props = {
  type: string;
  title: string;
  projName?: string;
  content: string;
  data?: any;
  mutate?: ({ id }: { id: string; type: "builder" | "proj" }) => void;
  ct?: "builder" | "proj";
};

type CardProps = {
  type: string;
  projName?: string;
  cardData?: any;
  mutate?: ({ id }: { id: string; type: "builder" | "proj" }) => void;
  ct: "builder" | "proj";
};

export function ProjectCard({ type, cardData, mutate, ct }: CardProps) {
  const [, { open }] = useReqCallPopup();
  const { data: session } = useSession();
  const { toggleShortlist } = useShortlistAndCompare();
  const [, { open: openS }] = usePopShortList();
  const reqId = type === "proj" ? cardData.projIdEnc : cardData.propIdEnc;
  const url =
    type === "proj"
      ? `/abc/karnataka/banglore/${reqId}`
      : `/listing/banglore/${reqId}`;
  const name =
    type === "proj"
      ? cardData.projName
      : `${cardData.bhkName} ${cardData.propTypeName} for
      ${cardData.cg === "R" ? "Rent" : "Sale"} in ${cardData.ltName}`;
  const setPopReqData = useSetAtom(NearByDataAtom);
  const onAddingShortList = (projId: string) => {
    if (session) {
      mutate && mutate({ id: projId, type: ct as Pick<CardProps, "ct">["ct"] });
      toggleShortlist({
        id: reqId,
        status: cardData.shortListed === "Y" ? "N" : "Y",
        source: type as GlobalPageType["types"],
      });
    } else {
      openS();
    }
  };

  const handleReqCall = () => {
    open(type, reqId, "projCard");
    setPopReqData({
      builderName: cardData.postedByName,
      projName: name,
    });
  };
  return (
    <>
      <div
        key={reqId}
        className={clsx(
          "border text-card-foreground min-w-[350px]   min-h-[400px] overflow-hidden  shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[14px]",
          type == "proj" ? "bg-[#FAFAFA] " : "bg-[#FFFEFE] pt-4"
        )}
      >
        {type == "proj" && (
          <div className=" space-y-1.5 p-6  px-4 pt-2 pb-3 justify-between items-center">
            <a
              target="_blank"
              className="tracking-tight text-[18px] font-[600] text-[#565D70] cursor-pointer"
              href={`/abc/karnataka/banglore/${reqId}`}
            >
              {cardData.projName}
            </a>
            <div className="text-xs font-semibold  ">
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
              {cardData.availablityStatus == "R"
                ? "Ready to move"
                : "Under Construction"}
            </p>
          )}
          <a href={url} target="_blank" className="relative  max-h-[212px]">
            <Image
              src={
                type === "proj"
                  ? cardData.coverUrl
                  : cardData.projMedia.coverImageUrl
              }
              alt="Sobha Dream Acres"
              className="w-full  mb-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[5px] max-h-[212px]"
              width={300}
              height={212}
            />
            {type == "proj" &&
              (cardData.rerastatus === "Recieved" ||
                cardData.rerastatus === "Applied") && (
                <p className="absolute top-[1px] left-[0.8px]">
                  <Image src={"/r.svg"} alt="rera" width={100} height={100} />
                </p>
              )}

            <div className=" right-2 absolute ">
              <button
                className="mt-[-30px] rounded-[10px] relative bottom-[35px] z-10 p-[8px] text-[#0073C6] text-[18px] font-[700] flex pl-[4px] justify-center items-center bg-gradient-to-r from-[#EFF5FF] /0 to-[#F2FAFF]/100"
                onClick={(e) => {
                  e.preventDefault();
                  onAddingShortList(cardData.projIdEnc);
                }}
              >
                <span className=" w-[24px] h-[24px] ">
                  {cardData.shortListed === "Y" ? Shorlisted : shortlistIconSvg}
                </span>
                {cardData.shortListed === "Y" ? "Shortlisted" : "Shortlist"}
              </button>
            </div>
          </a>

          <div className="text-sm">
            {type != "proj" && (
              <p className="text-[18px] font-[600] text-[#303030] mb-[8px] ">
                {cardData.bhkName} {cardData.propTypeName} for{" "}
                {cardData.cg === "R" ? "Rent" : "Sale"} in {cardData.ltName},{" "}
                <br />
                <span className="text-[18px] font-[700] text-[#148B16] ">
                  {" "}
                  {formatCurrency(cardData.price)}
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

            {cardData.propTypes ? (
              <p className="mb-[6px] text-[#00487C] text-sm not-italic font-semibold leading-[normal] tracking-[0.56px]">
                {cardData.propTypes.map((eachCity: string) => eachCity)}
              </p>
            ) : (
              "N/A"
            )}

            {type != "proj" && (
              <p className="text-[16px] mb-[6px] font-[600] text-[#4D6677]">
                Available From: {formatDate(cardData.availableFrom)}
              </p>
            )}

            <p className="text-[#565D70]  not-italic font-semibold leading-[normal] tracking-[0.56px]">
              {type === "proj" && cardData?.city}
              {cardData.locality} {cardData.address}
              {type === "prop " &&
                `${cardData.ltName} 
                ${cardData.ctName} 
                ${cardData.stateName ?? ""} 
                ${cardData.pinCode}`}
            </p>
            {type === "proj" && (
              <div className="inline-flex items-start gap-2 p-2 shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[10px] cardBg mt-[16px]">
                <span className="text-black text-right text-base not-italic font-medium leading-[normal]">
                  Project Status:{" "}
                </span>
                <span className="text-[#148B16] text-base not-italic font-bold leading-[normal]">
                  {cardData.projstatus}
                </span>
              </div>
            )}
            {type != "proj" && (
              <p className="text-[16px] font-[500] text-[#4D6677]">
                Posted by {cardData.postedByType === "B" ? "Builder" : "Agent"}
              </p>
            )}
            <Button
              icon={<Phone />}
              title="Request  Callback"
              buttonClass=" text-[#FFF] mt-[12px] text-[16px] font-[600] bg-[#0073C6] rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[6px]  "
              onChange={handleReqCall}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const ProjectCarousel = ({
  type,
  content,
  title,
  projName,
  data,
  mutate,
  ct,
}: Props) => {
  return (
    data?.length > 0 && (
      <div className="w-[100%] mb-[5%]">
        <div className="w-[90%] mx-auto ">
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
        </div>

        <MainCarousel>
          {data &&
            data?.map((project: any, index: number) => {
              return (
                <CarouselSlide>
                  <ProjectCard
                    key={index}
                    type={type}
                    cardData={project}
                    mutate={mutate}
                    ct={ct ?? "builder"}
                  />
                </CarouselSlide>
              );
            })}
        </MainCarousel>
      </div>
    )
  );
};

export default ProjectCarousel;
function formatDate(inputDate: string | undefined): string {
  if (inputDate == null) {
    return "";
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
