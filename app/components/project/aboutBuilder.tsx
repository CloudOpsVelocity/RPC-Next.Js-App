"use client";
import React from "react";
import Link from "next/link";
import useBuilder from "@/app/hooks/useBuilder";
import { Svg } from "../property/heading";
import About from "./about";
import Image from "next/image";
import { TeleGramBlack } from "@/app/images/commonSvgs";
import { convertDateToMonthYear } from "@/app/utils/date";

type Props = {
  id: number;
  type?: "prop" | "proj";
};

export default function AboutBuilder({ id, type = "proj" }: Props) {
  const { data } = useBuilder({ id, y: "N", type });
  const nzData = normalizeData(data, type);

  return (
    <div
      className="w-[90%] scroll-mt-[220px]  mb-[5%] rounded shadow-[0px_4px_17.6px_0px_rgba(146,178,200,0.40)] border-[0.5px] border-solid border-[#92B2C8] builderBg py-8 pl-5"
      id="aboutBuilder"
    >
      <div className="w-full">
        <div className=" gap-[26px] justify-start  w-[100%] items-center">
          <h1 className=" text-[#023993] text-[24px] lg:text-[32px] font-[700] mb-4 ">
            About Builder
          </h1>

          <div className="inline-flex justify-end items-end ">
            <Image
              src={
                nzData.logo
                  ? `${nzData.logo}?v=${Math.random()}`
                  : `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/builderpage/builder-noimage.png`
              }
              width={130}
              height={130}
              alt="logo"
              className="shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[10px] border-2 border-solid border-[#96C5E4]"
            />
            <p className=" text-[#148B16] italic text-[20px] lg:text-[26px] font-[700] ml-3">
              {nzData.userName}
              <p className=" text-[#303A42] text-[14px] md:text-[16px] lg:text-[20px] font-[500] ">
                since {convertDateToMonthYear(nzData.companyStartDate)}
              </p>
            </p>
          </div>
        </div>

        <div className="rounded-[20px] mt-[1%] flex justify-between items-center bg-[#FFF] shadow-md w-[100%] mb-[2%] lg:w-[50%] p-[1%] ">
          <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px]">
            <p className=" text-[#202020] text-[20px] lg:text-[24px] font-[600]">
              {nzData.newProject}
            </p>
            <p className=" text-[#148B16] text-[16px] lg:text-[20px] font-[700]">
              New Launch {`Project${nzData.newProject > 1 ? "s" : ""}`}
            </p>
          </div>

          <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px]">
            <p className=" text-[#202020] text-[20px] lg:text-[24px] font-[600]">
              {nzData.onGoingProject}
            </p>
            <p className=" text-[#0073C6] text-[16px] lg:text-[20px] font-[700]">
              Ongoing {`Project${nzData.onGoingProject > 1 ? "s" : ""}`}
            </p>
          </div>

          <div className="w-[30%] ">
            <p className=" text-[#202020] text-[20px] lg:text-[24px] font-[600]">
              {nzData.completedProject}
            </p>
            <p className=" text-[#E3AC00] text-[16px] lg:text-[20px] font-[700]">
              Completed {`Project${nzData.completedProject > 1 ? "s" : ""}`}
            </p>
          </div>
        </div>
        <About
          id="builder_vision"
          heading={""}
          projName={""}
          builderName={nzData.companyName}
          content={nzData.vission}
          className="!mb-[29px] text-[#202020] text-2xl not-italic font-medium leading-[normal] w-full"
        />

        <p className="  text-[22px] lg:text-[24px]  text-black text-2xl not-italic font-semibold leading-[normal] inline-flex">
          {TeleGramBlack} Builder Address{" "}
        </p>
        <p className="  text-[18px] lg:text-[20px]  mt-[1%]  mb-[14px] text-[#242424] text-2xl italic font-medium leading-8 md:mb-[2%] ">
          {nzData.builderAddress}, {nzData.city}, {nzData.state},{" "}
          {nzData.pincode}
        </p>
        <Link
          className=" bg-[#0073C6] rounded-[4px] text-[#FFF] text-[18px] lg:text-[20px] font-[700] p-[10px]  "
          href={`/builder/${id}`}
        >
          View Builder Details
        </Link>
      </div>
    </div>
  );
}

function normalizeData(data: any, type: string) {
  if (type === "proj") {
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
      userName: data?.data.userName,
    };
  } else {
    return {
      propertyName: data?.propertyName,
      newProject: data?.newProject,
      onGoingProject: data?.onGoingProject,
      completedProject: data?.completedProject,
      builderAddress: data?.builderAddress,
      ceoName: data?.ceoName,
      logo: data?.logoUrl,
      vission: data?.vision,
      companyName: data?.companyName,
      companyStartDate: data?.companyStartDate,
      city: data?.cityName,
      state: data?.stateName,
      pincode: data?.pinCode,
      userName: data?.userName,
    };
  }
}
