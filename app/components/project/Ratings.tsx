"use client";
import useRatings from "@/app/hooks/useRatings";
import { RatingStar } from "@/app/images/commonSvgs";
import React from "react";

export default function Ratings() {
  const { data, isLoading } = useRatings();
  return (
    <p className="text-[20px] flex justify-start items-start lg:text-[24px] text-[#4D6677] font-[700] whitespace-nowrap">
      {isLoading
        ? "..."
        : `${
            data?.reviewOverviewData?.averageRating
              ? `${data?.reviewOverviewData?.averageRating}.0`
              : "No"
          }` ?? "No"}{" "}
      Ratings
      <RatingStar fill="#FFD600" className="h-[32px] w-[32px]" />
    </p>
  );
}
