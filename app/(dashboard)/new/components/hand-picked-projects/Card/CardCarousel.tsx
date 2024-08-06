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
  const { ids, isLoading } = useIds();
  return (
    <Carousel
      slideSize={{ base: "90%", sm: "50%", md: "33.333333%" }}
      slideGap={{ base: 0, sm: "md" }}
      align="start"
      slidesToScroll={1}
      mt={0}
      nextControlIcon={<CarouseSelArrowIcon />}
      previousControlIcon={<CarouseSelArrowIcon className="rotate-180" />}
      controlsOffset={"-10px"}
      classNames={Css}
    >
      {isLoading ? (
        <>Loading..</>
      ) : (
        data.map((item: any, index: number) => (
          <Carousel.Slide key={index}>
            <Card
              item={{
                ...item,
                shortListed: ids?.projIds.includes(item.projIdEnc) ? "Y" : "N",
              }}
            />
          </Carousel.Slide>
        ))
      )}
    </Carousel>
  );
}
