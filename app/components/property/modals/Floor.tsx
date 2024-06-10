import { Dispatch, SetStateAction } from "react";
import { Modal } from "@mantine/core";
import { propertyDetailsSvgs } from "@/app/images/commonSvgs";
import S from "@/app/styles/ModalCarousel.module.css";
import { Main } from "@/app/validations/property";
import { selectedFloorAtom } from "@/app/store/floor";
import { useAtomValue, useSetAtom } from "jotai";
import { listingProps, projectprops } from "@/app/data/projectDetails";
import SharePopup from "../../atoms/SharePopup";
import { imageUrlParser } from "@/app/utils/image";
import useDownload from "@/app/hooks/property/useDownload";

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
  const type =
    listingProps[data.propTypeName.trim() as keyof typeof listingProps];

  const { handleDownload } = useDownload("floorPlan");
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
          close: S.closeListing,
          title: S.listingTitle,
        }}
        title="Floor Plan"
      >
        <div className="flex  mb-10 justify-center items-start gap-[45px] shrink-0 flex-wrap relative">
          <div className="flex justify-center items-center gap-5 absolute right-20 -top-[50px] z-[1000]">
            <button
              onClick={() => handleDownload(data.projMedia.floorPlanUrl)}
              className="text-white flex justify-center items-center gap-1 p-2 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] rounded-[10px] bg-[#0073c6]"
            >
              Download Floor Plan
            </button>
            <SharePopup
              title="Share"
              url={imageUrlParser(data.projMedia.floorPlanUrl, "F")}
            />
          </div>
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
          src={`${data.floorPlanUrl}?v=${Math.random()}`}
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

        {data.towerName &&
          (propCgId === projectprops.apartment ||
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
        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propCgId == projectprops.rowHouse || propCgId == projectprops.villa
              ? propertyDetailsSvgs.towerName
              : propertyDetailsSvgs.floor}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              {`${
                propCgId == projectprops.rowHouse ||
                propCgId == projectprops.villa
                  ? "At Elevation"
                  : "Floor"
              }`}{" "}
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {`${data.isBasement ? "B+" : ""}${
                  data?.floor === 0
                    ? "G"
                    : propCgId === projectprops.rowHouse ||
                      propCgId === projectprops.villa
                    ? `G+${data?.floor}`
                    : data?.floor ?? data.totalFloor
                }`}
              </span>{" "}
            </p>
          </div>
        )}

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
        {propCgId != projectprops.plot && data.ga && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.gardenArea}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Garden Space{" "}
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {data.ga} sq.ft
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
          propCgId == projectprops.rowHouse ||
          propCgId == projectprops.independent) && (
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
        {propCgId != projectprops.plot && data.noocp ? (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.noOfCarParking}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Open Car Parking
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {data.noocp ? data.noocp : "N/A"}
              </span>
            </p>
          </div>
        ) : null}
        {propCgId != projectprops.plot && data.noccp ? (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.noOfCarParking}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Closed Car Parking
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {data.noccp ? data.noccp : "N/A"}
              </span>
            </p>
          </div>
        ) : null}
        {propCgId != projectprops.plot && data.nocbp ? (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.closeBikeParking}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Closed Bike Parking
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {data.nocbp ? data.nocbp : "N/A"}
              </span>
            </p>
          </div>
        ) : null}
        {propCgId != projectprops.plot && data.noobp ? (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.openBikeParking}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Open Bike Parking
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {data.noobp ? data.noobp : "N/A"}
              </span>
            </p>
          </div>
        ) : null}

        {/* {propCgId != projectprops.plot && data.parkingType && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.parkingType}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Open/Covered Parking{" "}
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {data.parkingType} Parking
              </span>
            </p>
          </div>
        )} */}

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
                {data.length} ft.
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
                {data.width} ft.
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
