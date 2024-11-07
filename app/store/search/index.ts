import { SearchFilter } from "@/app/types/search";
import { filterParser } from "@/app/utils/search";
import { convertToOriginalState } from "@/app/utils/search/transform";
import { atom } from "jotai";

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
  projName: null,
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
  B: ["current", "reraVerified", "builderIds", "sortByfield", "sortType"],
  ALL: [
    "facings",
    "furnish",
    "propStatus",
    "listedBy",
    "sortByfield",
    "sortType",
  ],
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
  return data;
}
