// Gallery.tsx
import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Image } from "@mantine/core";
import { PopupOpenSvg, videoPlayIcon } from "@/app/images/commonSvgs";
import { Carousel } from "@mantine/carousel";
import S from "@/app/styles/ImgCarousel.module.css";
import ReactPlayer from "react-player";
import { useGallery } from "@/app/hooks/useGallery";
import SharePopup from "../../atoms/SharePopup";
import { imageUrlParser } from "@/app/utils/image";

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
          inner: S.inner,
        }}
        className="!styleScroll"
      >
        <div className="h-auto scrollbar-hide">
          <div className="w-full bg-transparent    h-[57px] flex items-center justify-between  z-[1000] px-10 max-w-[91rem] m-auto">
            <div className="text-white text-2xl not-italic font-bold leading-[normal]">
              {isImage ? "Gallery" : "Videos"}
            </div>
            <div className="flex justify-center items-center gap-5">
              <SharePopup
                title="Share"
                url={imageUrlParser(content?.url || "")}
              />

              <Close close={close} />
            </div>
          </div>
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
              // pl={"90px"}
              align="center"
              // mx={"auto"}
              slidesToScroll={5}
              className="w-full min-w-[80px] !h-auto max-h-[100px] min-h-[50px]"
              withControls={Image.length > 6 ? true : false}
            >
              {isImage ? (
                <div className="flex items-center w-full justify-center">
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
const Close = ({ close }: { close: any }) => {
  return (
    <svg
      cursor={"pointer"}
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      onClick={close}
    >
      <rect width="36" height="36" rx="18" fill="#FF0000" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M26.6588 11.7662C26.7669 11.6703 26.8526 11.5563 26.9112 11.4309C26.9697 11.3055 26.9999 11.171 27 11.0353C27.0001 10.8995 26.9701 10.765 26.9117 10.6395C26.8534 10.514 26.7678 10.4 26.6598 10.3039C26.5519 10.2079 26.4237 10.1316 26.2826 10.0796C26.1415 10.0275 25.9903 10.0007 25.8375 10.0006C25.6847 10.0006 25.5335 10.0272 25.3923 10.0791C25.2511 10.131 25.1228 10.2071 25.0148 10.303L17.9999 16.5386L10.987 10.303C10.7687 10.109 10.4726 10 10.1639 10C9.85524 10 9.55919 10.109 9.34091 10.303C9.12263 10.4971 9 10.7602 9 11.0346C9 11.309 9.12263 11.5722 9.34091 11.7662L16.3558 18L9.34091 24.2338C9.23283 24.3299 9.14709 24.4439 9.0886 24.5694C9.03011 24.695 9 24.8295 9 24.9654C9 25.1012 9.03011 25.2358 9.0886 25.3613C9.14709 25.4868 9.23283 25.6009 9.34091 25.697C9.55919 25.891 9.85524 26 10.1639 26C10.3168 26 10.4681 25.9732 10.6093 25.9212C10.7506 25.8692 10.8789 25.793 10.987 25.697L17.9999 19.4614L25.0148 25.697C25.233 25.8908 25.529 25.9995 25.8375 25.9994C26.146 25.9992 26.4418 25.8901 26.6598 25.6961C26.8778 25.502 27.0002 25.239 27 24.9647C26.9998 24.6905 26.8771 24.4276 26.6588 24.2338L19.6439 18L26.6588 11.7662Z"
        fill="white"
      />
    </svg>
  );
};
