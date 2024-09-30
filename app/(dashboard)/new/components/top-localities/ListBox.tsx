import React from "react";
import Box from "./Box";

type Props = {};

export default function ListBox({}: Props) {
  return (
    <div className="flex overflow-x-scroll sm:flex-wrap gap-[4%] mt-[22px] pt-[10px] scrollbar-hide">
      {config.data.map((item, index) => (
        <Box key={item.id} {...item} />
      ))}
    </div>
  );
}

const config = {
  data: [
    {
      name: "marathalli",
      id: 11,
      type: "L",
      url: "/marathalli.jpg"
    },
    {
      name: "koramangala", 
      id: 12,
      type: "L",
      url: "/koramangala.webp"
    },
    {
      name: "jp nagar",
      id: 13,
      type: "L",
      url: "/jpnagar.jpg"
    },
    {
      name: "whitefield",
      id: 14,
      type: "L",
      url: "/whitefiled.jpg"
    },
    {
      name: "mg road",
      id: 15,
      type: "L",
      url: "/mgroad.jpg"
    },
    {
      name: "indira nagar",
      id: 16,
      type: "L",
      url: "/Indiranagar.jpg"
    },
    
  ],
};
