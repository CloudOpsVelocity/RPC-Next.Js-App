import React from "react";
import MainHeading from "../heading";
import CardSection from "./Card";

type Props = {};

export default function ListbySection({}: Props) {
  return (
    <div className="mt-[80px] w-[90%] m-auto">
      <MainHeading title="Listing Posted By" content="Loreum Ipsum" />
      <CardSection />
    </div>
  );
}
