import React from "react";
import Style from "./Carouse.module.css";
import { Carousel } from "@mantine/carousel";
import {
  DarkCarouseIcon,
  DarkNextCarouselButton,
} from "@/app/images/commonSvgs";
import Card from "./Card";
import { useAtomValue } from "jotai";
import { propertyDetailsTypes } from "@/app/data/projectDetails";
import { currentPhaseAtom, propCgIdAtom } from "@/app/store/vewfloor";
import { parital_unit_atom } from "@/app/store/partialsUnits";

type Props = {
  partialUnitData: any;
};

export default function CardCarousel({ partialUnitData }: Props) {
  const currentPhase = useAtomValue(currentPhaseAtom);
  const propCgId = useAtomValue(propCgIdAtom);
  const selected = useAtomValue(parital_unit_atom);
  const data =
    partialUnitData[currentPhase][
      propertyDetailsTypes.get(propCgId)?.apiProp ?? ""
    ];
  console.log(data);
  return (
    <div className="flex  flex-col justify-center items-start gap-[18px] rounded shadow-[0px_4px_10px_0px_rgba(183,208,224,0.32)] p-[18px] border-l-[#B1BEC7] border-y-[#B1BEC7] border-t border-solid border-b border-l bg-[#fafafafa] mt-10">
      <p className="text-[color:var(--Black-2,#333)] text-base not-italic font-semibold">
        10 floor plans available
      </p>
      <Carousel
        classNames={Style}
        slideSize="20.333333%"
        slideGap="md"
        align="start"
        slidesToScroll={3}
        nextControlIcon={<DarkNextCarouselButton />}
        previousControlIcon={<DarkCarouseIcon />}
        mih={120}
      >
        <Carousel.Slide>
          <Card />
        </Carousel.Slide>
        <Carousel.Slide>
          <Card />
        </Carousel.Slide>
        <Carousel.Slide>
          <Card />
        </Carousel.Slide>
        <Carousel.Slide>
          <Card />
        </Carousel.Slide>
        <Carousel.Slide>
          <Card />
        </Carousel.Slide>
      </Carousel>
    </div>
  );
}
