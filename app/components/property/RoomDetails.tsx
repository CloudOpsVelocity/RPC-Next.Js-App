"use client";
import { projectprops } from "@/app/data/projectDetails";
import Button from "@/app/elements/button";
import {
  Balcony,
  Bathrooms,
  BedRooms,
  Block,
  Car,
  CarParkingIcon,
  CloseBike,
  EndDate,
  FlatIcon,
  Furnishing,
  IdIcon,
  Marble,
  OpenBike,
  Others,
  OwnerShip,
  ParkingIcon,
  PropertyAvailable,
  SecurityIcon,
  StartDate,
  Status,
  TotalLandArea,
  TowerIcon,
} from "@/app/images/commonSvgs";
import ProjBasicDetails from "@/app/components/project/projBasicDetails";
import PropertyTypeDetailsCrad from "@/app/components/project/propertyTypeDetailsCrad";
import React, { useState } from "react";
import { PhaseList } from "@/app/validations/types/project";
import RoomBasicDetails from "./RoomBasicDetails";
import PropertyHeading from "./heading";
const style = {
  card: "mr-[3%] mb-[1%] p-[1%] bg-white mt-4 border shadow-[0px_4px_20px_0px_#F0F6FF] rounded-[10px] border-solid border-[#92B2C8]",
  heading: {
    h1: "text-[24px] lg:text-[24px] font-[600] text-[#001F35] mb-1",
    p: "text-[16px] lg:text-[24px] font-[500] text-[#4D6677] italic mb-8",
  },
};
export default function RoomDetails({ data }: { data: PhaseList[] }) {
  return (
    <>
      <PropertyHeading
        title="Listing details"
        desc="Check the details for 2BHK apartment for sell"
        className="mb-[40px]"
      />
      <UnitBlock />
      <div
        className="w-[90%] mb-[3%] shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[31px] border-2 border-solid border-[#EEF7FE] bg-[#F9FAFA] px-[53px] py-[39px]"
        id="propertyDetails "
      >
        <h1 className={style.heading.h1}>Room Details</h1>

        <p className={style.heading.p}>
          See the rooms that are available in This property
        </p>

        {/* <div className="text-[#148B16] font-[700] uppercase text-3xl mb-6">
          2 BHK FOR SELL
        </div> */}

        <div className={"flex justify-start items-start flex-wrap w-[100%]  "}>
          <RoomBasicDetails
            key="launchDate"
            icon={<Bathrooms />}
            title="Bathroom"
            value={"02"}
            className={style.card}
          />
          <RoomBasicDetails
            key="possessionDate"
            icon={<BedRooms />}
            title="Bedroom"
            value={"02"}
            className={style.card}
          />
          <RoomBasicDetails
            key="landArea"
            icon={<Balcony />}
            title="Balcony"
            value={"02"}
            className={style.card}
          />
          <RoomBasicDetails
            key="reraStatus"
            icon={<Others />}
            title="Other rooms"
            value={"Store Room , Puja Room"}
            className={style.card}
          />
          <RoomBasicDetails
            key="reraStatus"
            icon={<Furnishing />}
            title="Furnishing"
            value={"Semi- Furnished"}
            className={style.card}
          />
        </div>
      </div>
      <Parking />
      <OtherDetails />
    </>
  );
}

const Parking = () => {
  return (
    <div
      className="w-[90%] mb-[3%] shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[31px] border-2 border-solid border-[#EEF7FE] bg-[#F9FAFA] px-[53px] py-[39px]"
      id="propertyDetails "
    >
      <h1 className={style.heading.h1}>Parking</h1>

      <p className={style.heading.p}>Parkings details include area and other</p>

      <div className="flex justify-start items-start flex-wrap   ">
        <RoomBasicDetails
          key="launchDate"
          icon={<Car />}
          title="Open Car Parking"
          value={"02"}
          className={style.card}
        />
        <RoomBasicDetails
          key="possessionDate"
          icon={<ParkingIcon />}
          title="Covered Car Parking"
          value={"02"}
          className={style.card}
        />
        <RoomBasicDetails
          key="landArea"
          icon={<OpenBike />}
          title="Open Bike Parking"
          value={"02"}
          className={style.card}
        />
        <RoomBasicDetails
          key="reraStatus"
          icon={<CloseBike />}
          title="Covered Bike Parking"
          value={"03"}
          className={style.card}
        />
      </div>
    </div>
  );
};
const OtherDetails = () => {
  return (
    <div
      className="w-[90%] mb-[3%] shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[31px] border-2 border-solid border-[#EEF7FE] bg-[#F9FAFA] px-[53px] py-[39px]"
      id="propertyDetails "
    >
      <h1 className={style.heading.h1}>Other Details</h1>

      <p className={style.heading.p}>
        See the rooms that are available in This property
      </p>

      <div className="flex justify-start items-start flex-wrap   w-full">
        <RoomBasicDetails
          key="launchDate"
          icon={<OwnerShip />}
          title="Ownership"
          value={"Freehold"}
          className={style.card}
        />
        <RoomBasicDetails
          key="possessionDate"
          icon={<Status />}
          title="Availability Status"
          value={"Ready to Move"}
          className={style.card}
        />
        <RoomBasicDetails
          key="landArea"
          icon={<StartDate />}
          title="Available From"
          value={"12/ 03/ 2023"}
          className={style.card}
        />
        <RoomBasicDetails
          key="reraStatus"
          icon={<FlatIcon />}
          title="Age of Property"
          value={"03"}
          className={style.card}
        />
        <RoomBasicDetails
          key="reraStatus"
          icon={<Marble />}
          title="Type of Flooring"
          value={"03"}
          className={style.card}
        />
      </div>
    </div>
  );
};
const UnitBlock = () => {
  return (
    <div
      className="w-[90%] mb-[3%] shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[31px] border-2 border-solid border-[#EEF7FE] bg-[#F9FAFA] px-[53px] py-[39px]"
      id="propertyDetails "
    >
      <h1 className={style.heading.h1}>Unit Details</h1>

      <p className={style.heading.p}>
        unit details including BHK, PHASE, TOWER,...etc
      </p>

      <div className="flex justify-start items-start flex-wrap   ">
        <RoomBasicDetails
          key="launchDate"
          icon={<Marble />}
          title="Unit Type"
          value={"2 BHK"}
          className="mr-[3%] mb-[1%] p-[1%] bg-white mt-4 border shadow-[0px_4px_20px_0px_#F0F6FF] rounded-[10px] border-solid border-[#92B2C8]"
        />
        <RoomBasicDetails
          key="launchDate"
          icon={<Marble />}
          title="Property Type"
          value={"Apartment"}
          className="mr-[3%] mb-[1%] p-[1%] bg-white mt-4 border shadow-[0px_4px_20px_0px_#F0F6FF] rounded-[10px] border-solid border-[#92B2C8]"
        />
        <RoomBasicDetails
          key="launchDate"
          icon={<Marble />}
          title="Phase"
          value={"Phase 1"}
          className="mr-[3%] mb-[1%] p-[1%] bg-white mt-4 border shadow-[0px_4px_20px_0px_#F0F6FF] rounded-[10px] border-solid border-[#92B2C8]"
        />
        <RoomBasicDetails
          key="possessionDate"
          icon={<TowerIcon />}
          title="Tower"
          value={"Tower 1"}
          className="mr-[3%] mb-[1%] p-[1%] bg-white mt-4 border shadow-[0px_4px_20px_0px_#F0F6FF] rounded-[10px] border-solid border-[#92B2C8]"
        />{" "}
        <RoomBasicDetails
          key="launchDate"
          icon={<Marble />}
          title="Floor"
          value={"02"}
          className="mr-[3%] mb-[1%] p-[1%] bg-white mt-4 border shadow-[0px_4px_20px_0px_#F0F6FF] rounded-[10px] border-solid border-[#92B2C8]"
        />
        <RoomBasicDetails
          key="landArea"
          icon={<Block />}
          title="Block"
          value={"02"}
          className="mr-[3%] mb-[1%] p-[1%] bg-white mt-4 border shadow-[0px_4px_20px_0px_#F0F6FF] rounded-[10px] border-solid border-[#92B2C8]"
        />{" "}
        <RoomBasicDetails
          key="launchDate"
          icon={<Marble />}
          title="Unit Number"
          value={"01"}
          className="mr-[3%] mb-[1%] p-[1%] bg-white mt-4 border shadow-[0px_4px_20px_0px_#F0F6FF] rounded-[10px] border-solid border-[#92B2C8]"
        />
        <RoomBasicDetails
          key="launchDate"
          icon={<Marble />}
          title="Facing"
          value={"North"}
          className="mr-[3%] mb-[1%] p-[1%] bg-white mt-4 border shadow-[0px_4px_20px_0px_#F0F6FF] rounded-[10px] border-solid border-[#92B2C8]"
        />
        <RoomBasicDetails
          key="launchDate"
          icon={<TotalLandArea />}
          title="Super built-up Area"
          value={"2180 sq.ft"}
          className="mr-[3%] mb-[1%] p-[1%] bg-white mt-4 border shadow-[0px_4px_20px_0px_#F0F6FF] rounded-[10px] border-solid border-[#92B2C8]"
        />
        <RoomBasicDetails
          key="launchDate"
          icon={<TotalLandArea />}
          title="Carpet Area"
          value={"2180 sq.ft"}
          className="mr-[3%] mb-[1%] p-[1%] bg-white mt-4 border shadow-[0px_4px_20px_0px_#F0F6FF] rounded-[10px] border-solid border-[#92B2C8]"
        />
        <RoomBasicDetails
          key="launchDate"
          icon={<TotalLandArea />}
          title="Built-up Area"
          value={"2180 sq.ft"}
          className="mr-[3%] mb-[1%] p-[1%] bg-white mt-4 border shadow-[0px_4px_20px_0px_#F0F6FF] rounded-[10px] border-solid border-[#92B2C8]"
        />
      </div>
    </div>
  );
};
