import React from "react";
import { generateHomePageSlugs } from "../../utils/new-seo-routes/home";

type Props = {};

export default function Page({}: Props) {
  return <div>Page</div>;
}

// export async function generateStaticParams() {
//   const slugs = await generateHomePageSlugs("project");
//   console.log("slug from home page", slugs);
//   return slugs;
// }

// export const dynamicParams = true;
