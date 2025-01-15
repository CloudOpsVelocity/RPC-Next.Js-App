import React from "react";
import fs from "fs";
import path from "path";
import { getPagesSlugs } from "../seo/api";
import ProjectSearchPage from "../(dashboard)/searchOldPage/Page/ProjectSearchPage";
import { notFound } from "next/navigation";
import {
  getNewProjSearchData,
  getProjSearchData,
} from "../(new_routes_seo)/in/utils/api";
import { findSeoParams, extractCaseSeoParams } from "./_utils/findParams";
import { Metadata } from "next";
import { ResolvingMetadata } from "next";
import NewSearchPage from "../(new_routes_seo)/search/NewSearchPage";
type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    sf: string;
  };
};
// function xorEncrypt(text: string, key: string) {
//   let result = "";
//   for (let i = 0; i < text.length; i++) {
//     result += String.fromCharCode(
//       text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
//     );
//   }
//   return result;
// }

// function encode(text: string, key: string) {
//   const encrypted = xorEncrypt(text, key);
//   return btoa(encrypted); // Convert the XORed text to base64
// }

// // Decode function (Base64 and XOR decryption)
// function decode(base64String: string, key: string) {
//   const encrypted = atob(base64String); // Decode base64 to get encrypted text
//   return xorEncrypt(encrypted, key); // XOR decrypt using the same key
// }

// // Example usage
// const key = "mysecretkey"; // Your encryption key
export default async function Page({ params: { slug }, searchParams }: Props) {
  // const ids = "WUpWJzxBVlE7OitIOjQ6UENdUSc6QEg6";
  // const startTime = performance.now();
  // console.log(decode(ids, key));
  // const endTime = performance.now();
  // console.log(`Decoding took ${endTime - startTime} milliseconds`);
  if (!slug.includes("-")) return notFound();
  // const values = await findSeoParams(slug);
  // console.log(values)

  const slugValues: any = extractCaseSeoParams(slug) as any;
  let atMinusIndex = slugValues.count + 2;
  let severData;
  if (!searchParams.sf) {
    let url = `&${slugValues.CG ? `cg=${slugValues.CG}` : ""}&${
      slugValues.C ? `city=${slugValues.C}` : ""
    }&${slugValues.P ? `propType=${slugValues.P}` : ""}&${
      slugValues.B ? `bhk=${slugValues.B}` : ""
    }&${slugValues.L ? `localities=${slugValues.L}` : ""}`;
    severData = await getNewProjSearchData(url);
  }
  let city = `Bengaluru`;
  return (
    <>
      <link rel="canonical" href={`${process.env.NEXT_PUBLIC_URL}/${slug}`} />
      <NewSearchPage
        serverData={severData}
        frontendFilters={{
          ...(slugValues.CG ? { cg: slugValues.CG } : {}),
          ...(slugValues.C ? { city: `${city}+${slugValues.C}` } : {}),
          ...(slugValues.P ? { propTypes: parseInt(slugValues.P) } : {}),
          ...(slugValues.B ? { unitTypes: [parseInt(slugValues.B)] } : {}),
          ...(slugValues.L
            ? {
                localities: [
                  `${slug.split("-").at(-Number(atMinusIndex))}+${
                    slugValues.L
                  }`,
                ],
              }
            : {}),
        }}
      />
    </>
  );
}

export const generateStaticParams = async () => {
  if (process.env.NODE_ENV === "production") {
    // Get the data (mocked here, replace with your actual data fetching logic)
    const res = await getPagesSlugs("case-seo");
    const staticDir = path.join(process.cwd(), "static");
    const filePath = path.join(staticDir, "case-seo.json");

    // Ensure the 'static' directory exists
    if (!fs.existsSync(staticDir)) {
      fs.mkdirSync(staticDir);
    }

    // Convert the data object into JSON
    const jsonContent = JSON.stringify(res, null, 2);

    // Write the JSON data to the file
    fs.writeFileSync(filePath, jsonContent);
    console.log("case-seo.json file created successfully");

    return res.map((slug: string) => ({ slug }));
    // return [];
  }
  return [];
};
export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.slug.split("-");
  const heading = id.join(" ");
  return {
    title: `${heading} - Getrightproperty`,
    description: `Searching ${heading}, Bangalore. Get a verified search without any charges on Getrightproperty. Property Search Application`,
    openGraph: {
      title: `${heading} - Getrightproperty`,
      description: `Searching ${heading}, Bangalore. Get a verified search without any charges on Getrightproperty. Property Search Application`,
    },
  };
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;
