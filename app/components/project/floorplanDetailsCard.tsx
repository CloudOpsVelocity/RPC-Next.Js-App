import React from "react";
import {
  CarParkingIcon,
  FacingIcon,
  FlooringIcon,
  SuperBuildupAreaIcon,
  TowerTypeIcon,
} from "../../images/commonSvgs";
import { projectprops } from "../../data/projectDetails";
import { useAtom } from "jotai";
import { selectedFloorAtom } from "@/app/store/floor";

type Props = {
  propCgId?: any;
  data: any;
};

const FloorplanDetailsCard: React.FC<Props> = ({ propCgId, data }) => {
  const [, setImage] = useAtom(selectedFloorAtom);
  const mergedData = {
    bedCount: 2, // Example value, adjust as needed
    bathCount: data.totalNumberofBathroom,
    superBuildupArea: 1200, // Example value, adjust as needed
    propertyFacing: "North - West", // Example value, adjust as needed
    towerType: data.tower || "Tower 1", // If tower is provided, use it; otherwise, use "Tower 1"
    unitNumber: "05", // Example value, adjust as needed
    unitType: "50ft x 40 ft", // Example value, adjust as needed
    carParking: data.noOfCarParking,
  };
  return (
    <div
      className="flex justify-between p-[2%] w-full border-[#92B2C8] border-solid border-b-[1px] border-r-[1px] cursor-pointer"
      onClick={() => setImage(data)}
    >
      <div className="">
        <p className="font-[500] text-[16px] lg:text-[24px] mb-[20px] text-[#001F35] flex justify-start items-start">
          {mergedData.bedCount}BHK |
          <span className="font-[500] text-[14px] lg:text-[20px] text-[#000]">
            {" "}
            {mergedData.bedCount} bed- {mergedData.bathCount} bath
          </span>
        </p>
        <p className="gap-[4px] font-[500] text-[14px] lg:text-[16px] text-[#303A42] mb-[20px] flex justify-start items-start">
          <SuperBuildupAreaIcon className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px]" />
          Super Builtup Area: {mergedData.superBuildupArea} sq.ft
        </p>
        <p className="gap-[4px] font-[500] text-[14px] lg:text-[16px] text-[#001F35] mb-[20px] flex justify-start items-start">
          <FacingIcon className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px]" />
          Property Facing: {mergedData.propertyFacing}
        </p>
      </div>

      <div className="flex justify-end items-end flex-col ">
        {(propCgId == projectprops.apartment ||
          propCgId == projectprops.villament) && (
          <p className="gap-[4px] flex justify-end items-end text-[#303A4] font-[500] text-[14px] lg:text-[16px] mb-[20px] ">
            <TowerTypeIcon className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px]" />
            Tower: {mergedData.towerType}
          </p>
        )}

        <p className="gap-[4px] flex justify-end items-end text-[#303A4] font-[500] text-right text-[14px] lg:text-[16px] mb-[20px] ">
          <FlooringIcon className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px]" />
          Unit Number: {mergedData.unitNumber}
        </p>
        {(propCgId == projectprops.plot || !propCgId) && (
          <p className="gap-[4px] flex justify-end items-end text-[#303A4] font-[500] text-[14px] lg:text-[16px] mb-[20px] ">
            <FlooringIcon className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px]" />
            Unit Type: {mergedData.unitType}
          </p>
        )}
        {(propCgId != projectprops.plot || !propCgId) && (
          <p className="gap-[4px] flex justify-end items-end text-[#303A4] font-[500] text-[14px] lg:text-[16px] mb-[20px] ">
            <CarParkingIcon className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px]" />
            Car Parking: {mergedData.carParking}
          </p>
        )}
      </div>
    </div>
  );
};

export default FloorplanDetailsCard;
