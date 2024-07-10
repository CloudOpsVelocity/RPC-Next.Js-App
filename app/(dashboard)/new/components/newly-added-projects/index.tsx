import React from "react";
import Card from "./Card";
import CardCarousel from "./CardCarousel";

type Props = {};

export default function NewAddedProjects({}: Props) {
  return (
    <div className="mt-[80px] w-[90%] m-auto">
      <div>
        <h1 className="text-black text-2xl not-italic font-medium">
          Loreum Ipsum (Newly added projects )
        </h1>
        <h4 className="text-black text-xl not-italic font-medium">
          Loreum Ipsum
        </h4>
      </div>
      <CardCarousel />
    </div>
  );
}
