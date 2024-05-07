"use client";

import React from "react";
import MasterPlanPopup from "../modals/MasterPlan";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import { useSession } from "next-auth/react";

export default function MasterPlan({
  projName,
  media,
}: {
  projName: string;
  media: string;
}) {
  const [, { open: LoginOpen }] = usePopShortList();
  const { data: session } = useSession();
  const handleDownload = async () => {
    if (session) {
      try {
        const response = await fetch(media);
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
    <div className="w-[90%] mb-[5%] scroll-mt-[180px] " id="masterPlan">
      <div className="flex justify-between w-full items-cente mb-[32px] flex-wrap">
        <div>
          <h1 className="text-[20px] lg:text-[32px] font-[600] text-[#001F35] mb-[12px] uppercase">
            Master Plan Of{" "}
            <span className="text-[#148B16] font-[700] uppercase">
              {projName}
            </span>
          </h1>

          <p className="text-[#4D6677] text-[16px] sm:text-2xl italic font-medium leading-[normal] capitalize">
            Crafting Tomorrow's Landscapes, Today's Masterpiece: Your Vision,
            Our Expertise.
          </p>
        </div>
        <div className="h-full flex justify-center items-center ">
          <button
            className="inline-flex flex-col items-center justify-center gap-2.5 p-3 md:p-5 rounded-[10px] bg-[#0073C6] text-white md:text-2xl text-[16px] not-italic font-bold leading-[normal] tracking-[0.96px] max-h-[50%] mt-5 md:mt-0 h-[60px] uppercase"
            onClick={handleDownload}
          >
            Download Master Plan
          </button>
        </div>
      </div>
      <div className="relative">
        <MasterPlanPopup url={media} onDownload={handleDownload} />
      </div>
    </div>
  );
}
