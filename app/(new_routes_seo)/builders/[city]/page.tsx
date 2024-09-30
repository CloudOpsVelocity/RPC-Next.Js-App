import React from "react";
import { getPagesSlugs } from "@/app/seo/api";
import path from "path";
import fs from "fs";
import BuildersDirectory from "../components/CitiesBuilder";
type Props = {
 params:{
  city:string
 }
};

export default function Page({params:{
  city
}}: Props) {
  return <BuildersDirectory city={city} />;
}
export async function generateStaticParams() {
  // Get the data (mocked here, replace with your actual data fetching logic)
  const res = await getPagesSlugs("builder-list");

  // Convert the `res` object into a regular object (not a Map)
  const resObject = { ...res };

  const staticDir = path.join(process.cwd(), "static");
  const filePath = path.join(staticDir, "builderSlugs.json");

  // Ensure the 'static' directory exists
  if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir);
  }

  // Convert the object to a JSON string
  const jsonContent = JSON.stringify(resObject, null, 2);

  // Write the JSON content to the file
  fs.writeFileSync(filePath, jsonContent);

  console.log(`JSON data has been saved to ${filePath}`);

  // Prepare the slugs for static generation
  const builderRess = Object.keys(resObject);
  const slugs = builderRess.map((data) => {
    const [staticPath, staticPath2, city, slug] = data.split("/");
    return { city, slug };
  });
  return slugs;
}

export const dynamic = "force-dynamic";
