"use client";
import React from "react";
import { Carousel } from "@mantine/carousel";

import "@mantine/carousel/styles.css";

const MainCarousel = ({ children }: { children: React.ReactNode }) => {
  return (
    <Carousel
      mt={30}
      // withIndicators
      height={"auto"}
      slideSize={{ base: "100%", sm: "50%", md: "25.333333%" }}
      slideGap={{ base: 0, sm: "md" }}
      loop
      align="start"
    >
      {children}
    </Carousel>
  );
};

export default MainCarousel;
