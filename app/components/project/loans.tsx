import { BankDetailsList } from "@/app/images/commonImages";
import { Bank } from "@/app/validations/types/project";
import Image from "next/image";
import React from "react";
import PropertyHeading from "../property/heading";
import SubHeading from "./headings/SubHeading";

export default function ProjectLoans({
  banks,
  name,
  type,
}: {
  type: string;
  banks: Bank[];
  name: string;
}) {
  return (
    <div
      className="bg-white  py-8 w-[90%] mb-[4%] mx-auto  overflow-hidden scroll-mt-[750px]"
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

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:flex justify-start items-center flex-wrap w-full gap-x-[3%] gap-y-[50px]  ">
        {banks?.map((bank, index) => {
          return (
            <>
              {bank.bankid && (
                <div
                  key={index}
                  className="flex  flex-col justify-center items-center mt-4 sm:max-w-[150px] md:max-w-max text-center"
                >
                  <Image
                    src={
                      BankDetailsList?.get(bank.bankid)?.url ??
                      `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/project-detail/Bank-projectproperty.png`
                    }
                    alt={bank.bankName}
                    width={100}
                    height={50}
                    className="min-h-[55px] aspect-video"
                  />
                  <p className="mt-3 text-[#001F35] text-xl not-italic font-semibold leading-[normal] tracking-[0.8px]">
                    {bank.bankName}
                  </p>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
