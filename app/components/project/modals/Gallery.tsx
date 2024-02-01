// Gallery.tsx
import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Image } from "@mantine/core";
import { PopupOpenSvg, videoPlayIcon } from "@/app/images/commonSvgs";
import { Carousel } from "@mantine/carousel";
import S from "@/app/styles/ImgCarousel.module.css";
import ReactPlayer from "react-player";
import { useGallery } from "@/app/hooks/useGallery";

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

  return (
    <>
      <Modal
        centered
        opened={content ? true : false}
        onClose={() => {
          setPreviewImage(null);
          close();
        }}
        size={"100%"}
        classNames={{
          close: S.close,
          content: S.content,
          header: S.header,
          overlay: S.overlay,
        }}
      >
        <div className="h-[80vh] ">
          {isImage ? (
            <Image
              radius="md"
              h={800}
              m={"auto"}
              w={1400}
              fit="fill"
              src={previewImage ?? content?.url}
              className="cursor-pointer border-[5px] bg-white border-white"
            />
          ) : (
            <ReactPlayer
              url={previewImage as string}
              width="100%"
              controls
              height="80vh"
              // class="!h-[80%]"
            />
          )}
          <div className="mt-4 flex items-center justify-center ">
            <Carousel
              height={100}
              slideSize="15.333333%"
              slideGap="xs"
              loop
              mt={"lg"}
              maw={1200}
              pl={"90px"}
              align="center"
              mx={"auto"}
              slidesToScroll={5}
              className="w-full min-w-[80px] !h-auto max-h-[100px] min-h-[50px]"
              withControls={Image.length > 6 ? true : false}
            >
              {isImage ? (
                <div className="flex items-center w-full">
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
                        className={`cursor-pointer w-full min-w-[80px] !h-auto max-h-[100px] min-h-[50px]  ${
                          image === previewImage
                            ? "border-[5px] border-white"
                            : ""
                        }`}
                      />
                    </Carousel.Slide>
                  ))}
                </div>
              ) : (
                <div className="flex items-center w-full">
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
                          className={`cursor-pointer w-full min-w-[80px] !h-auto max-h-[100px] min-h-[50px]  ${
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

      <button onClick={() => handleImageClick(selectedMedia)}>
        <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[33px] lg:h-[33px] absolute bottom-10 right-3 z-50 " />
      </button>
    </>
  );
};

export default Gallery;
