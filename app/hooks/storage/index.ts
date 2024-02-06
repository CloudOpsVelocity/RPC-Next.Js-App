import { useState, useEffect } from "react";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { addShortList } from "@/app/utils/api/actions/shortlist";

interface Item {
  id: string;
  status: "Y" | "N";
  type: number;
}

interface GlobalData {
  shortlistedItems: Item[];
  compareItems: Item[];
}

interface HookReturnValue {
  shortlistedItems: Item[];
  compareItems: Item[];
  toggleShortlist: (item: Item) => void;
  //   toggleCompare: (item: Item) => void;
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

  const requestCallback = async (data: any): Promise<any> => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/contact/v1/generate-contact`,
        data
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    shortlistedItems: globalData.shortlistedItems,
    compareItems: globalData.compareItems,
    toggleShortlist: (item: Item) =>
      addOrUpdateItem("shortlistedItems", item, () =>
        addShortList({
          projIdEnc: item.id,
          type: item.type,
          isactive: item.status,
        })
      ),
    // toggleCompare: (item: Item) => addOrUpdateItem("compareItems", item),
    requestCallback,
  };
};
