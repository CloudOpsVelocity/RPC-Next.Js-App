import { useLocalStorage } from "@mantine/hooks";
import { addShortList } from "@/app/utils/api/actions/shortlist";

interface Item {
  id: string;
  status: "Y" | "N";
  source?: "proj" | "prop";
}

interface GlobalData {
  shortlistedItems: Item[];
  compareItems: Item[];
  requestCallbacks: any; // Array of strings representing project IDs
}

interface HookReturnValue {
  shortlistedItems: Item[];
  compareItems: Item[];
  toggleShortlist: (item: Item) => void;
  toggleCompare: (item: Item) => void;
  pushToRequestCallbacks: (id: string, callback: () => void) => void;
  isCallbackSubmitted: (id: string) => boolean;
}

export const useShortlistAndCompare = (): HookReturnValue => {
  const [globalData, setGlobalData] = useLocalStorage<GlobalData>({
    key: "shortlistAndCompare",
    defaultValue: {
      shortlistedItems: [],
      compareItems: [],
      requestCallbacks: [], // Initialize an empty array
    },
  });

  const addOrUpdateItem = (
    itemName: keyof GlobalData,
    item: Item,
    callback: (updatedItems: Item[]) => void
  ): void => {
    const updatedItems = [...globalData[itemName]];
    // const itemIndex = updatedItems.findIndex(
    //   (existingItem) => existingItem.id === item.id
    // );

    // if (itemIndex === -1) {
    //   // Item doesn't exist, add it
    //   updatedItems.push({ ...item, status: "Y" });
    // } else {
    //   // Item exists, update its status
    //   updatedItems[itemIndex].status =
    //     updatedItems[itemIndex].status === "Y" ? "N" : "Y";
    // }

    // setGlobalData({ ...globalData, [itemName]: updatedItems });
    callback(updatedItems);
  };

  const pushToRequestCallbacks = (id: string, callback: () => void): void => {
    callback();
  };
  const isCallbackSubmitted = (id: string): boolean => {
    return globalData.requestCallbacks.includes(id);
  };
  return {
    shortlistedItems: globalData.shortlistedItems,
    compareItems: globalData.compareItems,
    toggleShortlist: (item: Item) =>
      addOrUpdateItem("shortlistedItems", item, () =>
        addShortList({
          projIdEnc: item.id,
          type: 2,
          isactive: item.status,
          source: item.source || "proj",
        })
      ),
    toggleCompare: (item: Item) =>
      addOrUpdateItem("compareItems", item, () =>
        addShortList({
          projIdEnc: item.id,
          isactive: item.status,
          type: 3,
          source: item.source || "proj",
        })
      ),
    pushToRequestCallbacks,
    isCallbackSubmitted,
  };
};
