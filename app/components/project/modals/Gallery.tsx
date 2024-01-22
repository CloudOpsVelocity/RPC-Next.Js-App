// Gallery.tsx
import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Image } from "@mantine/core";
import { PopupOpenSvg } from "@/app/images/commonSvgs";
import { Carousel } from "@mantine/carousel";
import S from "@/app/styles/ImgCarousel.module.css";

type GalleryProps = {
  selectedMedia: any;
  images: any[];
};

const Gallery: React.FC<GalleryProps> = ({ selectedMedia, images }) => {
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
        <Image
          radius="md"
          h={800}
          m={"auto"}
          w={1600}
          fit="fill"
          src={previewImage}
          className="cursor-pointer border-[5px] border-white"
        />
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
                    image === previewImage ? "border-[5px] border-white" : ""
                  }`}
                />
              </Carousel.Slide>
            ))}
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
