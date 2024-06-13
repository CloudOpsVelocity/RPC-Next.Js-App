import React, { useEffect, useLayoutEffect, useState } from "react";
import Footer from "../components/layouts/primary/footer";
import Header from "../components/layouts/primary/header";
import Blogs from "../components/molecules/blogs";
import DynamiCarousel from "../components/molecules/carousel";
import HomeSearch from "../components/molecules/home-search";
import WhyCHoose from "../components/molecules/whychoose";
import YourList from "../components/molecules/your-llist";
import Section from "./components/Section/Section";
export default async function page() {
  let arr = [1, 2, 3, 3, 4];

  //  filter find findIndex I need to complete it

  return (
    <div className="h-[100%] w-[100%] flex justify-center items-center flex-col overflow-hidden ">
      <Section />
      <Header />
      <HomeSearch />
      <WhyCHoose />
      <DynamiCarousel />
      <YourList />
      <Blogs />
      <Footer />
    </div>
  );
}
