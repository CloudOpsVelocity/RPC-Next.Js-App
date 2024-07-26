import fs from "fs";
import React from "react";

type Props = {
  params: { slug: string };
};

export default function Page({ params: { slug } }: Props) {
  const projResult = readJsonFile("./permutations.json");
  return <div>{JSON.stringify(projResult)}</div>;
}
export const fetchCache = "force-cache";
export async function generateStaticParams() {
  const projResult = readJsonFile("./permutations.json");
  const slugs = projResult.map((data: any) => ({
    slug: data.slug,
  }));
  // console.log(slugs);
  return slugs;
}
function readJsonFile(fileName: string) {
  try {
    const data = fs.readFileSync(fileName, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading or parsing file: ${err}`);
    return null;
  }
}
