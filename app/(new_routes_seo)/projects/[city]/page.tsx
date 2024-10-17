import React from "react";
import { generateHomePageSlugs, getHomePageParamvalues } from "../../utils/new-seo-routes/home";
import { getShortIds } from "@/app/(dashboard)/new/api";
import { getHomeListingData } from "@/app/(dashboard)/new/api";
import { getData} from "@/app/(dashboard)/new/api";
import HomagePageIndex from "@/app/(dashboard)/new/components/HomagePageIndex";

type Props = {
  params:{
    city:string,
      locality:string
  }
}


export default async function Page({params}: Props) {
  const [data, listingData, ] = await Promise.all([
    getData(),
    getHomeListingData(),
    // getShortIds(),
  ]);
  const slug = `/project/${params.city}${params.locality ? `/${params.locality}` : ""  }`
  const jsonParamsData = getHomePageParamvalues(slug,"project")
  console.log(jsonParamsData)
  return <HomagePageIndex data={data} listingData={listingData} shortIds={{}} cityData={{
    cityName: params.city,
    cityId: params.city,
  }} />
}

export async function generateStaticParams() {
  const slugs = await generateHomePageSlugs("project");
  return slugs;
}
export const dynamicParams = false;
