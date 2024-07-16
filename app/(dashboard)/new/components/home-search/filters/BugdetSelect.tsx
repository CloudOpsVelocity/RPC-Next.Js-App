import { useState } from "react";
import { Combobox, Input, InputBase, Radio, useCombobox } from "@mantine/core";
import styles from "./Style.module.css";
import { DropDownIcon } from "@/app/images/commonSvgs";
import useSearchFilters from "@/app/hooks/search";

const groceries = [
  "5L - 25L",
  "25L - 45L",
  "45L - 65L",
  "65L - 85L",
  "85L - 10.5CR",
  "10.5CR - 30.5CR",
  "30.5CR - 50.5CR",
  "50.5CR - 60.5CR+more",
];
const map = new Map([
  ["5L - 25L", { min: 5, max: 2500000 }],
  ["25L - 45L", { min: 25, max: 4500000 }],
  ["45L - 65L", { min: 45, max: 6500000 }],
  ["65L - 85L", { min: 65, max: 8500000 }],
  ["85L - 10.5CR", { min: 85, max: 105000000 }],
  ["10.5CR - 30.5CR", { min: 105000000, max: 305000000 }],
  ["30.5CR - 50.5CR", { min: 305000000, max: 505000000 }],
  ["50.5CR - 60.5CR+more", { min: 505000000, max: 100000000000 }],
]);

export function BasicBudgetSelect() {
  const { filters: f, handleSliderChange } = useSearchFilters();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

  const options = groceries.map((item) => (
    <Combobox.Option
      value={item}
      classNames={{
        option: styles.option,
      }}
    >
      <Radio checked={value === item} color="green" mr={6} /> {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        handleSliderChange("bugdetValue", [
          map.get(val)!.min,
          map.get(val)!.max,
        ] as any);
        combobox.closeDropdown();
      }}
      classNames={{
        dropdown: styles.dropdown,
        option: styles.option,
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<DropIcon />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          classNames={{
            input: styles.input,
          }}
        >
          {value || (
            <Input.Placeholder className="!text-black">
              Budget
            </Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
const DropIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M12.4134 6C13.3274 6 13.7624 7.1251 13.0861 7.73994L10.1727 10.3885C9.79125 10.7352 9.20875 10.7352 8.82733 10.3885L5.91394 7.73994C5.23761 7.1251 5.67257 6 6.58661 6H12.4134Z"
        fill="#8EA8CF"
      />
    </svg>
  );
};
