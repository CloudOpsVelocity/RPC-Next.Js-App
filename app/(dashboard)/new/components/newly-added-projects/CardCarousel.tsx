"use client";
import { Carousel } from "@mantine/carousel";
import React from "react";
import Card from "./Card";
import "@mantine/carousel/styles.css";
import { CarouseSelArrowIcon } from "@/app/images/HomePageIcons";
import useIds from "../useIds";
type Props = {
  data: any;
};

export default function CardCarousel({ data }: Props) {
  const { data: ids } = useIds();
  console.log(ids);
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
    >
      {data.map((item: any, index: number) => (
        <Carousel.Slide key={index}>
          <Card item={item} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
