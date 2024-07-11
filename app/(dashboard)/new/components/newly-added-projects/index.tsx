import React from "react";
import CardCarousel from "./CardCarousel";
import MainHeading from "../heading";
type Props = {};

export default function NewAddedProjects({}: Props) {
  return (
    <div className="mt-[80px] w-[90%] m-auto">
      <MainHeading title="Newly Added Projects" content="Loreum Ipsum" />
      <CardCarousel />
    </div>
  );
}
