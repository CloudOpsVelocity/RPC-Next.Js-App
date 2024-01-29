"use client";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import React from "react";
import { ReviewBoxIcon, quotesIcon } from "@/app/images/commonSvgs";
import { Rating } from "@mantine/core";
import useRatings from "@/app/hooks/useRatings";
import { useParams } from "next/navigation";

export default function Reviews({ projName }: { projName: string }) {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useRatings({ projectId: slug });
  return (
    data?.status && (
      <div className="bg-[#FFF] py-12 w-full ">
        <div className="w-[90%] mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            CUSTOMER REVIEWS FOR{" "}
            <span className="text-green-500">{projName}</span>
          </h2>
          <p className="text-lg text-gray-600 mt-2 italic">
            Find helpful customer reviews and review ratings for {projName}
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
              {data?.data?.map((eachData: any, i: number) => (
                <Carousel.Slide key={i}>
                  <Review {...eachData} />
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    )
  );
}

const Review = ({ rating, review, name, days }: any) => {
  return (
    <>
      <div
        className="max-w-lg mx-auto mt-[20px] bg-white rounded-lg p-4 relative shadow-md border-solid border-[#DCE6ED] border-[1px] min-h-[220px]"
        id="ratings"
      >
        <span className=" absolute top-[-20px] !z-30  ">{quotesIcon}</span>
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[18px] text-[#000] font-[500] mt-[20px]">
                  {name ?? "GRP USER"}
                </p>
                <p className="text-[14px] text-[#212C33] font-[500]"></p>
              </div>
              <div className="text-right">
                <Rating size={"sm"} value={rating} readOnly />
                <span className="text-xs text-gray-500">{days} days ago</span>
              </div>
            </div>
            <p className="mt-2 text-[14px] text-[#3E3E3E] font-[400]">
              {review}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
