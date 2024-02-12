import {
  initialState,
  searachFilterAtom,
  appliedFiltersAtom,
  SearchFilter,
} from "@/app/store/search";
import { useAtom } from "jotai";
import React from "react";

export default function useSearchFilters() {
  const [filters, setFilters] = useAtom(searachFilterAtom);
  const [appliedFilters, setAppliedFilters] = useAtom(appliedFiltersAtom);
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
        break;
      case "price":
        setFilters((prev) => ({
          ...prev,
          bugdetValue: [0, 5],
        }));
        break;
      case "all":
        setFilters(initialState);
        break;
      case "propType":
        setFilters((prev) => ({
          ...prev,
          propTypes: null,
        }));
        break;
      default:
        setFilters(initialState);
        break;
    }
  };
  const handleAppliedFilters = () => {
    setAppliedFilters(filters);
  };
  const getSearchData = async () => {
    const parseData = filtersParser(appliedFilters);
    // before doing something i need to do something parseData Means change data into what is required data to api call
    return [];
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
  };
}

const filtersParser = (data: SearchFilter) => {
  const parsedData: any = {}; // Initialize an empty object to store parsed data

  // Map properties from appliedFilters to API parameters
  parsedData.localities = data.locality;
  parsedData.city = data.current; // Assuming current represents city ID
  parsedData.projStatus = null; // Need to handle project status
  parsedData.propType = data.propTypes;
  parsedData.bhk = data.unitTypes;
  parsedData.minPrice = data.bugdetValue[0];
  parsedData.maxPrice = data.bugdetValue[1];
  parsedData.minArea = data.areaValue[0];
  parsedData.maxArea = data.areaValue[1];
  parsedData.bathroom = data.bathRooms;
  parsedData.parking = data.parkings;
  parsedData.amenities = data.amenities;
  parsedData.postedBy = null; // Need to handle postedBy
  parsedData.builderIds = null; // Need to handle builderIds

  // You may need to handle additional properties as per the API requirements

  return parsedData;
};
