import { getPagesSlugs } from "@/app/seo/api";
import React from "react";

type Props = {};

export default function Page({}: Props) {
  return <div>Page</div>;
}

export async function generateStaticParams() {
  const res = await getPagesSlugs("project-list");
  const keys = Object.keys(res);
  const slugs = keys.map((data) => {
    const [staticPath, staticPath2, city, lt, slug] = data.split("/");
    return { city, lt, slug };
  });
  return slugs;
}

export const dynamic = "force-dynamic";
