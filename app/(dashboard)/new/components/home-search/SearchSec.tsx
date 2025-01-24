import useSearchFilters from "@/app/hooks/search";
import useQsearch from "@/app/hooks/search/useQsearch";
import { Combobox, Pill, PillsInput, useCombobox } from "@mantine/core";
import React, { FormEvent, useEffect, useState } from "react";
import classes from "@/app/styles/search.module.css";
import Results from "./Result";
import { useAtom, useAtomValue } from "jotai";
import { homeSearchFiltersAtom } from "@/app/store/home";
import { useMediaQuery } from "@mantine/hooks";
import { extractApiValues } from "@/app/utils/dyanamic/projects";
import { toQueryParams } from "../../utils/param";
type Props = {};
export default function SearchSec({}: Props) {
  const [f, dispatch] = useAtom(homeSearchFiltersAtom);
  const { onSearchChange, debounced, name, data } = useQsearch();
  const isTab = useMediaQuery("(max-width: 1600px)");
  const [showAllLocalities, setShowAllLocalities] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const handleFieldClick = (e: any) => {
    e.stopPropagation();
    setShowAllLocalities(false);
    !combobox.dropdownOpened && combobox.toggleDropdown();
    dispatch({ type: "SHOW_FILTER", payload: true });
  };

  const handleKeyDown = async (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/matcher/string?word=${searchQuery}&cityId=${9}`
      );
      const data = await res.json();
      if (data && data.ids) {
        let bhk = data.ids.split("*")[0];
        let oldBhks = f.bhk;
        if (!oldBhks.includes(parseInt(bhk))) {
          dispatch({ type: "ADD_BHK", payload: parseInt(bhk) });
        } else {
          handleSearch();
        }
      }
    }
  };

  // useEffect(()=>{
  //   handleSearch();
  // },[f.bhk]);

  const handleSearch = () => {
    const whichPage = f.propType === 36 ? "/search/listing" : "/search";
    window.open(`${whichPage}?sf=${toQueryParams(f)}`, "_blank");
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
            onChange={(e) => {
              onSearchChange(e.target.value);
              setSearchQuery(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            /* min-w-[234px]   sm:min-w-[255px] we change input width for full text visible in search main  */
            className=" min-w-[100%]    text-[12px] sm:text-[14px] outline-none pr-2 py-1 focus:text-[16px] sm:focus:text-[14px] placeholder:text-gray-600 ios-zoom-fix"
          />
        </div>
      </Combobox.Target>
      {name && (
        <Combobox.Dropdown className="min-w-[92%] !left-[4%] sm:!min-w-[410px] sm:!left-[32.5%] xl:!left-[44.5%]">
          <Results />
        </Combobox.Dropdown>
      )}
    </Combobox>
  );
}
