"use client"

import React from "react";
import Header from "../components/layouts/primary/header";
import BlogBanner from "./BlogBanner";
import BlogDetailsBox from "./blogDetailSextion/BlogDetailsBox";
import BlogCarousal from "./blogDetailSextion/BlogCarousal";
import BlogThirdBlock from "./blogDetailSextion/BlogThirdBlock";
import SubscribeBlock from "./blogDetailSextion/SubscribeBlock";
import Footer from "../components/layouts/primary/footer";

export default function Page() {
  return <div className="h-[100%] w-[100%] flex flex-col overflow-hidden bg-[#F5F7F8] items-center ">
    <Header />
    <BlogBanner />
    <BlogDetailsBox />
    <BlogCarousal />
    <BlogThirdBlock />
    <SubscribeBlock />
    <Footer />
  </div>;
}
