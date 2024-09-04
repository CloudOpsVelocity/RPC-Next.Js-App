import { formatCurrency } from "@/app/utils/numbers";
import React from "react";
import { NewMapIcon } from "@/app/images/commongsSvgs2";
import { sortUnits } from "@/app/utils/unitparser";

type Props = any;

export default function ProjData({
  minPrice,
  maxPrice,
  projName,
  city,
  locality,
  builderName,
  type,
  price,
  propName,
  localityName,
  propTypeName,
  bhkName,
  category,
  cityName,
  postedBy,
  propType,
  bhkNames,
  address,
}: Props) {
  const sortedBhks = sortUnits(bhkNames);
  return type === "proj" ? (
    <div className="flex flex-col">
      <p className="text-[#001F35] text-[14px] sm:text-[16px] xl:text-[18px] font-bold break-words whitespace-normal min-w-0 inline-flex gap-1">
        {projName} <NewMapIcon className="w-4 h-4 block sm:hidden mt-0.5" />
      </p>

      <p className="text-[#148B16] text-[14px] sm:text-[18px] xl:text-xl not-italic font-bold relative">
        {formatCurrency(Number(minPrice))} - {formatCurrency(Number(maxPrice))}
      </p>

      <p className="text-black text-[12px] sm:text-[14px] xl:text-[14px] font-bold">
        <span>
          {sortedBhks && sortedBhks?.length > 5
            ? sortedBhks
                .filter(
                  (_, index) => !(_.includes(".5") || _.includes("Servant"))
                )
                .join(", ")
            : sortedBhks && sortedBhks.join(", ")}
        </span>{" "}
        {propType} For Sale in {`${locality}, ${city}`}
      </p>
      <p className="text-black text-[12px] sm:text-[16px] xl:text-[14px] capitalize font-medium line-clamp-1">
        Address: {address}
      </p>
      <p className="text-black text-[12px] sm:text-[14px] xl:text-[14px] font-normal">
        Posted By: <span className="font-bold">{builderName}</span>
      </p>
    </div>
  ) : (
    <div>
      <p className="text-[#242424] text-[12px] sm:text-[16px] xl:text-[18px] capitalize  not-italic font-medium">
        {bhkName} {propTypeName} for {category} in {localityName}
      </p>
      <p className="text-[#148B16] text-[14px] sm:text-[18px] xl:text-xl not-italic font-bold relative">
        {formatCurrency(Number(price))}
      </p>

      <p className="text-[#001F35] text-[12px] sm:text-[16px]  xl:text-[18px] not-italic font-semibold">
        {propName}{" "}
      </p>
      <p className="text-[#242424] text-[12px] sm:text-[16px] xl:text-[18px] capitalize  not-italic font-medium">
        {address}
      </p>
      <p className="text-[#242424]  text-[12px] sm:text-[12px]  xl:text-[14px] not-italic font-normal">
        Posted By:{" "}
        <span className="font-bold">
          {/* {getTypeText(type)} */}
          {postedBy}
        </span>
      </p>
    </div>
  );
}

export const projectprops = {
  villa: 31,
  plot: 32,
  rowHouse: 33,
  villament: 34,
  apartment: 35,
  independent: 36,
};
