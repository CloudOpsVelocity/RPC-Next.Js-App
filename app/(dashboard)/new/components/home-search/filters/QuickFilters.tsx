import { DropDownIcon } from "@/app/images/commonSvgs";
import {
  Group,
  MultiSelect,
  MultiSelectProps,
  Select,
  Text,
  Checkbox,
  Radio,
} from "@mantine/core";
import React from "react";

import { BasicSelect } from "./Select";
import { BasicBudgetSelect } from "./BugdetSelect";
import { BasicMultiSelect } from "./BhkTypeSelect";
type Props = {};

export default function QuickFilters({}: Props) {
  return (
    <div className="flex  flex-col items-start gap-2.5 rounded p-1.5 border-[0.5px] border-solid border-[#819CA9] bg-white">
      <div className="text-[#242424] text-[15px] not-italic font-normal flex justify-center items-center gap-2">
        <div>Quick Filter: {"  "}</div> <BasicSelect />
        <BasicMultiSelect />
        <BasicBudgetSelect />
      </div>
    </div>
  );
}
