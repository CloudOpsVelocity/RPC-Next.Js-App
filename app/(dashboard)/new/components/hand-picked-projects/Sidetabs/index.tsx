"use client";
import React from "react";
import Card from "./Card";

type Props = {};

export default function SideTabs({}: Props) {
  const [active, setActive] = React.useState(0);
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
