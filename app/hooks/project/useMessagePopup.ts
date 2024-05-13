import { useAtom, atom } from "jotai";

const openedAtom = atom<{ status: boolean; type: null | string }>({
  status: false,
  type: null,
});
export const useMessagePopup = (type: "qna" | "listing") => {
  const [opened, setOpened] = useAtom(openedAtom);

  const open = () => setOpened({ status: true, type: type });
  const close = () => setOpened({ status: false, type: null });

  return [opened, { open, close }] as const;
};
