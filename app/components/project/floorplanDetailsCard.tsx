import React from "react";
import {
  CarParkingIcon,
  FacingIcon,
  FlooringIcon,
  SuperBuildupAreaIcon,
  TowerIcon,
  TowerTypeIcon,
} from "../../images/commonSvgs";
import { projectprops } from "../../data/projectDetails";

type Props = {
  propCgId?: any;
};

export default function FloorplanDetailsCard({ propCgId }: Props) {
  return (
    <div className="flex justify-between  p-[2%] w-full border-[#92B2C8] border-solid border-b-[1px] border-r-[1px] ">
      <div className="">
        <p className=" font-[500] text-[16px] lg:text-[24px] mb-[20px] text-[#001F35] flex justify-start items-start">
          2BHK |
          <span className=" font-[500]  text-[14px] lg:text-[20px] text-[#000]">
            {" "}
            2 bed- 2 bath
          </span>
        </p>
        <p className="gap-[4px] font-[500]  text-[14px] lg:text-[16px] text-[#303A42] mb-[20px] flex justify-start items-start">
          <SuperBuildupAreaIcon className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] " />
          Super Builtup Area: 1200 sq.ft
        </p>
        <p className="gap-[4px] font-[500] text-[14px] lg:text-[16px] text-[#001F35] mb-[20px] flex justify-start items-start">
          <FacingIcon className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] " />
          Property Facing: North - West
        </p>
      </div>

      <div className="flex justify-end items-end flex-col ">
        {propCgId == projectprops.apartment ||
        propCgId == projectprops.villament ? (
          <p className="gap-[4px] flex justify-end items-end text-[#303A4] font-[500]  text-[14px] lg:text-[16px] mb-[20px] ">
            <TowerTypeIcon className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] " />
            Tower: Tower 1
          </p>
        ) : (
          ""
        )}

        <p className="gap-[4px] flex justify-end items-end text-[#303A4] font-[500] text-right text-[14px] lg:text-[16px] mb-[20px] ">
          <FlooringIcon className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] " />
          Unit Number: 05
        </p>
        {propCgId == projectprops.plot && (
          <p className="gap-[4px] flex justify-end items-end text-[#303A4] font-[500]  text-[14px] lg:text-[16px] mb-[20px] ">
            <FlooringIcon className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] " />
            Unit Type: 50ft x 40 ft
          </p>
        )}
        {propCgId != projectprops.plot && (
          <p className="gap-[4px] flex justify-end items-end text-[#303A4] font-[500]  text-[14px] lg:text-[16px] mb-[20px] ">
            <CarParkingIcon className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] " />
            Car Parking: 05
          </p>
        )}
      </div>
    </div>
  );
}
