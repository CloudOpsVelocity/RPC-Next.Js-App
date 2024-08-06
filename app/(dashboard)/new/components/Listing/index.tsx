import React from "react";
import MainHeading from "../heading";
import ListingCarousel from "./Carousel";

type Props = {
  title: string;
  content: string;
  data: any;
};

export default function DynamicListing({ content, title, data }: Props) {
  return (
    <div className="mt-[40px] sm:mt-[80px] w-[95%] m-auto">
      <MainHeading title={title} content={content} />
      <ListingCarousel data={data} />
    </div>
  );
}
