import React from "react";
import MainHeading from "../heading";
import FeatureCarousel from "./Carousel";

type Props = {};

export default function FeaturedProjects({}: Props) {
  return (
    <div className="mt-[40px] sm:mt-[80px] w-[95%] m-auto">
      <MainHeading title="Featured Projects" content="Loreum Ipsum" />
      <FeatureCarousel />
    </div>
  );
}
