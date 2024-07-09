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
  onAddingShortList,
  Sh,
}: Props) {
  return (
    <div>
      {" "}
      <p className="text-[#148B16] text-xl not-italic font-bold relative">
        {formatCurrency(Number(minPrice))} - {formatCurrency(Number(maxPrice))}{" "}
        <HeartButton shortListed={Sh} onAddingShortList={onAddingShortList} />
      </p>
      <p className="text-[#001F35] text-[18px] not-italic font-semibold">
        {projName}{" "}
      </p>
      <p className="text-[#242424] capitalize  not-italic font-medium">
        {`${locality}, ${city}`}
      </p>
      <p className="text-[#242424]  not-italic font-normal">
        Posted By: <span className="font-bold">{builderName}</span>
      </p>
    </div>
  );
}
