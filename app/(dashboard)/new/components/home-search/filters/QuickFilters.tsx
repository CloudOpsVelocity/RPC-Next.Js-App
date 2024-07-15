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
  const usersData: Record<string, { image: string; email: string }> = {
    "Emily Johnson": {
      image:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
      email: "emily92@gmail.com",
    },
    "Ava Rodriguez": {
      image:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png",
      email: "ava_rose@gmail.com",
    },
    "Olivia Chen": {
      image:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png",
      email: "livvy_globe@gmail.com",
    },
    "Ethan Barnes": {
      image:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
      email: "ethan_explorer@gmail.com",
    },
    "Mason Taylor": {
      image:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
      email: "mason_musician@gmail.com",
    },
  };

  const renderMultiSelectOption: any = ({ option, selected }: any) => (
    <Group gap="sm">
      <Checkbox checked={selected} />
      <div>
        <Text size="xs" opacity={0.5}>
          {/* {usersData[option.value].email} */}
        </Text>
      </div>
    </Group>
  );

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
