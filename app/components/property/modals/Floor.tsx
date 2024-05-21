import { Dispatch, SetStateAction, useState } from "react";
import { Modal } from "@mantine/core";
import {
  DropDownIcon,
  FloorPlanModalIcon,
  ImgCarouselIcon,
  LenseIcon,
  PopupOpenSvg,
  PrevCarouselIcon,
  propertyDetailsSvgs,
} from "@/app/images/commonSvgs";
import S from "@/app/styles/ModalCarousel.module.css";
import { Main } from "@/app/validations/property";
import { selectedFloorAtom } from "@/app/store/floor";
import { useAtomValue, useSetAtom } from "jotai";
import { listingProps, projectprops } from "@/app/data/projectDetails";

function PFloorPlanModal({
  data,
  opened,
  setOpened,
}: {
  data: Main;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const TRANSITION_DURATION = 200;
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
      <Modal
        opened={opened}
        size={"90%"}
        padding={0}
        transitionProps={{ duration: TRANSITION_DURATION }}
        onClose={() => setOpened(false)}
        classNames={{
          content: S.body,
          close: S.close,
        }}
      >
        <div className="flex  mb-10 justify-center items-start gap-[45px] shrink-0 flex-wrap">
          <MiddleSection />
          <RightSection propCgId={type} />
        </div>
      </Modal>
    </>
  );
}

export default PFloorPlanModal;

const MiddleSection = () => {
  const data = useAtomValue(selectedFloorAtom);
  return (
    <div className="col-span-1">
      <div className="relative">
        <img
          src={data.floorPlanUrl}
          alt="Floor Plan"
          className="border"
          width={800}
          height={400}
          style={{ aspectRatio: "800 / 540", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

const RightSection = ({ propCgId }: any) => {
  const data = useAtomValue(selectedFloorAtom);
  return (
    <div className="bg-[#F4FBFF] p-6 rounded-lg w-full max-w-[342px] shadow">
      <div className="space-y-4">
        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.unitType}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Unit Type{" "}
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data.bhkName}
              </span>
            </p>
          </div>
        )}

        {((data.towerName && propCgId === projectprops.apartment) ||
          propCgId === projectprops.villament) && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.towerName}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Tower{" "}
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data.towerName}
              </span>
            </p>
          </div>
        )}

        {data.block &&
          propCgId == projectprops.apartment &&
          propCgId != projectprops.plot && (
            <div className="flex items-center space-x-3">
              {propertyDetailsSvgs.block}
              <p className="text-[#4D6677] text-[14px] font-[500]">
                Block{" "}
                <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                  {" "}
                  {data.block}
                </span>
              </p>
            </div>
          )}

        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.floor}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              {`${
                propCgId == projectprops.rowHouse ||
                propCgId == projectprops.villa
                  ? "Elevation"
                  : "Floor"
              }`}{" "}
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {data?.floor === 0
                  ? "G"
                  : propCgId === projectprops.rowHouse ||
                    propCgId === projectprops.villa
                  ? `G+${data?.floor}`
                  : data?.floor}
              </span>{" "}
            </p>
          </div>
        )}

        <div className="flex items-center space-x-3">
          {propertyDetailsSvgs.unitNumber}
          <p className="text-[#4D6677] text-[14px] font-[500]">
            Unit Number{" "}
            <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
              {" "}
              {data.unitNumber}
            </span>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {propertyDetailsSvgs.facingName}
          <p className="text-[#4D6677] text-[14px] font-[500]">
            {`${propCgId == projectprops.plot ? "Plot Facing" : "Facing"} `}{" "}
            <span className="text-[#303A42] text-[14px] font-[600] ml-[10px] ">
              {" "}
              {data.facingName}
            </span>
          </p>
        </div>

        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.superBuildUparea}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Super Builtup Area{" "}
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data.superBuildUparea} sq.ft
              </span>
            </p>
          </div>
        )}

        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.caretarea}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Carpet Area{" "}
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {data.caretarea} sq.ft
              </span>
            </p>
          </div>
        )}

        {(propCgId == projectprops.villa ||
          propCgId == projectprops.rowHouse ||
          propCgId == projectprops.villament) &&
          data.gardenArea && (
            <div className="flex items-center space-x-3">
              {propertyDetailsSvgs.caretarea}
              <p className="text-[#4D6677] text-[14px] font-[500]">
                Garden Area{" "}
                <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                  {" "}
                  {data.gardenArea} sq.ft
                </span>
              </p>
            </div>
          )}
        {(propCgId == projectprops.villa ||
          propCgId == projectprops.rowHouse ||
          propCgId == projectprops.villament) &&
          data?.terraceArea &&
          data.terraceArea !== "null" && (
            <div className="flex items-center space-x-3">
              {propertyDetailsSvgs.caretarea}
              <p className="text-[#4D6677] text-[14px] font-[500]">
                Terrace Area{" "}
                <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                  {" "}
                  {data.terraceArea} sq.ft
                </span>
              </p>
            </div>
          )}
        {(propCgId == projectprops.villa ||
          propCgId == projectprops.rowHouse ||
          propCgId == projectprops.villament) &&
          data.parkingArea !== "None" && (
            <div className="flex items-center space-x-3">
              {propertyDetailsSvgs.parkingArea}
              <p className="text-[#4D6677] text-[14px] font-[500]">
                Parking Area{" "}
                <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                  {" "}
                  {data.parkingArea} sq.ft
                </span>
              </p>
            </div>
          )}
        {propCgId == projectprops.villament && data?.totalBalconySize && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.parkingArea}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Balcony Size{" "}
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {data.totalBalconySize} sq.ft
              </span>
            </p>
          </div>
        )}
        {(propCgId == projectprops.plot ||
          propCgId == projectprops.villa ||
          propCgId == projectprops.rowHouse) && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.plotArea}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Plot Area{" "}
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data.plotArea} sq.ft
              </span>
            </p>
          </div>
        )}
        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.noOfCarParking}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Car Parking{" "}
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {data.noOfCarParking ? data.noOfCarParking : "N/A"}
              </span>
            </p>
          </div>
        )}

        {propCgId != projectprops.plot && data.parkingType && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.parkingType}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Open/Covered Parking{" "}
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {data.parkingType} Parking
              </span>
            </p>
          </div>
        )}

        {propCgId != projectprops.plot && data?.totalNumberOfBalcony > 0 && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.totalNumberOfBalcony}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Balconies{" "}
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data.totalNumberOfBalcony}
              </span>
            </p>
          </div>
        )}

        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.totalNumberofBathroom}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Bathroom{" "}
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data.totalNumberofBathroom}
              </span>
            </p>
          </div>
        )}

        {propCgId == projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.length}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Length of Plot{" "}
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data.length} sq.ft
              </span>
            </p>
          </div>
        )}

        {propCgId == projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.width}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Breadth of Plot{" "}
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data.width} sq.ft
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
