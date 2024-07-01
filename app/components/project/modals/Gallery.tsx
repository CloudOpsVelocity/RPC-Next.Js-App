// Gallery.tsx
import React, { useState } from "react";
import { Modal, Image } from "@mantine/core";
import {
  ImgCarouselIcon,
  PopupOpenSvg,
  PrevCarouselIcon,
  videoPlayIcon,
} from "@/app/images/commonSvgs";
import { Carousel } from "@mantine/carousel";
import S from "@/app/styles/ImgCarousel.module.css";
import ReactPlayer from "react-player";
import { useGallery } from "@/app/hooks/useGallery";
import SharePopup from "../../atoms/SharePopup";
import { imageUrlParser } from "@/app/utils/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import clsx from "clsx";
import styles from "./Gallery.module.css";
import { useMediaQuery } from "@mantine/hooks";
import Close from "../button/close";
import ZoomInOut from "../actions/ZoomInOut";
type GalleryProps = {
  selectedMedia: any;
  images: any[];
  videos: any[];
  isImage: boolean;
};

const Gallery: React.FC<GalleryProps> = ({
  selectedMedia,
  images,
  videos,
  isImage,
}) => {
  const [content, { open, close }] = useGallery();
  const [previewImage, setPreviewImage] = useState<string | null>(
    selectedMedia
  );

  const handleImageClick = (image: string) => {
    setPreviewImage(image);
    open(isImage ? "image" : "video", image);
  };
  const isMobile = useMediaQuery(`(max-width: 601px`);

  return (
    <>
      <Modal
        centered={isMobile ? (isImage ? true : false) : false}
        opened={content ? true : false}
        onClose={() => {
          setPreviewImage(null);
          close();
        }}
        size="auto"
        classNames={{
          close: S.close,
          content: S.content,
          header: S.header,
          overlay: S.overlay,
          inner: S.inner,
        }}
        className="!styleScroll"
      >
        <div className="h-auto  scrollbar-hide flex justify-end flex-col items-center">
          <div
            className={`w-full bg-transparent    h-[57px] flex items-center justify-between mt-[26px]  z-[1000] px-0.5  m-auto ${
              !isImage && isMobile ? "mt-50%" : "mt-[10%]"
            }`}
          >
            <div className="text-white text-2xl not-italic  font-bold leading-[normal]">
              {isImage ? "Gallery" : "Videos"}
            </div>
            <div className="flex justify-center items-center gap-5">
              <SharePopup
                title="Share"
                url={imageUrlParser(content?.url || "")}
              />

              <Close
                className="h-[29px] w-[29px] xl:w-[34px] xl:h-full"
                close={close}
              />
            </div>
          </div>
          {isImage ? (
            <Carousel withIndicators withControls={false} slideSize="100%">
              {images.map((image, index) => (
                <Carousel.Slide className="!relative !flex !justify-center !items-center">
                  <TransformWrapper wheel={{ disabled: false }} disabled>
                    <Content url={image} />
                  </TransformWrapper>
                  {/* <TransformWrapper wheel={{ disabled: false }} disabled>
                    <TransformComponent>
                      <Image
                        radius="md"
                        h={isMobile ? "auto" : 600}
                        m={"auto"}
                        w={1400}
                        fit="contain"
                        // src={previewImage ?? content?.url}
                        src={image}
                        className="cursor-pointer sm:border-[5px] sm:bg-white sm:border-white w-[100%] sm:!h-[350px]  md:min-w-[1400px] md:min-h-[600px]"
                      />
                    </TransformComponent>
                  </TransformWrapper> */}
                </Carousel.Slide>
              ))}
            </Carousel>
          ) : (
            <ReactPlayer
              url={previewImage as string}
              width="auto"
              controls
              height={isMobile ? "50vh" : "68vh"}
            />
          )}
          <div className="mt-4 flex items-center justify-center  w-full">
            <Carousel
              classNames={styles}
              height={100}
              slideSize="15.333333%"
              slideGap="xs"
              loop
              mt={"lg"}
              maw={isMobile ? 300 : 1200}
              px={isMobile ? "50px" : "90px"}
              align={images.length > 5 ? "start" : "center"}
              slidesToScroll={isMobile ? 1 : 5}
              className="w-full min-w-[80px] !h-auto max-h-[100px] min-h-[50px]"
              withControls={
                (content?.type == "image" ? images.length : videos.length) >
                (isMobile ? 0 : 5)
                  ? true
                  : false
              }
              nextControlIcon={<ImgCarouselIcon />}
              previousControlIcon={<PrevCarouselIcon />}
            >
              {isImage ? (
                images.map((image, index) => {
                  return (
                    <Carousel.Slide
                      key={index}
                      onClick={() => handleImageClick(image)}
                    >
                      <Image
                        radius="md"
                        h={100}
                        w="auto"
                        fit="cover"
                        src={image}
                        className={clsx(
                          `cursor-pointer w-full min-w-[150px] max-w-[150px] !h-auto max-h-[100px] min-h-[100px] object-cover bg-white`,
                          image.split("?")[0] ===
                            (previewImage?.split("?")[0] ||
                              content?.url?.split("?")[0]) &&
                            "!border-[5px] !border-white"
                        )}
                      />
                    </Carousel.Slide>
                  );
                })
              ) : (
                <div className="flex items-center w-full justify-center">
                  {videos.map((video, index) => (
                    <Carousel.Slide
                      key={index}
                      onClick={() => handleImageClick(video)}
                    >
                      <div className="relative">
                        <video
                          key={index}
                          width={150}
                          height={100}
                          src={video as string}
                          //alt={`Image ${index + 1}`}
                          className={`cursor-pointer w-full min-w-[80px] !h-auto max-h-[100px] min-h-[50px] object-cover  ${
                            video === previewImage
                              ? "border-[5px] border-white"
                              : ""
                          }`}
                        />
                        <span className="absolute top-[25%] md:top-[40%] left-[30%] md:left-[40%] h-[18px] w-[18px] md:h-[26px] md:w-[26px] pointer-events-none ">
                          {videoPlayIcon}
                        </span>
                      </div>
                    </Carousel.Slide>
                  ))}
                </div>
              )}
            </Carousel>
          </div>
        </div>
      </Modal>

      <button
        onClick={() => handleImageClick(selectedMedia)}
        className="absolute bottom-0.5 sm:bottom-3 right-1 xl:right-3 z-50 "
      >
        <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[33px] lg:h-[33px] " />
      </button>
    </>
  );
};

export default Gallery;

const Content = ({ url }: { url: string }) => {
  const isMobile = useMediaQuery("(max-width: 601px)");
  return (
    <div className="relative">
      <TransformComponent>
        <Image
          radius="md"
          h={isMobile ? "auto" : 600}
          m={"auto"}
          w={1400}
          fit="contain"
          // src={previewImage ?? content?.url}
          src={url}
          className="cursor-pointer sm:border-[5px] sm:bg-white sm:border-white w-[100%] sm:!h-[350px]  md:min-w-[1400px] md:min-h-[600px]"
        />
      </TransformComponent>
      <ZoomInOut className="right-2 bottom-4 xl:right-28 " />
    </div>
  );
};
