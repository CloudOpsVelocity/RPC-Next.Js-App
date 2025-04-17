"use client";
import SharePopup from "@/app/components/atoms/SharePopup";
import { galleryStateAtom } from "@/app/store/project/gallery";
import { useSetAtom } from "jotai";
import Image from "next/image";
import React from "react";

type Props = {
  images: string[];
  projName?: string;
  type: string;
  projectStatus?: any;
};

function FirstImagesBlock({ images, projName, type, projectStatus }: Props) {
  const dispatch = useSetAtom(galleryStateAtom);

  const getUrl = (urls: any, i: number) =>
    urls[i]?.includes("+") ? urls[i].replace(/\+/g, "%2B") : urls[i] || "";
  const getImage = (index: number, className: string) => {
    if (images[index]) {
      const urls = images[index].split(",");
      return (
        <picture>
          <source media="(max-width: 460px)" srcSet={getUrl(urls, 1)} />
          <source media="(max-width: 768px)" srcSet={getUrl(urls, 2)} />
          <source media="(min-width: 1200px)" srcSet={getUrl(urls, 3)} />
          <Image
            alt={projName || "Project Image"}
            title={projName || "Project Image"}
            src={getUrl(urls, 3)}
            height={195}
            width={900}
            className={className}
            unoptimized
            quality={80}
          />
        </picture>
      );
    } else {
      return "";
    }
  };

  const onSelect = () => {
    dispatch({
      type: "OPEN",
      payload: {
        items: images,
        mediaType: "image",
        title: type === "prop" ? "Property Gallery" : "Project Gallery",
        activeIndex: images.indexOf(images[0]),
      },
    });
  };

  return (
    <div
      className="flex h-[300px] md:h-[400px] lg:h-[430px] w-full cursor-pointer gap-[10px]"
      onClick={onSelect}
    >
      {/* Left side section */}
      <div className="relative h-[300px] h-[400px] lg:h-[430px] w-full lg:w-[60%] bg-gray-600 shadow-[0px_4px_11.1px_0px_rgba(25,80,71,0.46)_inset,0px_4px_12.9px_0px_rgba(140,177,141,0.38)] ">
        {/* Project status and shear button */}
        <div className="absolute m-[2%] z-10 right-[1px] sm:right-2">
          <p className="shadow-md rounded-[10px] bg-gradient-to-r p-[8px] from-[#EFF5FF] /0  to-[#F2FAFF]/100 text-[#000] text-[12px] sm:text-[16px] xl:text-xl not-italic font-medium leading-[normal]">
            {type === "proj" ? "Project" : "Listing"} Status:{" "}
            <span className="text-[#148B16] text-[12px] sm:text-[16px]   xl:text-xl not-italic font-bold leading-[normal]">
              {" "}
              {projectStatus}
            </span>{" "}
          </p>
          <div className={type === "proj" ? "" : `mt-4`}>
            <SharePopup
              title={type === "proj" ? "Share Project" : "Share Listing"}
              className="text-sm p-[4px] sm:text-xl hidden sm:flex"
            />
          </div>
        </div>

        {getImage(0, "h-full w-full")}
        <span className="block lg:hidden absolute bottom-0 right-0 mr-[20px] mb-[20px] p-[10px] bg-black/30 backdrop-blur-lg rounded-[50%] z-10 ">
          {imagesIcon}
        </span>
      </div>

      {/* Right side section */}
      <div className="hidden lg:flex flex-col h-[300px] md:h-[400px] lg:h-[430px] gap-[10px] w-[40%]">
        <div className="relative flex justify-center items-center w-full h-full max-h-[145px] md:max-h-[195px] lg:max-h-[210px] bg-gray-600 border shadow-[0px_4px_11.1px_0px_rgba(25,80,71,0.46)_inset,0px_4px_12.9px_0px_rgba(140,177,141,0.38)]">
          {getImage(1, "w-full h-full absolute top-0 left-0 ")}
        </div>
        <div className="group relative flex justify-center items-center w-full h-full max-h-[145px] md:max-h-[195px] lg:max-h-[210px] bg-gray-600 border shadow-[0px_4px_11.1px_0px_rgba(25,80,71,0.46)_inset,0px_4px_12.9px_0px_rgba(140,177,141,0.38)]  ">
          {getImage(2, "w-full h-full absolute top-0 left-0")}
          <div className=" w-full h-full absolute top-0 left-0 bg-black/30 flex justify-center items-center z-10 ">
            <p className="text-white text-[18px] font-semibold border-solid border-[1px] border-white rounded-[20px] px-[10px] group-hover:bg-white group-hover:text-black">
              {images.length > 2
                ? `View more ${images.length - 3}+`
                : "View Gallery"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstImagesBlock;

const imagesIcon = (
  <svg
    fill="#FFFFFF"
    width="30px"
    height="30px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18,15V5a3,3,0,0,0-3-3H5A3,3,0,0,0,2,5V15a3,3,0,0,0,3,3H15A3,3,0,0,0,18,15ZM4,5A1,1,0,0,1,5,4H15a1,1,0,0,1,1,1V9.36L14.92,8.27a2.56,2.56,0,0,0-1.81-.75h0a2.58,2.58,0,0,0-1.81.75l-.91.91-.81-.81a2.93,2.93,0,0,0-4.11,0L4,9.85Zm.12,10.45A.94.94,0,0,1,4,15V12.67L6.88,9.79a.91.91,0,0,1,1.29,0L9,10.6Zm8.6-5.76a.52.52,0,0,1,.39-.17h0a.52.52,0,0,1,.39.17L16,12.18V15a1,1,0,0,1-1,1H6.4ZM21,6a1,1,0,0,0-1,1V17a3,3,0,0,1-3,3H7a1,1,0,0,0,0,2H17a5,5,0,0,0,5-5V7A1,1,0,0,0,21,6Z" />
  </svg>
);
