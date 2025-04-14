import React from "react";
import ProjSearchMainFilterSection from "../components/filters/ProjSearchMainFilterSection";
// import ListingSearhLeftSection from "./components/listingSearchTabs/listingSearchleftSection";
// import ListingSearchRightSection from "./components/listingSearchTabs/listingSearchRightSection";
import ProjectSearchBreadCrumbs from "../components/ProjSearchBreadCrums";
import ListingMainSection from "./components/ListingMainSection";
import { Metadata } from "next";

type Props = {};

export default function Page({}: Props) {
  const isListing = true;
  return (
    <main className="pt-[70px] min-h-[calc(100vh)] relative">
      <div className="relative md:fixed top-0 md:top-[70px] z-auto md:z-10 w-full ">
        <ProjectSearchBreadCrumbs
          key="newSearchPage4"
          pageUrl={"/search/listing"}
        />

        <ProjSearchMainFilterSection
          key="newSearchFilter4"
          isListing={isListing}
        />
      </div>
      <div className="sm:min-w-full xl:m-0 flex justify-between items-start flex-wrap-reverse sm:flex-nowrap relative md:pt-[184px] xl:pt-[220px]  ">
        <ListingMainSection frontendFilters={{}} serverData={null} />
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Explore Properties for Sale & Rent in India | GetRightProperty",
  description:
    "Browse verified real estate listings across India. Find your perfect home or investment property with GetRightProperty's user-friendly search tools.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Explore Properties for Sale & Rent in India | GetRightProperty",
    url: "https://www.getrightproperty.com/search/listing",
    type: "website",
    images:
      "https://media.getrightproperty.com/staticmedia-images-icons/grp-logo/grp-logo-tm.webp",
    description:
      "Browse verified real estate listings across India. Find your perfect home or investment property with GetRightProperty's user-friendly search tools.",
  },
  alternates: {
    canonical: "https://www.getrightproperty.com/search/listing",
  },
};
export const dynamic = "force-dynamic";
export const dynamicParams = true;
