"use client";
import useSearchFilters from "@/app/hooks/search";
import React from "react";

export default function ClearAll({
  type,
}: {
  type: "unitType" | "price" | "all" | "propType";
}) {
  const { handleReset, handleAppliedFilters } = useSearchFilters();
  return (
    <div className="flex w-full justify-end items-center pl-auto pr-[13px] py-[5px] bg-[#F4F4F4]">
      <button
        className="text-[#0073C6] text-lg not-italic font-semibold leading-[normal] underline mr-5 cursor-pointer"
        onClick={() => handleReset(type)}
      >
        Clear all
      </button>
      <button
        className="flex justify-center items-center gap-1 px-2 py-1 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] rounded-[10px] bg-[#0073C6] text-white text-lg not-italic font-semibold leading-[normal]"
        onClick={handleAppliedFilters}
      >
        Apply Filters
      </button>
    </div>
  );
}
