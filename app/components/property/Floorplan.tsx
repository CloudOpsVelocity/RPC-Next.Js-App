"use client";

import React from "react";
import {
  EndDate,
  StartDate,
  TotalLandArea,
} from "../../images/commonSvgs";
import { PhaseList } from "@/app/validations/types/project";
import RoomBasicDetails from "./RoomBasicDetails";
import PFloorPlanModal from "./modals/Floor";

export default function RoomFloorplansBlock({ data }: { data: PhaseList[] }) {
  return (
    <div className="w-[90%] mb-[5%] relative" id="floorPlans">
      <div className="w-[90%] mb-[5%] space-y-4" id="propertyDetails ">
        <h1 className="text-[24px] lg:text-[32px] font-[600] text-[#001F35]">
          Floor Plan Block
        </h1>

        <p className="text-[16px] lg:text-[24px] font-[500] text-[#4D6677] italic">
          Parkings details include area and other
        </p>

        <div className="flex justify-start items-start flex-wrap w-[80%]  ">
          <RoomBasicDetails
            key="launchDate"
            icon={<EndDate />}
            title="Opening Car Parking"
            value={"02"}
            className="mr-[3%] mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]  "
          />
          <RoomBasicDetails
            key="possessionDate"
            icon={<StartDate />}
            title="Opening Live Parking"
            value={"02"}
            className="mr-[3%]  mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]  "
          />
          <RoomBasicDetails
            key="landArea"
            icon={<TotalLandArea />}
            title="Convered Car Parking"
            value={"02"}
            className="mr-[3%]  mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]  "
          />
        </div>
      </div>

      <div className=" h-[456px] lg:h-[570px] w-full rounded-[14px]  border-solid border-[1px] border-[#92B2C8] bg-[#FFF] shadow-md flex justify-center items-center ">
        <div className="w-[70%] flex justify-center items-center flex-col p-[2%] ">
          <p className=" text-[14px] lg:text-[16px] font-[500] text-[#005DA0] ">
            Sarang by sumadhura/2bhk/tower 1/ 04/north/1124 sq.ft
          </p>
          <div className="flex justify-center items-center h-[300px] lg:h-[450px]">
            {/* dISPLAY FLOOR PLAN HERE */}
          </div>
          <PFloorPlanModal />
        </div>
      </div>
    </div>
  );
}
