"use client";
import React from "react";
import Link from "next/link";
import useBuilder from "@/app/hooks/useBuilder";
import { Svg } from "../property/heading";
import About from "./about";
import Image from "next/image";
import { TeleGramBlack } from "@/app/images/commonSvgs";
import { convertDateToMonthYear } from "@/app/utils/date";
import { capitalizeWords } from "@/app/utils/letters";

type Props = {
  id: number; 
  type?: "prop" | "proj";
};

export default function AboutBuilder({ id, type = "proj" }: Props) {
  const { data } = useBuilder({ id, y: "N", type });
  const nzData = normalizeData(data, type);

  let builderName = nzData.userName ? nzData.userName.toLowerCase().split(" ").join("%2D") : "";
  let urlBuilder=`/builders/bengaluru/${builderName}`;

  console.log("testind data pp: ", data);

  return (
    <div
      className="w-[95%] md:w-[90%] scroll-mt-[150px] mb-[5%] !mt-[50px] sm:mb-[0%] rounded shadow-[0px_4px_17.6px_0px_rgba(146,178,200,0.40)] border-[0.5px] border-solid border-[#92B2C8]  pt-4 pb-4 md:pb-6 sm:mt-0 sm:py-8 sm:pl-5 px-2 sm:px-0 "
      id="aboutBuilder"
    >
      <div>
        <div className=" gap-[16px] sm:gap-[26px] justify-start  w-[100%] items-center">
          <h2 className="text-[#242424] text-h2 sm:text-[24px] xl:text-[32px] not-italic font-bold leading-[normal] tracking-[1.28px] mb-4 ">
            About Builder
          </h2>

          <div className="inline-flex justify-center items-center ">
            <Image
              src={
                nzData.logo
                  ? `${nzData.logo}?v=${Math.random()}`
                  : `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/builderpage/builder-noimage.png`
              }
              width={130}
              height={130}
              alt="logo"
              className="object-contain h-[93px] w-[93px] sm:h-[100px] sm:w-[133px] xl:h-[150px] xl:w-[158px]"
            />
            <p className=" text-[#148B16]  text-h2 sm:text-[20px] xl:text-[26px] font-[700] ml-3">
              {nzData.userName}
              <p className=" text-[#303A42] text-[14px] italic sm:text-[16px] xl:text-[20px] font-[500] ">
                since {convertDateToMonthYear(nzData.companyStartDate)}
              </p>
            </p>
          </div>
        </div>
        <div className="sm:rounded-[20px] mt-[1%] flex justify-between items-center builderBg shadow-md w-[100%] mb-[2%] sm:w-[75%] xl:w-[50%] p-[1%] ">
          <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px]">
            <p className=" text-[#202020]  text-[14px] sm:text-[20px] xl:text-[24px] font-[700]">
              {nzData.newProject}
            </p>
            <p className=" text-[#148B16]  text-[12px]    sm:text-[18px] xl:text-[20px] font-[700]">
              New Launch {`Project${nzData.newProject > 1 ? "s" : ""}`}
            </p>
          </div>

          <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px]">
            <p className=" text-[#202020]  text-[14px] sm:text-[18px] xl:text-[24px] font-[700]">
              {nzData.onGoingProject}
            </p>
            <p className=" text-[#001F35] text-[12px] sm:text-[18px] xl:text-[20px] font-[700]">
              Ongoing <br className=" sm:hidden" />{" "}
              {`Project${nzData.onGoingProject > 1 ? "s" : ""}`}
            </p>
          </div>

          <div className="w-[30%] ">
            <p className=" text-[#202020] text-[14px] sm:text-[18px] xl:text-[24px] font-[700]">
              {nzData.completedProject}
            </p>
            <p className=" text-[#E3AC00] text-[12px] sm:text-[18px] xl:text-[20px] font-[700]">
              Completed {`Project${nzData.completedProject > 1 ? "s" : ""}`}
            </p>
          </div>
        </div>
        <About
          id="builder_vision"
          heading={""}
          projName={""}
          builderName={nzData.userName}
          content={nzData.vission}
          className="!mb-[8px] sm:!mb-[20px] xl:!mb-[24px] text-[#202020] sm:text-[18px] xl:text-2xl not-italic font-medium leading-[normal] w-full mt-4 sm:!mt-0 !ml-0"
        />

        <p className="  text-[16px] sm:text-[20px] xl:text-[24px]  text-black sm:text-2xl not-italic font-semibold leading-[normal] inline-flex justify-center items-center">
          Builder Address{" "}
        </p>
        <p className=" text-[12px]  sm:text-[18px] xl:text-[20px]  sm:mt-[1%]  mb-[14px] font-medium  sm:italic text-[#202020]  xl:mb-[2%] ">
          {nzData.builderAddress}, {nzData.city}, {nzData.state},{" "}
          {nzData.pincode}
        </p>
        <a
          className=" bg-[#0073C6] rounded-[4px] text-[#FFF] text-[12px] sm:text-[18px] xl:text-[20px] font-[700] p-[10px]  "
          href={urlBuilder}
          target="_blank" 
        >
          View Builder Details
        </a>
      </div>
    </div>
  );
}

function normalizeData(data: any, type: string) {
  console.log(data);
  return {
    propertyName: data?.data?.propertyName,
    newProject: data?.data?.newProject,
    onGoingProject: data?.data?.onGoingProject,
    completedProject: data?.data?.completedProject,
    builderAddress: data?.data?.builderAddress,
    ceoName: data?.data?.ceoName,
    logo: data?.data?.logoUrl,
    vission: data?.data?.vision,
    companyName: data?.data?.companyName,
    companyStartDate: data?.data?.companyStartDate,
    city: data?.data?.cityName,
    state: data?.data?.stateName,
    pincode: data?.data?.pinCode,
    userName: capitalizeWords(data?.data?.userName),
  };

  // else {
  //   return {
  //     propertyName: data?.propertyName,
  //     newProject: data?.newProject,
  //     onGoingProject: data?.onGoingProject,
  //     completedProject: data?.completedProject,
  //     builderAddress: data?.builderAddress,
  //     ceoName: data?.ceoName,
  //     logo: data?.logoUrl,
  //     vission: data?.vision,
  //     companyName: data?.companyName,
  //     companyStartDate: data?.companyStartDate,
  //     city: data?.cityName,
  //     state: data?.stateName,
  //     pincode: data?.pinCode,
  //     userName: capitalizeWords(data?.userName),
  //   };
  // }
}
