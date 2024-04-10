"use client";

import React, { useState } from "react";
import PFloorPlanModal from "./modals/Floor";
import PropertyHeading from "./heading";
import { Main } from "@/app/validations/property";
import { useSetAtom } from "jotai";
import { listingProps } from "@/app/data/projectDetails";
import { selectedFloorAtom } from "@/app/store/floor";
import { PopupOpenSvg } from "@/app/images/commonSvgs";

export default function RoomFloorplansBlock({ data }: { data: Main }) {
  const [opened, setOpened] = useState(false);
  const setValue = useSetAtom(selectedFloorAtom);
  const type = listingProps[data.propTypeName as keyof typeof listingProps];
  const handleOpen = () => {
    setValue({
      projIdEnc: "4f313de2f95cd9d761098b8f6c09417c",
      phaseId: 670,
      propType: type,
      bhk: 42,
      bhkName: data.bhkName,
      towerName: data.tower,
      towerId: data.tower,
      block: data.block,
      floor: data.atFloor,
      unitNumber: data.unitNumber,
      facingId: data.facingName,
      facingName: data.facingName,
      caretarea: data.ca,
      superBuildUparea: data.sba,
      terraceArea: data.ta,
      parkingType: "Opened",
      totalNumberofBathroom: data.nobt,
      totalNumberOfBalcony: data.nobl,
      noOfCarParking: data.noocp,
      floorPlanUrl: data.projMedia.floorPlanUrl,
    });
    setOpened(true);
  };
  return (
    <>
      <PFloorPlanModal data={data} opened={opened} setOpened={setOpened} />
      <div
        className="w-[90%] mb-[5%] mt-[2.5%] relative scroll-mt-[220px]"
        id="floorPlans"
        onClick={handleOpen}
      >
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
            <div
              className="flex justify-center items-center h-[300px] lg:h-[450px] cursor-pointer"
              onClick={handleOpen}
            >
              <img
                src={data?.projMedia?.floorPlanUrl}
                alt=""
                className="h-full w-full"
              />
            </div>
            <button className="absolute bottom-2 right-2 cursor-pointer">
              <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[33px] lg:h-[33px] " />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
