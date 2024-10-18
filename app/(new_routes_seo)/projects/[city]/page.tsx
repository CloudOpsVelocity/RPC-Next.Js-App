import React from "react";
import {
  extractCityName,
  generateHomePageSlugs,
  getHomePageParamvalues,
} from "../../utils/new-seo-routes/home";
import { getShortIds } from "@/app/(dashboard)/new/api";
import { getHomeListingData } from "@/app/(dashboard)/new/api";
import { getData } from "@/app/(dashboard)/new/api";
import HomagePageIndex from "@/app/(dashboard)/new/components/HomagePageIndex";
import { notFound } from "next/navigation";

type Props = {
  params: {
    city: string;
    locality: string;
  };
};

export default async function Page({ params }: Props) {
  // const slug = `/projects/${params.city}${
  //   params.locality ? `/${params.locality}` : ""
  // }`;
  // const jsonParamsData = getHomePageParamvalues(slug, "project");
  // if (!jsonParamsData) notFound();
  // const [data, listingData] = await Promise.all([
  //   getData(jsonParamsData),
  //   getHomeListingData(jsonParamsData),
  //   // getShortIds(),
  // ]);
  // const cityName = extractCityName(params.city) || "";
  return (
    // <HomagePageIndex
    //   data={data}
    //   listingData={listingData}
    //   shortIds={{
    //     total: 8,
    //     projIds: [
    //       "9ea8cf3c5e833a71663f440d450f942f",
    //       "9891b38e10299b88cef791a58bc03af8",
    //       "4e4920af760dd82499ef7f855cbba69f",
    //     ],
    //     propIds: [
    //       "68da26ae16f44473a3e7710febcf6f03",
    //       "493516e7f29fa40dbe483c79fd3591b6",
    //       "881a9dfc336469ae1bc8f2f6d5af1266",
    //       "f38e3fde9948b9dfa85a578c80dd663b",
    //       "2d320b68173ffd4516aad7b2d95001d7",
    //     ],
    //   }}
    //   cityData={{
    //     cityName: cityName,
    //     cityId: jsonParamsData,
    //   }}
    // />
    <div>sdf</div>
  );
}

// export async function generateStaticParams() {
//   const slugs = await generateHomePageSlugs("project");
//   return slugs;
// }
// export const dynamicParams = false;
