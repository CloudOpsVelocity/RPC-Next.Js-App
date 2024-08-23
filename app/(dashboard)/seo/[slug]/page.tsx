import { getPagesSlugs } from "@/app/seo/api";
import React, { Suspense } from "react";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import ProjectSearchPage from "../../search/Page/ProjectSearchPage";
type Props = {
  params: { slug: string };
};
async function getSeoSlugs(pathname: string) {
  const staticDir = path.join(process.cwd(), "static");
  const filePath = path.join(staticDir, "seoSlugs.json");

  try {
    // Read the JSON file asynchronously
    const jsonData = await fs.readFileSync(filePath, "utf-8");
    const builderJsonData = JSON.parse(jsonData);
    return builderJsonData[pathname];
  } catch (error) {
    console.error("Error reading or parsing file:", error);
    return null;
  }
}
export default async function Page({ params }: Props) {
  const seoSlugs = await getSeoSlugs(params.slug);
  if (!seoSlugs) {
    notFound();
  }
  return (
    // <div>
    //   <ProjectSearchPage />
    // </div>
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectSearchPage />
    </Suspense>
  );
}

export async function generateStaticParams() {
  const res = {
    "5-bhk-plot-for-buy-in-bengaluru": "683%B_32%P_S%CG_9%C",
    "3-bhk-with-servant-apartment-in-rainbow-drive": "46%B_35%P_456%L",
    "3-bhk-villament-for-buy-in-nagasandra": "45%B_34%P_S%CG_419%L",
    "5-bhk-independent-house/building-in-kpc-layout": "683%B_36%P_366%L",
    "1-rk-flat-for-sale-in-sadashiva-nagar-bengaluru":
      "40%B_35%P_S%CG_481%L_9%C",
    "3-bhk-with-servant-row-house-for-buy-in-cooke-town":
      "46%B_33%P_S%CG_147%L",
    "4.5-bhk-with-servant-villa-for-sale-in-ashwath-nagar":
      "682%B_31%P_S%CG_53%L",
    "5-bhk-with-servant-for-sale-in-thyagarajanagar": "684%B_S%CG_534%L",
    "villa-for-buy-in-itc-factory": "31%P_S%CG_266%L",
    "villament-for-rent-in-hennur-bengaluru": "34%P_R%CG_226%L_9%C",
    "4-bhk-villa-for-buy-in-peenya-bengaluru": "49%B_31%P_S%CG_447%L_9%C",
    "4.5-bhk-villament-for-sale-in-sadduguntepalya": "681%B_34%P_S%CG_482%L",
  };
  // Convert the `res` object into a regular object (not a Map)
  const resObject = { ...res };

  const staticDir = path.join(process.cwd(), "static");
  const filePath = path.join(staticDir, "seoSlugs.json");

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
  const slugs = builderRess.map((data) => ({
    slug: data.replace(/\//g, ""),
  }));
  console.log(slugs);
  return slugs;
}
