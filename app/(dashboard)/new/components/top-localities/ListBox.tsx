import React from "react";
import Box from "./Box";

type Props = {};

export default function ListBox({}: Props) {
  return (
    <div className="flex flex-wrap gap-[4%] mt-14">
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
    </div>
  );
}
