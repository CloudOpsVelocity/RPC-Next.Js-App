import { formatCurrency } from "@/app/utils/numbers";
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
    cityName,
  } = data;
  return (
    <div className="p-[2px] xl:p-1 !rounded-2xl">
      <p className="text-[#001F35] text-[12px] xl:text-base not-italic font-semibold capitalize">
        {bhkName} {propTypeName} for {category} in {localityName},{"  "}
        <span className="text-[#148B16]  text-[16px] xl:text-lg not-italic font-bold">
          {formatCurrency(Number(price))}
        </span>
      </p>
      <p className="text-[#242424]  text-[12px] xl:text-base font-medium italic">
        {localityName}, {cityName}
      </p>{" "}
      <p className="text-[#202020]  text-[12px] xl:text-sm not-italic font-normal">
        Posted By:
        <span className="text-[#202020]  text-[12px] xl:text-sm not-italic font-semibold">
          {" "}
          {postedBy}
        </span>
      </p>
    </div>
  );
}
