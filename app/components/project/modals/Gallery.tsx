// Gallery.tsx
import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Image } from "@mantine/core";
import { PopupOpenSvg, videoPlayIcon } from "@/app/images/commonSvgs";
import { Carousel } from "@mantine/carousel";
import S from "@/app/styles/ImgCarousel.module.css";
import ReactPlayer from "react-player";

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
  const [opened, { open, close }] = useDisclosure(false);
  const [previewImage, setPreviewImage] = useState<string | null>(
    selectedMedia
  );

  const handleImageClick = (image: string) => {
    setPreviewImage(image);
    open();
  };
  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={() => {
          setPreviewImage(null);
          close();
        }}
        size={"80%"}
        classNames={{
          close: S.close,
          content: S.content,
          header: S.header,
        }}
      >
        {isImage ? (
          <Image
            radius="md"
            h={800}
            m={"auto"}
            w={1600}
            fit="fill"
            src={previewImage}
            className="cursor-pointer border-[5px] border-white"
          />
        ) : (
          <ReactPlayer
            url={previewImage as string}
            width="100%"
            height="100%"
            controls
          />
        )}
        <div className="mt-4">
          <Carousel
            height={100}
            slideSize="15.333333%"
            slideGap="xs"
            loop
            mt={"lg"}
            maw={1200}
            pl={"90px"}
            align="start"
            mx={"auto"}
            slidesToScroll={5}
          >
            {isImage ? (
              <React.Fragment>
                {images.map((image, index) => (
                  <Carousel.Slide
                    key={index}
                    onClick={() => handleImageClick(image)}
                  >
                    <Image
                      radius="md"
                      h={100}
                      w="auto"
                      fit="contain"
                      src={image}
                      className={`cursor-pointer ${
                        image === previewImage
                          ? "border-[5px] border-white"
                          : ""
                      }`}
                    />
                  </Carousel.Slide>
                ))}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {videos.map((video, index) => (
                  <Carousel.Slide
                    key={index}
                    onClick={() => handleImageClick(video)}
                  >
                    <div className="relative">
                      <ReactPlayer
                        key={index}
                        width={150}
                        height={100}
                        url={video as string}
                        alt={`Image ${index + 1}`}
                        className={`w-[110px] lg:w-[152px] h-[68px] lg:h-[94px] rounded-[5px] shadow-md mb-[4%] cursor-pointer`}
                      />
                      <span className="absolute top-[40px] left-[60px] pointer-events-none ">
                    {videoPlayIcon}
                  </span>
                </div>
                    
                  </Carousel.Slide>
                ))}
              </React.Fragment>
            )}
          </Carousel>
        </div>
      </Modal>

      <button onClick={() => handleImageClick(selectedMedia)}>
        <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[33px] lg:h-[33px] absolute bottom-3 right-3 z-50 " />
      </button>
    </>
  );
};

export default Gallery;
