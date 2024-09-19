import React from "react";
import ProjectSearchPage from "@/app/(dashboard)/search/Page/ProjectSearchPage";
import { getProjSearchData } from "@/app/(new_routes_seo)/in/utils/api";

type Props = {
  params: {
    cg: string;
    city: string;
    lt: string;
  };
};

export default async function Page({ params: { cg, city } }: Props) {
  const severData = await getProjSearchData(``);
  return <ProjectSearchPage serverData={severData} frontendFilters={{}} />;
}
