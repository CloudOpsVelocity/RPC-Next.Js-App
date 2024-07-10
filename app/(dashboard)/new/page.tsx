import React from "react";
import Header from "./components/header";
import HomeSearch from "./components/home-search";

export default function Page() {
  return (
    <div className="h-[100%] w-[100%] flex justify-center items-center flex-col overflow-hidden ">
      <Header />
      <HomeSearch />
    </div>
  );
}
