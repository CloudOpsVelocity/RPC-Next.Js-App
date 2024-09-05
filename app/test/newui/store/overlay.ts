import { atomWithReducer } from "jotai/utils";
import React from "react";

// Define action types
type OverlayAction =
  | { type: "OPEN"; content: any; id: string; title: string }
  | { type: "CLOSE" };

// Define the state type
interface OverlayState {
  isOpen: boolean;
  content: React.ReactNode | null;
  id: string | null;
  title: string;
}

// Define the initial state
const initialState: OverlayState = {
  isOpen: false,
  content: null,
  id: null,
  title: "",
};

// Create the reducer function
const overlayReducer = (
  state: OverlayState,
  action: OverlayAction
): OverlayState => {
  switch (action.type) {
    case "OPEN":
      return {
        isOpen: true,
        content: action.content,
        id: action.id,
        title: action.title,
      };
    case "CLOSE":
      return initialState;
    default:
      return state;
  }
};

// Create the atom with the reducer
export const overlayAtom = atomWithReducer(initialState, overlayReducer);
