import useSearchFilters from "@/app/hooks/search";
import useQsearch from "@/app/hooks/search/useQsearch";
import { Combobox, Pill, PillsInput, useCombobox } from "@mantine/core";
import React, { useState } from "react";
import classes from "@/app/styles/search.module.css";
import Results from "./Result";
import { useAtom, useAtomValue } from "jotai";
import { homeSearchFiltersAtom } from "@/app/store/home";
import { useMediaQuery } from "@mantine/hooks";
type Props = {};
export default function SearchSec({}: Props) {
  const [f, dispatch] = useAtom(homeSearchFiltersAtom);
  const { onSearchChange, debounced, name, data } = useQsearch();
  const isTab = useMediaQuery("(max-width: 1600px)");
  const [showAllLocalities, setShowAllLocalities] = useState(false);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const handleFieldClick = (e: any) => {
    e.stopPropagation();
    setShowAllLocalities(false);
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
      keepMounted
    >
      <Combobox.Target>
        <div
          onClick={() => setShowAllLocalities(!showAllLocalities)}
          className="w-[100%] sm:min-w-[49.9%]   p-2 gap-2 xl:gap-[8px] pl-2 xl:pl-[8px] max-w-full flex items-center justify-start  flex-wrap"
        >
          <div className="flex flex-wrap gap-2 items-center h-auto">
            {f.locality?.map(
              (each, index) =>
                (showAllLocalities || index < (isTab ? 1 : 2)) && (
                  <Pill
                    className="capitalize !text-[12px] !sm:text-[14px]"
                    onRemove={() =>
                      dispatch({ type: "REMOVE_LOCALITY", payload: each })
                    }
                    key={each}
                    withRemoveButton
                    classNames={{ root: classes.MultiSelectionPill }}
                  >
                    {each.split("+")[0]}
                  </Pill>
                )
            )}
            {f.locality?.length > (isTab ? 1 : 2) &&
              !showAllLocalities &&
              f.locality?.length > (isTab ? 1 : 2) && (
                <Pill
                  className="capitalize cursor-pointer"
                  classNames={{ root: classes.MultiSelectionPill }}
                  onClick={() => setShowAllLocalities(true)}
                >
                  {`+${f.locality?.length - (isTab ? 1 : 2)} More`}
                </Pill>
              )}
          </div>
          <input
            placeholder={
              f.locality.length > 0
                ? "Add More"
                : "Search By Locality, Project, Listing"
            }
            onClick={handleFieldClick}
            value={name ?? ""}
            onChange={(e) => onSearchChange(e.target.value)}
            /* min-w-[234px] we change input width for full text visible in search main  */
            className=" min-w-[100%]   sm:min-w-[255px]  text-[12px] sm:text-[14px] outline-none pr-2 py-1 focus:text-[16px] placeholder:text-gray-600 ios-zoom-fix"
          />
        </div>
      </Combobox.Target>
      {name && (
        <Combobox.Dropdown className="min-w-[92%]  !left-[4%] sm:!min-w-[410px] sm:!left-[32.5%] xl:!left-[44.5%]">
          <Results  />
        </Combobox.Dropdown>
      )}
    </Combobox>
  );
}
