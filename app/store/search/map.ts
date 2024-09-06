import { atom } from "jotai";
import { atomWithReducer } from "jotai/utils";
type Atom = {
  [key: string]: any;
};
type Initialvalue = {
  lat: number | null;
  lang: number | null;
  title: string;
};
const inititalValue = {
  lat: null,
  lang: null,
  title: "",
};
const selectedSearchAtom = atom<null | Atom>(null);
export const listingSearchAtom = atom<null | Atom>(null);
type ActionData =
  | {
      type: "open";
      payload: {
        lat: number;
        lang: number;
        title: string;
      };
    }
  | {
      type: "close";
    };
const mapReducer = (state: Initialvalue, action: ActionData): Initialvalue => {
  switch (action.type) {
    case "open":
      return {
        lat: action.payload.lat,
        lang: action.payload.lang,
        title: action.payload.title,
      };
    case "close":
      return inititalValue;
    default:
      return state;
  }
};
export const mobileSearchPageMapModalReducerAtom = atomWithReducer(
  inititalValue,
  mapReducer
);
export default selectedSearchAtom;
