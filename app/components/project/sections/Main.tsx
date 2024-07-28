"use client";
import React, { useState } from "react";
import InFoCarousel from "./InFoCarousel";
import CardCarousel from "./CardCarousel";
import PartialUnitModal from "./Modal/Modal";
import CarouselModal from "./Modal/Carousel";
type Props = {
  partialUnitData: any;
  data: any;
};

export default function MainSection({ partialUnitData, data }: Props) {
  return (
    <div className="mt-6">
      <InFoCarousel partialUnitData={partialUnitData} />
      <PartialUnitModal data={data} />
    </div>
  );
}
