"use client";
import React from "react";
import Card from "./Card";

type Props = {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
};

export default function SideTabs({ active, setActive }: Props) {
  return (
    <div>
      {config.data.map((item, index) => (
        <Card
          key={index}
          label={item.lablel}
          active={active == index}
          onClick={() => setActive(index)}
        />
      ))}
    </div>
  );
}
const config = {
  data: [
    { lablel: "New Launch Projects" },
    { lablel: "On- Going Projects" },
    { lablel: "Completed Projects" },
  ],
};
