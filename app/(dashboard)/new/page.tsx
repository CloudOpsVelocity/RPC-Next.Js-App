import React from "react";
import Header from "./components/header";
import HomeSearch from "./components/home-search";
import HomeFeatures from "./components/features";
import NewAddedProjects from "./components/newly-added-projects";

export default function Page() {
  return (
    <div className="h-[100%] w-[100%] flex  flex-col overflow-hidden bg-[#F5F7F8] pb-24">
      <Header />
      <HomeSearch />
      <div className="h-[153px] shrink-0 bg-[#e2e2e266] w-full"></div>
      <HomeFeatures />
      <NewAddedProjects />
    </div>
  );
}
