"use client";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import React from "react";

export default function Reviews() {
  return (
    <div className="bg-gray-100 py-12 w-full ">
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
            slideSize="33.333333%"
            withIndicators
            height={200}
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
      <div className="max-w-md mx-auto bg-white rounded-lg p-4 shadow-lg">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500 w-6 h-6"
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">Ankita Soni</p>
                <p className="text-sm text-gray-500">Owner</p>
              </div>
              <div className="flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-yellow-400 w-4 h-4"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-yellow-400 w-4 h-4"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-yellow-400 w-4 h-4"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-yellow-400 w-4 h-4"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-yellow-400 w-4 h-4"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span className="text-xs text-gray-500">3 days ago</span>
              </div>
            </div>
            <p className="mt-2 text-gray-600 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ei
              usmod tempor incididunt ut labore et dolore magna aliqua. Uten im
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
