import { DropDownIcon } from "@/app/images/commonSvgs";
import { Select } from "@mantine/core";
import React from "react";

type Props = {};

export default function QuickFilters({}: Props) {
  return (
    <div className="flex  flex-col items-start gap-2.5 rounded p-1.5 border-[0.5px] border-solid border-[#819CA9] bg-white">
      <div className="text-[#242424] text-[15px] not-italic font-normal flex justify-center items-center gap-2">
        <div>Quick Filter: {"  "}</div>{" "}
        <Select
          placeholder="Property Type"
          rightSection={<DropDownIcon />}
          data={["Apartment", "Villa", "RowHouse", "Plot"]}
        />
        <Select
          placeholder="Bhk Type"
          rightSection={<DropDownIcon />}
          data={["1BHK", "2BHK", "3BHK", "4BHK", "4+BHK"]}
        />
        <Select
          placeholder="Budget"
          rightSection={<DropDownIcon />}
          data={["10000", "20000", "30000", "40000", "50000"]}
        />
      </div>
    </div>
  );
}
