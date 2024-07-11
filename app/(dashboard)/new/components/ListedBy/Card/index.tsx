import React from "react";
import Box from "./Box";

type Props = {};

export default function CardSection({}: Props) {
  return (
    <div className="flex items-center gap-[52px] self-stretch">
      <Box />
      <Box />
      <Box />
    </div>
  );
}
