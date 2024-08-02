"use client";

import React, { useState } from "react";
import PFloorPlanModal from "./modals/Floor";
import PropertyHeading from "./heading";
import { Main } from "@/app/validations/property";
import { useSetAtom } from "jotai";
import { listingProps } from "@/app/data/projectDetails";
import { selectedFloorAtom } from "@/app/store/floor";
import { PopupOpenSvg } from "@/app/images/commonSvgs";
import { createPropertyString } from "@/app/utils/dyanamic/property";
import { ImgNotAvail } from "@/app/data/project";

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
      ...(data.tower && { towerName: data.tower }),
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
      ...(data.ga && {
        ga: data.ga,
      }),
      ...(data.length && { length: data.length }),
      ...(data.width && { width: data.width }),
      ...(data.totalFloor && { totalFloor: data.totalFloor }),
      ...(data.isBasement && { isBasement: data.isBasement }),
    });
    setOpened(true);
  };
  return (
    <>
      <PFloorPlanModal data={data} opened={opened} setOpened={setOpened} />
      <div
        className="w-[95%] md:w-[90%]  mt-[50px] relative scroll-mt-[220px]"
        id="floorPlans"
        onClick={handleOpen}
      >
        <div
          className="w-[90%] mb-[10px] xl:mb-[8px] space-y-4"
          id="propertyDetails "
        >
          <PropertyHeading
            title="Floor Plan"
            desc="see floor plan Of your selected property"
          />
        </div>

        <div className=" h-[405px] lg:h-[570px] w-full rounded-[14px]  border-solid border-[1px] border-[#92B2C8] bg-[#FFF] shadow-md flex justify-center p-2 pt-0 sm:pt-2 xl:items-center flex-col ">
          <p className=" text-[#005DA0] text-left xl:text-right text-[14px] xl:text-xl not-italic font-medium w-full p-2 xl:mr-14">
            {createPropertyString(data)}
          </p>
          <div className="w-[100%] xl:w-[70%] flex justify-center items-center flex-col p-[2%] ">
            <div
              className="flex justify-center items-center h-[300px] lg:h-[450px] cursor-pointer self-center m-auto"
              onClick={handleOpen}
            >
              <img
                src={data?.projMedia?.floorPlanUrl ?? ImgNotAvail}
                alt=""
                className="h-full w-full m-auto "
              />
            </div>
            <button onClick={() => setOpened(true)}>
              <div className="bg-[#F4FBFF] p-[10px] rounded-[29px] mt-2  sm:mt-0 gap-[12px] flex justify-end items-center  cursor-pointer absolute bottom-5 right-4 z-50 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.40)]">
                <p className="text-[#0073C6] text-[12px] xl:text-xl not-italic font-semibold leading-[normal] underline capitalize">
                  Click on image to open floor plan
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
