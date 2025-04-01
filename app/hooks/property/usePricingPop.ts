import { useAtom, atom } from "jotai";

const openedAtom = atom(false);
export const usePricingPop = () => {
  const [opened, setOpened] = useAtom(openedAtom);

  const open = () => setOpened(true);
  const close = () => {
    document.body.style.overflow = "scroll";
    setOpened(false);
  };

  return [opened, { open, close }] as const;
};
