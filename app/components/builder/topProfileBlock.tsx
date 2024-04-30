import { builderPageHomeSvg } from "@/app/images/commonSvgs";
import { convertDateToMonthYear } from "@/app/utils/date";
import { Data } from "@/app/validations/types/builder";
import Image from "next/image";
import React from "react";

type Props = {};

export default function TopProfileBlock({
  ceoName,
  companyName,
  companyStartDate,
  logoUrl,
}: Data) {
  return (
    <div className="w-full flex justify-between items-center bg-gradient-to-r  from-[#E0EBFF] /0 via-[#F0F6FF]/46  to-[#C9E8FF]/100 ">
      <div className="flex flex-col h-[100%] min-h-[150px] lg:min-h-[250px] md:min-h-[200px] justify-between items-start ml-[2%] ">
        <p className="text-[15px] md:text-[20px] text-[#565D70] font-[500] mb-[1%]">
          <span>Home</span>
          {" > "}
          <span>Builder</span>
          {" > "}
          <span>{companyName}</span>
        </p>

        <div className="flex justify-start items-end ">
          <div className="flex justify-center mr-[16px] items-center h-[93px] w-[93px] md:h-[133px] md:w-[133px] lg:h-[158px] lg:w-[158px] bg-[#FFF] shadow-md border-solid border-[2px] border-[#96C5E4] rounded-[10px]  ">
            <Image
              alt="builder"
              src={
                `${logoUrl}?v=${Math.random()}` ??
                "https://d1l03fubsuphsh.cloudfront.net/staticmedia-images-icons/builderpage/builder-noimage.png"
              }
              className="object-contain w-[150px] h-[150px]"
              width={158}
              height={158}
            />
          </div>
          <div>
            <p className=" text-[#148B16] text-[24px] md:text-[32px] lg:text-[40px] font-[700] ">
              {companyName}
            </p>
            <p className=" text-[#303A42] text-[14px] md:text-[16px] lg:text-[20px] font-[500] ">
              since {convertDateToMonthYear(companyStartDate)}
            </p>
          </div>
        </div>
      </div>

      {builderPageHomeSvg}
    </div>
  );
}
