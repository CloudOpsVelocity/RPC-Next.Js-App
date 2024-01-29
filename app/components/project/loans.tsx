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
    <>
      <div className="bg-white py-8 w-[90%] mx-auto">
        <div className="  px-4">
          <h2 className="text-[24px] lg:text-[32px] font-bold">
            BANK APPROVALS OF <span className="text-green-500">{projName}</span>
          </h2>
          <p className="mt-2 text-[18px] lg:text-[20px] text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipi
          </p>
          <div className="mt-6 flex justify-start items-center flex-wrap w-full gap-[3%]">
            {data?.map((item, index) => {
              if (item.bankid != undefined && item.bankid != null) {
                return (
                  <div className="flex  flex-col justify-center items-center">
                    <Image
                      key={index}
                      src={BankDetailsList?.get(item.bankid)?.url as string}
                      alt={item.bankName}
                      width={100}
                      height={50}
                      className="min-h-[55px] aspect-video"
                    />
                    <p className="mt-3 font-semibold text-xl">
                      {item.bankName}
                    </p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
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
