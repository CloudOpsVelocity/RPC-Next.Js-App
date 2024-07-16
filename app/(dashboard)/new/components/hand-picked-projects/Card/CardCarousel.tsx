"use client";
import { Carousel } from "@mantine/carousel";
import React from "react";
import Card from "./Card";
import "@mantine/carousel/styles.css";
import { CarouseSelArrowIcon } from "@/app/images/HomePageIcons";
import useIds from "../../useIds";
type Props = { data: any; active: number };
import Css from "../../../Style.module.css";
export default function CardCarousel({ data, active }: Props) {
  const { data: ids } = useIds();
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
