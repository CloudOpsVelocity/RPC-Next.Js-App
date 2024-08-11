import React from "react";
import CardCarousel from "./CardCarousel";
import MainHeading from "../heading";

type Props = {
  data: any;
  shortIds: any;
};

export default function NewAddedProjects({ data, shortIds }: Props) {
  return (
    <div className="mt-[40px] sm:mt-[60px] w-[95%] m-auto">
      <MainHeading
        title="Featured Projects"
        content="Premier Real Estate Projects Awaiting You"
      />
      <CardCarousel data={data} shortIds={shortIds} />
    </div>
  );
}
