import React from "react";
import { extractCityName, generateHomePageSlugs, getHomePageParamvalues } from "../../utils/new-seo-routes/home";
import { getShortIds } from "@/app/(dashboard)/new/api";
import { getHomeListingData } from "@/app/(dashboard)/new/api";
import { getData} from "@/app/(dashboard)/new/api";
import HomagePageIndex from "@/app/(dashboard)/new/components/HomagePageIndex";
import { notFound } from "next/navigation";

type Props = {
  params:{
    city:string,
      locality:string
  }
}


export default async function Page({params}: Props) {
  // const slug = `/projects/${params.city}${params.locality ? `/${params.locality}` : ""  }`
  // const jsonParamsData = getHomePageParamvalues(slug,"project")
  // if(!jsonParamsData) notFound()
  // const [data, listingData] = await Promise.all([
  //   getData(jsonParamsData),
  //   getHomeListingData(jsonParamsData),
  //   // getShortIds(),
  // ]);
  // const cityName = extractCityName(params.city) || '';
  // return <HomagePageIndex data={data} listingData={listingData} shortIds={{}} cityData={{
  //   cityName: cityName,
  //   cityId: jsonParamsData,
  // }} />
  <div></div>
}

export async function generateStaticParams() {
  const slugs = await generateHomePageSlugs("project");
  return slugs;
}
export const dynamicParams = false;
