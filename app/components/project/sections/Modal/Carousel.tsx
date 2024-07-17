import {
  DarkCarouseIcon,
  DarkNextCarouselButton,
} from "@/app/images/commonSvgs";
import React from "react";
import { Carousel } from "@mantine/carousel";
import Style from "./Carouse.module.css";
import { useAtom } from "jotai";
import { selectedPartialUnitAtom } from "@/app/store/partialsUnits";
import Image from "next/image";
import { ImgNotAvail } from "@/app/data/project";
import clsx from "clsx";
export default function CarouselModal() {
  const [isData, setIsData] = useAtom(selectedPartialUnitAtom);
  const handleImageClick = (index: number) => {
    if (isData.main === index) return;
    setIsData({ ...isData, main: index });
  };
  return (
    <Carousel
      classNames={Style}
      slideSize="20.333333%"
      slideGap="md"
      withControls={true}
      align="center"
      slidesToScroll={3}
      nextControlIcon={<DarkNextCarouselButton />}
      previousControlIcon={<DarkCarouseIcon />}
      mih={60}
    >
      {isData.others.map((item: any, index: number) => (
        <Carousel.Slide
          key={index}
          mih={70}
          mt={20}
          onClick={() => handleImageClick(index)}
          className="cursor-pointer"
        >
          <Image
            src={ImgNotAvail}
            alt={item.image}
            width={300}
            height={300}
            className={clsx(
              isData.main === index && "border border-btnPrimary border-solid"
            )}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
