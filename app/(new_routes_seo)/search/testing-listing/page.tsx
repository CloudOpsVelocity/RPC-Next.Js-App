import React from "react";
import ProjectSearchBreadCrumbs from "../components/ProjSearchBreadCrums";
import ListingMainSection from "./components/ListingMainSection";
import { ListingSearchSchema } from "@/app/seo/search/listing-search.schema";
import ListingHeaderFilters from "./components/ListingSearchHeader";
type Props = {};

export default function Page({}: Props) {
  const isListing = true;
  const pageUrl = "/search/listing";
  const serverData = null;

  return (
    <main className="pt-[70px] min-h-[calc(100vh)] relative">
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_URL}/${pageUrl}`}
      />
      {serverData && <ListingSearchSchema properties={serverData} />}
      <div className="relative md:fixed top-0 md:top-[70px] z-auto md:z-10 w-full ">
        <ProjectSearchBreadCrumbs key="newSearchPage3" pageUrl={pageUrl} />

        <div className="flex flex-row items-start gap-2">
          <ListingHeaderFilters key="newSearchFilter3" isListing={isListing} />
        </div>
      </div>
      <div className="sm:min-w-full xl:m-0 flex justify-between items-start flex-wrap-reverse sm:flex-nowrap relative md:pt-[184px] xl:pt-[220px]  ">
        <ListingMainSection frontendFilters={{}} serverData={serverData} />
      </div>
    </main>
  );
}
