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
import SubHeading from "./headings/SubHeading";
import { useMediaQuery } from "@mantine/hooks";
import VideoJsonLdScript from "@/app/seo/VideoJson";

export default function GalleryBlock({
  walkThrowVideoUrl,
  projName,
  media,
  projectVideoIUrl,
  videoUrl,
  type = "proj",
}: Media) {
  const images = getImageUrls(media);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(images[0]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const videos = [walkThrowVideoUrl, projectVideoIUrl, media.videoUrl].filter(
    (video) => video !== "" && video !== undefined
  );

  function getYouTubeThumbnailUrl(watchUrl: any) {
    // Match both /watch?v= and /embed/ formats
    const match = watchUrl.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/
    );

    const videoId = match ? match[1] : null;

    return videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : null;
  }

  const isMobile = useMediaQuery(`(max-width: 750px)`);
  const [, { open }] = useGallery();
  const handleMediaClick = (media: string, index: number) => {
    if (isMobile) {
      const isVideo = videos.includes(media);
      open(isVideo ? "video" : "image", media);
    }
    setSelectedMedia(media);
    setCurrentSlide(index);
  };
  return (
    <div
      className="w-[95%] md:w-[90%] sm:pt-[50px]   scroll-mt-[165px] mt-[50px] sm:mt-0 mb-[3%] sm:mb-0"
      id="galleria"
    >
      {type === "prop" ? (
        <PropertyHeading
          title="Galleria"
          desc="Gallery Highlights : A Glimpse into good property"
        />
      ) : (
        <>
          <h2 className="text-h2 sm:text-[22px] xl:text-[32px] font-[600] text-[#001F35] mb-[12px] capitalize break-words text-wrap w-[78%]">
            Galleria of{" "}
            <span className="text-[#148B16] font-[700] ">{projName}</span>{" "}
          </h2>

          <SubHeading
            text="Gallery highlights : A glimpse into good project"
            className="mb-4 sm:mb-2"
          />
        </>
      )}
      <div className=" flex justify-center flex-col md:flex-row items-center-full sm:mt-[1%] ">
        {/* IMage display con */}
        <div className="w-[100%] md:w-[50%] bg-white  h-[220px] overflow-hidden sm:h-[394px] lg:h-auto  md:mb-[0%] mr-[3%] rounded-[14px]   flex justify-center items-center p-1">
          {selectedMedia && (
            <div
              className={clsx(
                "w-[100%]  sm:h-[100%] md:h-[100%] sm:max-h-[100%] flex justify-center items-center mb-[3%] md:mb-[0%] mr-[3%]   relative  rounded-[14px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] ",
                (selectedMedia.includes(".mp4") ||
                  selectedMedia.includes("youtube")) &&
                  "flex justify-center items-center"
              )}
            >
              {selectedMedia.includes(".mp4") ||
              selectedMedia.includes("youtube") ? (
                <ReactPlayer
                  url={selectedMedia}
                  width="100%"
                  height="462px"
                  controls
                  playing
                />
              ) : (
                <Image
                  radius="md"
                  // mah={550}
                  src={selectedMedia}
                  alt="Preview"
                  className="cursor-pointer object-contain sm:min-h-[220px] sm:max-h-[400px] xl:max-h-[450px]  "
                  onClick={() => {
                    open("image", selectedMedia);
                  }}
                  fit="contain"
                />
              )}
              <button
                onClick={() => open("image", selectedMedia)}
                className="absolute bottom-0.5 sm:bottom-3 right-1 xl:right-3 z-1 "
              >
                <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[33px] lg:h-[33px] " />
              </button>
              <Gallery
                selectedMedia={selectedMedia}
                images={images}
                videos={videos}
                isImage={
                  selectedMedia.includes(".mp4") ||
                  selectedMedia.includes("youtube")
                    ? false
                    : true
                }
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
              />
            </div>
          )}
        </div>
        {/* all media display con */}
        <div className="w-[100%] md:w-[47%] mt-3 sm:mt-0">
          <h3 className="text-[#737579] font-[600] text-[20px] lg:text-[24px] mb-1 sm:mb-[2%] ">
            Photos
          </h3>
          <div className="flex justify-start items-start w-full gap-[4%] flex-wrap ">
            {images?.map((img, ind) => (
              <Image
                key={Math.random()}
                width={150}
                fit="fill"
                height={100}
                src={img as string}
                alt={`${projName} ${AltText(img)}`}
                className={clsx(
                  `w-[110px] min-w-[90px] sm:min-w-[120px] xl:w-[152px] h-[68px] lg:h-[94px]   !rounded-[5px] shadow-md mb-[4%] cursor-pointer  xl:min-w-[152px] object-cover border border-gray-300 `,
                  selectedMedia?.split("?")[0] === img.split("?")[0] &&
                    "!border-2 !border-btnPrimary !shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)]"
                )}
                onClick={() => handleMediaClick(img as string, ind)}
              />
            ))}
          </div>
          {videos && videos.length > 0 && (
            <>
              <h3 className="text-[#737579] font-[600] text-[20px] sm:pt-4 lg:text-[24px]   mb-1 sm:mb-[2%] ">
                Videos
              </h3>
              <div className="flex justify-start items-start w-full gap-[4%] flex-wrap ">
                {videos?.map((img, ind) => (
                  <div
                    key={Math.random()}
                    className={`relative w-[110px] lg:w-[152px] flex justify-center items-center h-[68px] md:h-[94px]  bg-white rounded-[5px]  mb-[4%] cursor-pointer
                      ${
                        selectedMedia === img
                          ? "border-2 !border-btnPrimary shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)]"
                          : ""
                      }`}
                  >
                    <VideoJsonLdScript
                      contentUrl={img as string}
                      name={`${projName} ${VideoALText(img)}`}
                      description={`This video is about ${projName} ${VideoALText(
                        img
                      )}`}
                    />
                    {img.includes("youtube") ? (
                      <Image
                        width={150}
                        height={90}
                        src={getYouTubeThumbnailUrl(img) ?? ""}
                        className="!w-full rounded-[5px] cursor-pointer h-[64px] md:h-[90px] object-cover "
                        alt="thumbnail"
                        onClick={() => handleMediaClick(img as string, ind)}
                      />
                    ) : (
                      <video
                        key={img}
                        src={img as string}
                        className={`!w-full rounded-[5px] cursor-pointer h-[64px] md:h-[90px] object-cover`}
                        content=""
                        onClick={() => handleMediaClick(img as string, ind)}
                        controls
                      >
                        <track
                          src="path_to_your_captions_file.vtt" // Replace with the actual path to your captions file
                          kind="captions"
                          srcLang="en"
                          label="English"
                          default
                        />
                      </video>
                    )}
                    {/*   <video
                      key={img}
                      src={img as string}
                      className={`!w-full rounded-[5px] cursor-pointer  h-[64px] md:h-[90px] object-cover }`}
                      content=""
                      onClick={() => handleMediaClick(img as string, ind)}
                    /> */}
                    <span className="absolute pointer-events-none ">
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

const AltText = (url: string) => {
  if (url.includes("cover")) {
    return "Cover Image";
  } else if (url.includes("projectPlanUrl")) {
    return "Master Plan";
  } else {
    return `Image ${url.split("?")[0].split("/").pop()?.split(".")[0]}`;
  }
};

const VideoALText = (url: string) => {
  if (url.includes("walk-Through-video")) {
    return "Walk Through Video";
  } else {
    return `Project Video`;
  }
};
