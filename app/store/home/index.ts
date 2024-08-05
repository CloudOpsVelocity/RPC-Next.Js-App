import { atomWithReducer } from "jotai/utils";
interface SearchState {
  bhk: number | null;
  unitTypes: number[];
  locality: string[];
  city: string | null;
  cg: string;
  bugdetValue: [number, number];
}

const initialState: SearchState = {
  bhk: null,
  unitTypes: [],
  locality: [],
  city: null,
  cg: "buy",
  bugdetValue: [500000, 60000000000],
};

// Define the action types
type Action =
  | { type: "ADD_BHK"; payload: number }
  | { type: "ADD_UNIT_TYPE"; payload: number }
  | { type: "ADD_LOCALITY"; payload: string }
  | { type: "SET_CITY"; payload: string }
  | { type: "REMOVE_LOCALITY"; payload: string }
  | { type: "RESET_FILTERS" }
  | { type: "SET_CG"; payload: string }
  | { type: "SET_BUGDET_VALUE"; payload: [number, number] };

// Define the reducer function
const searchReducer = (state: SearchState, action: Action): SearchState => {
  switch (action.type) {
    case "ADD_BHK":
      return { ...state, bhk: action.payload };
    case "ADD_UNIT_TYPE":
      return { ...state, unitTypes: [...state.unitTypes, action.payload] };
    case "ADD_LOCALITY":
      return { ...state, locality: [...state.locality, action.payload] };
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "REMOVE_LOCALITY":
      return {
        ...state,
        locality: state.locality.filter((loc) => loc !== action.payload),
      };
    case "SET_CG":
      return { ...state, cg: action.payload };
    case "SET_BUGDET_VALUE":
      return { ...state, bugdetValue: action.payload };
    case "RESET_FILTERS":
      return initialState;
    default:
      // @ts-ignore
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// Create the atom with reducer
export const homeSearchFiltersAtom = atomWithReducer(
  initialState,
  searchReducer
);
