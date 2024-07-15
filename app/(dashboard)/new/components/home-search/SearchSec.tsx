import useSearchFilters from "@/app/hooks/search";
import useQsearch from "@/app/hooks/search/useQsearch";
import { Pill, PillsInput } from "@mantine/core";
import React from "react";
import classes from "@/app/styles/search.module.css";
type Props = {};

export default function SearchSec({}: Props) {
  const {
    filters: f,
    setPropTypes,
    handleCheckboxClick,
    handleSliderChange,
    remnoveSearchOptions,
    setFilters,
  } = useSearchFilters();
  const { onSearchChange, debounced, name } = useQsearch();
  return (
    <div>
      {" "}
      <PillsInput classNames={{ input: classes.homePageSearch }}>
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
            // onFocus={open}
            placeholder={
              f.locality.length > 0
                ? "Add More"
                : "Search “ Whitefield, Bangalore”"
            }
            value={name ?? ""}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </Pill.Group>
      </PillsInput>
    </div>
  );
}
