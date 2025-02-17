import { formatCurrency } from "@/app/utils/numbers";
import Image from "next/image";
import React from "react";

type Props = {
  data: any;
};

export default function TooltipProp({ data }: Props) {
  const {
    bhkName,
    price,
    propTypeName,
    category,
    localityName,
    postedBy,
    postedByName,
    cityName,
    coverImage
  } = data;
  return (
    <div className="p-[2px] xl:p-1 !rounded-2xl">
        <Image
          src={coverImage} 
          alt="listing cover Image"
          quality={80}
          height={630}
          width={1200}
          className='rounded-[4px] w-full mb-[4px] xl:mb-[10px] md:mb-0 border-[0.5px] border-gray border-solid rounded-l-0 h-[100px] xl:h-[160px] ' 
        />
      <p className="text-[#001F35] text-[12px] xl:text-[14px] not-italic font-semibold capitalize">
        {bhkName} {propTypeName} for {category} in {localityName},{"  "}
        <span className="text-[#148B16] text-[14px] xl:text-[16px] not-italic font-bold">
          {formatCurrency(Number(price))}
        </span>
      </p>
      <p className="text-[#242424]  text-[12px] xl:text-base font-medium italic">
        {localityName}, {cityName}
      </p>{" "}
      <p className="text-[#202020]  text-[12px] xl:text-sm not-italic font-normal">
        {postedBy}:
        <span className="text-[#202020]  text-[12px] xl:text-sm not-italic font-semibold">
          {" "}
          {postedByName}
        </span>
      </p>
    </div>
  );
}
