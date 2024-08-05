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
import { homeSearchFiltersAtom } from "@/app/store/home";
import { useAtom } from "jotai";

export function BasicMultiSelect() {
  // const { filters: f, setFilters, handleCheckboxClick } = useSearchFilters();
  const [f, dispatch] = useAtom(homeSearchFiltersAtom);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const values = f.bhk.map((itemId) => {
    const selectedItem = SEARCH_FILTER_DATA.bhkDetails.find(
      (item) => item.value === itemId
    );
    if (selectedItem) {
      return (
        <Pill
          key={itemId}
          withRemoveButton
          onRemove={() => dispatch({ type: "ADD_BHK", payload: itemId })}
          classNames={{
            root: styles.pill,
          }}
        >
          {selectedItem.title}
        </Pill>
      );
    }
    return null; // Handle case where item is not found (optional)
  });

  const options = SEARCH_FILTER_DATA.bhkDetails.map((item: any) => (
    <Combobox.Option
      value={item.value}
      key={item.value}
      active={f.bhk.includes(item.value)}
    >
      <Group gap="sm">
        <Checkbox checked={f.bhk.includes(item.value)} color="green" />
        <span>{item.title}</span>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        dispatch({ type: "ADD_BHK", payload: parseInt(val) });
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
          rightSection={<DropIcon />}
          rightSectionPointerEvents="none"
        >
          <Pill.Group>
            {values.length > 0 ? (
              values
            ) : (
              <Input.Placeholder className="!text-black">
                BHK Type
              </Input.Placeholder>
            )}
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

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
