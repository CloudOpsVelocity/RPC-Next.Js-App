import React from "react";
import ProjData from "./ProjData";
import ListingData from "./ListingData";

type Props = {
  data: any;
  onAddingShortList: () => void;
};

export default function CenterTop({ data, onAddingShortList }: Props) {
  return (
    <div className="flex  flex-col px-4 mt-[2px]">
      <ProjData {...data} onAddingShortList={onAddingShortList} />
      <ListingData {...data} />
    </div>
  );
}
