"use client";
import { Carousel } from "@mantine/carousel";
import React from "react";
import Card from "./Card";
import "@mantine/carousel/styles.css";
import { CarouseSelArrowIcon } from "@/app/images/HomePageIcons";
import useIds from "../useIds";
import Css from "../../Style.module.css";
type Props = {
  data: any;
};

export default function CardCarousel({ data }: Props) {
  const { data: ids } = useIds();
  return (
    <Carousel
      slideSize="33.333333%"
      slideGap="md"
      loop
      align="start"
      slidesToScroll={1}
      mt={20}
      nextControlIcon={<CarouseSelArrowIcon />}
      previousControlIcon={<CarouseSelArrowIcon className="rotate-180" />}
      controlsOffset={"-10px"}
      classNames={Css}
    >
      {data.map((item: any, index: number) => (
        <Carousel.Slide key={index}>
          <Card
            item={{
              ...item,
              shortListed: ids?.includes(item.projIdEnc) ? "Y" : "N",
            }}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
