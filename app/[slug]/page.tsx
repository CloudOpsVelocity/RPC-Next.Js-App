import React from "react";
import fs from "fs";
import path from "path";
import { getPagesSlugs } from "../seo/api";
type Props = {
  slug: string;
};

export default function Page({ slug }: Props) {
  console.log("coming from dynamic slugs routes");
  return <div>{slug}</div>;
}

export const generateStaticParams = async () => {
  // const jsonFilePath = path.join(process.cwd(), "static", "case-seo.json");
  // const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
  const res = await getPagesSlugs("case-seo");
  const slugs = Object.keys(res);
  return slugs.map((slug) => ({ slug }));
};
export const dynamic = "force-dynamic";
export const dyamicParams = true;
