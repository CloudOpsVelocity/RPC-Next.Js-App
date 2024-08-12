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
import Footer from "./(dashboard)/new/components/Footer";
import Req from "./(dashboard)/new/components/Req";
import SharePopup from "./(dashboard)/search/components/SharePopup";
import Header from "./components/layouts/primary/header";
export default async function Page() {
  const [data, listingData, shortIds] = await Promise.all([
    getData(),
    getHomeListingData(),
    getShortIds(),
  ]);
  return (
    <div className="h-[100%] w-[100%] flex  flex-col overflow-hidden bg-[#F5F7F8]">
      <Header />
      <HomeSearch />
      <HomeFeatures />
      <NewAddedProjects data={data.featured} shortIds={shortIds} />
      <DynamicListing
        title="Ready to Move Sell Listings"
        content="Move In Today: Your Dream Home Awaits – Explore Our Ready-to-Move Listings Now!"
        data={listingData["r_Sale"]}
        shortIds={shortIds}
      />
      <TopLocalities />
      <DynamicListing
        title="Ready to Move Rent Listings"
        content="Find Your Perfect Home, Ready to Move In - Rent Today!"
        data={listingData["r_Rent"]}
        shortIds={shortIds}
      />
      <DynamicListing
        title="Featured Plot Listings"
        content="Browse Top Listings and Find Your Perfect Plot Today!"
        data={listingData["p"]}
        shortIds={shortIds}
      />
      <DynamicListing
        title="Under Construction Sell Listings"
        content="Explore Our Under Construction Listings Today!"
        data={listingData["u_Sale"]}
        shortIds={shortIds}
      />
      <HandPickedProjects data={data} shortIds={shortIds} />
      <DynamicListing
        title="Under Construction Rent Listings"
        content="Discover New Developments and Under Construction Rent Listings!"
        data={listingData["u_Rent"]}
        shortIds={shortIds}
      />
      <DynamicListing
        title="Independent Sell Listings"
        content="Your Gateway to Independent Living - Browse and Buy with Confidence"
        data={listingData["i_Sale"]}
        shortIds={shortIds}
      />{" "}
      <ListbySection />
      <DynamicListing
        title="Independent Rent Listings"
        content="Discover Your Ideal Rental: Independent Listings, Endless Options."
        data={listingData["i_Rent"]}
        shortIds={shortIds}
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
