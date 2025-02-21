import { getPagesSlugs } from "@/app/seo/api";
import React from "react";
import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";
import {
  extractProjectParamsValues,
  findPathForProjectDetails,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/project";
import { notFound } from "next/navigation";
import NewSearchPage from "@/app/(new_routes_seo)/search/NewSearchPage";
type Props = {
  params: { city: string; lt: string; slug: string };
};
export default async function Page({ params: { city, lt } }: Props) {
  const pathname = `${BASE_PATH_PROJECT_DETAILS}/${city}/${lt}`;
  const value = await findPathForProjectDetails(pathname);
  if (!value) notFound();
  const filterValues = extractProjectParamsValues(value);

  const serverData = await getSearchData(filterValues.LT as string);
  return (
    <>
      <NewSearchPage
        pageUrl={pathname}
        serverData={serverData}
        frontendFilters={{
          localities: [`${lt}+${filterValues.LT}`],
        }}
      />
    </>
  );
}
export async function generateStaticParams() {
  const res = await getPagesSlugs("project-list");
  const keys = Object.keys(res);
  const slugs = [];
  for (let i = 0; i < keys.length; i++) {
    const data = keys[i];
    if ((data.match(/\//g) || []).length === 4) {
      const [staticPath, staticPath2, sta3, city, lt, slug] = data.split("/");
      slugs.push({ city, lt });
    }
  }
  return slugs;
  // const slugs = keys.map((data) => {
  //   const [staticPath, staticPath2, sta3, city, lt, slug] = data.split("/");
  //   return { city, lt };
  // });
  // return slugs;
}

export const dynamic = "force-dynamic";
const getSearchData = async (locality: string) => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/searchproj?page=0&city=9&localities=${locality}&cg=S`;
    console.log(baseUrl);
    const url = `${baseUrl}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
