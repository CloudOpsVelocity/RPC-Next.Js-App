"use client";
import { Image } from "@mantine/core";
import React from "react";
import NextImage from "next/image";
type Props = { searchParams: { path: string } };
export default function Page({ searchParams: { path } }: Props) {
  const handleDownload = () => {
    const url = `${process.env.NEXT_PUBLIC_PROJECT_URL}/image?path=${path}`;
    const link = document.createElement("a");
    const file = new Blob([url], { type: "text/plain" });
    link.href = URL.createObjectURL(file);
    link.download = "grp.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  };
  const onButtonClick = () => {
    const pdfUrl = `${process.env.NEXT_PUBLIC_IMG_BASE}${path}`;
    const link = document.createElement("a");
    link.target = "_self";
    link.href = pdfUrl;
    link.download = "masterplan.jpg"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex justify-center items-center h-[100vh] ">
      <button
        className="inline-flex flex-col items-center justify-center gap-2.5 p-3 rounded-[10px] bg-[#0073C6] text-white text-lg not-italic font-bold leading-[normal] tracking-[0.96px] absolute top-[10%] right-[27%]"
        onClick={(e) => {
          e.preventDefault();
          onButtonClick();
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
