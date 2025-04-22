import React from "react";
import ProjSearchMainFilterSection from "./components/filters/ProjSearchMainFilterSection";
import ProjectSearchBreadCrumbs from "./components/ProjSearchBreadCrums";
import Mainsection from "./components/Mainsection";
import { Metadata } from "next";
type Props = {};

export default function Page({}: Props) {
  const isListing = false;
  return (
    <main className="pt-[70px] min-h-[calc(100vh)] relative ">
      <meta name="robots" content="index, follow" />
      <div className="relative md:fixed top-0 md:top-[70px] z-auto md:z-10 w-full ">
        <ProjectSearchBreadCrumbs key="newSearchPage2" pageUrl={"/search"} />
        <ProjSearchMainFilterSection
          isListing={isListing}
          key="newSearchFilter2"
        />
      </div>
      <div className=" sm:min-w-full xl:m-0 flex justify-between items-start flex-wrap-reverse sm:flex-nowrap relative md:pt-[184px] xl:pt-[226px] ">
        <Mainsection frontendFilters={{}} serverData={null} />
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Explore Projects for Sale & Rent in India | GetRightProperty",
  description:
    "Browse verified real estate listings across India. Find your perfect home or investment property with GetRightProperty's user-friendly search tools.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Explore Projects for Sale & Rent in India | GetRightProperty",
    url: "https://www.getrightproperty.com/search/",
    type: "website",
    images:
      "https://media.getrightproperty.com/staticmedia-images-icons/grp-logo/grp-logo-tm.webp",
    description:
      "Browse verified real estate listings across India. Find your perfect home or investment property with GetRightProperty's user-friendly search tools.",
  },
  alternates: {
    canonical: "https://www.getrightproperty.com/search",
  },
};
export const dynamic = "force-dynamic";
export const dynamicParams = true;
