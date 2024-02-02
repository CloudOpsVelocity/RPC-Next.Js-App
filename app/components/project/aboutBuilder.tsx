"use client";
import ReadMore from "../atoms/readmore";
import React from "react";
import Link from "next/link";
import useBuilder from "@/app/hooks/useBuilder";

type Props = {
  id: number;
};

export default function AboutBuilder({ id }: Props) {
  const { data, isLoading } = useBuilder({ id, y: "N" });
  return (
    <div className="w-[90%] scroll-mt-[90px] mt-[5%] mb-[5%]">
      <div className="w-full justify-between items-center ">
        <h1 className=" text-[#023993] text-[24px] lg:text-[32px] font-[700]">
          About Builder
        </h1>
        <p className=" text-[#148B16] italic text-[20px] lg:text-[26px] font-[700]">
          {data?.data?.companyName}
        </p>
        <div className="rounded-[20px] mt-[1%] flex justify-between items-center bg-[#FFF] shadow-md w-[100%] mb-[2%] lg:w-[50%] p-[1%] ">
          <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px]">
            <p className=" text-[#202020] text-[20px] lg:text-[24px] font-[600]">
              {data?.data?.newProject}
            </p>
            <p className=" text-[#148B16] text-[16px] lg:text-[20px] font-[700]">
              New Launch Projects
            </p>
          </div>

          <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px]">
            <p className=" text-[#202020] text-[20px] lg:text-[24px] font-[600]">
              {data?.data?.onGoingProject}
            </p>
            <p className=" text-[#0073C6] text-[16px] lg:text-[20px] font-[700]">
              Ongoing Projects
            </p>
          </div>

          <div className="w-[30%] ">
            <p className=" text-[#202020] text-[20px] lg:text-[24px] font-[600]">
              {data?.data?.completedProject}
            </p>
            <p className=" text-[#E3AC00] text-[16px] lg:text-[20px] font-[700]">
              Completed Projects
            </p>
          </div>
        </div>

        {/* <ReadMore
          text={
            data?.data?.mission +
              "orem jksdfjdsfjljjkl jdslfjlsdf sdfmlsdfj kljsdfljsd flkjlkdsjflkds  sdfjsldkjfds  kljsdflsdjfl" ??
            "orem jksdfjdsfjljjkl jdslfjlsdf sdfmlsdfj kljsdfljsd flkjlkdsjflkds  sdfjsldkjfds  kljsdflsdjfl"
          }
          maxLines={4}
        /> */}

        <p className=" text-[#212C33] text-[22px] lg:text-[24px] font-[500] mt-[3%] italic ">
          Builder Address{" "}
        </p>
        <p className=" text-[#2A4C70] text-[18px] lg:text-[20px] font-[700] mt-[1%] italic mb-[1%]">
          {data?.data?.builderAddress}
        </p>
        <Link
          className=" bg-[#0073C6] rounded-[10px] text-[#FFF] text-[18px] lg:text-[20px] font-[700] p-[10px]  "
          href={`/builder/${id}`}
        >
          View Builder Details
        </Link>
      </div>
    </div>
  );
}
