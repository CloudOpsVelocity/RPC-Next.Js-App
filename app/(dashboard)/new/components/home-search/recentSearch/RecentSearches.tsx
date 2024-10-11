"use client";
import React from "react";

import { useRecentSearched } from "@/app/hooks/custom/useRecentSearch";
import Box from "./Box";

type Props = {};

export default function RecentSearches({}: Props) {
  const { recentSearches } = useRecentSearched();
 
  return (
  recentSearches &&   recentSearches.length > 0 && (
      <div className="mt-4">
        <p className="text-[#242424] text-[12px] sm:text-[16px] xl:text-xl not-italic font-medium leading-[normal] ">
        Your Recent Property Searches: Find Homes You’ve Viewed
        </p>
        <div className=" mt-1  flex gap-1  sm:flex  flex-nowrap xl:flex-wrap overflow-x-scroll max-w-[100%] scrollbar-hide">
          {recentSearches.map((item, index) => (
            <Box  key={index}  item={item} />
          ))}
        </div>
      </div>
    )
  );
}
