import React from "react";
import Header from "@/app/components/layouts/primary/header";
import SearchAndFilterCon from "./components/searchAndFilterCon";
import { LeftSideBlock } from "./components/leftsection/leftSideBlock";
import { RightSideBlock } from "./components/rightSideBlock";
import Footer from "@/app/components/layouts/primary/footer";
import { Toaster } from "react-hot-toast";
import Dialog from "@/app/test/newui/components/modals/Proj_PropModal";
type Props = { searchParams: {} };
const SearchingPage = ({ searchParams }: Props) => {
  return (
    <div className="w-full flex justify-center items-center flex-col ">
      <Header />
      <SearchAndFilterCon />
      <div className=" w-[100%] mx-2  xl:m-0 flex justify-center flex-wrap-reverse sm:flex-nowrap">
        <LeftSideBlock />
        <RightSideBlock />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default SearchingPage;
