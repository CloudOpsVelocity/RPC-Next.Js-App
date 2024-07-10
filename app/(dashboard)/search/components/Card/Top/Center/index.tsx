import React from "react";
import ProjData from "./ProjData";
import ListingData from "./ListingData";

type Props = {
  data: any;
  type: any;
};

export default function CenterTop({ data, type }: Props) {
  return (
    <div className="flex  flex-col px-4 mt-[2px]">
      <ProjData type={type} {...data} />
      <ListingData {...data} type={type} />
    </div>
  );
}
