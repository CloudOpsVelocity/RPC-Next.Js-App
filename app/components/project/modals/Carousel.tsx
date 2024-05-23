import { Dispatch, SetStateAction, useState } from "react";
import { Button, Modal, rem } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import {
  PopupOpenSvg,
  ZoomInIcon,
  ZoomOutIcon,
  emptyFilesIcon,
} from "@/app/images/commonSvgs";
import { RightSection } from "./FloorPlan";
import S from "@/app/styles/ModalCarousel.module.css";
import { useAtom, useAtomValue } from "jotai";
import { floorPlansArray, selectedFloorAtom } from "@/app/store/floor";
import { Image } from "@mantine/core";
import { useSubFloorPlanPopup } from "@/app/hooks/useSubFloorplanPopup";
import { projectprops } from "@/app/data/projectDetails";
import SharePopup from "../../atoms/SharePopup";
import { imageUrlParser } from "@/app/utils/image";
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch";
import clsx from "clsx";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import { useSession } from "next-auth/react";

function CarouselModal({
  projName,
  propCgId,
}: {
  projName: string;
  propCgId: number;
}) {
  const [opened, { close }] = useSubFloorPlanPopup();
  const TRANSITION_DURATION = 200;
  const selectedFloor = useAtomValue(selectedFloorAtom);
  const [, { open: LoginOpen }] = usePopShortList();
  const { data: session } = useSession();
  const handleDownload = async () => {
    if (session) {
      try {
        const response = await fetch(selectedFloor?.floorPlanUrl);
        console.log(response);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "masterplan.jpg";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading image:", error);
      }
    } else {
      LoginOpen();
    }
  };
  return (
    <>
      <Modal
        opened={opened}
        size={"90%"}
        padding={0}
        transitionProps={{ duration: TRANSITION_DURATION }}
        onClose={close}
        classNames={{
          content: S.body,
          close: S.close,
          header: S.header,
        }}
      >
        <div className="w-full    h-[57px] flex items-center justify-between  z-[1000] px-8 absolute top-0 right-0 pt-2">
          <div className="text-[#333] text-2xl not-italic font-semibold leading-[normal]">
            Floor Plan
          </div>
          <div className="flex justify-center items-center gap-5">
            <button
              onClick={handleDownload}
              className="text-white flex justify-center items-center gap-1 p-2 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] rounded-[10px] bg-[#0073c6]"
            >
              Download Floor Plan
            </button>
            <SharePopup
              title="Share"
              titleText="Share Floor Plan"
              url={imageUrlParser(selectedFloor?.floorPlanUrl, "F")}
            />

            <Close close={close} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row p-[2%]  mb-10 justify-center items-center gap-[45px] shrink-0 mt-4">
          <MiddleSection projName={projName} propCgId={propCgId} />
          <RightSection propCgId={propCgId} />
        </div>
      </Modal>
    </>
  );
}

export default CarouselModal;

const MiddleSection = ({
  projName,
  propCgId,
}: {
  projName: string;
  propCgId: number;
}) => {
  const selectedFloor = useAtomValue(selectedFloorAtom);

  return (
    <div className="max-w-[1400px]">
      <p className="text-[#005DA0] w-full  mb-[1%] text-[16px] font-[500]  text-left">
        {/* Sarang by sumadhura/2bhk/tower 1/ 04/north/1124 sq.ft - 3 */}
        {projName}
        {propCgId != projectprops.plot &&
          selectedFloor?.bhkName &&
          " | " + selectedFloor?.bhkName}
        {propCgId == projectprops.apartment &&
          selectedFloor?.towerName &&
          selectedFloor?.towerName != "NA" &&
          " | Tower " + selectedFloor?.towerName}
        {propCgId != projectprops.plot &&
          " | Floor " +
            `${
              selectedFloor?.floor?.toString() === "0"
                ? "G"
                : selectedFloor?.floor
            }`}
        {selectedFloor?.unitNumber &&
          " | Unit No. " + selectedFloor?.unitNumber}
        {" | Facing " + selectedFloor?.facingName}
        {propCgId != projectprops.plot &&
          selectedFloor?.superBuildUparea &&
          " | Area. " + selectedFloor?.superBuildUparea + " sq.ft"}
        {propCgId == projectprops.plot &&
          selectedFloor?.plotArea &&
          " | Area. " + selectedFloor?.plotArea + " sq.ft"}
      </p>
      {selectedFloor?.floorPlanUrl ? (
        <div className="w-full flex justify-center items-center">
          <TransformWrapper>
            <ImageContainer
              url={`${selectedFloor?.floorPlanUrl}?v=${Math.random()}`}
            />
          </TransformWrapper>
        </div>
      ) : (
        <div>
          {emptyFilesIcon}
          <p>No Matching Results Found !</p>
        </div>
      )}
    </div>
  );
};

const ImageContainer = ({ url }: any) => {
  return (
    <div className="relative">
      <TransformComponent
        contentStyle={{
          width: "100%",
          display: "block",
          position: "relative",
        }}
      >
        <Image src={url} radius="md" h={600} w={1500} fit="contain" />
      </TransformComponent>
      {/* <Controls /> */}
    </div>
  );
};
export const Controls = ({ className }: { className?: string }) => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  const styles =
    "text-2xl flex justify-center items-center gap-2.5 px-[7px] py-1.5 rounded-2xl border-[0.8px] border-solid border-[#616D75] bg-[#eaeaea]";
  return (
    <div
      className={clsx(
        "flex justify-center items-center  absolute bottom-2 right-2 space-x-4",
        className
      )}
    >
      <button onClick={() => zoomIn()} className={styles}>
        <ZoomInIcon />
      </button>
      <button onClick={() => zoomOut()} className={styles}>
        <ZoomOutIcon />
      </button>
      <button onClick={() => resetTransform()} className={styles}>
        Reset
      </button>
    </div>
  );
};
const Close = ({ close }: { close: any }) => {
  return (
    <svg
      cursor={"pointer"}
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      onClick={close}
    >
      <rect width="36" height="36" rx="18" fill="#FF0000" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M26.6588 11.7662C26.7669 11.6703 26.8526 11.5563 26.9112 11.4309C26.9697 11.3055 26.9999 11.171 27 11.0353C27.0001 10.8995 26.9701 10.765 26.9117 10.6395C26.8534 10.514 26.7678 10.4 26.6598 10.3039C26.5519 10.2079 26.4237 10.1316 26.2826 10.0796C26.1415 10.0275 25.9903 10.0007 25.8375 10.0006C25.6847 10.0006 25.5335 10.0272 25.3923 10.0791C25.2511 10.131 25.1228 10.2071 25.0148 10.303L17.9999 16.5386L10.987 10.303C10.7687 10.109 10.4726 10 10.1639 10C9.85524 10 9.55919 10.109 9.34091 10.303C9.12263 10.4971 9 10.7602 9 11.0346C9 11.309 9.12263 11.5722 9.34091 11.7662L16.3558 18L9.34091 24.2338C9.23283 24.3299 9.14709 24.4439 9.0886 24.5694C9.03011 24.695 9 24.8295 9 24.9654C9 25.1012 9.03011 25.2358 9.0886 25.3613C9.14709 25.4868 9.23283 25.6009 9.34091 25.697C9.55919 25.891 9.85524 26 10.1639 26C10.3168 26 10.4681 25.9732 10.6093 25.9212C10.7506 25.8692 10.8789 25.793 10.987 25.697L17.9999 19.4614L25.0148 25.697C25.233 25.8908 25.529 25.9995 25.8375 25.9994C26.146 25.9992 26.4418 25.8901 26.6598 25.6961C26.8778 25.502 27.0002 25.239 27 24.9647C26.9998 24.6905 26.8771 24.4276 26.6588 24.2338L19.6439 18L26.6588 11.7662Z"
        fill="white"
      />
    </svg>
  );
};
