import { atom } from "jotai";
type Atom = {
  [key: string]: any;
};
const selectedSearchAtom = atom<null | Atom>(null);

export default selectedSearchAtom;
