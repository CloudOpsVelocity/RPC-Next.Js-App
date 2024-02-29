import { formatDate, formatDateDDMMYYYY } from "@/app/utils/date";
import { formatCurrency } from "@/app/utils/numbers";
import { Main } from "@/app/validations/types/project";
import Image from "next/image";
import React from "react";

export default function PropertyBanner({
  projectName,
  availableProperties,
  startDate,
  endDate,
  minPrice,
  maxPrice,
}: Main) {
  return (
    <div className="w-[1920px] mt-[2%] h-[339px] shrink-0 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] bg-[#fcfcfc] mb-20 relative">
      <Image
        src="/property/propertybanner.png"
        alt="Sobha Dream Acres"
        className="w-[312px] h-auto absolute right-0 -top-[180px]"
        width={312}
        height={312}
      />
      <div className="max-w-[90%] mx-auto p-5">
        <h2 className="text-[#212C33] text-[32px] not-italic font-semibold leading-[normal] tracking-[1.28px] ml-8">
          About{" "}
          <span className="text-[#148B16] text-[32px] not-italic font-semibold leading-[normal] tracking-[1.28px]">
            {projectName}
          </span>
        </h2>
        <div className="flex justify-between items-center p-5">
          <div className=" flex space-x-4">
            {" "}
            <Image
              src="/property.png"
              alt="Sobha Dream Acres"
              className="w-full h-auto mb-4"
              width={350}
              height={185}
            />
            <div className="mt-4">
              <h2 className="text-[#001F35] text-2xl not-italic font-semibold leading-[normal] min-w-[350px]">
                About {projectName}
              </h2>

              <p className="text-[#768AA9] text-xl not-italic font-semibold leading-[normal]">
                {availableProperties.join(" ,")}
              </p>
              <p className="text-[#202020] text-2xl not-italic font-normal leading-[normal]">
                Posted By: <span className="font-semibold">Builder</span>{" "}
              </p>
            </div>
          </div>
          <div className="flex justify-start items-start h-[200px]">
            <div className="text-right mr-4">
              <p className="text-[#148B16] text-[28px] not-italic font-bold leading-[normal]">
                {formatCurrency(minPrice)} - {formatCurrency(maxPrice)}
              </p>
              <p className="text-[#333] text-xl not-italic font-medium leading-[normal]">
                Start- End Date:{" "}
                <span className="font-semibold">
                  {formatDate(startDate)} - {formatDate(endDate)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
