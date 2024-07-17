"use client";
import React from "react";
import MainHeading from "../heading";
import SideTabs from "./Sidetabs";
import CardCarousel from "./Card/CardCarousel";

type Props = { data: any };

export default function HandPickedProjects({ data }: Props) {
  const [active, setActive] = React.useState(0);
  return (
    <div className="w-[90%] m-auto mt-[3%] h-[730px] sm:h-[782px] shrink-0 bg-gradient-to-r from-[#DAE6F1] via-[#DAE6F1] to-[#A7D0F5] pt-[3%] pl-[1.5%]">
      <MainHeading title="Handpicked Projects" content="Loreum Ipsum" />
      <div className="flex mt-2 sm:mt-10  sm:gap-6 flex-wrap">
        <div>
          <SideTabs active={active} setActive={setActive} />
        </div>
        <div className="max-w-[1400px]">
          <CardCarousel
            data={data[config[active as keyof typeof config]]}
            active={active}
          />
        </div>
      </div>
    </div>
  );
}

const config = {
  0: "New Launch",
  1: "On Going",
  2: "Completed",
};
