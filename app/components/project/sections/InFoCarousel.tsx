"use client";
import { Carousel } from "@mantine/carousel";
import React from "react";
type Props = {
  partialUnitData: any;
};
import Style from "./Carouse.module.css";
import InfoCard from "./InfoCard";
import {
  DarkCarouseIcon,
  DarkNextCarouselButton,
} from "@/app/images/commonSvgs";
import { useAtom, useAtomValue } from "jotai";
import { parital_unit_atom } from "@/app/store/partialsUnits";
import { currentPhaseAtom, propCgIdAtom } from "@/app/store/vewfloor";
import { propertyDetailsTypes } from "@/app/data/projectDetails";
import { sortUnits } from "@/app/utils/unitparser";
export default function InFoCarousel({ partialUnitData }: Props) {
  const [selected, setSelected] = useAtom(parital_unit_atom);
  const currentPhase = useAtomValue(currentPhaseAtom);
  const propCgId = useAtomValue(propCgIdAtom);
  const data =
    partialUnitData[currentPhase][
      propertyDetailsTypes.get(propCgId)?.apiProp ?? ""
    ];
  const handleCardClick = (index: number) => {
    setSelected(index);
  };
  return (
    <Carousel
      classNames={Style}
      slideSize="20.333333%"
      slideGap="md"
      align="start"
      slidesToScroll={1}
      mt={20}
      nextControlIcon={<DarkNextCarouselButton />}
      previousControlIcon={<DarkCarouseIcon />}
      mih={120}
    >
      {data &&
        sortUnits(Object.keys(data)).map((item: any, index: number) => (
          <InfoCard
            {...{
              active: selected === index,
              ...data[item],
              label: item,
              propCgId: propCgId,
            }}
            cardClick={() => handleCardClick(index)}
          />
        ))}
    </Carousel>
  );
}
