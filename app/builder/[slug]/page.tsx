import React from "react";
import { notFound } from "next/navigation";

import fs from "fs";
import path from "path";
import { headers } from "next/headers";
// import { getBuilderDetailsPageData } from "@/app/utils/api/builder";
async function getBuilderSlug(pathname: string) {
  const staticDir = path.join(process.cwd(), "static");
  const filePath = path.join(staticDir, "builderSlugs.json");

  try {
    // Read the JSON file asynchronously
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const builderJsonData = JSON.parse(jsonData);
    return builderJsonData[pathname];
  } catch (error) {
    console.error("Error reading or parsing file:", error);
    return null;
  }
}
export default async function Page() {
  const nextHeader = headers();
  const pathname = `${nextHeader.get("x-current-path")}`;
  const id = await getBuilderSlug(pathname);
  console.log(id);
  if (!id) {
    notFound();
  }
  // const data = await getBuilderDetailsPageData(id);
  // return <BuilderPage data={data} />;
  return <div></div>;
}

//  builder0 = state / project0 project in locality

// export async function generateStaticParams() {
//   // Get the data (mocked here, replace with your actual data fetching logic)
//   const res = await getPagesSlugs("builder-list");

//   // Convert the `res` object into a regular object (not a Map)
//   const resObject = { ...res };

//   const staticDir = path.join(process.cwd(), "static");
//   const filePath = path.join(staticDir, "builderSlugs.json");

//   // Ensure the 'static' directory exists
//   if (!fs.existsSync(staticDir)) {
//     fs.mkdirSync(staticDir);
//   }

//   // Convert the object to a JSON string
//   const jsonContent = JSON.stringify(resObject, null, 2);

//   // Write the JSON content to the file
//   fs.writeFileSync(filePath, jsonContent);

//   console.log(`JSON data has been saved to ${filePath}`);

//   // Prepare the slugs for static generation
//   const builderRess = Object.keys(resObject);
//   const slugs = builderRess.map((data) => ({
//     slug: data.replace(/\//g, ""),
//   }));
//   console.log(slugs);
//   return slugs;
// }
