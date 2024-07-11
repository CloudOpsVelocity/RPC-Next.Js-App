import React from "react";
import MainHeading from "../heading";
import ListingCarousel from "./Carousel";

type Props = {
  title: string;
  content: string;
};

export default function DynamicListing({ content, title }: Props) {
  return (
    <div className="my-[40px] w-[90%] m-auto">
      <MainHeading title={title} content={content} />
      <ListingCarousel />
    </div>
  );
}
