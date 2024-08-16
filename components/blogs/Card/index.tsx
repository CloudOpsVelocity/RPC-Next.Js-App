import React from "react";
import Card from "./Card";

type Props = {};

export default function CardSection({}: Props) {
  return (
    <div className="w-full  flex sm:justify-center sm:items-center gap-4 mt-4 overflow-x-scroll scrollbar-hide">
      <Card />
      <Card />
      <Card />
    </div>
  );
}
