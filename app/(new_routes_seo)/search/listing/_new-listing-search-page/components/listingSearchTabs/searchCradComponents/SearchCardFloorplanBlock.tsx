"use client";

import React from "react";
import Image from "next/image";
type Props = { data: any, type:string };
export default function SearchCardFloorplanBlock({data, type}: Props) {
  let floorplanUrl = data.floorPlan.split(",")[1]
  const types:any = {
    M: "Master Plan",
    F: "Floor Plan",
    _image: {
      M: "master_plan",
      F: "floor_plan",
    },
  };

  let isDownloading = false;
  const handleDownload = async () => {
    if (isDownloading) {
      console.log("Download in progress, please wait.");
      return;
    }

    isDownloading = true;

    try {
        const response = await fetch(floorplanUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch image. Status: ${response.status}`);
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const downloadLink = document.createElement("a");
        downloadLink.href = url;

        // Handle file name and extension
        const filename = `${types?._image?.[type] || "image"}.webp`;
        downloadLink.download = filename;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error downloading image:", error);
    } finally {
        isDownloading = false;
    }

  };
  return (
    <div className=" flex flex-col justify-center items-center gap-2">
        <button
            className="flex flex-col items-center justify-center gap-2.5 md:p-2 xl:p-3 rounded-[10px] bg-[#0073C6] text-white text-[14px] md:text-[16px] md:text-lg not-italic font-bold leading-[normal] tracking-[0.96px] absolute top-[60px] right-[20px]  "
            onClick={(e) => {
            e.preventDefault();
                handleDownload();
            }}
        >
            Download {(types[type] as string) || "Image"}
        </button>

        <Image
            src={floorplanUrl}
            height={650}
            width={700}
            alt="post"
            className="h-full pt-[30px] md:pt-[52px]"
        />
    </div>
  );
}
