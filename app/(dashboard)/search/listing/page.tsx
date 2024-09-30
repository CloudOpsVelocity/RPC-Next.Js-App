import React from "react";
import Header from "@/app/components/layouts/primary/header";
import SearchAndFilterCon from "./components/searchAndFilterCon";
import { LeftSideBlock } from "./components/leftSideBlock";
import LoginPopup from "@/app/components/project/modals/LoginPop";
import Footer from "@/app/components/layouts/primary/footer";
import { Toaster } from "react-hot-toast";
import RequestCallBackModal from "@/app/components/molecules/popups/req";
import SharePopup from "../components/SharePopup";
const SearchingPage = () => {
  return (
    <div>
      <Header />
      <SearchAndFilterCon />
      <div className="  xl:m-0 flex justify-center flex-wrap-reverse sm:flex-nowrap">
        <LeftSideBlock />
      </div>
      <Footer />
      <Toaster />
      <RequestCallBackModal />
      <LoginPopup />
      <SharePopup />
    </div>
  );
};

export default SearchingPage;
