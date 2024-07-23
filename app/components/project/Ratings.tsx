"use client";
import useRatings from "@/app/hooks/useRatings";
import { RatingStar } from "@/app/images/commonSvgs";
import React from "react";

export default function Ratings() {
  const { data, isLoading } = useRatings();
  return (
    <p className=" sm:text-[20px] flex justify-start items-start lg:text-[24px] text-[#242424] font-[700] whitespace-nowrap mt-3">
      {isLoading
        ? "..."
        : `${
            data?.reviewOverviewData?.averageRating
              ? `${data?.reviewOverviewData?.averageRating}`
              : "No"
          }` ?? "No"}{" "}
      Ratings
      <RatingStar
        fill="#FFD600"
        className="h-[24px] w-[24px] sm:h-[32px] sm:w-[32px]"
      />
    </p>
  );
}
