"use client";
import { projectprops } from "@/app/data/projectDetails";
import Button from "@/app/elements/button";
import {
  AgreementDuration,
  AvailableFor,
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
  NoticeMonth,
  OpenBike,
  Others,
  OwnerShip,
  ParkingIcon,
  PetFreindly,
  PropertyAvailable,
  SecurityIcon,
  StartDate,
  Status,
  TotalLandArea,
  TowerIcon,
} from "@/app/images/commonSvgs";
import React, { useState } from "react";
import { PhaseList } from "@/app/validations/types/project";
import RoomBasicDetails from "./RoomBasicDetails";
import PropertyHeading from "./heading";
import { Main } from "@/app/validations/property";
import { formatDateDDMMYYYY } from "@/app/utils/date";
import { generatePropertyDetails } from "@/app/data/property";
import { map } from "leaflet";
const style = {
  card: "mr-[3%] mb-[1%] p-[1%] bg-white mt-4 border shadow-[0px_4px_20px_0px_#F0F6FF] rounded-[10px] border-solid border-[#92B2C8]",
  heading: {
    h1: "text-[24px] lg:text-[24px] font-[600] text-[#001F35] mb-1",
    p: "text-[16px] lg:text-[24px] font-[500] text-[#4D6677] italic mb-8",
  },
};
export default function RoomDetails({ data }: { data: Main }) {
  return (
    <>
      <PropertyHeading
        title="Listing details"
        desc="Check the details for 2BHK apartment for sell"
        className="mb-[40px]"
      />
      <UnitBlock data={data} />
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
            value={data.nobt}
            className={style.card}
          />
          <RoomBasicDetails
            key="launchDate"
            icon={<BedRooms />}
            title="Bedrooms"
            value={data?.bhkName?.split(" ")[0]}
            className={style.card}
          />

          <RoomBasicDetails
            key="landArea"
            icon={<Balcony />}
            title="Balcony"
            value={data.nobl}
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
            value={data.furnshName}
            className={style.card}
          />
        </div>
      </div>
      <Parking {...data} />
      <OtherDetails
        // af={data.availableFrom}
        // status={
        //   data.availablityStatus == "U" ? "Under Construction" : "Ready to Move"
        // }
        // ft={data.flooringType}
        // ownershipName={data.ownershipName}
        // possassionDate={data.possassionDate}
        // age={data.ageofBuilding}
        // agreement={data.agrementduration}
        // availfor={data.availableFrom}
        // pet={"Pet Are Not Allowed"}
        {...data}
      />
    </>
  );
}

const Parking = ({ noocp, noobp, noccp, nocbp }: any) => {
  const isAvail =
    [noocp, noobp, noccp, nocbp].filter((i) => i !== undefined).length > 0;
  return (
    isAvail && (
      <div
        className="w-[90%] mb-[3%] shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[31px] border-2 border-solid border-[#EEF7FE] bg-[#F9FAFA] px-[53px] py-[39px]"
        id="propertyDetails "
      >
        <h1 className={style.heading.h1}>Parking</h1>

        <p className={style.heading.p}>
          Parkings details include area and other
        </p>

        <div className="flex justify-start items-start flex-wrap   ">
          <RoomBasicDetails
            key="launchDate"
            icon={<Car />}
            title="Open Car Parking"
            value={noocp}
            className={style.card}
          />
          <RoomBasicDetails
            key="possessionDate"
            icon={<ParkingIcon />}
            title="Covered Car Parking"
            value={noobp}
            className={style.card}
          />
          <RoomBasicDetails
            key="landArea"
            icon={<OpenBike />}
            title="Open Bike Parking"
            value={noccp}
            className={style.card}
          />
          <RoomBasicDetails
            key="reraStatus"
            icon={<CloseBike />}
            title="Covered Bike Parking"
            value={nocbp}
            className={style.card}
          />
        </div>
      </div>
    )
  );
};
const OtherDetails = ({
  ownershipName,
  possassionDate,
  ageofBuilding,
  availableFrom,
  flooringType,
  availablityStatus,
  agrementduration,
  cg,
  noticemonth,
}: Main) => {
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
        {cg === "R" && (
          <RoomBasicDetails
            key="launchDate"
            icon={<NoticeMonth />}
            title="Notice Month"
            value={noticemonth}
            className={style.card}
          />
        )}

        <RoomBasicDetails
          key="launchDate"
          icon={<OwnerShip />}
          title="Ownership"
          value={ownershipName}
          className={style.card}
        />
        <RoomBasicDetails
          key="possessionDate"
          icon={<Status />}
          title="Availability Status"
          value={
            availablityStatus == "R" ? "Ready to Move" : "Under Construction"
          }
          className={style.card}
        />
        <RoomBasicDetails
          key="landArea"
          icon={<StartDate />}
          title="Available From"
          value={formatDateDDMMYYYY(availableFrom)}
          className={style.card}
        />

        {availablityStatus === "R" ? (
          <RoomBasicDetails
            key="reraStatus"
            icon={<FlatIcon />}
            title="Age of Property"
            value={ageofBuilding}
            className={style.card}
          />
        ) : (
          <RoomBasicDetails
            key="reraStatus"
            icon={<StartDate />}
            title="Possession Date"
            value={formatDateDDMMYYYY(possassionDate)}
            className={style.card}
          />
        )}

        <RoomBasicDetails
          key="reraStatus"
          icon={<Marble />}
          title="Type of Flooring"
          value={flooringType}
          className={style.card}
        />
        {cg === "R" && (
          <>
            <RoomBasicDetails
              key="reraStatus"
              icon={<AgreementDuration />}
              title="Agreement Duration"
              value={agrementduration}
              className={style.card}
            />
            <RoomBasicDetails
              key="reraStatus"
              icon={<AvailableFor />}
              title="Available for"
              value={"Humans"}
              className={style.card}
            />
            <RoomBasicDetails
              key="reraStatus"
              icon={<PetFreindly />}
              title="Pet Friendly"
              value={"Pets Are Not Allowed"}
              className={style.card}
            />
          </>
        )}
      </div>
    </div>
  );
};
const UnitBlock = ({ data }: { data: Main }) => {
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
        {generatePropertyDetails(
          data,
          data.propTypeName,
          data.cg,
          data.availablityStatus
        ).map(({ value, Icon, title }) => (
          <RoomBasicDetails
            icon={<Icon />}
            title={title}
            value={value}
            className="mr-[3%] mb-[1%] p-[1%] bg-white mt-4 border shadow-[0px_4px_20px_0px_#F0F6FF] rounded-[10px] border-solid border-[#92B2C8]"
          />
        ))}
      </div>
    </div>
  );
};
