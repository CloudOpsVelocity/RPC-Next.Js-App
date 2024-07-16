import { useState } from "react";
import {
  Checkbox,
  CheckIcon,
  Combobox,
  Group,
  Input,
  Pill,
  PillsInput,
  useCombobox,
} from "@mantine/core";
import styles from "./Style.module.css";
import useSearchFilters from "@/app/hooks/search";
import { SEARCH_FILTER_DATA } from "@/app/data/search";
const groceries = ["1BHK", "2BHK", "3BHK", "4BHK", "4+BHK"];

export function BasicMultiSelect() {
  const { filters: f, setFilters, handleCheckboxClick } = useSearchFilters();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const values = f.unitTypes.map((item) => (
    <Pill
      key={item}
      withRemoveButton
      onRemove={() => handleCheckboxClick("unitTypes", item)}
      classNames={{
        root: styles.pill,
      }}
    >
      {item}
    </Pill>
  ));

  const options = SEARCH_FILTER_DATA.bhkDetails.map((item: any) => (
    <Combobox.Option
      value={item.value}
      key={item.value}
      active={f.unitTypes.includes(item.value)}
    >
      <Group gap="sm">
        <Checkbox checked={f.unitTypes.includes(item.value)} color="green" />
        <span>{item.title}</span>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        handleCheckboxClick("unitTypes", parseInt(val));
      }}
      withinPortal={false}
      classNames={{
        dropdown: styles.dropdown,
        option: styles.option,
      }}
    >
      <Combobox.DropdownTarget>
        <PillsInput
          classNames={{
            input: styles.input,
          }}
          pointer
          onClick={() => combobox.toggleDropdown()}
        >
          <Pill.Group>
            {values.length > 0 ? (
              values
            ) : (
              <Input.Placeholder className="!text-black">
                BHK Type
              </Input.Placeholder>
            )}

            <Combobox.EventsTarget>
              <PillsInput.Field
                type="hidden"
                onBlur={() => combobox.closeDropdown()}
                onKeyDown={(event) => {
                  if (event.key === "Backspace") {
                    event.preventDefault();
                    // handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
