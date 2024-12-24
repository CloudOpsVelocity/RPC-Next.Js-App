"use client"

import React from "react";
import BlogBanner from "./blogDetailSextion/BlogBanner";
import BlogDetailsBox from "./blogDetailSextion/BlogDetailsBox";
import BlogCarousal from "./blogDetailSextion/BlogCarousal";
import BlogThirdBlock from "./blogDetailSextion/BlogThirdBlock";
import SubscribeBlock from "./blogDetailSextion/SubscribeBlock";

export default function Page() {
  return <div className="h-[100%] w-[100%] mt-[70px] flex flex-col overflow-hidden bg-[#F5F7F8] items-center ">
    <BlogBanner />
    <BlogDetailsBox />
    <BlogCarousal />
    <BlogThirdBlock />
    <SubscribeBlock />
  </div>;
}  
