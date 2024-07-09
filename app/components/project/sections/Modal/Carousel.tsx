import {
  DarkCarouseIcon,
  DarkNextCarouselButton,
} from "@/app/images/commonSvgs";
import React from "react";
import { Carousel } from "@mantine/carousel";
import Style from "./Carouse.module.css";
import { useAtomValue } from "jotai";
import { selectedPartialUnitAtom } from "@/app/store/partialsUnits";
import Image from "next/image";
import { ImgNotAvail } from "@/app/data/project";
export default function CarouselModal() {
  const isData = useAtomValue(selectedPartialUnitAtom);
  return (
    <Carousel
      classNames={Style}
      slideSize="20.333333%"
      slideGap="md"
      align="start"
      slidesToScroll={3}
      nextControlIcon={<DarkNextCarouselButton />}
      previousControlIcon={<DarkCarouseIcon />}
      mih={60}
    >
      {isData.others.map((item: any, index: number) => (
        <Carousel.Slide key={index}>
          <Image src={ImgNotAvail} alt={item.image} width={300} height={300} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
