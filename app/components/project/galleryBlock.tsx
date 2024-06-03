"use client";
import { PopupOpenSvg, videoPlayIcon } from "@/app/images/commonSvgs";
import { Media } from "@/app/validations/types/project";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import Gallery from "./modals/Gallery";
import { getImageUrls } from "@/app/utils/image";
import { AspectRatio, Image, Overlay } from "@mantine/core";
import { useGallery } from "@/app/hooks/useGallery";
import PropertyHeading from "../property/heading";
import clsx from "clsx";

export default function GalleryBlock({
  walkThrowVideoUrl,
  projName,
  media,
  projectVideoIUrl,
  type = "proj",
}: Media) {
  const images = getImageUrls(media);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(images[0]);
  const videos = [walkThrowVideoUrl, projectVideoIUrl].filter(
    (video) => video !== "" && video !== undefined
  );
  const handleMediaClick = (media: string) => {
    setSelectedMedia(media);
  };
  const [, { open }] = useGallery();
  return (
    <div className="w-[90%] scroll-mt-[200px] mb-[5%]" id="galleria">
      {type === "prop" ? (
        <PropertyHeading
          title="GALLERIA"
          desc="Gallery Highlights : A Glimpse into good project"
        />
      ) : (
        <>
          <h1 className="text-[20px] lg:text-[32px] font-[600] text-[#001F35] uppercase mb-[12px]">
            gALLERIA of{" "}
            <span className="text-[#148B16] font-[700] uppercase">
              {projName}
            </span>{" "}
          </h1>

          <p className="text-[16px] text-[#4D6677] lg:text-2xl italic font-medium leading-[normal] capitalize">
            Gallery Highlights : A Glimpse into good project
          </p>
        </>
      )}

      <div className=" flex justify-center flex-col md:flex-row items-center-full mt-[1%] ">
        {/* IMage display con */}
        <div className="w-[100%] md:w-[50%] bg-white  h-[250px] overflow-hidden sm:h-[394px] lg:h-auto mb-[3%] md:mb-[0%] mr-[3%] rounded-[14px]   flex justify-center items-center">
          {selectedMedia && (
            <div
              className={clsx(
                "w-[100%]  bg-white  mb-[3%] md:mb-[0%] mr-[3%]   relative  rounded-[14px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] h-fit",
                selectedMedia.includes(".mp4") &&
                  "flex justify-center items-center"
              )}
            >
              {selectedMedia.includes(".mp4") ? (
                <ReactPlayer
                  url={selectedMedia}
                  width="auto"
                  height="550px"
                  controls
                />
              ) : (
                <Image
                  radius="md"
                  mah={550}
                  src={selectedMedia}
                  alt="Preview"
                  className="cursor-pointer object-contain"
                  onClick={() => {
                    open("image", selectedMedia);
                  }}
                  fit="contain"
                />
              )}
              <Gallery
                selectedMedia={selectedMedia}
                images={images}
                videos={videos}
                isImage={selectedMedia.includes(".mp4") ? false : true}
              />
            </div>
          )}
        </div>
        {/* all media display con */}
        <div className="w-[100%] md:w-[47%]">
          <h3 className="text-[#737579] font-[600] text-[20px] lg:text-[24px] mb-[2%] ">
            Photos
          </h3>
          <div className="flex justify-start items-start w-full gap-[4%] flex-wrap ">
            {images?.map((img, ind) => (
              <Image
                key={ind}
                width={150}
                fit="fill"
                height={100}
                src={img as string}
                alt={`Image ${ind + 1}`}
                className={clsx(
                  `w-[110px] lg:w-[152px] h-[68px] lg:h-[94px]   !rounded-[5px] shadow-md mb-[4%] cursor-pointer  md:min-w-[152px] object-cover `,
                  selectedMedia === img &&
                    "!border-2 !border-[#4d6677] !shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)]"
                )}
                onClick={() => handleMediaClick(img as string)}
              />
            ))}
          </div>
          {videos && videos.length > 0 && (
            <>
              <h3 className="text-[#737579] font-[600] text-[20px] lg:text-[24px] mb-[2%] ">
                Videos
              </h3>
              <div className="flex justify-start items-start w-full gap-[4%] flex-wrap ">
                {videos?.map((img, ind) => (
                  <div className="relative w-[110px] lg:w-[152px] flex justify-center items-center h-[68px] lg:max-h-[94px]  bg-white rounded-[5px]  mb-[4%] cursor-pointer">
                    <video
                      key={img}
                      src={img as string}
                      className={`!w-full rounded-[5px] cursor-pointer h-[94px] object-cover ${
                        selectedMedia === img
                          ? "border-2 border-[#4d6677] shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)]"
                          : ""
                      }`}
                      onClick={() => handleMediaClick(img as string)}
                    />
                    <span className="absolute top-[40%] left-[40%] pointer-events-none ">
                      {videoPlayIcon}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
