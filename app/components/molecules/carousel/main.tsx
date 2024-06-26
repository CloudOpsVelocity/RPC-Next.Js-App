"use client";
import React from "react";
import { Carousel } from "@mantine/carousel";
import styles from "@/app/styles/Carousel.module.css";
import "@mantine/carousel/styles.css";
import {
  DarkCarouseIcon,
  DarkNextCarouselButton,
  NextCarouselButton,
  PrevCarouselButton,
} from "@/app/images/commonSvgs";
import { useMediaQuery } from "@mantine/hooks";

const MainCarousel = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery("(max-width: 750px)");
  return (
    <Carousel
      classNames={styles}
      nextControlIcon={<DarkNextCarouselButton />}
      previousControlIcon={<DarkCarouseIcon />}
      mt={30}
      // withIndicators
      height={"auto"}
      slideSize={{ base: "100%", sm: "50%", md: "31%" }}
      slideGap={{ base: "lg", sm: "md", md: "72px" }}
      align={isMobile ? "end" : "start"}
      px={isMobile ? 20 : 100}
    >
      {children}
    </Carousel>
  );
};

export default MainCarousel;
