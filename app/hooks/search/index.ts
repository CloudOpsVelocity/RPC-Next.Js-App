import {
  initialState,
  searachFilterAtom,
  SearchFilter,
  appliedFiltersParams,
} from "@/app/store/search";
import { convertToQueryParams } from "@/app/utils/search/query";
import { Search } from "@/app/validations/types/search";
import { useAtom, useSetAtom } from "jotai";
import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";
import { useQuery } from "react-query";
const paramsInit = {
  projStatus: parseAsString,
  localities: parseAsString,
  builderIds: parseAsString,
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
  const setAppliedFilters = useSetAtom(appliedFiltersParams);
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
    if (!filters[filterType].includes(value) && filters[filterType]) {
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
  const handleAppliedFilters = (callback?: () => void) => {
    setAppliedFilters({ runner: setParams });
    callback && callback();
  };
  const searchProps = useQuery({
    queryFn: () => getFilteredData(convertToQueryParams(params as any)),
    queryKey: ["srp" + convertToQueryParams(params as any)],
  });
  const remnoveSearchOptions = (index: any, key: "locality" | "builderIds") => {
    let oldArray = [...filters[key]];
    oldArray.splice(index, 1);
    setFilters((prev) => ({ ...prev, [key]: oldArray }));
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
    searchProps,
    setFilters,
    remnoveSearchOptions,
  };
}

const getFilteredData = async (query: string): Promise<Search[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PROJECT_URL}/srp/projSearch?city=21&${query}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching filtered data:", error);
    throw error; // Re-throw the error for handling further up the call stack
  }
};
