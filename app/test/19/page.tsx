import React from "react";
import { UseExample1 } from "./components/JokeSection";
import { NextJsExample1 } from "./components/NextJokeSection";

export default function Page() {
  return (
    <div>
      {/* <h1 className="text-center text-2xl ">Next JS USE Tesing</h1>
      <UseExample1 /> */}
      <h1 className="text-center text-2xl ">Next JS Server Component Tesing</h1>
      <NextJsExample1 />
    </div>
  );
}
