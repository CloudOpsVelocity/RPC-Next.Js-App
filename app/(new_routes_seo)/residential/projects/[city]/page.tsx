import { getPagesSlugs } from "@/app/seo/api";
import path from "path";
import React from "react";
import fs from "fs";
import ProjectSearchPage from "@/app/(dashboard)/search/Page/ProjectSearchPage";
type Props = {
  params: { city: string; lt: string };
};
export const dynamic = "force-dynamic";
export default async function Page({ params: { city, lt } }: Props) {
  const serverData = await getSearchData();
  return <ProjectSearchPage serverData={serverData} />;
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
