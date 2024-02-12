import { SEARCH_FILTER_DATA } from "@/app/data/search";
import { Checkbox, RangeSlider } from "@mantine/core";
import React, { useState } from "react";
import ClearAll from "../ClearAll";
import { propertyDetailsTypes } from "@/app/data/projectDetails";
import useSearchFilters from "@/app/hooks/search";

export default function BugdetFilter() {
  const { filters, handleSliderChange } = useSearchFilters();

  return (
    <div className="w-[559px] ">
      <ClearAll />
      <div className="p-3 w-full">
        {" "}
        <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] ">
          Budget
        </h3>
        <div className=" mb-[3%] px-5 gap-[4%]   ">
          <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] ">
            Budget
          </h3>
          <p className="text-[#4D6677] text-[16px] font-[600] mb-[2%] ">
            ₹ {filters.bugdetValue[0]} - ₹ {filters.bugdetValue[1]} Cr
          </p>
          <RangeSlider
            key="budgetSlider"
            marks={[
              { value: 0, label: "₹ 0" },
              { value: 0.1, label: "₹ 5 Lacs" },
              { value: 0.5, label: "₹ 1 Cr" },
              { value: 1, label: "₹ 2 Cr" },
              { value: 1.5, label: "₹ 3 Cr" },
              { value: 2, label: "₹ 4 Cr" },
              { value: 2.5, label: "₹ 5 Cr+" },
            ]}
            step={0.1}
            min={0}
            max={2.5}
            value={[0, 5]}
            onChange={(value) => handleSliderChange("bugdetValue", value)}
            style={{ width: "80%" }}
          />
        </div>
      </div>
    </div>
  );
}
