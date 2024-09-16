import { getPagesSlugs } from "@/app/seo/api";
import path from "path";
import React from "react";
import fs from "fs";
import ProjectSearchPage from "@/app/(dashboard)/search/Page/ProjectSearchPage";
type Props = {
  params: { city: string; lt: string };
};

export default async function Page({ params: { city, lt } }: Props) {
  const serverData = await getSearchData();
  return <ProjectSearchPage serverData={serverData} />;
}
const getSearchData = async (): Promise<any> => {
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

export const dynamic = "force-dynamic";
