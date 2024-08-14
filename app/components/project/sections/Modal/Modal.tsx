import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { useAtom, useAtomValue } from "jotai";
import { selectedPartialUnitAtom } from "@/app/store/partialsUnits";
import { useResetAtom } from "jotai/utils";
import S from "./Modal.module.css";
import SharePopup from "@/app/components/atoms/SharePopup";
import Close from "../../button/close";
import { imageUrlParser } from "@/app/utils/image";
import Image from "next/image";
import { FloorPlanNotAvail, ImgNotAvail } from "@/app/data/project";
import { propertyDetailsSvgs } from "@/app/images/commonSvgs";
import CarouselModal from "./Carousel";
import useDownload from "@/app/hooks/property/useDownload";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import ZoomInOut from "../../actions/ZoomInOut";
import { formatNumberWithSuffix } from "@/app/utils/numbers";
export default function PartialUnitModal({ data }: any) {
  const isData = useAtomValue(selectedPartialUnitAtom);
  const [active, setActive] = useState(0);
  const reset = useResetAtom(selectedPartialUnitAtom);
  const handleReset = () => {
    setActive(0);
    reset();
  };
  const selectedOne = isData.others[active];
  const isMobile = useMediaQuery("(max-width: 601px)");
  const { handleDownload } = useDownload("floorPlan");
  const [, { open, MODAL_TYPE }] = useReqCallPopup();

  if (!(isData.main === 0 ? true : isData.main)) {
    return null;
  }
  return (
    <Modal
      opened={isData.main === 0 ? true : isData.main}
      onClose={handleReset}
      classNames={S}
      size={isMobile ? "100%" : "60%"}
      centered
      zIndex={11}
    >
      <div className="w-full bg-transparent     h-[57px] flex items-center justify-between  z-[1000] md:px-10 max-w-[91rem] m-auto">
        <div className="text-[18px] sm:text-2xl not-italic font-bold leading-[normal]">
          Floor Plan
        </div>
        <div className="flex justify-center items-center  gap-5">
          {selectedOne?.floorPlan && (
            <>
              <button
                className="flex justify-center items-center gap-1 p-1 xl:p-2 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] rounded-[10px] bg-[#F3F7FF] text-[#0073C6] text-base not-italic font-semibold leading-[normal] tracking-[0.32px] border-1 border-black border-solid"
                onClick={() => handleDownload(selectedOne?.floorPlan)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM4 20V15H6V18H18V15H20V20H4Z"
                    fill="#0073C6"
                  />
                </svg>{" "}
                <span className="hidden h-4 w-4 xl:w-full xl:h-auto  items-center  xl:block">
                  Download
                </span>
              </button>
              <SharePopup
                titleText="Share Floor Plan"
                title="Share"
                url={imageUrlParser(selectedOne?.floorPlan || "", "F")}
                className="text-[#0073C6] text-base not-italic font-semibold leading-[normal] tracking-[0.32px]"
              />
            </>
          )}

          <Close
            className="h-[28px] w-[28px] xl:h-[36px] xl:w-[36px]"
            close={handleReset}
          />
        </div>
      </div>
      <div className="flex  items-center w-[90%] h-[300px] sm:max-h-[320px] xl:min-h-[434px]  justify-center rounded border    border-solid border-[#4D6677] m-auto relative">
        <TransformWrapper>
          <TransformComponent>
            <Image
              src={selectedOne?.floorPlan ?? FloorPlanNotAvail}
              width={500}
              height={500}
              alt="image"
              className="max-h-[294px] sm:max-h-[290px] xl:max-h-[430px] object-contain "
            />
          </TransformComponent>
          <ZoomInOut className=" -bottom-1 -right-[0.5px] sm:bottom-0 sm:right-0 pb-2" />
        </TransformWrapper>
        <button
          className="flex justify-center items-center gap-1 rounded shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] p-1 sm:p-2 bg-[#0073C6] text-white text-xs sm:text-base not-italic font-semibold absolute top-2 right-2"
          onClick={() =>
            open({
              modal_type: "REQ_QUOTE",
              postedByName: data.postedByName,
              projUnitIdEnc: selectedOne?.projUnitIdEnc,
              postedId: data.builderId,
              reqId: data.projIdEnc,
              source: "projBanner",
              title: data.projectName,
            })
          }
        >
          Request Quotation
        </button>
      </div>
      <div className="flex flex-wrap  w-[90%] m-auto items-center gap:2  md:gap-5 shadow-[0px_4px_20px_0px_#F0F6FF] px-4 py-1 md:py-2.5 rounded-[10px] bg-[#e0f4ff] mt-3 mb-3">
        <div className="flex items-center space-x-3">
          {propertyDetailsSvgs.unitType}
          <p className="text-[#242424] text-nowrap  text-[12px] xl:text-[16px] font-[500]">
            Unit Type:{" "}
            <span className="text-[#303A42] text-nowrap  text-[12px] xl:text-[16px] font-[600] ">
              {selectedOne?.propType == "32"
                ? `(${selectedOne.width} x ${selectedOne.length}) sq.ft`
                : selectedOne?.unitType}
            </span>
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {propertyDetailsSvgs.superBuildUparea}
          <p className="text-[#242424] text-nowrap text-[12px] xl:text-[16px] font-[500]">
            {selectedOne?.propType == "32" ? "Plot Area" : "Super Builtup Area"}
            :{" "}
            <span className="text-[#303A42] text-nowrap  text-[12px] xl:text-[16px] font-[600] ">
              {formatNumberWithSuffix(
                selectedOne?.plotArea || selectedOne?.sba
              )}{" "}
              sq.ft
            </span>
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {propertyDetailsSvgs.superBuildUparea}
          <p className="text-[#242424] text-nowrap text-[12px] xl:text-[16px] font-[500]">
            Price Range:{" "}
            <span className="text-[#303A42]  text-nowrap text-[12px] xl:text-[16px] font-[600] ">
              {isData.priceRange}
            </span>
          </p>
        </div>
      </div>
      {isData.others.length > 1 && (
        <CarouselModal active={active} setActive={setActive} />
      )}
    </Modal>
  );
}
