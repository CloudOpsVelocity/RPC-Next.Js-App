"use client";
import useRatings from "@/app/hooks/useRatings";
import { RatingStar } from "@/app/images/commonSvgs";
import { useParams } from "next/navigation";
import React from "react";

export default function Ratings() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useRatings({ projectId: slug });
  return (
    <p className="text-[20px] flex justify-start items-start lg:text-[24px] text-[#4D6677] font-[700] whitespace-nowrap">
      {isLoading ? "..." : data?.rating ?? 0}.0 Ratings
      <RatingStar fill="#FFD600" className="h-[32px] w-[32px]" />
    </p>
  );
}
