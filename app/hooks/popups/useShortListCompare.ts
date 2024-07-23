import { useAtom, atom } from "jotai";

const openedAtom = atom(false);
const callbackAtom = atom<any>(null);
export const usePopShortList = () => {
  const [opened, setOpened] = useAtom(openedAtom);
  const [callback, setCallback] = useAtom(callbackAtom);
  const open = () => setOpened(true);
  const close = () => setOpened(false);
  const handleOpen = (callbackfn?: () => void) => {
    callbackfn && setCallback(() => callbackfn);
    open();
  };

  return [opened, { open: handleOpen, close, callback: callback }] as const;
};
