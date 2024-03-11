"use client";

import React from "react";
import PFloorPlanModal from "./modals/Floor";
import PropertyHeading from "./heading";
import { Main } from "@/app/validations/property";

export default function RoomFloorplansBlock({ data }: { data: Main }) {
  return (
    <div className="w-[90%] mb-[5%] mt-[2.5%] relative " id="floorPlans">
      <div className="w-[90%] mb-[40px] space-y-4" id="propertyDetails ">
        <PropertyHeading
          title="Floor Plans"
          desc="see floor plan OF your selected property"
        />
      </div>

      <div className=" h-[456px] lg:h-[570px] w-full rounded-[14px]  border-solid border-[1px] border-[#92B2C8] bg-[#FFF] shadow-md flex justify-center items-center ">
        <div className="w-[70%] flex justify-center items-center flex-col p-[2%] ">
          <p className=" text-[14px] lg:text-[16px] font-[500] text-[#005DA0] ">
            Sarang by sumadhura/2bhk/tower 1/ 04/north/1124 sq.ft - 2
          </p>
          <div className="flex justify-center items-center h-[300px] lg:h-[450px]">
            <img
              src={data?.projMedia?.floorPlanUrl}
              alt=""
              className="h-full w-full"
            />
          </div>
          <PFloorPlanModal data={data} />
        </div>
      </div>
    </div>
  );
}
