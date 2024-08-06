import useSearchFilters from "@/app/hooks/search";
import useQsearch from "@/app/hooks/search/useQsearch";
import { Combobox, PillsInput, useCombobox } from "@mantine/core";
import React from "react";
import classes from "@/app/styles/search.module.css";
import Results from "./Result";
import { useAtom, useAtomValue } from "jotai";
import { homeSearchFiltersAtom } from "@/app/store/home";
type Props = {};
export default function SearchSec({}: Props) {
  const [f, dispatch] = useAtom(homeSearchFiltersAtom);
  const { onSearchChange, debounced, name } = useQsearch();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const handleFieldClick = () => {
    !combobox.dropdownOpened && combobox.toggleDropdown();
    dispatch({ type: "SHOW_FILTER", payload: true });
  };
  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        onSearchChange(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <PillsInput classNames={{ input: classes.homePageSearch }} w={"100%"}>
          {" "}
          <PillsInput.Field
            placeholder={
              f.locality.length > 0
                ? "Add More"
                : "Search “ Whitefield, Bangalore”"
            }
            onClick={handleFieldClick}
            value={name ?? ""}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </PillsInput>
      </Combobox.Target>

      {debounced && (
        <Combobox.Dropdown className="min-w-[80%] !left-[8%] sm:!min-w-[410px] sm:!left-[44.5%]">
          <Results />
        </Combobox.Dropdown>
      )}
    </Combobox>
  );
}
