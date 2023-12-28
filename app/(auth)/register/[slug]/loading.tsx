import { Loader } from "@mantine/core";
import React from "react";

export default function loading() {
  return (
    <div className="flex justify-center items-center h-60">
      <Loader />
    </div>
  );
}
