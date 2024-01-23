"use client";
import React from "react";

// import { downloadIcon } from '@/app/images/commonSvgs';

const DownloadBroucher = ({ url }: { url: string }) => {
  const onButtonClick = () => {
    const pdfUrl = "Sample.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = url; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        {/* {downloadIcon} */}
        Download Brochure
      </button>
    </div>
  );
};

export default DownloadBroucher;
