"use client";
import { CarouseSelArrowIcon } from "@/app/images/HomePageIcons";
import { Carousel } from "@mantine/carousel";
import React from "react";
import ListingCard from "../Atoms/ListingCard";
import Css from "../../Style.module.css";
import OptmizedCarousel from "@/app/test/components/Carousel1";
import HomePageVirtualCarousel from "../Atoms/VirtualzedCarousel";
type Props = {
  data: any;
  shortIds: any;
};

export default function ListingCarousel({ shortIds, data }: Props) {
  return (

<div className="mt-4">
   {data && (
      <HomePageVirtualCarousel
        items={data}
        height={480}
        itemCount={data.length}
        itemSize={500}
        overscan={5}
        renderItem={(item: any, index) => {
          return (
            <ListingCard
              key={index}
              item={item}
              sl={
                shortIds?.propIds && shortIds?.propIds?.includes(item.propIdEnc)
                  ? "Y"
                  : "N"
              }
            />
          );
        }}
      />
    )}  </div>
  );

  // <Carousel
  //   // slideSize="33.333333%"
  //   slideSize={{ base: "80%", sm: "50%", md: "29%" }}
  //   slideGap={{ base: "sm", sm: "md", xl: "md" }}
  //   // loop
  //   align="start"
  //   slidesToScroll={1}
  //   mt={20}
  //   nextControlIcon={<CarouseSelArrowIcon />}
  //   previousControlIcon={<CarouseSelArrowIcon className="rotate-180" />}
  //   controlsOffset={"-10px"}
  //   classNames={Css}
  // >
  //   {data?.map((item: any, index: number) => (
  //     <Carousel.Slide key={item.propIdEnc}>
  //       <ListingCard
  //         item={item}
  //         sl={
  //           shortIds?.propIds && shortIds?.propIds?.includes(item.propIdEnc)
  //             ? "Y"
  //             : "N"
  //         }
  //       />
  //     </Carousel.Slide>
  //   ))}
  // </Carousel>
}
