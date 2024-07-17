import useSearchFilters from "@/app/hooks/search";
import useQsearch from "@/app/hooks/search/useQsearch";
import { Combobox, Pill, PillsInput, useCombobox } from "@mantine/core";
import React, { useState } from "react";
import classes from "@/app/styles/search.module.css";
import Results from "@/app/(dashboard)/search/components/filter/results";
type Props = {};
const groceries = ["Apartment", "Villa", "RowHouse", "Plot"];
export default function SearchSec({}: Props) {
  const { filters: f, remnoveSearchOptions, setFilters } = useSearchFilters();
  const { onSearchChange, debounced, name } = useQsearch();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

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
          <Pill.Group>
            {f.city && (
              <Pill
                className="capitalize"
                withRemoveButton
                classNames={{ root: classes.MultiSelectionPill }}
                onRemove={() => setFilters((prev) => ({ ...prev, city: null }))}
              >
                {f.city.split("+")[0]}
              </Pill>
            )}
            {f.locality?.map((each, index) => (
              <Pill
                className="capitalize"
                onRemove={() => remnoveSearchOptions(each, "locality")}
                key={index}
                withRemoveButton
                classNames={{ root: classes.MultiSelectionPill }}
              >
                {each.split("+")[0]}
              </Pill>
            ))}
            <PillsInput.Field
              placeholder={
                f.locality.length > 0
                  ? "Add More"
                  : "Search “ Whitefield, Bangalore”"
              }
              onClick={() => combobox.toggleDropdown()}
              value={name ?? ""}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </Pill.Group>
        </PillsInput>
      </Combobox.Target>
      {debounced && (
        <Combobox.Dropdown
          styles={{
            dropdown: {
              minWidth: "410px",
              left: "44.5%",
            },
          }}
        >
          <Results />
        </Combobox.Dropdown>
      )}
    </Combobox>
  );
}
