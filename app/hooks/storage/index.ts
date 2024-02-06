import { useLocalStorage } from "@mantine/hooks";
import { addShortList } from "@/app/utils/api/actions/shortlist";

interface Item {
  id: string;
  status: "Y" | "N";
}

interface GlobalData {
  shortlistedItems: Item[];
  compareItems: Item[];
}

interface HookReturnValue {
  shortlistedItems: Item[];
  compareItems: Item[];
  toggleShortlist: (item: Item) => void;
  toggleCompare: (item: Item) => void;
  requestCallback: (data: any) => Promise<any>;
}

export const useShortlistAndCompare = (): HookReturnValue => {
  const [globalData, setGlobalData] = useLocalStorage<GlobalData>({
    key: "shortlistAndCompare",
    defaultValue: {
      shortlistedItems: [],
      compareItems: [],
    },
  });

  const addOrUpdateItem = (
    itemName: keyof GlobalData,
    item: Item,
    callback: (updatedItems: Item[]) => void
  ): void => {
    const updatedItems = [...globalData[itemName]];
    const itemIndex = updatedItems.findIndex(
      (existingItem) => existingItem.id === item.id
    );

    if (itemIndex === -1) {
      // Item doesn't exist, add it
      updatedItems.push({ ...item, status: "Y" });
    } else {
      // Item exists, update its status
      updatedItems[itemIndex].status =
        updatedItems[itemIndex].status === "Y" ? "N" : "Y";
    }

    setGlobalData({ ...globalData, [itemName]: updatedItems });
    callback(updatedItems);
  };

  const requestCallback = async () => {};

  return {
    shortlistedItems: globalData.shortlistedItems,
    compareItems: globalData.compareItems,
    toggleShortlist: (item: Item) =>
      addOrUpdateItem("shortlistedItems", item, () =>
        addShortList({
          projIdEnc: item.id,
          type: 2,
          isactive: item.status,
        })
      ),
    toggleCompare: (item: Item) =>
      addOrUpdateItem("compareItems", item, () =>
        addShortList({
          projIdEnc: item.id,
          isactive: item.status,
          type: 3,
        })
      ),
    requestCallback,
  };
};
