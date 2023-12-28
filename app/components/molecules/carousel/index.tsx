import React from "react";
import HomeCarousel from "./carousel";

export default function DynamiCarousel() {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-sky-100 w-full max-w-full  mx-auto pb-32">
      <div className=" justify-center items-center gap-3 flex flex-col pt-[6%]">
        <div className="text-neutral-800 text-5xl font-bold font-['Montserrat'] leading-10 tracking-widest">
          Newly Launched Projects
        </div>
        <div className=" text-center text-[#565D70] text-3xl font-medium  leading-loose tracking-wide">
          Innovation in every bricks! Unveiling our new venture
        </div>
      </div>
      {/* Grids */}
      <div className="max-w-[1500px] m-auto">
        <HomeCarousel />
      </div>
    </div>
  );
}
