"use client";
import { PopupOpenSvg } from "@/app/images/commonSvgs";
import { imageUrlParser } from "@/app/utils/image";

import React from "react";
import MasterPlanPopup from "../modals/MasterPlan";
import Gallery from "../modals/Gallery";

export default function MasterPlan({
  projName,
  media,
}: {
  projName: string;
  media: string;
}) {
  const handleDownload = () => {
    const url = imageUrlParser(media);
    const link = document.createElement("a");

    const file = new Blob([url], { type: "text/plain" });

    link.href = URL.createObjectURL(file);

    link.download = "grp.txt";

    link.click();
    URL.revokeObjectURL(link.href);
  };
  // const handleDownload = async () => {
  //   try {
  //     const response = await fetch(media);
  //     const blob = await response.blob();
  //     const url = URL.createObjectURL(blob);
  //     const downloadLink = document.createElement("a");
  //     downloadLink.href = url;
  //     downloadLink.download = "floor_plan.jpg"; // Set the filename with extension
  //     document.body.appendChild(downloadLink);
  //     downloadLink.click();
  //     document.body.removeChild(downloadLink);
  //     // Clean up the URL object after download
  //     URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Error downloading image:", error);
  //   }
  // };
  return (
    <div className="w-[90%] mb-[5%] scroll-mt-[180px] " id="masterPlan">
      <div className="flex justify-between w-full items-cente mb-[32px] flex-wrap">
        <div>
          <h1 className="text-[24px] lg:text-[32px] font-[600] text-[#001F35] mb-[12px]">
            Master Plan Of{" "}
            <span className="text-[#148B16] font-[700] uppercase">
              {projName}
            </span>
          </h1>

          <p className="text-[#4D6677] text-2xl italic font-medium leading-[normal] capitalize">
            Crafting Tomorrow's Landscapes, Today's Masterpiece: Your Vision,
            Our Expertise.
          </p>
        </div>
        <button
          className="inline-flex flex-col items-center justify-center gap-2.5  p-5 rounded-[10px] bg-[#0073C6] text-white text-2xl not-italic font-bold leading-[normal] tracking-[0.96px] max-h-[50%] mt-5 md:mt-0"
          onClick={handleDownload}
        >
          DownLoad MasterPlan
        </button>
      </div>
      <div className="relative">
        <MasterPlanPopup url={media} />
      </div>
    </div>
  );
}
