import React from "react";
import Card from "./Card";

type Props = {};

export default function CardSection({}: Props) {
  return (
    <div className="flex justify-center items-center gap-[3%] mt-[4%]">
      <Card />
      <Card />
      <Card />
    </div>
  );
}
