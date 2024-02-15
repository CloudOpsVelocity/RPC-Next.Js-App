"use client";
import { projectprops } from "@/app/data/projectDetails";
import Button from "@/app/elements/button";
import {
  Balcony,
  Bathrooms,
  BedRooms,
  Car,
  CarParkingIcon,
  CloseBike,
  EndDate,
  IdIcon,
  OpenBike,
  Others,
  ParkingIcon,
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
  return (
    <>
      <div className="w-[90%] mb-[5%] " id="propertyDetails ">
        <h1 className="text-[24px] lg:text-[32px] font-[600] text-[#001F35] mb-4">
          Room Details
        </h1>

        <p className="text-[16px] lg:text-[24px] font-[500] text-[#4D6677] italic mb-8">
          Know about your dream project and its details; Where comfort meets
          Luxury, Where every details matters
        </p>

        <div className="text-[#148B16] font-[700] uppercase text-3xl mb-6">
          2 BHK FOR SELL
        </div>

        <div className="flex justify-start items-start flex-wrap w-[80%]  ">
          <RoomBasicDetails
            key="launchDate"
            icon={<Bathrooms />}
            title="Bathroom"
            value={"02"}
            className="mr-[3%] mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]  "
          />
          <RoomBasicDetails
            key="possessionDate"
            icon={<BedRooms />}
            title="Bedroom"
            value={"02"}
            className="mr-[3%]  mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]  "
          />
          <RoomBasicDetails
            key="landArea"
            icon={<Balcony />}
            title="Balcony"
            value={"02"}
            className="mr-[3%]  mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]  "
          />
          <RoomBasicDetails
            key="reraStatus"
            icon={<Others />}
            title="Other rooms"
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
    <div className="w-[90%] mb-[5%] " id="propertyDetails ">
      <h1 className="text-[24px] lg:text-[32px] font-[600] text-[#001F35] mb-4 ">
        Parking
      </h1>

      <p className="text-[16px] lg:text-[24px] font-[500] text-[#4D6677] italic mb-8">
        Parkings details include area and other
      </p>

      <div className="flex justify-start items-start flex-wrap   ">
        <RoomBasicDetails
          key="launchDate"
          icon={<Car />}
          title="Open Car Parking"
          value={"02"}
          className="mr-[3%] mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]  "
        />
        <RoomBasicDetails
          key="possessionDate"
          icon={<ParkingIcon />}
          title="Covered Car Parking"
          value={"02"}
          className="mr-[3%]  mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]  "
        />
        <RoomBasicDetails
          key="landArea"
          icon={<OpenBike />}
          title="Open Bike Parking"
          value={"02"}
          className="mr-[3%]  mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]  "
        />
        <RoomBasicDetails
          key="reraStatus"
          icon={<CloseBike />}
          title="Covered Bike Parking"
          value={"03"}
          className="mr-[3%]  mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]  "
        />
      </div>
    </div>
  );
};
