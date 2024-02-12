import {
  initialState,
  searachFilterAtom,
  SearchFilter,
  appliedFiltersParams,
} from "@/app/store/search";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";
import { useEffect } from "react";
import { useQuery } from "react-query";
const paramsInit = {
  current: parseAsString,
  locality: parseAsString,
  propTypes: parseAsString,
  unitTypes: parseAsString,
  bathRooms: parseAsString,
  parkings: parseAsString,
  amenities: parseAsString,
  listedBy: parseAsString,
  reraVerified: parseAsString,
  minArea: parseAsInteger,
  maxArea: parseAsInteger,
  minPrice: parseAsInteger,
  maxPrice: parseAsInteger,
};
export default function useSearchFilters() {
  const [filters, setFilters] = useAtom(searachFilterAtom);
  const p = useSearchParams();
  const [appliedFilters, setAppliedFilters] = useAtom(appliedFiltersParams);
  const [params, setParams] = useQueryStates(paramsInit, {
    history: "push",
  });

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
  const handleReset = (type: "unitType" | "price" | "all" | "propType") => {
    switch (type) {
      case "unitType":
        setFilters((prev) => ({
          ...prev,
          unitTypes: [],
        }));
        setParams({ unitTypes: null });
        break;
      case "price":
        setFilters((prev) => ({
          ...prev,
          bugdetValue: [0, 5],
        }));
        setParams({ minPrice: null, maxPrice: null });
        break;
      case "all":
        setFilters(initialState);
        Object.keys(paramsInit).map((key) => {
          setParams({ [key]: null });
        });

        break;
      case "propType":
        setFilters((prev) => ({
          ...prev,
          propTypes: null,
        }));
        setParams({ propTypes: null });
        break;
      default:
        setFilters(initialState);
        break;
    }
  };
  const handleAppliedFilters = () => {
    setAppliedFilters({ runner: setParams });
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
    handleAppliedFilters,
    setParams,
    params,
  };
}
