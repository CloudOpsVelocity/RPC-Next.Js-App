"use client";
import React from "react";
import MainHeading from "../heading";
import SideTabs from "./Sidetabs";
import CardCarousel from "./Card/CardCarousel";

type Props = { data: any; shortIds: any };

export default function HandPickedProjects({ data, shortIds }: Props) {
  const [active, setActive] = React.useState(0);
  return (
    <div className="w-full mt-[40px] sm:mt-[80px] min-h-[530px] sm:min-h-[582px] flex justify-center items-center shrink-0 bg-gradient-to-r from-[#DAE6F1] via-[#DAE6F1] to-[#A7D0F5]">
      <div className=" w-[95%]">
        <MainHeading
          title="Handpicked Projects"
          content="Discover Your Dream Home with Handpicked Projects – Where Quality Meets Elegance"
        />

        <div className=" w-full flex flex-col xl:flex-row justify-center items-start mt-2 xl:mt-10 flex-nowrap sm:gap-6 ">
          <SideTabs active={active} setActive={setActive} />

          <div className=" max-w-[600px] sm:max-w-[1466px] mt-[16px] sm:mt-0 ">
            <CardCarousel
              data={data[config[active as keyof typeof config]]}
              active={active}
              shortIds={shortIds}
            />
          </div>
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
