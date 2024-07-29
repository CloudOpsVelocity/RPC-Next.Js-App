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
import { FloorPlanNotAvail, ImgNotAvail } from "@/app/data/project";
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
      w={"full"}
      slideGap="md"
      withControls={true}
      align={isData.others.length > 5 ? "start" : "center"}
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
            src={item.floorPlan ?? FloorPlanNotAvail}
            alt={item.image}
            width={300}
            height={300}
            className={clsx(
              "max-h-[100px] object-cover",
              isData.main === index && "border-2 border-btnPrimary border-solid"
            )}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
