import { atomWithReducer } from "jotai/utils";


interface GalleryState {
  items: string[];
  title: string;
  opened: boolean;
  mediaType: "image" | "video"
}

interface GalleryAction {
  type: 'OPEN' | 'CLOSE';
  payload?: {
    items: string[];
    title: string;
    mediaType: "image" | "video"
  };
}

const INTITAL_VALUE: GalleryState = { items: [], title: "", opened: false,mediaType:"image" };

const galleryReducer = (state: GalleryState, action: GalleryAction): GalleryState => {
  switch (action.type) {
    case 'OPEN':
          document.body.style.overflow = 'hidden'
      return {
        ...state,
        ...action.payload,
        opened: true
      };
    case 'CLOSE':
   document.body.style.overflow = 'auto'
      return { ...INTITAL_VALUE, opened: false };
    default:
      return state;
  }
};

export const galleryStateAtom = atomWithReducer(INTITAL_VALUE, galleryReducer);
