import React from "react";
import Box from "./Box";

type Props = {};

export default function ListBox({}: Props) {
  return (
    <div className="flex overflow-x-scroll sm:flex-wrap gap-[4%] mt-14 scrollbar-hide">
      {config.data.map((item, index) => (
        <Box key={index} {...item} />
      ))}
    </div>
  );
}

const config = {
  data: [
    {
      name: "nagawara",
      id: 12,
      type: "L",
    },
    {
      name: "marathalli",
      id: 11,
      type: "L",
    },
    {
      name: "hsr Layout",
      id: 13,
      type: "L",
    },
    {
      name: "H locality 1",
      id: 22,
      type: "L",
    },
    {
      name: "whitefield",
      id: 10,
      type: "L",
    },
  ],
};
