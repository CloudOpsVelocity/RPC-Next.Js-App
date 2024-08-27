import { getPagesSlugs } from "@/app/seo/api";
import React from "react";

type Props = {};

export default function Page({}: Props) {
  return <div>category type</div>;
}
export async function generateStaticParams() {
  // Get the data (mocked here, replace with your actual data fetching logic)
  const res = await getPagesSlugs("listing-search-seo");
  // Extract project names from the keys
  const projectRes = Object.keys(res);
  const slugs = projectRes.map((data) => {
    if (data.includes("/in/for/")) {
      const [emtypath, country, cg, city, lt, slug] = data.split("/");
      return { cg };
    }
  });
  return slugs;
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
