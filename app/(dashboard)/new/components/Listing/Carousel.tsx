/* eslint-disable react/no-array-index-key */
"use client";
import React from "react";
import ListingCard from "../Atoms/ListingCard";
import CustomCarousel from "@/app/test/components/Carousel1";
import HomePageVirtualCarousel from "../Atoms/VirtualzedCarousel";
import ReactWindowCarousel from "@/app/test/components/ReactWindowCarousel";
type Props = {
  data: any;
  shortIds: any;
};

export default function ListingCarousel({ shortIds, data }: Props) {
  const slideWidth = 500;
  const slideHeight = 480;

  const initialSlide = 0;

  const slidesList = data.map((item:any, index:number) => 
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
  return (
    <ReactWindowCarousel
    {...{ initialSlide, slidesList, slideWidth, slideHeight }}
  />
  //   <HomePageVirtualCarousel
  //   items={data}
  //   itemCount={data.length}
  //   itemSize={500}
  //   height={480}
  //   gapSize={16}
  //   renderItem={(item:any, index) => (
  //     <ListingCard
  //       item={item}
  //       sl={
  //         shortIds?.propIds && shortIds?.propIds?.includes(item.propIdEnc)
  //           ? "Y"
  //           : "N"
  //       }
  //     />
  //   )}
  // />
  //   <CustomCarousel
  //   slides={data}
  //   renderItem={(item:any, index) => (
  //            <ListingCard
  //         item={item}
  //         sl={
  //           shortIds?.propIds && shortIds?.propIds?.includes(item.propIdEnc)
  //             ? "Y"
  //             : "N"
  //         }
  //       />
  //   )}
  //   slidesToShow={3}
  //   gap={16}
  //   itemWidth={500}
  //   hideControlsOnMobile
  // />
  //   <Carousel
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
  )
}
{/* <div className="mt-4">
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
  ); */}