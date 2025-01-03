import React from "react";
import fs from "fs";
import path from "path";
import { getPagesSlugs } from "../seo/api";
import ProjectSearchPage from "../(dashboard)/search/Page/ProjectSearchPage";
import { notFound } from "next/navigation";
import { getProjSearchData } from "../(new_routes_seo)/in/utils/api";
import { findSeoParams, extractCaseSeoParams } from "./_utils/findParams";
import { Metadata } from "next";
import { ResolvingMetadata } from "next";
type Props = {
  params: {
    slug: string;
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
export default async function Page({ params: { slug } }: Props) {
  // const ids = "WUpWJzxBVlE7OitIOjQ6UENdUSc6QEg6";
  // const startTime = performance.now();
  // console.log(decode(ids, key));
  // const endTime = performance.now();
  // console.log(`Decoding took ${endTime - startTime} milliseconds`);
  if (!slug.includes("-")) return notFound();
  // const values = await findSeoParams(slug);
  // console.log(values)

  const slugValues: any = extractCaseSeoParams(slug) as any;
  const severData = await getProjSearchData(
    `cg=${slugValues.CG}&city=${slugValues.C}&propType=${slugValues.P}&bhk=${slugValues.B}&localities=${slugValues.L}`
  );
  let city = `Bengaluru`;
  return (
    <>
      <link rel="canonical" href={`${process.env.NEXT_PUBLIC_URL}/${slug}`} />
      <ProjectSearchPage
        serverData={severData}
        frontendFilters={{
          cg: slugValues.CG,
          city: `${city}+${slugValues.C}`,
          propTypes: parseInt((slugValues.P as string) ?? "0") ?? 0,
          unitTypes: [parseInt((slugValues.B as string) ?? "0")],
          locality: [`${slug.split("-").at(-6)}+${slugValues.L}`],
        }}
      />
    </>
  );
}

// export const generateStaticParams = async () => {
//   if (process.env.NODE_ENV === "production") {
//     // Get the data (mocked here, replace with your actual data fetching logic)
//     const res = await getPagesSlugs("case-seo");
//     const staticDir = path.join(process.cwd(), "static");
//     const filePath = path.join(staticDir, "case-seo.json");

//     // Ensure the 'static' directory exists
//     if (!fs.existsSync(staticDir)) {
//       fs.mkdirSync(staticDir);
//     }

//     // Convert the data object into JSON
//     const jsonContent = JSON.stringify(res, null, 2);

//     // Write the JSON data to the file
//     fs.writeFileSync(filePath, jsonContent);
//     console.log("case-seo.json file created successfully");
//     // return [];
//     const slugs = Object.keys(res);
//     return slugs.map((slug) => ({ slug }));
//   }
//   return [];
// };
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
