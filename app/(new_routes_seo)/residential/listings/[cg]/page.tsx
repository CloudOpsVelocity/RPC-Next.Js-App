import { generateSlugs } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import React from "react";

type Props = {};

export default function Page({}: Props) {
  return <div>category type</div>;
}
export async function generateStaticParams() {
  const slugs = await generateSlugs("listing-search-seo", 0, 1);
  console.log(slugs, "it is from cg route.tsx");
  return slugs;
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
