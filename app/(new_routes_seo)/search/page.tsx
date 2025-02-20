import React from "react";
import LeftSection from "./components/ProjectSearchLeftSection";
import RightSection from "./components/ProjectSearchRightSection";
import ProjSearchMainFilterSection from "./components/filters/ProjSearchMainFilterSection";
import ProjectSearchBreadCrumbs from "./components/ProjSearchBreadCrums";
type Props = {};

export default function Page({}: Props) {
  return (
    <main className="pt-[70px] min-h-[calc(100vh)] relative ">
      <div className="relative md:fixed top-0 md:top-[70px] z-auto md:z-10 w-full ">
        <ProjectSearchBreadCrumbs pageUrl={"/search"} />
        <ProjSearchMainFilterSection isListing={false} />
      </div>
      <div className=" sm:min-w-full xl:m-0 flex justify-between items-start flex-wrap-reverse sm:flex-nowrap relative md:pt-[154px] xl:pt-[190px] ">
        <LeftSection />
        <div className="w-[100%] sm:w-[50%] -z-10" />
        <RightSection />
      </div>
    </main>
  );
}
