"use client";
import { Carousel } from "@mantine/carousel";
import React from "react";
import "@mantine/carousel/styles.css";
import { CarouseSelArrowIcon } from "@/app/images/HomePageIcons";
import useIds from "../../useIds";
type Props = { data: any; active: number };
import Css from "../../../Style.module.css";
import Card from "../../newly-added-projects/Card";
export default function CardCarousel({ data, active }: Props) {
  const { data: ids } = useIds();
  return (
    <Carousel
      slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
      slideGap="md"
      align="start"
      slidesToScroll={1}
      mt={0}
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
