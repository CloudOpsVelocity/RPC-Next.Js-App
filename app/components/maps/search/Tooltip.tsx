import { formatCurrency } from "@/app/utils/numbers";
import React from "react";

type Props = {
  data: any;
};

export default function TooltipProj({ data }: Props) {
  const {
    projName,
    minPrice,
    maxPrice,
    city,
    state,
    locality,
    builderName,
    propTypes,
    propType,
    phaseName,
    phaseCount
  } = data;
  console.log("project map tooltip: ",data);

  return (
    <div className="p-[2px] xl:p-1 !rounded-2xl">
      <p className="text-[#001F35] text-[12px] xl:text-base not-italic font-semibold capitalize">
        {projName} - {propType} {phaseCount > 1 ? `(${phaseName})` : ""} 
      </p>
      <p className="text-[#148B16]  text-[16px] xl:text-lg not-italic font-bold">
        {formatCurrency(Number(minPrice))} - {formatCurrency(Number(maxPrice))}
      </p>
      <p className="text-[#242424]  text-[12px] xl:text-base font-medium italic">
        {city}, {state} ,{locality}
      </p>
      {propTypes?.length > 0 && (
        <p className="text-[#001F35]  text-[12px] xl:text-base not-italic font-medium text-wrap max-w-[280px]">
          Available Property: {propTypes?.join(",")}
        </p>
      )}
      <p className="text-[#202020]  text-[12px] xl:text-sm not-italic font-normal">
        Posted By:
        <span className="text-[#202020]  text-[12px] xl:text-sm not-italic font-semibold">
          {" "}
          {builderName}
        </span>
      </p>
    </div>
  );
}
