"use client";
import { PopupOpenSvg } from "@/app/images/commonSvgs";
import { Media } from "@/app/validations/types/project";
import Image from "next/image";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import Gallery from "./modals/Gallery";

export default function GalleryBlock({
  coverUrl,
  projMasterPlanUrl,
  projOtherImagesUrl,
  projReviewVideoUrl,
  projWalkThroughVideoUrl,
}: Media) {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(
    projMasterPlanUrl
  );

  // const images = [coverUrl, projMasterPlanUrl, projOtherImagesUrl];
  const images = [
    "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1703702756941-3504879af434?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1683009680116-b5c04463551d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1683009680116-b5c04463551d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1683009680116-b5c04463551d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1683009680116-b5c04463551d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8",
  ];
  // const videos = [projReviewVideoUrl, projWalkThroughVideoUrl];
  const videos =['https://getrightproperty-test-bucket.s3.ap-south-1.amazonaws.com/images/varify/project/252/walk-Through-video/video.mp4','https://getrightproperty-test-bucket.s3.ap-south-1.amazonaws.com/images/varify/project/252/walk-Through-video/video.mp4?v=0.458334283308651']

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
              <Gallery selectedMedia={selectedMedia} images={images} videos={videos} isImage={selectedMedia.includes(".mp4") ? false : true} />
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
              <div
                key={ind}
                className="w-[110px] lg:w-[152px] h-[68px] lg:h-[94px] bg-[#dfdcdc] rounded-[5px] shadow-md mb-[4%] cursor-pointer"
              >
                <Image
                  width={150}
                  height={100}
                  src={img as string}
                  alt={`Image ${ind + 1}`}
                  className="w-full h-full object-cover rounded-[5px]"
                  onClick={() => handleMediaClick(img as string)}
                />
              </div>
            ))}
          </div>

          <h3 className="text-[#737579] font-[600] text-[20px] lg:text-[24px] mb-[2%] ">
            Videos
          </h3>
          <div className="flex justify-start items-start w-full gap-[4%] flex-wrap ">
            {videos?.map((img, ind) => (
              <div
                key={ind}
                className="w-[110px] lg:w-[152px] h-[68px] lg:h-[94px] bg-[#dfdcdc] rounded-[5px] shadow-md mb-[4%]"
              >
                <Image
                  width={150}
                  height={100}
                  src={
                    "https://imagesrpc.s3.ap-south-1.amazonaws.com/images/varify/project/197/other/0.jpg"
                  }
                  alt={`Image ${ind + 1}`}
                  className="w-full h-full object-cover rounded-[5px]"
                  onClick={() => handleMediaClick(img as string)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
