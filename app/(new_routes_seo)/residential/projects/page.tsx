import React from "react";
import NewSearchPage from "@/app/(new_routes_seo)/search/NewSearchPage";
import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";
type Props = {
  params: { city: string; lt: string };
};
export const dynamic = "force-dynamic";
export default async function Page({ params: { city, lt } }: Props) {
  const pathname = `${BASE_PATH_PROJECT_DETAILS}`;
  const serverData = await getSearchData();
  return (
    <NewSearchPage
      pageUrl={`residential/projects`}
      frontendFilters={{}}
      serverData={serverData}
    />
  );
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
