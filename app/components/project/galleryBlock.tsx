"use client";
import { PopupOpenSvg, videoPlayIcon } from "@/app/images/commonSvgs";
import { Media } from "@/app/validations/types/project";
import Image from "next/image";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import Gallery from "./modals/Gallery";
// import ReactVideoThumbnail from "react-video-thumbnail";

export default function GalleryBlock({
  coverImageUrl,
  projectPlanUrl,
  projReviewVideoUrl,
  projWalkThroughVideoUrl,
  otherImgUrl,
  walkThrowVideoUrl,
}: Media) {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(
    projectPlanUrl
  );

  const images = [coverImageUrl, projectPlanUrl];

  const videos = [walkThrowVideoUrl];

  const handleMediaClick = (media: string) => {
    setSelectedMedia(media);
  };

  return (
    <div className="w-[90%] mb-[5%] h-full " id="galleria">
      <h1 className="text-[24px] lg:text-[32px] font-[600] text-[#001F35] uppercase">
        gALLERIA of{" "}
        <span className="text-[#148B16] font-[700] uppercase">sarang</span>{" "}
      </h1>

      <p className="text-[20px] lg:text-[24px] font-[500] text-[#4D6677]">
        Gallery Highlights : A Glimpse into good project
      </p>

      <div className=" flex justify-center flex-col md:flex-row items-center-full mt-[1%] ">
        {/* IMage display con */}
        <div className="w-[100%] md:w-[50%] bg-[#dfdcdc] h-[394px] lg:h-[462px] mb-[3%] md:mb-[0%] mr-[3%] rounded-[14px] shadow-md  ">
          {selectedMedia && (
            <div className="w-[100%]  bg-[#dfdcdc] h-[394px] lg:h-[462px] mb-[3%] md:mb-[0%] mr-[3%] rounded-[14px] shadow-md relative">
              {/* You can customize the preview based on the selectedMedia type (image or video) */}
              {selectedMedia.includes(".mp4") ? (
                <ReactPlayer
                  url={selectedMedia}
                  width="100%"
                  height="100%"
                  controls
                />
              ) : (
                <Image
                  width={680}
                  height={460}
                  src={selectedMedia}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-[14px]"
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
              <div className="relative w-[110px] lg:w-[152px] h-[68px] lg:h-[94px] bg-[#dfdcdc] rounded-[5px] shadow-md mb-[4%] cursor-pointer">
                <ReactPlayer
                  key={ind}
                  // width={150}
                  // height={100}
                  url={img as string}
                  alt={`Image ${ind + 1}`}
                  className="!w-[110px] !lg:w-[152px] !h-[68px] !lg:h-[94px] bg-[#dfdcdc] rounded-[5px] shadow-md mb-[4%] cursor-pointer"
                  onClick={() => handleMediaClick(img as string)}
                />
                <span className="absolute top-[40px] left-[60px] pointer-events-none ">
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
