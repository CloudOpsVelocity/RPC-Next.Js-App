import React from "react";
import LeftSection from "./components/ProjectSearchLeftSection";
import RightSection from "./components/ProjectSearchRightSection";
import ProjSearchMainFilterSection from "./components/filters/ProjSearchMainFilterSection";
import ProjectSearchBreadCrumbs from "./components/ProjSearchBreadCrums";
import Mainsection from "./components/Mainsection";
type Props = {};

export default function Page({}: Props) {
  const isListing = false;
  return (
    <main className="pt-[70px] min-h-[calc(100vh)] relative ">
      <div className="relative md:fixed top-0 md:top-[70px] z-auto md:z-10 w-full ">
        <ProjectSearchBreadCrumbs key="newSearchPage2" pageUrl={"/search"} />
        <ProjSearchMainFilterSection
          isListing={isListing}
          key="newSearchFilter2"
        />
      </div>
      <div className=" sm:min-w-full xl:m-0 flex justify-between items-start flex-wrap-reverse sm:flex-nowrap relative md:pt-[154px] xl:pt-[190px] ">
        <Mainsection frontendFilters={{}} serverData={null} />
      </div>
    </main>
  );
}
