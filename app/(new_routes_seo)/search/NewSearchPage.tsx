import React from "react";
import LeftSection from "./components/ProjectSearchLeftSection";
import RightSection from "./components/ProjectSearchRightSection";
import ProjSearchMainFilterSection from "./components/filters/ProjSearchMainFilterSection";
import ProjectSearchBreadCrumbs from "./components/ProjSearchBreadCrums";
import FloatingArrowIcon from "./components/ProjectSearchTabs/FloatingArrowIcon";
type Props = {
  serverData: any;
  frontendFilters: any;
};

export default function NewSearchPage({ serverData, frontendFilters }: Props) {
  console.log(1);
  return (
    <main className="pt-[70px] min-h-[calc(100vh)] relative ">
      <div className="relative md:fixed top-0 md:top-[70px] z-auto md:z-10 w-full ">
        <ProjectSearchBreadCrumbs />
        <ProjSearchMainFilterSection isListing={false} />
      </div>

      <div className=" sm:min-w-full xl:m-0 flex justify-between items-start flex-wrap-reverse sm:flex-nowrap relative md:pt-[154px] xl:pt-[190px] ">
        <LeftSection
          serverData={serverData}
          frontendFilters={frontendFilters}
        />
        <div className="w-[100%] sm:w-[50%] -z-10" />
        <RightSection serverData={serverData} />
      </div>

      <FloatingArrowIcon />
    </main>
  );
}
