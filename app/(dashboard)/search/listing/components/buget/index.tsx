import { SEARCH_FILTER_DATA } from "@/app/data/search";
import { Checkbox, RangeSlider } from "@mantine/core";
import React, { useState } from "react";
import ClearAll from "../ClearAll";
import { propertyDetailsTypes } from "@/app/data/projectDetails";
import useSearchFilters from "@/app/hooks/search";
import { formatBudgetValue } from "../../../components/buget";

export default function BugdetFilter() {
  const { filters, handleSliderChange } = useSearchFilters();

  return (
    <div className="w-[700px] ">
      <ClearAll type="price" />
      <div className="p-3 w-full">
        {" "}
        <div className=" mb-[3%] px-5 gap-[4%]   ">
          <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] ">
            Budget
          </h3>
          <p className="text-[#4D6677] text-[16px] font-[600] mb-[2%] ">
            ₹ {formatBudgetValue(filters.bugdetValue[0])} - ₹{" "}
            {formatBudgetValue(filters.bugdetValue[1])}
          </p>
          <RangeSlider
            color="green"
            key="budgetSlider"
            minRange={0}
            min={0}
            max={60}
            step={0.05}
            onChange={(value) => handleSliderChange("bugdetValue", value)}
            style={{ width: "100%" }}
            defaultValue={[
              filters?.bugdetValue?.[0] ?? 0.05,
              filters?.bugdetValue?.[1] ?? 60,
            ]}
            label={formatBudgetValue}
          />
        </div>
      </div>
    </div>
  );
}
