import React from "react";
import LeftSection from "./components/ProjectSearchLeftSection";
import RightSection from "./components/ProjectSearchRightSection";
import ProjSearchMainFilterSection from "./components/filters/ProjSearchMainFilterSection";
import ProjectSearchBreadCrumbs from "./components/ProjSearchBreadCrums";
type Props = {};

export default function Page({}: Props) {
  console.log(2);

  return (
    <main className="pt-[70px] mt-[10%] sm:mt-0 sm:pt-[9%] min-h-[calc(100vh)]">
      <div className="fixed top-[6.5%] z-10 w-full ">
        <ProjectSearchBreadCrumbs
          items={[
            {
              href: "/",
              label: "Home",
            },
          ]}
        />
        <ProjSearchMainFilterSection />
      </div>
      <div className=" sm:min-w-full mx-2  xl:m-0 flex justify-center flex-wrap-reverse sm:flex-nowrap relative">
        {/* <LeftSection /> */}
        <div className="w-[100%] sm:w-[50%]"></div>
        <RightSection />
      </div>
    </main>
  );
}
