import React from "react";
import NewSearchPage from "@/app/(new_routes_seo)/search/NewSearchPage";
import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";
import { Metadata } from "next";
type Props = {
  params: { city: string; lt: string };
};
export const dynamic = "force-dynamic";
// eslint-disable-next-line no-unused-vars
export default async function Page({ params: { city, lt } }: Props) {
  const pathname = `${BASE_PATH_PROJECT_DETAILS}`;
  const serverData = await (await getSearchData()).results;
  return (
    <NewSearchPage
      pageUrl={pathname}
      frontendFilters={{}}
      serverData={serverData}
    />
  );
}

const getSearchData = async () => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/searchproj?page=0&city=9`;

    const url = `${baseUrl}`;

    const res = await fetch(url, {
      cache: "no-cache",
    });

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
export async function generateMetadata(): Promise<Metadata> {
  const title = `Residential Projects Available in Bengaluru - GRP`;
  const description = `Find the best residential projects in Bengaluru. Explore apartments, Flats, villas, villaments, plots and builder floors. Get verified details.`;
  const url = `https://www.getrightproperty.com/residential/projects`;
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
