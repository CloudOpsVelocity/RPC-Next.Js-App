"use client";
import { projectprops } from "@/app/data/projectDetails";
import Button from "@/app/elements/button";
import {
  EndDate,
  IdIcon,
  SecurityIcon,
  StartDate,
  TotalLandArea,
} from "@/app/images/commonSvgs";
import ProjBasicDetails from "@/app/components/project/projBasicDetails";
import PropertyTypeDetailsCrad from "@/app/components/project/propertyTypeDetailsCrad";
import React, { useState } from "react";
import { PhaseList } from "@/app/validations/types/project";
import RoomBasicDetails from "./RoomBasicDetails";

export default function RoomDetails({ data }: { data: PhaseList[] }) {
  const [currentPhase, setCurrentPhase] = useState(1);
  const handlePhaseChange = (phaseId: number) => {
    setCurrentPhase(phaseId);
  };
  return (
    <>
      <div className="w-[90%] mb-[5%] space-y-4" id="propertyDetails ">
        <h1 className="text-[24px] lg:text-[32px] font-[600] text-[#001F35]">
          Room Details
        </h1>

        <p className="text-[16px] lg:text-[24px] font-[500] text-[#4D6677] italic">
          Know about your dream project and its details; Where comfort meets
          Luxury, Where every details matters
        </p>

        <div className="text-[#148B16] font-[700] uppercase text-3xl">
          2 BHK FOR SELL
        </div>

        <div className="flex justify-start items-start flex-wrap w-[80%]  ">
          <RoomBasicDetails
            key="launchDate"
            icon={<EndDate />}
            title="Launch Date"
            value={"02"}
            className="mr-[3%] mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]  "
          />
          <RoomBasicDetails
            key="possessionDate"
            icon={<StartDate />}
            title="Possession Date"
            value={"02"}
            className="mr-[3%]  mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]  "
          />
          <RoomBasicDetails
            key="landArea"
            icon={<TotalLandArea />}
            title="Land Area"
            value={"02"}
            className="mr-[3%]  mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]  "
          />
          <RoomBasicDetails
            key="reraStatus"
            icon={<SecurityIcon />}
            title="RERA STATUS"
            value={"Store Room , Puja Room"}
            className="mr-[3%]  mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]  "
          />
        </div>
      </div>
      <Parking />
    </>
  );
}

const Parking = () => {
  return (
    <div className="w-[90%] mb-[5%] space-y-4" id="propertyDetails ">
      <h1 className="text-[24px] lg:text-[32px] font-[600] text-[#001F35]">
        Parking
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
        <RoomBasicDetails
          key="reraStatus"
          icon={<SecurityIcon />}
          title="Convering Bike Parking"
          value={"Store Room , Puja Room"}
          className="mr-[3%]  mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]  "
        />
      </div>
    </div>
  );
};
