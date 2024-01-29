"use client";
import { PopupOpenSvg, videoPlayIcon } from "@/app/images/commonSvgs";
import { Media } from "@/app/validations/types/project";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import Gallery from "./modals/Gallery";
import { getImageUrls } from "@/app/utils/image";
import { Image } from "@mantine/core";
// import ReactVideoThumbnail from "react-video-thumbnail";

export default function GalleryBlock({
  coverImageUrl,
  projectPlanUrl,
  projReviewVideoUrl,
  projWalkThroughVideoUrl,
  otherImgUrl,
  walkThrowVideoUrl,
  projName,
  media,
}: Media) {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(
    projectPlanUrl
  );

  const images = getImageUrls(media);

  const videos = [walkThrowVideoUrl];

  const handleMediaClick = (media: string) => {
    setSelectedMedia(media);
  };

  return (
    <div className="w-[90%] mb-[10%]  " id="galleria">
      <h1 className="text-[24px] lg:text-[32px] font-[600] text-[#001F35] uppercase">
        gALLERIA of{" "}
        <span className="text-[#148B16] font-[700] uppercase">{projName}</span>{" "}
      </h1>

      <p className="text-[20px] text-[#4D6677] lg:text-2xl italic font-medium leading-[normal] capitalize">
        Gallery Highlights : A Glimpse into good project
      </p>

      <div className=" flex justify-center flex-col md:flex-row items-center-full mt-[1%] ">
        {/* IMage display con */}
        <div className="w-[100%] md:w-[50%] bg-white h-[394px] lg:h-[462px] mb-[3%] md:mb-[0%] mr-[3%] rounded-[14px]  ">
          {selectedMedia && (
            <div className="w-[100%]  bg-white  mb-[3%] md:mb-[0%] mr-[3%] rounded-[14px]  relative">
              {selectedMedia.includes(".mp4") ? (
                <ReactPlayer
                  url={selectedMedia}
                  width="100%"
                  height="100%"
                  controls
                />
              ) : (
                <Image
                  radius="md"
                  h={550}
                  // fit="contain"
                  src={selectedMedia}
                  alt="Preview"
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
                height={100}
                src={img as string}
                alt={`Image ${ind + 1}`}
                className="w-[110px] lg:w-[152px] h-[68px] lg:h-[94px] bg-[#dfdcdc] rounded-[5px] shadow-md mb-[4%] cursor-pointer"
                onClick={() => handleMediaClick(img as string)}
              />
            ))}
          </div>

          <h3 className="text-[#737579] font-[600] text-[20px] lg:text-[24px] mb-[2%] ">
            Videos
          </h3>
          <div className="flex justify-start items-start w-full gap-[4%] flex-wrap ">
            {videos?.map((img, ind) => (
              <div className="relative w-[110px] lg:w-[152px] flex justify-center items-center h-[68px] lg:h-[94px] bg-white rounded-[5px]  mb-[4%] cursor-pointer">
                <video
                  key={ind}
                  // width={150}
                  // height={100}
                  src={img as string}
                  //alt={`Image ${ind + 1}`}
                  className="!w-full rounded-[5px] cursor-pointer"
                  onClick={() => handleMediaClick(img as string)}
                />
                <span className="absolute top-[40%] left-[40%] pointer-events-none ">
                  {videoPlayIcon}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
