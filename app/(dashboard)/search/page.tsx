import React from "react";
import Header from "../components/layouts/primary/header";
import { SearchAndFilterCon } from "./components/searchAndFilterCon";
import { LeftSideBlock } from "./components/leftSideBlock";
import { RightSideBlock } from "./components/rightSideBlock";
import Footer from "../components/layouts/primary/footer";
type Props = { searchParams: {} };
const SearchingPage = ({ searchParams }: Props) => {
  return (
    <div className="w-full flex justify-center items-center flex-col ">
      <Header />
      <SearchAndFilterCon />
      <div className=" w-[100%] flex justify-center items-center ">
        <LeftSideBlock />
        <RightSideBlock />
      </div>
      <Footer />
    </div>
  );
};

export default SearchingPage;
