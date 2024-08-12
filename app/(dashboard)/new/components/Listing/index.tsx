import React from "react";
import MainHeading from "../heading";
import ListingCarousel from "./Carousel";

type Props = {
  title: string;
  content: string;
  data: any;
  shortIds: any;
};

export default function DynamicListing({
  content,
  title,
  data,
  shortIds,
}: Props) {
  return (
    <div className="mt-[40px] sm:mt-[60px] w-[95%] m-auto">
      <MainHeading title={title}  data={data} content={content} />
      <ListingCarousel data={data} shortIds={shortIds} />
    </div>
  );
}
