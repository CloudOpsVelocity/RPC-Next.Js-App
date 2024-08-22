import { getPagesSlugs } from "@/app/seo/api";
import React from "react";

type Props = {};

export default function Page({}: Props) {
  return <div>Page</div>;
}

export async function generateStaticParams() {
  const res = await getPagesSlugs("project-list");
  const builderRess = Object.keys(res);
  const slugs = builderRess.map((data: any) => ({
    city: data.split("/")[2],
  }));
  return slugs;
}
