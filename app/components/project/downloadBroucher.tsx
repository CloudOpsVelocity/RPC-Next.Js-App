"use client";
import { downLoadIcon } from "@/app/images/commonSvgs";
import React from "react";

const DownloadBroucher = ({ url }: { url: string }) => {
  const onButtonClick = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "Brochure.pdf"; // specify the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  return (
    <div className="flex justify-start mt-[5%] items-center flex-wrap w-[90%] gap-[2%] ">
      <p className="text-[28px] lg:text-[32px] text-[#023993] font-[700]">
        Brochure{" "}
      </p>
      <button
        onClick={() => onButtonClick()}
        className="flex border-0 justify-center items-center text-[20px] lg:text-[24px] text-[#FFF] font-[700] rounded-[10px] bg-[#0073C6] gap-[8px] p-[5px]  "
      >
        {downLoadIcon}
        Download Brochure
      </button>
    </div>
  );
};

export default DownloadBroucher;
