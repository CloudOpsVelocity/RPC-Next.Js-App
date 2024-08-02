import React from "react";
import MainHeading from "../heading";
import CardSection from "./Card";

type Props = {};

export default function BlogsSection({}: Props) {
  return (
    <div className="w-[90%] m-auto pb-10 mb-[0px] sm:mb-[40px]  ">
      <MainHeading
        title="Latest Blogs"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        className={{ title: "text-center", content: "text-center" }}
      />
      <div>
        <CardSection />
      </div>
    </div>
  );
}
