import React from "react";
import Footer from "../components/layouts/primary/footer";
import Header from "../components/layouts/primary/header";
import Blogs from "../components/molecules/blogs";
import DynamiCarousel from "../components/molecules/carousel";
import HomeSearch from "../components/molecules/home-search";
import WhyCHoose from "../components/molecules/whychoose";
import YourList from "../components/molecules/your-llist";
export default async function page() {
  let arr = [1, 2, 3, 4, 5, 6];
  let target = 5;
  let recursive_fn = (arr: number[], target: number) => {
    let start = 0;
    let end = arr.length - 1;
  };

  return (
    <div className="h-[100%] w-[100%] flex justify-center items-center flex-col overflow-hidden ">
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
