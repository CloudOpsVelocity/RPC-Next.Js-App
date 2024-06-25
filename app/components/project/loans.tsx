"use client";
import { BankDetailsList } from "@/app/images/commonImages";
import { Bank } from "@/app/validations/types/project";
import Image from "next/image";
import React from "react";
import PropertyHeading from "../property/heading";
import SubHeading from "./headings/SubHeading";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";

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
      className="bg-white pt-2 pb-4 sm:py-8 w-[90%] sm:mb-[4%] mx-auto  overflow-hidden scroll-mt-[750px]"
      id="loans"
    >
      {type === "prop" ? (
        <PropertyHeading
          title="BANK APPROVALS OF"
          desc="Unlock Your Dream Home with Hassle-Free Bank Approval Loans"
          className="mb-[40px]"
        />
      ) : (
        <>
          <h2 className="text-[20px] lg:text-[32px] font-bold">
            Bank Approvals For{" "}
            <span className="text-[#148B16] text-[20px] lg:text-[32px] not-italic font-bold leading-[normal] ">
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
          height={200}
          slideGap="md"
          align={"center"}
          slidesToScroll={1}
          dragFree
          mt={"md"}
        >
          {banks?.map((bank, index) => {
            return (
              <>
                {bank.bankid && (
                  <Carousel.Slide key={index}>
                    <div className="flex flex-col justify-center items-center gap-1.5 p-1.5 mt-4 sm:max-w-[150px] md:max-w-[170px] text-center border rounded-[7px] border-solid border-[#CCCED1] min-h-[160px]">
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
                      <p className="mt-3  text-[#242424] text-center text-xl not-italic font-semibold leading-[normal] capitalize">
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
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:flex justify-start items-center flex-wrap w-full gap-x-[3%] gap-y-[50px]  ">
          {banks?.map((bank, index) => {
            return (
              <>
                {bank.bankid && (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center gap-1.5 p-1.5 mt-4 sm:max-w-[150px] md:max-w-[170px] text-center border rounded-[7px] border-solid border-[#CCCED1] min-h-[160px]"
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
                    <p className="mt-3  text-[#242424] text-center text-xl not-italic font-semibold leading-[normal] capitalize">
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
