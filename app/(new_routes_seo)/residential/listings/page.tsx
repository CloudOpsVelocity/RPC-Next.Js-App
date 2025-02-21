import React from "react";
import ProjectSearchPage from "@/app/(dashboard)/searchOldPage/Page/ProjectSearchPage";
import { getProjSearchData } from "@/app/(new_routes_seo)/in/utils/api";
import NewSearchPage from "../../search/NewSearchPage";

type Props = {
  params: {
    cg: string;
    city: string;
    lt: string;
  };
};

export default async function Page({ params: { cg, city } }: Props) {
  const severData = await getProjSearchData(``);
  const pathname = `/residential/listings`;
  const pageUrl = `${process.env.NEXT_PUBLIC_URL}/${pathname}`;
  return (
    <NewSearchPage
      pageUrl={pageUrl}
      serverData={severData}
      frontendFilters={{}}
    />
  );
}
