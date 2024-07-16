import React from "react";
import Box from "./Box";

type Props = {};

export default function CardSection({}: Props) {
  return (
    <div className="flex items-center gap-[6%] self-stretch mt-[2%] pl-[4%]">
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
