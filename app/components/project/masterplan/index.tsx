"use client";

import React from "react";
import MasterPlanPopup from "../modals/MasterPlan";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import { useSession } from "next-auth/react";
import { downLoadIcon } from "@/app/images/commonSvgs";
import SubHeading from "../headings/SubHeading";
import Button from "@/app/elements/button";
import FullScreenMasterPlanModal from "../_ui/modals/MasterPlanModal";

export default function MasterPlan({
  projName,
  media,
}: {
  projName: string;
  media: string;
}) {
  const [, { open: LoginOpen }] = usePopShortList();
  const { data: session } = useSession();
  const downloadFn = async () => {
    try {
      const response = await fetch(media);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "masterplan.webp";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
  const handleDownload = async () => {
    if (session) {
      downloadFn();
    } else {
      LoginOpen(downloadFn,{
        type:'master-plan',
        link:media
      });
    }
  };
  return (
    <div
      className="w-[95%] sm:max-h-[678px] pb-[14px] xl:max-h-[689px] sm:w-[90%] md:mb-[3%] sm:mb-[5%] scroll-mt-[150px] sm:pt-[30px] "
      id="master-plan"
    >
      <div
        className="flex justify-between w-full items-cente mb-[8px] sm:mb-[32px] flex-wrap  scroll-mt-[170px]"
        id="view-master-plan"
      >
        <div>
          <h2 className="text-h2 sm:text-[22px] xl:text-[32px] font-[600] text-[#001F35] mb-[12px] capitalize break-words text-wrap sm:text-nowrap w-[85%]">
            Master Plan Of{" "}
            <span className="text-[#148B16] font-[700] ">{projName}</span>
          </h2>

          <SubHeading text="Crafting tomorrow's landscapes, today's masterpiece: your vision, our expertise." />
        </div>
        <div
          className="h-full flex justify-center items-center scroll-mt-[160px]"
          id="download-master-plan"
        >
          <Button
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="29"
                viewBox="0 0 28 29"
                fill="none"
                className="mr-2 w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]"
              >
                <path
                  d="M14 21L6.5 13.5L8.6 11.325L12.5 15.225V3H15.5V15.225L19.4 11.325L21.5 13.5L14 21ZM5 27C4.175 27 3.469 26.7065 2.882 26.1195C2.295 25.5325 2.001 24.826 2 24V19.5H5V24H23V19.5H26V24C26 24.825 25.7065 25.5315 25.1195 26.1195C24.5325 26.7075 23.826 27.001 23 27H5Z"
                  fill="white"
                />
              </svg>
            }
            title=" Download Master Plan"
            buttonClass=" text-[#FFF] text-[12px] sm:text-[18px] xl:text-[28px] font-[600] bg-[#0073C6]  rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[8px]  mt-3"
            onChange={handleDownload}
          />
          {/* <button
            className="  items-center justify-center gap-2.5 p-2 md:p-5 rounded-[10px] bg-[#0073C6] text-white md:text-2xl text-[12px] sm:text-[16px] not-italic font-bold leading-[normal] tracking-[0.96px] max-h-[50%] mt-5 md:mt-0 h-[60px]  inline-flex"
            onClick={handleDownload}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="29"
              viewBox="0 0 28 29"
              fill="none"
            >
              <path
                d="M14 21L6.5 13.5L8.6 11.325L12.5 15.225V3H15.5V15.225L19.4 11.325L21.5 13.5L14 21ZM5 27C4.175 27 3.469 26.7065 2.882 26.1195C2.295 25.5325 2.001 24.826 2 24V19.5H5V24H23V19.5H26V24C26 24.825 25.7065 25.5315 25.1195 26.1195C24.5325 26.7075 23.826 27.001 23 27H5Z"
                fill="white"
              />
            </svg>
            Download Master Plan
          </button> */}
        </div>
      </div>
      <div className="relative">
        <FullScreenMasterPlanModal imageUrl={media} title={`${projName}`} altText={`Master Plan of ${projName}`} />
        {/* <MasterPlanPopup
          url={media}
          onDownload={handleDownload}
          projName={projName}
        /> */}
      </div>
    </div>
  );
}
