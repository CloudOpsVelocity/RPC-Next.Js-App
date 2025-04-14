import { getPagesSlugs } from "@/app/seo/api";
import React from "react";
import NewSearchPage from "@/app/(new_routes_seo)/search/NewSearchPage";
import { findPathForProjectDetails } from "@/app/(new_routes_seo)/utils/new-seo-routes/project";
import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";
import { notFound } from "next/navigation";
type Props = {
  params: { city: string; lt: string };
};
export const dynamic = "force-dynamic";
export default async function Page({ params: { city, lt } }: Props) {
  const pathname = `${BASE_PATH_PROJECT_DETAILS}/${city}`;
  const value = await findPathForProjectDetails(pathname);
  if (!value) notFound();
  const serverData = await getSearchData();
  return (
    <NewSearchPage
      pageUrl={`residential/projects/${city}`}
      frontendFilters={{}}
      serverData={serverData}
    />
  );
}

export async function generateStaticParams() {
  const res = await getPagesSlugs("project-list");
  const keys = Object.keys(res);
  const slugs = [];
  for (let i = 0; i < keys.length; i++) {
    const data = keys[i];
    if ((data.match(/\//g) || []).length === 3) {
      const [staticPath, staticPath2, sta3, city] = data.split("/");
      slugs.push({ city });
    }
  }
  return slugs;
}
const getSearchData = async () => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/searchproj?page=0&city=9`;

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
