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
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import ZoomInOut from "../../project/actions/ZoomInOut";
import { useMediaQuery } from "@mantine/hooks";
import Close from "../../project/button/close";
import { ImgNotAvail } from "@/app/data/project";
import { formatNumberWithSuffix } from "@/app/utils/numbers";
import Image from "next/image";

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
  const isMobile = useMediaQuery("(max-width: 601)");
  return (
      <Modal
        centered
        opened={opened}
        size={isMobile ? "100%" : "90%"}
        padding={0}
        transitionProps={{ duration: TRANSITION_DURATION }}
        onClose={() => setOpened(false)}
        classNames={{
          content: S.body,
          close: S.closeListing,
          title: S.listingTitle,
          header: S.header,
        }}
        title="Floor Plan"
      >
        <div className="flex mb-[8%]   xl:mb-6 justify-center items-start  xl:gap-[45px] shrink-0 flex-wrap md:flex-nowrap relative pt-0 md:pt-[80px] pb-0 md:pb-[30px]">
          <div className="w-full h-[66px]  xl:h-[57px] flex items-center justify-between  z-[1000] px-3 xl:px-8 absolute top-2 right-0 pb-4 xl:pt-2">
            <div className="text-[#333] text-left text-[14px] sm:text-[20px]  xl:text-[22px] xl:text-2xl not-italic font-semibold leading-[normal]">
              Floor Plan
            </div>
            <div className="flex justify-center items-center gap-5">
              <button
                onClick={() => handleDownload(data.projMedia.floorPlanUrl)}
                className={`text-white flex justify-center text-[12px] xl:text-base items-center xl:gap-1 p-1 xl:p-2 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] rounded-[6px] font-semibold xl:rounded-[10px] bg-[#0073c6] `}
              >
                {isMobile ? "Download Floor Plan" : "Download"}
              </button>
              <SharePopup
                title="Share"
                titleText="Share Floor Plan"
                url={imageUrlParser(data.projMedia.floorPlanUrl, "F")}
              />
              <Close close={() => setOpened(false)} />
            </div>
          </div>

          <TransformWrapper>
            <MiddleSection />
          </TransformWrapper>
          <RightSection propCgId={type} />
        </div>
      </Modal>
  );
}

export default PFloorPlanModal;

const MiddleSection = () => {
  const data = useAtomValue(selectedFloorAtom);
  return (
    <div
      className={`col-span-1 p-4 mt-[15%] sm:mt-2  md:h-[500px] w-full h-full   bg-gray-600 sm:bg-white`}
    >
      <div className="relative">
        <TransformComponent>
          <Image
            src={data.floorPlanUrl ?? ImgNotAvail}
            alt="Floor Plan"
            className="max-h-[500px] sm:max-h-[400px] xl:max-h-[500px]   object-contain"
            width={1200}
            height={500}
          />
        </TransformComponent>
        <ZoomInOut className="!right-1 !bottom-1" />
      </div>
    </div>
  );
};

const RightSection = ({ propCgId }: any) => {
  const data = useAtomValue(selectedFloorAtom);
  return (
    <div className="bg-[#F4FBFF] xl:m-0 mx-4 sm:m-4 p-6 rounded-lg w-full max-w-[342px] shadow">
      <div className=" space-y-1 xl:space-y-4">
        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.unitType}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Unit Type:
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
                Tower:
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
                Block:
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
            {propCgId == projectprops.independent
              ? "House Number"
              : "Unit Number"}
            :
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
                  : propCgId === projectprops.independent
                  ? "Total No.Of Floors"
                  : "At Floor"
              }:`}
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {`${data.isBasement == "Y" ? "B+" : ""}${
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
            {`${propCgId == projectprops.plot ? "Plot Facing" : "Facing"}: `}
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
              Super Builtup Area:
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {formatNumberWithSuffix(data.superBuildUparea, false)} sq.ft
              </span>
            </p>
          </div>
        )}

        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.caretarea}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Carpet Area:
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {formatNumberWithSuffix(data.caretarea, false)} sq.ft
              </span>
            </p>
          </div>
        )}
        {propCgId != projectprops.plot && data.ga && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.gardenArea}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Garden Space:
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
                Garden Area:
                <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                  {" "}
                  {formatNumberWithSuffix(data.gardenArea, false)} sq.ft
                </span>
              </p>
            </div>
          )}

        {propCgId != projectprops.plot && data.ta && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.caretarea}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Terrace Area:
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {data.ta} sq.ft
              </span>
            </p>
          </div>
        )}

        {(propCgId == projectprops.villa ||
          propCgId == projectprops.rowHouse ||
          propCgId == projectprops.villament ||
          propCgId == projectprops.independent) &&
          data?.terraceArea &&
          data.terraceArea != "null" && (
            <div className="flex items-center space-x-3">
              {propertyDetailsSvgs.caretarea}
              <p className="text-[#4D6677] text-[14px] font-[500]">
                Terrace Area:
                <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                  {" "}
                  {formatNumberWithSuffix(data.terraceArea, false)} sq.ft
                </span>
              </p>
            </div>
          )}

        {propCgId == projectprops.villament && data?.totalBalconySize && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.parkingArea}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Balcony Size:
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {formatNumberWithSuffix(data.totalBalconySize, false)} sq.ft
              </span>
            </p>
          </div>
        )}
        {(propCgId == projectprops.plot ||
          propCgId == projectprops.villa ||
          propCgId == projectprops.rowHouse ||
          propCgId == projectprops.independent) &&
          data.plotArea && (
            <div className="flex items-center space-x-3">
              {propertyDetailsSvgs.plotArea}
              <p className="text-[#4D6677] text-[14px] font-[500]">
                Plot Area:
                <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                  {" "}
                  {formatNumberWithSuffix(data.plotArea)} sq.ft
                </span>
              </p>
            </div>
          )}
        {propCgId != projectprops.plot && data.noocp ? (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.noOfCarParking}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Open Car Parking:
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {data.noocp ? data.noocp : "N/A"}
              </span>
            </p>
          </div>
        ) : null}
        {propCgId != projectprops.plot && data.noccp ? (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.closedCarParking}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Closed Car Parking:
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
              Closed Bike Parking:
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
              Open Bike Parking:
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
              Balconies:
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
              Bathroom:
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
              Length of Plot:
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
              Breadth of Plot:
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
