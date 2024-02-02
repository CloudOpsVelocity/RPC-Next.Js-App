import { BankDetailsList } from "@/app/images/commonImages";
import { Bank } from "@/app/validations/types/project";
import Image from "next/image";
import React from "react";

export default function Loans({
  data,
  projName,
}: {
  data: Bank[];
  projName: string;
}) {
  console.log(data);
  return (
    <div className="bg-white scroll-mt-[90px] py-8 w-[90%] mx-auto">
      <div className="  px-4">
        <h2 className="text-[24px] lg:text-[32px] font-bold">
          BANK APPROVALS OF{" "}
          <span className="text-[#148B16] text-[32px] not-italic font-bold leading-[normal] uppercase">
            {projName}
          </span>
        </h2>
        <p className="mt-4 text-[#4D6677] text-2xl italic font-medium leading-[normal] tracking-[0.96px]">
          Unlock Your Dream Home with Hassle-Free Bank Approval Loans
        </p>
        <div className="mt-16 flex justify-start items-center flex-wrap w-full gap-[3%] ">
          {data?.map((item, index) => {
            if (item.bankid != undefined && item.bankid != null) {
              return (
                <div className="flex  flex-col justify-center items-center mt-4">
                  <Image
                    key={index}
                    src={BankDetailsList?.get(item.bankid)?.url as string}
                    alt={item.bankName}
                    width={100}
                    height={50}
                    className="min-h-[55px] aspect-video"
                  />
                  <p className="mt-3 text-[#001F35] text-xl not-italic font-semibold leading-[normal] tracking-[0.8px]">
                    {item.bankName}
                  </p>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

// <Image
//   key={index}
//   src={"/bank.png"}
//   alt={item.constDesc}
//   width={100}
//   height={50}
//   className="mb-[3%]"
// />
