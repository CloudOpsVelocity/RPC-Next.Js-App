import React from "react";
import { UseExample1 } from "./components/JokeSection";
import { NextJsExample1 } from "./components/NextJokeSection";

export default function Page() {
  const ob = Object({
    name: "virender",
  });
  const string = Object.toString();

  return (
    <div>
      <h1 className="text-center text-2xl ">Next JS Server Component </h1>
    </div>
  );
}
