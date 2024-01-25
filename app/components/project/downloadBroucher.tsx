"use client";
import { downLoadIcon, pdfFileIcon } from "@/app/images/commonSvgs";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

// import { downloadIcon } from '@/app/images/commonSvgs';

const DownloadBroucher = ({ url }: { url: string }) => {
  console.log(url);

  const { data: session } = useSession();

  const onButtonClick = () => {
    if (session) {
      const pdfUrl = url;
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "downloaded-file"; // specify the filename
      document.body.appendChild(link);
      //link.click();
      document.body.removeChild(link);
    } else {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } ml-auto w-full pointer-events-auto flex justify-end items-end ring-1 ring-transparent ring-opacity-5`}
        >
          <p className=" text-[#148B16] border-[#148B16] border-[1px] border-solid p-[8px] pr-[16px] pl-[16px] bg-white shadow-lg flex items-center rounded-lg gap-[10px] text-[20px] whitespace-nowrap font-[600] ">
            {pdfFileIcon} Brochure Downloaded Successfully!
          </p>
        </div>
      ));
    }
  };
  const handleDownload = () => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "brochure.pdf";
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error fetching or downloading the file:", error);
      });
  };

  return (
    url && (
      <div className="flex justify-start mt-[5%] items-center flex-wrap w-[90%] gap-[2%] ">
        <p className="text-[28px] lg:text-[32px] text-[#023993] font-[700]">
          Brochure{" "}
        </p>
        <a
          href={url}
          download={true}
          target="_blank"
          className="flex border-0 justify-center items-center text-[20px] lg:text-[24px] text-[#FFF] font-[700] rounded-[10px] bg-[#0073C6] gap-[8px] p-[5px]  "
        >
          {downLoadIcon}
          Download Brochure
        </a>
      </div>
    )
  );
};

export default DownloadBroucher;
