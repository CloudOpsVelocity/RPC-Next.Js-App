"use client";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import React from "react";
import {
  NextCarouselButton,
  PrevCarouselButton,
  quotesIcon,
} from "@/app/images/commonSvgs";
import { Rating } from "@mantine/core";
import useRatings from "@/app/hooks/useRatings";
import { useParams } from "next/navigation";

export default function Reviews({ projName }: { projName: string }) {
  const { data } = useRatings();
  return (
    data?.status && (
      <div id="ratings" className="bg-[#FFF] scroll-mt-[100px] py-12 w-full ">
        <div className="w-[90%] mx-auto px-6">
          <h2 className="text-[#001F35] text-[32px] not-italic font-semibold leading-[normal] uppercase">
            CUSTOMER REVIEWS FOR{" "}
            <span className="text-[#148B16] text-[32px] not-italic font-bold leading-[normal] uppercase">
              {projName}
            </span>
          </h2>
          <p className="text-[#4D6677] text-2xl italic font-medium leading-[normal] tracking-[0.96px] mt-2 ">
            Find helpful customer reviews and review ratings for {projName}
          </p>
          <div className="mt-8 relative">
            <Carousel
              nextControlIcon={<NextCarouselButton />}
              previousControlIcon={<PrevCarouselButton />}
              slideGap={"md"}
              align="start"
              slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
              withIndicators
              height={250}
              slidesToScroll={1}
              pl={80}
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
    <div className="shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] max-w-lg mx-auto mt-[20px] bg-[#fff] p-4 relative   min-h-[220px] border rounded-[10px] border-solid border-[#DCE6ED]">
      <span className=" absolute top-[-20px] !z-30  ">{quotesIcon}</span>
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-black text-lg not-italic font-medium leading-[normal]">
                {name ?? "GRP USER"}
              </p>
              <p className="text-[14px] text-[#212C33] font-[500]">Grp User</p>
            </div>
            <div className="text-right">
              <Rating size={"sm"} value={rating} readOnly />
              <span className="text-xs text-gray-500">{days} days ago</span>
            </div>
          </div>
          <p className="mt-2 text-[#3E3E3E] text-base not-italic font-normal leading-[normal] tracking-[0.56px]">
            {review}
          </p>
        </div>
      </div>
    </div>
  );
};
