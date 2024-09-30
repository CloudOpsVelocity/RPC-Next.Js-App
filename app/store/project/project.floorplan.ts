import { atom, useAtom } from "jotai";
import { atomWithReducer } from "jotai/utils";

interface FloorPlanState {
  floorplans: any[];
  filters: any[];
}

const initialState: FloorPlanState = {
  floorplans: [],
  filters: [],
};

type Action =
  | { type: "SET_FLOORPLANS"; payload: any[] }
  | { type: "ADD_FILTER"; payload: any }
  | { type: "REMOVE_FILTER"; payload: string }
  | { type: "REMOVE_ALL_FILTERS" }
  | { type: "SET_FILTERS"; payload: any[] };

const floorPlanReducer = (state: FloorPlanState, action: Action): FloorPlanState => {
  switch (action.type) {
    case "SET_FLOORPLANS":
      return { ...state, floorplans: action.payload };
    case "ADD_FILTER":
      return { ...state, filters: [...state.filters, action.payload] };
    case "REMOVE_FILTER":
      return { ...state, filters: state.filters.filter(filter => filter.id !== action.payload) };
    case "REMOVE_ALL_FILTERS":
      return { ...state, filters: [] };
    case "SET_FILTERS":
      return { ...state, filters: action.payload };
    default:
      return state;
  }
};

export const floorPlanStoreAtom = atomWithReducer(initialState, floorPlanReducer);
export const useFloorPlanStore = () => {
  const [state, dispatch] = (useAtom(floorPlanStoreAtom));

  const setFloorplans = (newFloorplans: any[]) => {
    dispatch({ type: "SET_FLOORPLANS", payload: newFloorplans });
  };

  const addFilter = (filter: any) => {
    dispatch({ type: "ADD_FILTER", payload: filter });
  };

  const removeFilter = (filterId: string) => {
    dispatch({ type: "REMOVE_FILTER", payload: filterId });
  };

  const removeAllFilters = () => {
    dispatch({ type: "REMOVE_ALL_FILTERS" });
  };

  const setFilters = (newFilters: any[]) => {
    dispatch({ type: "SET_FILTERS", payload: newFilters });
  };
  return {
    state,
    setFloorplans,
    addFilter,
    removeFilter,
    removeAllFilters,
    setFilters,
  };
};
