import React from "react";
import Header from "@/app/components/layouts/primary/header";
import { SearchAndFilterCon } from "./components/searchAndFilterCon";
import { LeftSideBlock } from "./components/leftSideBlock";
import { RightSideBlock } from "./components/rightSideBlock";
import Footer from "@/app/components/layouts/primary/footer";
import { Toaster } from "react-hot-toast";
const SearchingPage = () => {
  return (
    <div className="w-full flex flex-col ">
      <Header />
      <SearchAndFilterCon />
      <div className=" w-[100%] flex  flex-wrap-reverse ">
        <LeftSideBlock />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default SearchingPage;
