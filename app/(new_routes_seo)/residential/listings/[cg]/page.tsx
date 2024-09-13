import ProjectSearchPage from "@/app/(dashboard)/search/Page/ProjectSearchPage";
import { getProjSearchData } from "@/app/(new_routes_seo)/in/utils/api";
import { generateSlugs } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import React from "react";

type Props = {};

export default async function Page({}: Props) {
  const severData = await getProjSearchData(``);
  return <ProjectSearchPage serverData={severData} frontendFilters={{}} />;
}
export async function generateStaticParams() {
  const slugs = await generateSlugs("listing-search-seo");
  console.log(slugs, "it is from cg route.tsx");
  return slugs;
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
