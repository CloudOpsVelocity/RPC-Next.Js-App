import { SEARCH_FILTER_DATA } from "@/app/data/search";
import { Checkbox, RangeSlider } from "@mantine/core";
import React, { useState } from "react";
import ClearAll from "../ClearAll";
import { propertyDetailsTypes } from "@/app/data/projectDetails";

export default function BugdetFilter() {
  const [value, setValue] = useState<[number, number]>([20, 80]);

  return (
    <div className="w-[559px] ">
      <ClearAll />
      <div className="p-3 w-full">
        {" "}
        <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] ">
          Budget
        </h3>
        <div className=" mb-[3%] px-5 gap-[4%]   ">
          <p className="text-[#4D6677] text-[16px] font-[600] mb-[2%] ">
            {value[0]} sq.ft - {value[1]} sq.ft
          </p>
          <RangeSlider
            w={"100%"}
            marks={[
              { value: 0, label: "0 sq.ft" },
              { value: 1000, label: "1000 sq.ft" },
              { value: 2000, label: "2000 sq.ft" },
              { value: 3000, label: "3000 sq.ft" },
              { value: 4000, label: "4000 sq.ft" },
              { value: 5000, label: "5000 sq.ft" },
            ]}
            min={0}
            max={5000}
            value={value}
            onChange={setValue}
            style={{ width: "80%" }}
          />
        </div>
      </div>
    </div>
  );
}
