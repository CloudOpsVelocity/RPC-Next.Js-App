import React from "react";
import LeftSection from "./components/ProjectSearchLeftSection";
import RightSection from "./components/ProjectSearchRightSection";
import ProjSearchMainFilterSection from "./components/filters/ProjSearchMainFilterSection";
import ProjectSearchBreadCrumbs from "./components/ProjSearchBreadCrums";

import { ProjectSeachSchema } from "@/app/seo/search/project-search.schema";
type Props = {
  serverData: any;
  frontendFilters: any;
  pageUrl: string;
};

export default function NewSearchPage({
  serverData,
  frontendFilters,
  pageUrl,
}: Props) {
  const isListing = false;
  return (
    <main className="pt-[70px] min-h-[calc(100vh)] relative ">
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_URL}/${pageUrl}`}
      />
      {serverData && (
        <ProjectSeachSchema properties={serverData} pageUrl={pageUrl} />
      )}
      <div className="relative md:fixed top-0 md:top-[70px] z-auto md:z-10 w-full ">
        <ProjectSearchBreadCrumbs key="newSearchPage1" pageUrl={pageUrl} />
        <ProjSearchMainFilterSection
          isListing={isListing}
          key="newSearchFilter1"
        />
      </div>

      <div className=" sm:min-w-full xl:m-0 flex justify-between items-start flex-wrap-reverse sm:flex-nowrap relative md:pt-[154px] xl:pt-[190px] ">
        <LeftSection
          serverData={serverData}
          frontendFilters={frontendFilters}
        />
        <div className="w-[100%] sm:w-[50%] -z-10" />
        <RightSection serverData={serverData} key="projRightSection2" />
      </div>
    </main>
  );
}
