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
import { ImgNotAvail } from "@/app/data/project";
import { propertyDetailsSvgs } from "@/app/images/commonSvgs";
import CarouselModal from "./Carousel";
export default function PartialUnitModal() {
  const isData = useAtomValue(selectedPartialUnitAtom);
  const reset = useResetAtom(selectedPartialUnitAtom);
  const selectedOne = isData.others[isData.main];
  const isMobile = useMediaQuery("(max-width: 601px)");
  if(!(isData.main === 0 ? true : isData.main)){
    return null;
  }

  return (
    <Modal
      opened={isData.main === 0 ? true : isData.main}
      onClose={reset}
      classNames={S}
      size={isMobile ?"100%":"60%"}
      
    >
      <div className="w-full bg-transparent     h-[57px] flex items-center justify-between  z-[1000] md:px-10 max-w-[91rem] m-auto">
        <div className="text-[18px] sm:text-2xl not-italic font-bold leading-[normal]">
          Floor Plan
        </div>
        <div className="flex justify-center items-center  gap-5">
          <a
            className="flex justify-center items-center gap-1 p-1 xl:p-2 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] rounded-[10px] bg-[#F3F7FF] text-[#0073C6] text-base not-italic font-semibold leading-[normal] tracking-[0.32px]"
            // onClick={onDownload}
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
          </a>
          <SharePopup
            titleText="Share Floor Plan"
            title="Share"
            // url={imageUrlParser(url || "", "M")}
            className="text-[#0073C6] text-base not-italic font-semibold leading-[normal] tracking-[0.32px]"
          />
          <Close
            className="h-[28px] w-[28px] xl:h-[36px] xl:w-[36px]"
            close={reset}
          />
        </div>
      </div>
      <div className="flex w-[90%] h-[438px] justify-end items-center rounded border   pb-[21px] border-solid border-[#4D6677] m-auto">
        <Image
          src={ImgNotAvail}
          width={500}
          height={500}
          alt="image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-wrap  w-[90%] m-auto items-center gap:2  md:gap-5 shadow-[0px_4px_20px_0px_#F0F6FF] px-4 md:py-2.5 rounded-[10px] bg-[#F4FBFF] mt-3 mb-3">
        <div className="flex items-center space-x-3">
          {propertyDetailsSvgs.unitType}
          <p className="text-[#4D6677] text-nowrap  text-[12px] xl:text-[14px] font-[500]">
            Unit Type{" "}
            <span className="text-[#303A42] text-nowrap ml-[10px] text-[10px] xl:text-[14px] font-[600] ">
              {" "}
              {selectedOne?.unitType}
            </span>
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {propertyDetailsSvgs.superBuildUparea}
          <p className="text-[#4D6677] text-nowrap text-[12px] xl:text-[14px] font-[500]">
            Super Builtup Area{" "}
            <span className="text-[#303A42] text-nowrap ml-[10px] text-[10px] xl:text-[14px] font-[600] ">
              {" "}
              {selectedOne?.sba} sq.ft
            </span>
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {propertyDetailsSvgs.superBuildUparea}
          <p className="text-[#4D6677] text-nowrap text-[12px] xl:text-[14px] font-[500]">
            Price Range
            <span className="text-[#303A42] ml-[10px] text-nowrap text-[10px] xl:text-[14px] font-[600] ">
              {" "}
              {isData.priceRange}
            </span>
          </p>
        </div>
      </div>
      <CarouselModal />
    </Modal>
  );
}
