"use client";
import { CarouseSelArrowIcon } from "@/app/images/HomePageIcons";
import { Carousel } from "@mantine/carousel";
import React from "react";
import MainCard from "../Atoms/Card";

type Props = {};

export default function FeatureCarousel({}: Props) {
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
      <Carousel.Slide>
        <MainCard />
      </Carousel.Slide>
      <Carousel.Slide>
        <MainCard />
      </Carousel.Slide>
      <Carousel.Slide>
        <MainCard />
      </Carousel.Slide>
      <Carousel.Slide>
        <MainCard />
      </Carousel.Slide>
    </Carousel>
  );
}
