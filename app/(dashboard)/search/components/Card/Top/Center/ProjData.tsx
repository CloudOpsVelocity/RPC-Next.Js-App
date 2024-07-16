import { formatCurrency } from "@/app/utils/numbers";
import React from "react";
import HeartButton from "./HeartButton";

type Props = any;

export default function ProjData({
  minPrice,
  maxPrice,
  projName,
  city,
  state,
  locality,
  builderName,
  shortListed,
  type,
  price,
  propName,
  localityName,
  propTypeName,
  bhkName,
  category,
  cityName,
  postedBy
}: Props) {
  console.log( minPrice,
    maxPrice,
    projName,
    city,
    state,
    locality,
    builderName,
    shortListed,
    type,
    price,
    propName,
    localityName,
    propTypeName,
  )
  return type === "proj" ? (
    <div>
      {" "}
      <p className="text-[#148B16] text-[14px] xl:text-xl not-italic font-bold relative">
        {formatCurrency(Number(minPrice))} - {formatCurrency(Number(maxPrice))}
      </p>
      <p className="text-[#001F35] text-[12px]  xl:text-[18px] not-italic font-semibold">
        {projName}{" "}
      </p>
      <p className="text-[#242424] text-[12px] xl:text-[18px] capitalize  not-italic font-medium">
        {`${locality}, ${city}`}
      </p>
      <p className="text-[#242424]  text-[10px]  xl:text-[14px] not-italic font-normal">
        Posted By: <span className="font-bold">{builderName}</span>
      </p>
    </div>
  ) : (
    <div>
      <p className="text-[#148B16] text-[14px] xl:text-xl not-italic font-bold relative">
        {formatCurrency(Number(price))}
      </p>
      <p className="text-[#242424] text-[12px] xl:text-[18px] capitalize  not-italic font-medium">
        {bhkName} {propTypeName} for {category} in {localityName}
      </p>
      <p className="text-[#001F35] text-[12px]  xl:text-[18px] not-italic font-semibold">
        {propName}{" "}
      </p>
      <p className="text-[#242424] text-[12px] xl:text-[18px] capitalize  not-italic font-medium">
        {`${localityName}, ${cityName}`}
      </p>
      <p className="text-[#242424]  text-[10px]  xl:text-[14px] not-italic font-normal">
        Posted By: <span className="font-bold">{/* {getTypeText(type)} */}{postedBy}</span>
      </p>
    </div>
  );
}
function getTypeText(type: string) {
  let text;

  if (type === "proj") {
    text = "Builder";
  } else if (type === "I") {
    text = "Owner";
  } else if (type === "A") {
    text = "Agent";
  } else {
    text = "Unknown";
  }

  return text;
}
