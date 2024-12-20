import { SearchFilter } from "@/app/types/search";
import { filterParser } from "@/app/utils/search";
import { atom } from "jotai";
import { atomWithReducer } from "jotai/utils";

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

type Action =
  | { type: "reset" }
  | { type: "update"; payload: Partial<SearchFilter> }
  | { type: "pushToArray"; payload: { key: keyof SearchFilter; value: any } }
  | {
      type: "removeFromArray";
      payload: { key: keyof SearchFilter; value: any };
    }
  | { type: "updateAreaValue"; payload: { min?: number; max?: number } }
  | { type: "updateBudgetValue"; payload: { min?: number; max?: number } }
  | { type: "clearArray"; payload: keyof SearchFilter }
  | {
      type: "toggleArrayValue";
      payload: { key: keyof SearchFilter; value: any };
    }
  | { type: "SET_FILTERS"; payload: SearchFilter };

const mapReducer = (state: SearchFilter, action: Action): SearchFilter => {
  switch (action.type) {
    case "reset":
      return initialState;

    case "update":
      return {
        ...state,
        ...action.payload,
      };

    case "pushToArray": {
      const { key, value } = action.payload;
      if (Array.isArray(state[key])) {
        if ((state[key] as any[]).includes(value)) {
          return state;
        }
        return {
          ...state,
          [key]: [...(state[key] as any[]), value],
        };
      }
      return state;
    }

    case "removeFromArray": {
      const { key, value } = action.payload;
      if (Array.isArray(state[key])) {
        return {
          ...state,
          [key]: (state[key] as any[]).filter((item) => item !== value),
        };
      }
      return state;
    }

    case "clearArray": {
      const key = action.payload;
      if (Array.isArray(state[key])) {
        return {
          ...state,
          [key]: [],
        };
      }
      return state;
    }

    case "toggleArrayValue": {
      const { key, value } = action.payload;
      if (Array.isArray(state[key])) {
        const array = state[key] as any[];
        if (!array.includes(value)) {
          return {
            ...state,
            [key]: [...array, value],
          };
        } else {
          return {
            ...state,
            [key]: array.filter((item) => item !== value),
          };
        }
      }
      return state;
    }

    case "updateAreaValue": {
      const { min, max } = action.payload;
      const [currentMin, currentMax] = state.areaValue;
      return {
        ...state,
        areaValue: [
          min !== undefined ? min : currentMin,
          max !== undefined ? max : currentMax,
        ],
      };
    }

    case "updateBudgetValue": {
      const { min, max } = action.payload;
      const [currentMin, currentMax] = state.bugdetValue;
      return {
        ...state,
        bugdetValue: [
          min !== undefined ? min : currentMin,
          max !== undefined ? max : currentMax,
        ],
      };
    }

    case "SET_FILTERS":
      return action.payload;

    default:
      return state;
  }
};
export const ProjSearchAppliedFiltersStore = atom(
  null,
  (
    get,
    set,
    setInQueryParams: any,
    type: "clear" | "add",
    clearType?: "clearAll" | "bhk" | "area" | "budget" | "unitType"
  ) => {
    const appliedFilters = get(projSearchStore);
    let queryString = "";

    for (const [key, value] of Object.entries(appliedFilters)) {
      // Skip areaValue and bugdetValue if they match initial values
      if (
        (key === "areaValue" || key === "bugdetValue") &&
        Array.isArray(value) &&
        value[0] === initialState[key][0] &&
        value[1] === initialState[key][1]
      ) {
        continue;
      }

      if (Array.isArray(value)) {
        if (value.length > 0) {
          queryString += `${queryString ? "-" : ""}${key}=${value}`;
        }
      } else if (value != null) {
        queryString += `${queryString ? "-" : ""}${key}=${value}`;
      }
    }
    setInQueryParams(queryString || null);
  }
);
//
export const projSearchStore = atomWithReducer(initialState, mapReducer);
