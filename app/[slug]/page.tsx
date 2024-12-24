import React from "react";
import fs from "fs";
import path from "path";
import { getPagesSlugs } from "../seo/api";
import ProjectSearchPage from "../(dashboard)/search/Page/ProjectSearchPage";
import { notFound } from "next/navigation";
import { getProjSearchData } from "../(new_routes_seo)/in/utils/api";
import { findSeoParams, extractCaseSeoParams } from "./_utils/findParams";
type Props = {
  slug: string;
};

export default async function Page({ slug }: Props) {
  // const values = await findSeoParams(slug);
  // console.log(values);
  // if (!values) return notFound();
  // const slugValues = extractCaseSeoParams(values);
  // const severData = await getProjSearchData(`cg=${slugValues.CG}`);
  return (
    <div>Bag Request</div>
    // <ProjectSearchPage
    //   serverData={severData}
    //   frontendFilters={{
    //     cg: slugValues.CG,
    //   }}
    // />
  );
}
//   // Write the JSON data to the file
//   fs.writeFileSync(filePath, jsonContent);
//   console.log("projectSlugs.json file created successfully");
//   const slugs = Object.keys(res);
//   return slugs.map((slug) => ({ slug }));
// };
// export const dynamic = "force-dynamic";
// export const dyamicParams = true;
