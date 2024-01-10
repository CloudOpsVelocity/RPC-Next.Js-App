import { atom } from "jotai";

interface ReadMoreAtom {
  expanded: boolean;
  content: string; // Replace with the actual type of your content
}

export const readMoreAtom = atom<ReadMoreAtom>({
  expanded: false,
  content: "",
});

// store.ts
export const setReadMoreContent = atom(null, (get, set, newContent: string) => {
  set(readMoreAtom, (prev) => ({ ...prev, content: newContent }));
});
