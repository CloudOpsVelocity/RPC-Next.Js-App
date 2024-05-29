"use client";
import React from "react";
import Footer from "../components/layouts/primary/footer";
import Header from "../components/layouts/primary/header";
import Blogs from "../components/molecules/blogs";
import DynamiCarousel from "../components/molecules/carousel";
import HomeSearch from "../components/molecules/home-search";
import WhyCHoose from "../components/molecules/whychoose";
import YourList from "../components/molecules/your-llist";
import { Audio } from "react-loader-spinner";

export default async function page() {
  // let arr = ["2BHK", "1RK", "3BHK", "3+BHK", "1BHK"];
  // // SORT 1RK 1BK 2BHK 3BHK 3+BHK
  // arr.sort((a, b) => {
  //   return a - b;
  // });
  // console.log(arr);

  return (
    <div className="h-[100%] w-[100%] flex justify-center items-center flex-col overflow-hidden ">
      <Audio
        height="80"
        width="80"
        color="green"
        ariaLabel="loading"
        wrapperClass="wrapper-class"
      />
      ;
    </div>
  );
}
