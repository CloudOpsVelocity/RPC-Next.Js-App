import { getPagesSlugs } from "@/app/seo/api";
import React from "react";
import fs from "fs";
import path from "path";
import { getSearchData } from "@/app/(new_routes_seo)/in/utils/api";
import ListingSearchPage from "@/app/(dashboard)/search/listing/Page/ListingSearchPage";
import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";
import {
  extractProjectParamsValues,
  findPathForProjectDetails,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/project";
type Props = {
  params: {
    city: string;
    lt: string;
    slug: string;
    phase: string;
    prop_type: string;
    unit_type: string;
  };
};

export default async function Page({
  params: { city, lt, slug, phase, prop_type, unit_type },
}: Props) {
  const pathname = `${BASE_PATH_PROJECT_DETAILS}/${city}/${lt}/${slug}/${phase}/${prop_type}/${unit_type}`;
  const value = await findPathForProjectDetails(pathname);
  const filterValues = extractProjectParamsValues(value);
  const serverData = await getSearchData(
    `projIdEnc=${filterValues.PJ}&propType=${filterValues.PT}&bhk=${filterValues.BH}`
  );
  return (
    <ListingSearchPage
      serverData={serverData}
      frontendFilters={{
        locality: [`${lt}+${filterValues.LT}`],
        projName: slug,
        projIdEnc: filterValues.PJ,
        propTypes: parseInt(filterValues.PT as string),
        unitTypes: [parseInt(filterValues.BH as string)],
      }}
    />
  );
}
export async function generateStaticParams() {
  const res = await getPagesSlugs("project-list");
  const keys = Object.keys(res);
  const slugs = keys.map((data) => {
    const [
      staticPath,
      staticPath2,
      city,
      lt,
      slug,
      phase,
      prop_type,
      unit_type,
    ] = data.split("/");
    return { city, lt, slug, phase, prop_type, unit_type };
  });
  return slugs;
}

export const dynamic = "force-dynamic";
