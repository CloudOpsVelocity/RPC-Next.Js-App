import { filterParser } from "@/app/utils/search";
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
  builderIds: string[];
  city: string | null;
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
  builderIds: [],
  city: null,
};
export const searachFilterAtom = atom<SearchFilter>(initialState);
searachFilterAtom.onMount = (setAtom) => {
  setAtom(getAppliedFilters());
};
export const appliedFiltersParams = atom(null, (get, set, t: any) => {
  const appliedFilters = get(searachFilterAtom);
  const parsedData = filterParser(appliedFilters);
  console.log(parsedData);
  t.runner(parsedData);
});

function getAppliedFilters(): SearchFilter {
  const searchParams = new URLSearchParams(window.location.search);
  let queryData: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    queryData[key] = value;
  });
  const data: SearchFilter = convertToOriginalState(queryData);
  return data;
}
