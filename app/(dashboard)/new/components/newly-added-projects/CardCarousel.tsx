"use client";
import { Carousel } from "@mantine/carousel";
import React from "react";
import Card from "./Card";
import "@mantine/carousel/styles.css";
import { CarouseSelArrowIcon } from "@/app/images/HomePageIcons";
type Props = {};

export default function CardCarousel({}: Props) {
  return (
    <Carousel
      slideSize="33.333333%"
      slideGap="md"
      loop
      align="start"
      slidesToScroll={1}
      mt={20}
      // nextControlIcon={<CarouseSelArrowIcon />}
      // previousControlIcon={<CarouseSelArrowIcon className="rotate-180" />}
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
      {/* ...other slides */}
    </Carousel>
  );
}
