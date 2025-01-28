"use client"

import React from "react";
import MarketBanner from "./components/MarketBanner";
import MarketSections from "./components/MarketSections";
import MarketNavigator from "./components/MarketNavigator";

export default function Page() {
  return <div className="h-[100%] w-[100%] mt-[70px] flex flex-col overflow-hidden items-center ">
    <MarketBanner />
    <MarketNavigator />
    <MarketSections />
  </div>;
}  
