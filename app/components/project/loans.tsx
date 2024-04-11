import { BankDetailsList } from "@/app/images/commonImages";
import { Bank } from "@/app/validations/types/project";
import Image from "next/image";
import React from "react";
import PropertyHeading from "../property/heading";

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
    <div className="bg-white scroll-mt-[90px] py-8 w-[90%] mx-auto  overflow-hidden">
      {type === "prop" ? (
        <PropertyHeading
          title="BANK APPROVALS OF"
          desc="Unlock Your Dream Home with Hassle-Free Bank Approval Loans"
          className="mb-[40px]"
        />
      ) : (
        <>
          <h2 className="text-[24px] lg:text-[32px] font-bold">
            BANK APPROVALS OF{" "}
            <span className="text-[#148B16] text-[24px] lg:text-[32px] not-italic font-bold leading-[normal] uppercase">
              {name}
            </span>
          </h2>
          <p className="mt-4 text-[#4D6677] text-2xl italic font-medium leading-[normal] tracking-[0.96px]">
            Unlock Your Dream Home with Hassle-Free Bank Approval Loans
          </p>
        </>
      )}

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:flex justify-start items-center flex-wrap w-full gap-[3%] ">
        {banks.map((bank, index) => {
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
                      "https://d1l03fubsuphsh.cloudfront.net/staticmedia-images-icons/project-detail/Bank-projectproperty.png"
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
