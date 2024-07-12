"use client";
import { Carousel } from "@mantine/carousel";
import React from "react";
import Card from "./Card";
import "@mantine/carousel/styles.css";
import { CarouseSelArrowIcon } from "@/app/images/HomePageIcons";
type Props = { data: any; active: number };

export default function CardCarousel({ data, active }: Props) {
  return (
    <Carousel
      slideSize="33.333333%"
      slideGap="md"
      loop
      align="start"
      slidesToScroll={1}
      nextControlIcon={<CarouseSelArrowIcon />}
      previousControlIcon={<CarouseSelArrowIcon className="rotate-180" />}
      controlsOffset={"-10px"}
      key={active}
    >
      {data.map((item: any, index: number) => (
        <Carousel.Slide key={index}>
          <Card item={item} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
