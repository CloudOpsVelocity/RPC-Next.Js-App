"use client";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import React from "react";
import { OtherBuilder } from "@/app/validations/types/builder";
import { BackgroundImage } from "@mantine/core";
import {
  NextCarouselButton,
  PrevCarouselButton,
} from "@/app/images/commonSvgs";
// ... (imports remain the same)

export default function BuildersBlock({ data }: { data: OtherBuilder[] }) {
  return (
    <div className=" py-12 w-full flex justify-center items-center ">
      <div className="max-w-[1920px] w-[90%] ">
        <h2 className="text-[#202020] text-[32px] not-italic font-bold leading-[normal] uppercase">
          Builder’s in{" "}
          <span className="text-[#148B16] text-[32px] not-italic font-bold leading-[normal] uppercase">
            Bangalore
          </span>
        </h2>
        <p className=" mt-2 text-[#4D6677] text-2xl italic font-medium leading-[normal] tracking-[0.96px]">
          Check out some other builders in Bangalore
        </p>
        <div className="mt-8 relative  ">
          <Carousel
            //mih={"200px"}
            slideGap={"72px"}
            align="start"
            slideSize="15%"
            // withIndicators
            className=" flex justify-start items-center "
            slidesToScroll={1}
            nextControlIcon={<NextCarouselButton />}
            previousControlIcon={<PrevCarouselButton />}
            px={140}
          >
            {data?.map((builder, index) => (
              <Carousel.Slide key={index}>
                <div
                  className="rounded-[10px] w-[107px] h-[105px] md:w-[140px] md:h-[136px] lg:w-[209px] lg:h-[203px] shadow-lg bg-gray-300"
                  style={{
                    backgroundImage: `url(${
                      builder.logo || "fallback-image-url"
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <p className="text-black text-center w-[209px]">
                  {builder.name}
                </p>
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
