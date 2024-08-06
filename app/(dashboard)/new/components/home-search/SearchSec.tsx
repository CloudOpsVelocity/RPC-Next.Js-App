import useSearchFilters from "@/app/hooks/search";
import useQsearch from "@/app/hooks/search/useQsearch";
import { Combobox, Pill, PillsInput, useCombobox } from "@mantine/core";
import React from "react";
import classes from "@/app/styles/search.module.css";
import Results from "./Result";
import { useAtom, useAtomValue } from "jotai";
import { homeSearchFiltersAtom } from "@/app/store/home";
import { useMediaQuery } from "@mantine/hooks";
type Props = {};
export default function SearchSec({}: Props) {
  const [f, dispatch] = useAtom(homeSearchFiltersAtom);
  const { onSearchChange, debounced, name } = useQsearch();
  const isTab = useMediaQuery('(max-width: 1600px)');
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
          <Pill.Group>
            {f.city && (
              <Pill
                className="capitalize"
                withRemoveButton
                classNames={{ root: classes.MultiSelectionPill }}
                onRemove={() => dispatch({ type: "REMOVE_CITY" })}
                style={{ display:"flex", alignItems:"center", flexWrap:"nowrap" }}
              >
                {f.city.split("+")[0]}
              </Pill>
            )}
            {f.locality?.map((each, index) => (
              index < (isTab ? 1 : 2) &&
              <Pill
                className="capitalize"
                onRemove={() =>
                  dispatch({ type: "REMOVE_LOCALITY", payload: each })
                }
                key={index}
                withRemoveButton
                classNames={{ root: classes.MultiSelectionPill }}
              >
                {each.split("+")[0]}
              </Pill>
            ))
            }

            {f.locality?.length > (isTab ? 1 : 2) &&
            <Pill
                className="capitalize"
                classNames={{ root: classes.MultiSelectionPill }}
              >
                {`+${(f.locality?.length - (isTab ? 1 : 2))} More`}
            </Pill>
            }

          </Pill.Group>{" "}
          <PillsInput.Field
            placeholder={
              f.locality.length > 0
                ? "Add More"
                : "Search “ Locality, Project, Listings.....”"
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
