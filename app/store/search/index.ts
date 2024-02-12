import { atom } from "jotai";

export interface SearchFilter {
  current: number | null;
  locality: string[];
  propTypes: number | null;
  unitTypes: number[];
  bathRooms: number[];
  parkings: number[];
  amenities: number[];
  listedBy: number[];
  reraVerified: boolean;
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
  reraVerified: false,
  areaValue: [0, 5000],
  bugdetValue: [0, 5],
};

export const searachFilterAtom = atom<SearchFilter>(initialState);
