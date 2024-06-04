import { useAtom, atom } from "jotai";
import { useParams } from "next/navigation";

// Define the atom to store the state
interface PopupState {
  opened: boolean;
  type: string | null; // Type can be 'card' or 'banner'
  projectID: string | null; // ID of the project
  source: "projBanner" | "projCard" | "propCard" | "propBanner";
  cg?: string;
}

export const popupStateAtom = atom<PopupState>({
  opened: false,
  type: null,
  projectID: null,
  source: "projBanner",
  cg: "",
});

export const useReqCallPopup = () => {
  const [popupState, setPopupState] = useAtom(popupStateAtom);

  const open = (
    type: string,
    projectID: string,
    source: "projBanner" | "projCard" | "propCard" | "propBanner",
    cg?: string
  ) => {
    setPopupState({ opened: true, type, projectID, source, cg });
  };

  const close = () => {
    setPopupState((prev) => ({ ...prev, opened: false }));
  };

  return [
    popupState.opened,
    {
      open,
      close,
      type: popupState.type,
      projectID: popupState.projectID,
      source: popupState.source,
      cg: popupState.cg,
    },
  ] as const;
};
