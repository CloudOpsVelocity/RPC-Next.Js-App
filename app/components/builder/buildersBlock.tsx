"use client";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import React from "react";

export default function BuildersBlock() {
  return (
    <div className=" py-12 w-full mb-[5%] flex justify-center items-center ">
      <div className="max-w-[1920px] w-[90%] ">
        <h2 className="text-2xl font-semibold text-gray-800 uppercase">
          Builder’s in <span className="text-green-500">Bangalore</span>
        </h2>
        <p className="text-lg text-gray-600 mt-2 italic">
          Check out some others builder in Bangalore
        </p>
        <div className="mt-8 relative ">
          <Carousel
            slideGap={"xs"}
            align="start"
            slideSize="15%"
            withIndicators
            height={200}
            slidesToScroll={1}
          >
            <Carousel.Slide>
              <div className="rounded-[10px] w-[107px] h-[105px] md:w-[140] md:h-[136px] lg:w-[209px] lg:h-[203px] shadow-md bg-[#c2bfbf] "></div>
            </Carousel.Slide>
            <Carousel.Slide>
            <div className="rounded-[10px]  w-[107px] h-[105px] md:w-[140] md:h-[136px] lg:w-[209px] lg:h-[203px] shadow-md bg-[#c2bfbf] "></div>
           
            </Carousel.Slide>
            <Carousel.Slide>
            <div className="rounded-[10px]  w-[107px] h-[105px] md:w-[140] md:h-[136px] lg:w-[209px] lg:h-[203px] shadow-md bg-[#c2bfbf] "></div>
            </Carousel.Slide>
            <Carousel.Slide>
            <div className="rounded-[10px]  w-[107px] h-[105px] md:w-[140] md:h-[136px] lg:w-[209px] lg:h-[203px] shadow-md bg-[#c2bfbf] "></div>
            </Carousel.Slide>
            <Carousel.Slide>
            <div className="rounded-[10px]  w-[107px] h-[105px] md:w-[140] md:h-[136px] lg:w-[209px] lg:h-[203px] shadow-md bg-[#c2bfbf] "></div>
            </Carousel.Slide>
            <Carousel.Slide>
            <div className="rounded-[10px]  w-[107px] h-[105px] md:w-[140] md:h-[136px] lg:w-[209px] lg:h-[203px] shadow-md bg-[#c2bfbf] "></div>
            </Carousel.Slide>
          </Carousel>
        </div>
      </div>
    </div>
  );
}


