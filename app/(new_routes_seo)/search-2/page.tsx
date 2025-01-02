import React from "react";
import LeftSection from "./components/ProjectSearchLeftSection";
import RightSection from "./components/ProjectSearchRightSection";
import ProjSearchMainFilterSection from "./components/filters/ProjSearchMainFilterSection";
import ProjectSearchBreadCrumbs from "./components/ProjSearchBreadCrums";
type Props = {};

export default function Page({}: Props) {
  return (
    <main className="pt-[6%] mt-[10%] sm:mt-0 sm:pt-[3.7%]">
      <ProjectSearchBreadCrumbs
        items={[
          {
            href: "/",
            label: "Home",
          },
        ]}
      />
      <ProjSearchMainFilterSection />
      <div className="max-w-[98%] sm:w-[99%] mx-2  xl:m-0 flex justify-center flex-wrap-reverse sm:flex-nowrap ">
        <LeftSection />
        <RightSection />
      </div>
    </main>
  );
}
