import { filterParser } from "@/app/utils/search";
import { convertToOriginalState } from "@/app/utils/search/transform";
import { atom } from "jotai";

export interface SearchFilter {
  current: number | null;
  locality: string[];
  propTypes: number | null;
  unitTypes: number[];
  bathRooms: number[];
  parkings: number[];
  amenities: number[];
  listedBy: null | string;
  reraVerified: number[];
  areaValue: [number, number];
  bugdetValue: [number, number];
  builderIds: string[];
  city: string | null;
  facings: number[];
  furnish: number | null;
  propStatus: string | null;
  pnb: number | null;
  sortByfield: string | null;
  sortType: number | null;
  cg: string | null;
  projIdEnc: string | null;
  lat: number | null;
  lng: number | null;
}

export const initialState: SearchFilter = {
  current: null,
  locality: [],
  propTypes: null,
  unitTypes: [],
  bathRooms: [],
  parkings: [],
  amenities: [],
  listedBy: null,
  reraVerified: [],
  areaValue: [0, 5000],
  bugdetValue: [500000, 600000000],
  builderIds: [],
  city: null,
  facings: [],
  furnish: null,
  propStatus: null,
  pnb: null,
  sortByfield: null,
  sortType: null,
  cg: null,
  projIdEnc: null,
  lat: null,
  lng: null,
};
export const diffToProjFromListing = {
  proj: [
    "facings",
    "furnish",
    "propStatus",
    "listedBy",
    "sortByfield",
    "sortType",
  ],
  A: ["current", "reraVerified", "builderIds", "sortByfield", "sortType"],
  I: ["current", "reraVerified", "builderIds", "sortByfield", "sortType"],
};

export const searachFilterAtom = atom<SearchFilter>(initialState);
searachFilterAtom.onMount = (setAtom) => {
  const path = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);
  if (path.includes("search") || searchParams.size > 0) {
    setAtom(getAppliedFilters());
  }
};

export const appliedFiltersParams = atom(null, (get, set, t: any) => {
  const appliedFilters = get(searachFilterAtom);
  const parsedData = filterParser(appliedFilters);
  t.runner(parsedData);
});

function getAppliedFilters(): SearchFilter {
  const searchParams = new URLSearchParams(window.location.search);
  let queryData: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    queryData[key] = value;
  });
  const data: SearchFilter = convertToOriginalState(queryData);
  console.log(data);
  return data;
}
