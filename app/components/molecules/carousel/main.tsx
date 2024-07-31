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
  const isTab = useMediaQuery("(max-width: 1600px)");
  return (
    <Carousel
      classNames={styles}
      nextControlIcon={<DarkNextCarouselButton />}
      previousControlIcon={<DarkCarouseIcon />}
      mt={isMobile ? 16 : 30}
      height={"auto"}
      slideSize={{ base: "100%", sm: "31%", md: "31%" }}
      slideGap={{ base: "lg", sm: "md", md: "40px" }}
      align={"start"}
      pb={isTab ? 20 : 0}
      px={isMobile ? 10 : isTab ? 10 : 100}
    >
      {children}
    </Carousel>
  );
};

export default MainCarousel;
