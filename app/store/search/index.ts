import {
  filterParser,
  filtersParserToQueryParams,
  propertiesToProcess,
} from "@/app/utils/search";
import { convertToOriginalState } from "@/app/utils/search/transform";
import { atom } from "jotai";
import { atomWithLocation } from "jotai-location";

export interface SearchFilter {
  current: number | null;
  locality: string[];
  propTypes: number | null;
  unitTypes: number[];
  bathRooms: number[];
  parkings: number[];
  amenities: number[];
  listedBy: number[];
  reraVerified: boolean | null;
  areaValue: [number, number];
  bugdetValue: [number, number];
}

export const initialState: SearchFilter = {
  current: null,
  locality: [],
  propTypes: null,
  unitTypes: [],
  bathRooms: [],
  parkings: [],
  amenities: [],
  listedBy: [],
  reraVerified: null,
  areaValue: [0, 5000],
  bugdetValue: [0, 5],
};
const locationAtom = atomWithLocation();
export const searachFilterAtom = atom<SearchFilter>(initialState);
searachFilterAtom.onMount = (setAtom) => {
  setAtom(getAppliedFilters());
};
export const appliedFiltersParams = atom(
  (get) => {
    let queryData = {};
    const location = get(locationAtom);
    location.searchParams?.forEach((value, key) => {
      // @ts-ignore
      queryData[key] = value;
    });
    const data = convertToOriginalState(queryData);
    return data;
  },
  (get, set, t: any) => {
    const appliedFilters = get(searachFilterAtom);
    const parsedData = filterParser(appliedFilters);
    t.runner(parsedData);
  }
);

function getAppliedFilters(): SearchFilter {
  const searchParams = new URLSearchParams(window.location.search);
  let queryData: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    queryData[key] = value;
  });
  const data: SearchFilter = convertToOriginalState(queryData);
  return data;
}
