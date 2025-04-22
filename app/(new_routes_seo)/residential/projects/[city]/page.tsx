import { getPagesSlugs } from "@/app/seo/api";
import React from "react";
import NewSearchPage from "@/app/(new_routes_seo)/search/NewSearchPage";
import { findPathForProjectDetails } from "@/app/(new_routes_seo)/utils/new-seo-routes/project";
import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { city: string; lt: string };
};

export default async function Page({ params: { city, lt } }: Props) {
  const pathname = `${BASE_PATH_PROJECT_DETAILS}/${city}`;
  const value = await findPathForProjectDetails(pathname);
  if (!value) notFound();
  const serverData = await getSearchData();
  return (
    <NewSearchPage
      pageUrl={pathname}
      frontendFilters={{}}
      serverData={serverData}
    />
  );
}
export async function generateMetadata(
  { params }: { params: { city: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { city } = params;

  const cityFormatted = city.charAt(0).toUpperCase() + city.slice(1);

  const title = `Residential Projects Available in  ${cityFormatted} - GRP`;
  const description = `Find the best residential projects in ${cityFormatted}. Explore apartments, Flats, villas, villaments, plots and builder floors. Get verified details.`;

  const url = `https://www.getrightproperty.com/residential/projects/${city}`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url,
      siteName: "Get Right Property",
      type: "website",
      locale: "en_US",
    },
  };
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
      console.log(res.statusText);
      throw new Error(`Error fetching data: ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    console.error(error);
    return null;
  }
};
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
