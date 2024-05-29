import React from "react";
import Footer from "../components/layouts/primary/footer";
import Header from "../components/layouts/primary/header";
import Blogs from "../components/molecules/blogs";
import DynamiCarousel from "../components/molecules/carousel";
import HomeSearch from "../components/molecules/home-search";
import WhyCHoose from "../components/molecules/whychoose";
import YourList from "../components/molecules/your-llist";
export default async function page() {
  // let arr = ["2BHK", "1RK", "3BHK", "3+BHK", "1BHK"];
  // // SORT 1RK 1BK 2BHK 3BHK 3+BHK
  // arr.sort((a, b) => {
  //   return a - b;
  // });
  // console.log(arr);
  return (
    <div className="h-[100%] w-[100%] flex justify-center items-center flex-col overflow-hidden ">
      <Header />
      <HomeSearch />
      <WhyCHoose />
      <DynamiCarousel />
      <YourList />
      <Blogs />
      <input
        type="nu"
        id="last_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Doe"
        required
      />
      <Footer />
    </div>
  );
}
