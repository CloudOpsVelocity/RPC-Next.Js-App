/* eslint-disable react/no-array-index-key */
"use client";
import React from "react";
import ReactWindowCarousel from "./components/ReactWindowCarousel";
// import Carousel from "./components/Carousel";
import Carousel from "./components/NewCarousel";
type Props = {};

export default function Page({}: Props) {
  const getData = (array: number[]) => {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        const element = array[j];
      }
    }
    return array;
  };
  console.table([3, 5, 1, 58, 765, 4, 343, 23, 65]);
  return <CoverImage />;
}

// Your coverImageUrl string
const coverImageUrl =
  "https://d2l0lb5gc1bw3t.cloudfront.net/residential-projects/bengaluru/213/hfhdhfgf-a-narayanapura-cover.webp?v=1730784410064,https://d2l0lb5gc1bw3t.cloudfront.net/residential-projects/bengaluru/213/hfhdhfgf-a-narayanapura-cover-small.webp,https://d2l0lb5gc1bw3t.cloudfront.net/residential-projects/bengaluru/213/hfhdhfgf-a-narayanapura-cover-medium.webp,https://d2l0lb5gc1bw3t.cloudfront.net/residential-projects/bengaluru/213/hfhdhfgf-a-narayanapura-cover-large.webp";

// Split the URLs into an array
const [defaultImg, smallImg, mediumImg, largeImg] = coverImageUrl.split(",");

function CoverImage() {
  class Bhks {
    private height = 0;
    bhk: string[];
    constructor(bhk: string[]) {
      if (!Array.isArray(bhk)) {
        this.bhk = [];
      }
      this.bhk = bhk;
    }
    get bhkNames() {
      return this.bhk;
    }
    set setBhk(bhk: string[]) {
      this.bhk = bhk;
    }

    private static privateMethod() {}
  }
  const bhk = new Bhks(["2BHK", "3BHK", "4BHK"]);
  console.log(bhk);

  return (
    <>
      {/* // <picture>
    //   <source */}
      {/* //     media="(max-width: 660px)"
    //     srcSet={smallImg}
    //   />
    //   <source
    //     media="(max-width: 1640px)"
    //     srcSet={mediumImg}
    //   />
    //   <source
    //     media="(min-width: 2000px)"
    //     srcSet={largeImg}
    //   /> */}
      <button
        onClick={() =>
          navigator.share({
            title: "Share",
            text: "Share",
            url: "https://www.google.com",
          })
        }
      >
        Share
      </button>
    </>
  );
}
