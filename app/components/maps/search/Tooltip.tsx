import { formatCurrency } from "@/app/utils/numbers";
import React from "react";

type Props = {
  data: any;
};

export default function TooltipProj({ data }: Props) {
  const { projName, minPrice, maxPrice, city, state, locality, builderName } =
    data;
  return (
    <div className="p-1 !rounded-2xl">
      <p className="text-[#001F35] text-base not-italic font-semibold capitalize">
        {projName}
      </p>
      <p className="text-[#148B16] text-lg not-italic font-bold">
        {formatCurrency(Number(minPrice))} - {formatCurrency(Number(maxPrice))}
      </p>
      <p className="text-[#242424] text-base font-medium italic">
        {city}, {state} ,{locality}
      </p>
      <p className="text-[#001F35] text-base not-italic font-medium">
        Available Property: Apartment, Villa
      </p>
      <p className="text-[#202020] text-sm not-italic font-normal">
        Posted By:
        <span className="text-[#202020] text-sm not-italic font-semibold">
          {" "}
          {builderName}
        </span>
      </p>
    </div>
  );
}
