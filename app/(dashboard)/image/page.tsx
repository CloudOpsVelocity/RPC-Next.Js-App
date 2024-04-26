"use client";
import { Image } from "@mantine/core";
import React from "react";
import NextImage from "next/image";
type Props = { searchParams: { path: string } };
export default function Page({ searchParams: { path } }: Props) {
  // const handleDownload = () => {
  //   const url = `${process.env.NEXT_PUBLIC_PROJECT_URL}/image?path=${path}`;
  //   const link = document.createElement("a");
  //   const file = new Blob([url], { type: "text/plain" });
  //   link.href = URL.createObjectURL(file);
  //   link.download = "grp.txt";
  //   link.click();
  //   URL.revokeObjectURL(link.href);
  // };
  let isDownloading = false; // Flag to track whether a download is in progress

  const handleDownload = async () => {
    // If already downloading, return immediately
    if (isDownloading) {
      console.log("Download in progress, please wait.");
      return;
    }

    // Set downloading flag to true
    isDownloading = true;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IMG_BASE}${path}`
      );
      console.log(response);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "floor_plan.jpg"; // Set the filename with extension
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      // Clean up the URL object after download
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    } finally {
      // Reset downloading flag after completion
      isDownloading = false;
    }
  };
  // const onButtonClick = () => {
  //   const pdfUrl = `${process.env.NEXT_PUBLIC_IMG_BASE}${path}`;
  //   const link = document.createElement("a");
  //   link.target = "_self";
  //   link.href = pdfUrl;
  //   link.download = "masterplan.jpg"; // specify the filename
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };
  // const downloadFile = () => {
  //   const url = `${process.env.NEXT_PUBLIC_IMG_BASE}${path}`;
  //   console.log(url);
  //   return new Promise((resolve) => {
  //     const a = document.createElement("a");
  //     // const url = URL.createObjectURL(file);
  //     a.href = url;
  //     a.target = "_self";
  //     a.download = "masterplan.jpg";
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //     URL.revokeObjectURL(url);
  //     resolve("done");
  //   });
  // };
  return (
    <div className="flex justify-center items-center h-[100vh] ">
      <button
        className="inline-flex flex-col items-center justify-center gap-2.5 p-3 rounded-[10px] bg-[#0073C6] text-white text-lg not-italic font-bold leading-[normal] tracking-[0.96px] absolute top-[10%] right-[27%]"
        onClick={(e) => {
          e.preventDefault();
          handleDownload();
        }}
      >
        DownLoad Image
      </button>
      <Image
        radius="md"
        src={`${process.env.NEXT_PUBLIC_IMG_BASE}${path}`}
        height={650}
        width={700}
        w="auto"
        fit="contain"
        alt="post"
        component={NextImage}
      />
    </div>
  );
}
