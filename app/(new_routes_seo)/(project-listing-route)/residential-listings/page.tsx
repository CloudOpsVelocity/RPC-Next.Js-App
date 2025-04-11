import React from "react";
import { getSearchData } from "@/app/(new_routes_seo)/in/utils/api";
// import NewSearchPage from "../../search/NewSearchPage";
import NewListingSearchpage from "../../search/listing/NewListingSearchpage";

export default async function Page() {
  const severData = await getSearchData(``);
  const pathname = `/residential-listings`;
  const pageUrl = `${pathname}`;
  return (
    <NewListingSearchpage
      pageUrl={pageUrl}
      serverData={severData}
      frontendFilters={{}}
      showProjectTab={true}
    />
  );
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;
