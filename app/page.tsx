import React from "react";
import LoginPopup from "@/app/components/project/modals/LoginPop";
import {
  getData,
  getHomeListingData,
  getShortIds,
} from "./(dashboard)/new/api";
import HomeSearch from "./(dashboard)/new/components/home-search";
import HomeFeatures from "./(dashboard)/new/components/features";
import NewAddedProjects from "./(dashboard)/new/components/newly-added-projects";
import DynamicListing from "./(dashboard)/new/components/Listing";
import TopLocalities from "./(dashboard)/new/components/top-localities";
import HandPickedProjects from "./(dashboard)/new/components/hand-picked-projects";
import ListbySection from "./(dashboard)/new/components/ListedBy";
import PostYourListing from "./(dashboard)/new/components/post-your-listing";
import BlogsSection from "./(dashboard)/new/components/blogs";
import Req from "./(dashboard)/new/components/Req";
import SharePopup from "./(dashboard)/search/components/SharePopup";
import Header from "./components/layouts/primary/header";
import Footer from "./components/layouts/primary/footer";
import { getUserCity } from "./(new_routes_seo)/utils/new-seo-routes/home.api";
import { cookies, headers } from "next/headers";
import { decryptData } from "./utils/auth/nodeCrypto";
export default async function Page() {
  // const ip = headers().get("x-forwarded-for") || headers().get("cf-connecting-ip") || "";

  // const cityData = await getUserCity({
  //   cityName: 'Bengaluru',
  //   cityId: '9',
  // },ip);
  const cityData = {
    data: {
      city: "Bengaluru",
      cityId: "9",
    },
    status: true,
  };
  const encriptedLatLang = cookies().get("ui")?.value;
  const latLang = encriptedLatLang ? decryptData(encriptedLatLang) : "";
  const [data, listingData, shortIds] = await Promise.all([
    getData(cityData?.data?.cityId, latLang),
    getHomeListingData(cityData?.data?.cityId, latLang),
    getShortIds(),
  ]);
  return (
    <div className="h-[100%] w-[100%] flex  flex-col overflow-hidden bg-[#F5F7F8]">
      <Header />
      <HomeSearch
        count={shortIds?.total}
        cityData={{
          cityId: cityData?.data?.cityId ?? "",
          cityName: cityData?.data?.city ?? "",
        }}
      />
      <HomeFeatures />
      <NewAddedProjects
        data={data.featured}
        shortIds={shortIds}
        cityId={cityData?.data?.cityId}
      />
      <DynamicListing
        title="Ready to Move Sell Listings"
        content="Move In Today: Your Dream Home Awaits – Explore Our Ready-to-Move Listings Now!"
        data={listingData["r_Sale"]}
        shortIds={shortIds}
        cityId={cityData?.data?.cityId}
        dataKey="r_Sale"
      />
      <TopLocalities />
      <DynamicListing
        title="Ready to Move Rent Listings"
        content="Find Your Perfect Home, Ready to Move In - Rent Today!"
        data={listingData["r_Rent"]}
        shortIds={shortIds}
        cityId={cityData?.data?.cityId}
        dataKey="r_Rent"
      />
      <DynamicListing
        title="Featured Plot Listings"
        content="Browse Top Listings and Find Your Perfect Plot Today!"
        data={listingData["p"]}
        shortIds={shortIds}
        cityId={cityData?.data?.cityId}
        dataKey="p"
      />
      <DynamicListing
        title="Under Construction Sell Listings"
        content="Explore Our Under Construction Listings Today!"
        data={listingData["u_Sale"]}
        shortIds={shortIds}
        cityId={cityData?.data?.cityId}
        dataKey="u_Sale"
      />
      <HandPickedProjects
        data={data}
        shortIds={shortIds}
        cityId={cityData?.data?.cityId}
      />
      <DynamicListing
        title="Under Construction Rent Listings"
        content="Discover New Developments and Under Construction Rent Listings!"
        data={listingData["u_Rent"]}
        shortIds={shortIds}
        cityId={cityData?.data?.cityId}
        dataKey="u_Rent"
      />
      <DynamicListing
        title="Independent Sell Listings"
        content="Your Gateway to Independent Living - Browse and Buy with Confidence"
        data={listingData["i_Sale"]}
        shortIds={shortIds}
        cityId={cityData?.data?.cityId}
        dataKey="i_Sale"
      />{" "}
      <ListbySection />
      <DynamicListing
        title="Independent Rent Listings"
        content="Discover Your Ideal Rental: Independent Listings, Endless Options."
        data={listingData["i_Rent"]}
        shortIds={shortIds}
        cityId={cityData?.data?.cityId}
        dataKey="i_Rent"
      />
      <PostYourListing />
      <BlogsSection />
      <Footer />
      <LoginPopup />
      <SharePopup />
      <Req />
    </div>
  );
}
