import { SEARCH_FILTER_DATA } from "@/app/data/search";
import { Checkbox, RangeSlider } from "@mantine/core";
import React, { useState } from "react";
import ClearAll from "../ClearAll";
import { propertyDetailsTypes } from "@/app/data/projectDetails";
import useSearchFilters from "@/app/hooks/search";
import { formatBudgetValue } from "../../../components/buget";
import { BasicBudgetSelect } from "../../../components/buget/budget";

export default function BugdetFilter() {
  return (
    <div className="w-[320px] ">
      <ClearAll type="price" />
      <div className="p-3 w-full">
        <div className=" mb-[3%] px-5 gap-[4%]   ">
          <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] ">
            Budget
          </h3>
          <BasicBudgetSelect />
        </div>
      </div>
    </div>
  );
}
