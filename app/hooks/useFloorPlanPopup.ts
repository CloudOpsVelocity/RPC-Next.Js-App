import { useAtom, atom, useSetAtom } from "jotai";

const openedAtom = atom(false);
export const typeAtom = atom('type')

export const useFloorPlanPopup = () => {
  const [opened, setOpened] = useAtom(openedAtom);
  const setType = useSetAtom(typeAtom)

  const open = (type:"overview" | "floor") => {
 setType(type)
    setOpened(true);
  } 
  const close = () => setOpened(false);


  return [opened, { open, close }] as const;
};
