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
  shortIds: any;
};

export default function CardCarousel({ data, shortIds }: Props) {
  return (
    <Carousel
      slideSize={{ base: "80%", sm: "50%", md: "33.333333%" }}
      slideGap={{ base: "sm", sm: "md", xl: "xl" }}
      align="start"
      slidesToScroll={1}
      mt={20}
      nextControlIcon={<CarouseSelArrowIcon className=" " />}
      previousControlIcon={<CarouseSelArrowIcon className="rotate-180  " />}
      controlsOffset={"-10px"}
      classNames={Css}
    >
      {data.map((item: any, index: number) => (
        <Carousel.Slide key={index}>
          <Card
            item={{
              ...item,
              shortListed: shortIds?.projIds?.includes(item.projIdEnc)
                ? "Y"
                : "N",
            }}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
