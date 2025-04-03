import React from "react";
import { getSearchData } from "@/app/(new_routes_seo)/in/utils/api";
import NewSearchPage from "../../search/NewSearchPage";

export default async function Page() {
  const severData = await getSearchData(``);
  const pathname = `residential-listings`;
  const pageUrl = `${pathname}`;
  return (
    <NewSearchPage
      pageUrl={pageUrl}
      serverData={severData}
      frontendFilters={{
        listedBy: "All",
        cg: "S",
      }}
    />
  );
}
