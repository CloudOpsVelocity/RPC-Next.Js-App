"use client";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import React from "react";
import { ReviewBoxIcon, quotesIcon } from "@/app/images/commonSvgs";
import { Rating } from "@mantine/core";

export default function Reviews() {
  return (
    <div className="bg-[#FFF] py-12 w-full ">
      <div className="max-w-[1920px] mx-auto px-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          CUSTOMER REVIEWS FOR <span className="text-green-500">SARANG</span>
        </h2>
        <p className="text-lg text-gray-600 mt-2 italic">
          Find helpful customer reviews and review ratings for Sarang By
          Sumadhura
        </p>
        <div className="mt-8 relative">
          <Carousel
            slideGap={"md"}
            align="start"
            slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
            withIndicators
            height={250}
            slidesToScroll={1}
          >
            <Carousel.Slide>
              <Review />
            </Carousel.Slide>
            <Carousel.Slide>
              <Review />
            </Carousel.Slide>
            <Carousel.Slide>
              <Review />
            </Carousel.Slide>
            <Carousel.Slide>
              <Review />
            </Carousel.Slide>
            <Carousel.Slide>
              <Review />
            </Carousel.Slide>
            <Carousel.Slide>
              <Review />
            </Carousel.Slide>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

const Review = () => {
  return (
    <>
      <div className="max-w-lg mx-auto bg-white rounded-lg p-4 shadow-md border-solid border-[#DCE6ED] border-[1px] ">
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <span className=" relative mb-[-40px] bottom-[30px] !z-10 ">{quotesIcon}</span>
                <p className="text-lg font-semibold">Ankita Soni</p>
                <p className="text-sm text-gray-500">Owner</p>
              </div>
              <div className="text-right">
                <Rating size={"sm"} value={5} fractions={2} readOnly />
                <span className="text-xs text-gray-500">3 days ago</span>
              </div>
            </div>
            <p className="mt-2 text-gray-600 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ei
              usmod tempor incididunt ut labore et dolore magna aliqua. Uten im
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa,
              asperiores tempora! Numquam doloremque sint error accusantium ex
              tempore, aut blanditiis
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
