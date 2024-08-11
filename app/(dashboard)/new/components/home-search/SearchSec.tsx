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
    >
      {/*       <Combobox.Target>
        <PillsInput classNames={{ input: classes.homePageSearch }} size={isTab ? "xs" : "md"} w={"100%"}>
          <Pill.Group>
            {f.city && (
              <Pill
                className="capitalize !text-[12px] !sm:text-[14px] "
                withRemoveButton
                classNames={{ root: classes.MultiSelectionPill }}
                onRemove={() => dispatch({ type: "REMOVE_CITY" })}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "nowrap",
                }}
              >
                {f.city.split("+")[0]}
              </Pill>
            )}
            {f.locality?.map(
              (each, index) =>
                index < (isTab ? 1 : 10) && (
                  <Pill
                    className="capitalize !text-[12px] !sm:text-[14px]"
                    onRemove={() =>
                      dispatch({ type: "REMOVE_LOCALITY", payload: each })
                    }
                    key={index}
                    withRemoveButton
                    classNames={{ root: classes.MultiSelectionPill }}
                  >
                    {each.split("+")[0]}
                  </Pill>
                )
            )}

            {f.locality?.length > (isTab ? 1 : 10) && (
              <Pill
                className="capitalize !text-[12px] !sm:text-[14px]"
                classNames={{ root: classes.MultiSelectionPill }}
              >
                {`+${f.locality?.length - (isTab ? 1 : 2)} More`}
              </Pill>
            )}
          </Pill.Group>{" "}
          <PillsInput.Field
            placeholder={
              f.locality.length > 0
                ? "Add More"
                : "Enter Locality, Project, Listing"
            }
            onClick={handleFieldClick}
            value={name ?? ""}
            onChange={(e) => onSearchChange(e.target.value)}
            className="!min-w-[50px] ml-[4px] "
          />
        </PillsInput>
      </Combobox.Target> */}
      <Combobox.Target>
        <div
          onClick={() => setShowAllLocalities(!showAllLocalities)}
          className="  p-2 gap-2 xl:gap-[8px] pl-2 xl:pl-[8px] max-w-full flex items-center justify-start  flex-wrap"
        >
          {" "}
          {f.city && (
            <Pill
              className="capitalize !text-[12px] !sm:text-[14px] "
              withRemoveButton
              classNames={{ root: classes.MultiSelectionPill }}
              onRemove={() => dispatch({ type: "REMOVE_CITY" })}
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "nowrap",
              }}
              onClick={() => setShowAllLocalities(false)}
            >
              {f.city.split("+")[0]}
            </Pill>
          )}
          <div className="flex flex-wrap gap-2 items-center h-auto">
            {f.locality?.map(
              (each, index) =>
                (showAllLocalities || index < (isTab ? 1 : 2)) && (
                  <Pill
                    className="capitalize !text-[12px] !sm:text-[14px]"
                    onRemove={() =>
                      dispatch({ type: "REMOVE_LOCALITY", payload: each })
                    }
                    key={index}
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

            {/*  {showAllLocalities && (
              <Pill
                className="capitalize"
                classNames={{ root: classes.MultiSelectionPill }}
                onClick={() => setShowAllLocalities(false)}
              >
                Show Less
              </Pill>
            )} */}
          </div>
          <PillsInput.Field
            placeholder={
              f.locality.length > 0
                ? "Add More"
                : "Search “ Locality, Project, Listings.....”"
            }
            onClick={handleFieldClick}
            value={name ?? ""}
            onChange={(e) => onSearchChange(e.target.value)}
            className="!min-w-[50px] ml-[4px] "
          />
        </div>
      </Combobox.Target>
      {debounced && (
        <Combobox.Dropdown className="min-w-[80%] !left-[8%] sm:!min-w-[410px] sm:!left-[44.5%]">
          <Results />
        </Combobox.Dropdown>
      )}
    </Combobox>
  );
}
