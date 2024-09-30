"use client";

import React from "react";
import EmblaCarousel from "./components/emblacarousel";
import { EmblaOptionsType } from "embla-carousel";

const dumArray = [
  "https://daxv8eiot4y5y.cloudfront.net/Sample-images-for-Test/sample-7",
  "https://daxv8eiot4y5y.cloudfront.net/Sample-images-for-Test/sample-6",
  "https://daxv8eiot4y5y.cloudfront.net/Sample-images-for-Test/sample-5",
  "https://daxv8eiot4y5y.cloudfront.net/Sample-images-for-Test/sample-4",
  "https://daxv8eiot4y5y.cloudfront.net/Sample-images-for-Test/sample-3",
  "https://daxv8eiot4y5y.cloudfront.net/Sample-images-for-Test/sample-2",
  "https://daxv8eiot4y5y.cloudfront.net/Sample-images-for-Test/sample-2",
  "https://daxv8eiot4y5y.cloudfront.net/Sample-images-for-Test/sample-2",
  "https://daxv8eiot4y5y.cloudfront.net/Sample-images-for-Test/sample-2",
  "https://daxv8eiot4y5y.cloudfront.net/Sample-images-for-Test/sample-2",
  "https://daxv8eiot4y5y.cloudfront.net/Sample-images-for-Test/sample-2",
];
const OPTIONS: EmblaOptionsType = {};
const SLIDE_COUNT = dumArray.length;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Page = () => {
  return (
    <div>
      <EmblaCarousel slides={SLIDES} dumArray={dumArray} options={OPTIONS} />
    </div>
  );
};

export default Page;
