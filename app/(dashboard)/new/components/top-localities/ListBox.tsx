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
      id: 397,
      type: "L",
      url: "/marathalli.jpg"
    },
    {
      name: "koramangala", 
      id: 354,
      type: "L",
      url: "/koramangala.webp"
    },
    {
      name: "jp nagar",
      id: 298,
      type: "L",
      url: "/jpnagar.jpg"
    },
    {
      name: "whitefield",
      id: 563,
      type: "L",
      url: "/whitefiled.jpg"
    },
    {
      name: "Rajajinagar",
      id: 458,
      type: "L",
      url: "/mgroad.jpg"
    },
    {
      name: "indira nagar",
      id: 261,
      type: "L",
      url: "/Indiranagar.jpg"
    },
    
  ],
};
