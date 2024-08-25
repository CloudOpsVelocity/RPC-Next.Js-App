import Header from "@/app/components/layouts/primary/header";
import React from "react";
import { SearchAndFilterCon } from "../components/searchAndFilterCon";
import Footer from "@/app/components/layouts/primary/footer";
import { Toaster } from "react-hot-toast";
import { RightSideBlock } from "../components/rightSideBlock";
import { LeftSideBlock } from "../components/leftsection/leftSideBlock";

type Props = {};

export default function ProjectSearchPage({}: Props) {
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
}
