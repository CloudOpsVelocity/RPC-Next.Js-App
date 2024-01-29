"use client";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import React from "react";
import { OtherBuilder } from "@/app/validations/types/builder";
import { BackgroundImage } from "@mantine/core";
// ... (imports remain the same)

export default function BuildersBlock({ data }: { data: OtherBuilder[] }) {
  return (
    <div className=" py-12 w-full flex justify-center items-center ">
      <div className="max-w-[1920px] w-[90%] ">
        <h2 className="text-2xl font-semibold text-gray-800 uppercase">
          Builder’s in <span className="text-green-500">Bangalore</span>
        </h2>
        <p className="text-lg text-gray-600 mt-2 italic">
          Check out some other builders in Bangalore
        </p>
        <div className="mt-8 relative  ">
          <Carousel
            //mih={"200px"}
            slideGap={"xs"}
            align="start"
            slideSize="15%"
            // withIndicators
            className=" flex justify-start items-center "
            slidesToScroll={1}
          >
            {data?.map((builder, index) => (
              <Carousel.Slide key={index} >
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
                <p className="text-black">{builder.name}</p>
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
