"use client";
import React from "react";
import InFoCarousel from "./InFoCarousel";
// import CardCarousel from "./CardCarousel";
import PartialUnitModal from "./Modal/Modal";
type Props = {
  partialUnitData: any;
  data: any;
  phaseList: any;
  propCgId: number;
};

export default function MainSection({
  partialUnitData,
  data,
  phaseList,
  propCgId,
}: Props) {
  console.log(data)
  return (
    <div className="mt-6">
      <InFoCarousel
        partialUnitData={{
          ...partialUnitData,
          type: data.type,
          id: data.projIdEnc,
        }}
        data={data}
        phaseList={phaseList}
        propCgId={propCgId}
      />
      {data.type !== "overview" && <PartialUnitModal data={data} />}
    </div>
  );
}
