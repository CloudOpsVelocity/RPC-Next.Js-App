"use client";
import { BankDetailsList } from "@/app/images/commonImages";
import { Bank } from "@/app/validations/types/project";
import Image from "next/image";
import React from "react";
import PropertyHeading from "../property/heading";
import SubHeading from "./headings/SubHeading";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import Css from "@/app/styles/Loan.module.css";
export default function ProjectLoans({
  banks,
  name,
  type,
}: {
  type: string;
  banks: Bank[];
  name: string;
}) {
  const isMobile = useMediaQuery(`(max-width: 601px)`);
  return (
    <div
      className="bg-white pt-2 pb-4 sm:py-8 w-[95%] md:w-[90%] md:mb-[3%] sm:mb-[4%] mx-auto  h-auto  "
    >
      {type === "prop" ? (
        <PropertyHeading
          title="BANK APPROVALS OF"
          desc="Unlock Your Dream Home with Hassle-Free Bank Approval Loans"
          className="mb-[10px] xl:mb-[10px]"
        />
      ) : (
        <>
          <h2 className="text-h2 sm:text-[22px] xl:text-[32px] font-[600] text-[#001F35] mb-[4px] sm:mb-[10px] xl:mb-[24px] capitalize">
            Bank Approvals For{" "}
            <span className="text-[#148B16] font-[700] ">
              {name}
            </span>
          </h2>
          <SubHeading
            text=" Explore bank loan approvals options for your project with multiple
            banks"
            className="mt-4"
          />
        </>
      )}
      {isMobile ? (
        <Carousel
          slideSize="70%"
          className="!h-[160px] sm:!h-[200px]"
          slideGap="md"
          align={"center"}
          slidesToScroll={1}
          mt={"md"}
          classNames={Css}
        >
          {banks?.map((bank, index) => {
            return (
              <>
                {bank.bankid && (
                  <Carousel.Slide key={index}>
                    <div className="flex flex-col justify-center items-center gap-1.5 p-1.5 mt-4 sm:max-w-[150px] md:max-w-[170px] text-center border rounded-[7px] border-solid border-[#CCCED1] min-h-[120px] sm:min-h-[160px]">
                      <Image
                        src={
                          BankDetailsList?.get(bank.bankid)?.url ??
                          `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/project-detail/Bank-projectproperty.png`
                        }
                        alt={bank.bankName}
                        width={140}
                        height={70}
                        className="max-w-[60px] sm:min-h-[70px] sm:w-[140px] aspect-video "
                      />
                      <p className="mt-3  text-[#242424] text-center text-[14px] sm:text-xl not-italic font-semibold leading-[normal] capitalize">
                        {bank.bankName}
                      </p>
                    </div>
                  </Carousel.Slide>
                )}
              </>
            );
          })}
        </Carousel>
      ) : (
        <div className="mt-16 md:mt-6 grid grid-cols-1 sm:grid-cols-2 md:flex justify-start items-center flex-wrap w-full gap-x-[3%] gap-y-[50px] md:gap-y-[20px]  ">
          {banks?.map((bank, index) => {
            return (
              <>
                {bank.bankid && (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center gap-1.5 p-[6px] mt-4 sm:max-w-[142px] md:max-w-[170px] text-center border rounded-[7px] border-solid border-[#CCCED1] min-h-[160px]"
                  >
                    <Image
                      src={
                        BankDetailsList?.get(bank.bankid)?.url ??
                        `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/project-detail/Bank-projectproperty.png`
                      }
                      alt={bank.bankName}
                      width={140}
                      height={70}
                      className="min-h-[70px] w-[140px] aspect-video "
                    />
                    <p className="mt-3  text-[#242424] text-[18px] text-center  not-italic font-semibold leading-[normal] capitalize">
                      {bank.bankName}
                    </p>
                  </div>
                )}
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}
