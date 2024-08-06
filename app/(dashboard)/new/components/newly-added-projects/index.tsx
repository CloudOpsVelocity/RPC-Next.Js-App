import React from "react";
import CardCarousel from "./CardCarousel";
import MainHeading from "../heading";

type Props = {
  data: any;
};

export default function NewAddedProjects({ data }: Props) {
  return (
    <div className="mt-[40px] sm:mt-[80px] w-[95%] m-auto">
      <MainHeading title="Featured Projects" content="Premier Real Estate Projects Awaiting You" />
      <CardCarousel data={data} />
    </div>
  );
}
