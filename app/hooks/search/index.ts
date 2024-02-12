import { initialState, searachFilterAtom } from "@/app/store/search";
import { useAtom } from "jotai";
import React from "react";

export default function useSearchFilters() {
  const [filters, setFilters] = useAtom(searachFilterAtom);
  console.log("🚀 ~ useSearchFilters ~ filters:", filters);

  const setStatus = (currentItem: number) => {
    setFilters({ ...filters, current: currentItem });
  };

  const setPropTypes = (propertyType: number) => {
    setFilters({ ...filters, propTypes: propertyType });
  };
  type SearchFilter = {
    unitTypes: string;
    bathRooms: string;
    parkings: string;
    amenities: string;
    listedBy: string;
    areaValue: [number, number];
    bugdetValue: [number, number];
  };
  const handleCheckboxClick = (
    filterType: keyof SearchFilter,
    value: number
  ) => {
    if (!filters[filterType].includes(value)) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: [...prevFilters[filterType], value],
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: prevFilters[filterType].filter((type) => type !== value),
      }));
    }
  };
  const countAppliedFilters = (): number => {
    let count: number = 0;
    for (const key in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, key)) {
        if (
          key === "current" ||
          key === "propTypes" ||
          key === "reraVerified"
        ) {
          count += filters[key] ? 1 : 0;
        } else if (key === "areaValue") {
          count +=
            JSON.stringify(filters[key]) !== JSON.stringify([0, 5000]) ? 1 : 0;
        } else if (key === "bugdetValue") {
          count +=
            JSON.stringify(filters[key]) !== JSON.stringify([0, 5]) ? 1 : 0;
        } else {
          count += Array.isArray(filters[key as keyof SearchFilter])
            ? filters[key as keyof SearchFilter].length
            : 0;
        }
      }
    }
    return count;
  };

  //   const countAppliedFilters1 = (): number => {
  //     let count: number = 0;
  //     for (const key in filters) {
  //       if (Object.prototype.hasOwnProperty.call(filters, key)) {
  //         if (
  //           filters[key] !== null &&
  //           filters[key] !== undefined &&
  //           filters[key] !== false && // For boolean values
  //           !(Array.isArray(filters[key]) && filters[key].length === 0) && // For arrays
  //           !(
  //             typeof filters[key] === "object" &&
  //             Object.keys(filters[key]).length === 0
  //           ) // For objects
  //         ) {
  //           count++;
  //         }
  //       }
  //     }
  //     return count;
  //   };

  const handleBooleanCheck = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      reraVerified: !prevFilters.reraVerified,
    }));
  };
  const handleSliderChange = (key: keyof SearchFilter, newValue: number[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: newValue,
    }));
  };
  const handleReset = () => {
    setFilters(initialState);
  };
  return {
    filters,
    setStatus,
    setPropTypes,
    handleCheckboxClick,
    countAppliedFilters,
    handleBooleanCheck,
    handleSliderChange,
    handleReset,
  };
}
