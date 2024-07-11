import React from "react";
import MainHeading from "../heading";
import SideTabs from "./Sidetabs";
import CardCarousel from "./Card/CardCarousel";

type Props = {};

export default function HandPickedProjects({}: Props) {
  return (
    <div className="w-[90%] m-auto mt-[3%] h-[782px] shrink-0 bg-gradient-to-r from-[#DAE6F1] via-[#DAE6F1] to-[#A7D0F5] pt-[3%] pl-[1.5%]">
      <MainHeading title="Handpicked Projects" content="Loreum Ipsum" />

      <div className="flex mt-10 gap-6">
        <div>
          <SideTabs />
        </div>
        <div className="max-w-[1400px]">
          <CardCarousel />
        </div>
      </div>
    </div>
  );
}
