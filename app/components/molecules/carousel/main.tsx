"use client";
import React from "react";
import { Carousel } from "@mantine/carousel";

import "@mantine/carousel/styles.css";
import {
  NextCarouselButton,
  PrevCarouselButton,
} from "@/app/images/commonSvgs";
import { useMediaQuery } from "@mantine/hooks";

const MainCarousel = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery("(max-width: 750px)");
  return (
    <Carousel
      nextControlIcon={<NextCarouselButton />}
      previousControlIcon={<PrevCarouselButton />}
      mt={30}
      // withIndicators
      height={"auto"}
      slideSize={{ base: "100%", sm: "50%", md: "31%" }}
      slideGap={{ sm: "md", md: "72px" }}
      align="start"
      px={isMobile ? 5 : 100}

      //orientation="horizontal"
    >
      {children}
    </Carousel>
  );
};

export default MainCarousel;
