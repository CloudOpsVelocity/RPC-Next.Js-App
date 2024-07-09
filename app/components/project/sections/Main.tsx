"use client";
import React, { useState } from "react";
import InFoCarousel from "./InFoCarousel";
import CardCarousel from "./CardCarousel";
import PartialUnitModal from "./Modal/Modal";
type Props = {
  partialUnitData: any;
};

export default function MainSection({ partialUnitData }: Props) {
  return (
    <div>
      <InFoCarousel partialUnitData={partialUnitData} />
      <CardCarousel partialUnitData={partialUnitData} />
      <PartialUnitModal />
    </div>
  );
}
