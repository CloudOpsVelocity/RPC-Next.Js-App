"use client";
import { CarouseSelArrowIcon } from "@/app/images/HomePageIcons";
import { Carousel } from "@mantine/carousel";
import React from "react";
import ListingCard from "../Atoms/ListingCard";
import Css from "../../Style.module.css";
import useIds from "../useIds";
type Props = {
  data: any;
  shortIds: any;
};

export default function ListingCarousel({ data, shortIds }: Props) {
  return (
    <Carousel
      // slideSize="33.333333%"
      slideSize={{ base: "90%", sm: "40%", md: "29%" }}
      slideGap="md"
      // loop
      align="start"
      slidesToScroll={1}
      mt={20}
      nextControlIcon={<CarouseSelArrowIcon />}
      previousControlIcon={<CarouseSelArrowIcon className="rotate-180" />}
      controlsOffset={"-10px"}
      classNames={Css}
    >
      {data.map((item: any, index: number) => (
        <Carousel.Slide  key={index}>
          <ListingCard
            item={item}
            sl={shortIds?.propIds.includes(item.propIdEnc) ? "Y" : "N"}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
