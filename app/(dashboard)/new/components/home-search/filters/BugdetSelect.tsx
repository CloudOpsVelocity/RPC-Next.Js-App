import { useState } from "react";
import { Combobox, Input, InputBase, Radio, useCombobox } from "@mantine/core";
import styles from "./Style.module.css";
import { DropDownIcon } from "@/app/images/commonSvgs";
import useSearchFilters from "@/app/hooks/search";
import { formatBudgetValue } from "@/app/(dashboard)/search/components/buget";

const groceries = [
  "5L - 25L",
  "25L - 45L",
  "45L - 65L",
  "65L - 85L",
  "85L - 10.5CR",
  "10.5CR - 30.5CR",
  "30.5CR - 50.5CR",
  "50.5CR - 60CR+more",
];
const map = new Map([
  ["5L - 25L", { min: 0.05, max: 0.25 }],
  ["25L - 45L", { min: 0.25, max: 0.45 }],
  ["45L - 65L", { min: 0.45, max: 0.65 }],
  ["65L - 85L", { min: 0.65, max: 0.85 }],
  ["85L - 10.5CR", { min: 0.85, max: 10.5 }],
  ["10.5CR - 30.5CR", { min: 10.5, max: 30.5 }],
  ["30.5CR - 50.5CR", { min: 30.5, max: 50.5 }],
  ["50.5CR - 60CR+more", { min: 50.5, max: 60 }],
]);

export function BasicBudgetSelect() {
  const { filters: f, handleSliderChange } = useSearchFilters();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = groceries.map((item) => {
    const minValue = map.get(item)?.min ?? 0;
    const maxValue = map.get(item)?.max ?? 60;
    const allInRange = f.bugdetValue.every(
      (value) => value >= minValue && value <= maxValue
    );
    return (
      <Combobox.Option
        value={item}
        classNames={{
          option: styles.option,
        }}
      >
        <Radio checked={allInRange} color="green" mr={6} /> {item}
      </Combobox.Option>
    );
  });
  const shouldShowBudget = !(f.bugdetValue[0] === 0 && f.bugdetValue[1] === 60);

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
          {(shouldShowBudget &&
            `₹${formatBudgetValue(f.bugdetValue[0])}  - ₹${formatBudgetValue(
              f.bugdetValue[1]
            )}`) || (
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
