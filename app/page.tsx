import React from "react";

import { getData, getHomeListingData } from "./(dashboard)/new/api";
import HomeSearch from "./(dashboard)/new/components/home-search";
import HomeFeatures from "./(dashboard)/new/components/features";
import MiddleSection from "./(dashboard)/new/components/MiddleSection";
// const MiddleSection = dynamic(
//   () => import("./(dashboard)/new/components/MiddleSection"),
//   {
//     ssr: true,
//     loading: () => <div>Loading...</div>,
//   }
// );

import dynamic from "next/dynamic";
import { HomeSiteNavigationSchema } from "./seo/common/home.schema";

export default async function Page() {
  const cityData = {
    data: {
      city: "Bengaluru",
      cityId: "9",
    },
    status: true,
  };

  const [data, listingData] = await Promise.all([
    getData(cityData?.data?.cityId),
    getHomeListingData(cityData?.data?.cityId),
  ]);
  return (
    <div className="h-[100%] w-[100%] flex  flex-col overflow-hidden bg-[#F5F7F8]">
      <link rel="canonical" href={`${process.env.NEXT_PUBLIC_URL}/`} />
      <HomeSiteNavigationSchema />
      <HomeSearch
        cityData={{
          cityId: cityData?.data?.cityId ?? "",
          cityName: cityData?.data?.city ?? "",
        }}
      />
      <HomeFeatures />
      <MiddleSection
        data={data}
        listingData={listingData}
        cityData={cityData}
      />
    </div>
  );
}
