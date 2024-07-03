import React from "react";
import ProjData from "./ProjData";
import ListingData from "./ListingData";

type Props = { data: any };

export default function CenterTop({ data }: Props) {
  return (
    <div className="flex  flex-col px-4 mt-[2px]">
      <ProjData {...data} />
      <ListingData {...data} />
    </div>
  );
}
