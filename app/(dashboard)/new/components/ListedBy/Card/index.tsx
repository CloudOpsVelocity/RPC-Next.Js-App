import React from "react";
import Box from "./Box";

type Props = {};

export default function CardSection({}: Props) {
  return (
    <div className=" relative mt-[86px] sm:top-0 flex justify-start items-start gap-[11px] sm:gap-[6%] self-stretch sm:mt-[2%] sm:pl-[4%] flex-wrap">
      {config.data.map((item, index) => (
        <Box key={index} {...item} />
      ))}
    </div>
  );
}
const config = {
  data: [
    {
      title: "BUILDER",
      content: "Check all the listings posted by builder",
      link: `${process.env.NEXT_PUBLIC_PROJECT_URL}/search/listing?listedBy=B`,
      image: "/staticmedia-images-icons/homepage/Builder.png",
    },
    {
      title: "AGENT",
      content: "Check all the listings posted by agent",
      link: `${process.env.NEXT_PUBLIC_PROJECT_URL}/search/listing?listedBy=A`,
      image: "/staticmedia-images-icons/homepage/Agent.png",
    },
    {
      title: "INDIVIDUAL",
      content: "Check all the listings posted by individual",
      link: `${process.env.NEXT_PUBLIC_PROJECT_URL}/search/listing?listedBy=I`,
      image: "/staticmedia-images-icons/homepage/Individual.png",
    },
  ],
};
