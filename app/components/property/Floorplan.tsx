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
    console.log();
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
      totalNumberofBathroom: data.nobt,
      totalNumberOfBalcony: data.nobl,
      noOfCarParking: data.noocp,
      floorPlanUrl: data.projMedia.floorPlanUrl,
      plotArea: data.plotArea,
      noocp: data.noocp,
      noobp: data.noobp,
      noccp: data.noccp,
      nocbp: data.nocbp,
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

        <div className=" h-[456px] lg:h-[570px] w-full rounded-[14px]  border-solid border-[1px] border-[#92B2C8] bg-[#FFF] shadow-md flex justify-center items-center flex-col ">
          <p className=" text-[#005DA0] text-right text-xl not-italic font-medium w-full mr-14">
            Sarang by sumadhura/2bhk/tower 1/ 04/north/1124 sq.ft - 2
          </p>
          <div className="w-[70%] flex justify-center items-center flex-col p-[2%] ">
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
            <button onClick={() => setOpened(true)}>
              <div className="bg-[#F4FBFF] p-[10px] rounded-[29px] gap-[12px] flex justify-end items-center  cursor-pointer absolute bottom-5 right-4 z-50 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.40)]">
                <p className="text-[#0073C6] text-xl not-italic font-semibold leading-[normal] underline capitalize">
                  Click on image to open master plan
                </p>
                <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px]  " />
              </div>{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
