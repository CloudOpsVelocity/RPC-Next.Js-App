"use client";
import { CarouseSelArrowIcon } from "@/app/images/HomePageIcons";
import { Carousel } from "@mantine/carousel";
import React from "react";
import ListingCard from "../Atoms/ListingCard";

type Props = {
  data: any;
};

export default function ListingCarousel({ data }: Props) {
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
          <ListingCard item={item} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
