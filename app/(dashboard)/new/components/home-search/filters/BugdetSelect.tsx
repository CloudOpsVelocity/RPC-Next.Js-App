import { useState } from "react";
import { Combobox, Input, InputBase, Radio, useCombobox } from "@mantine/core";
import styles from "./Style.module.css";
import { DropDownIcon } from "@/app/images/commonSvgs";

const groceries = [
  "5L - 25L",
  "25L - 45L",
  "45L - 65L",
  "65L - 85L",
  "85L - 10.5CR",
  "10.5CR - 30.5CR",
  "30.5CR - 50.5CR",
  "50.5CR - 70.5CR+more",
];

export function BasicBudgetSelect() {
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
        setValue(val);
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
              Property Type
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
