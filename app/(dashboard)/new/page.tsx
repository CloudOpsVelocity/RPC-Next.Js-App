import React from "react";
import Header from "./components/header";
import HomeSearch from "./components/home-search";
import HomeFeatures from "./components/features";
import NewAddedProjects from "./components/newly-added-projects";
import FeaturedProjects from "./components/Featured-Projects";
import DynamicListing from "./components/Listing";
import TopLocalities from "./components/top-localities";
import PostYourListing from "./components/post-your-listing";
import ListbySection from "./components/ListedBy";
import HandPickedProjects from "./components/hand-picked-projects";
import BlogsSection from "./components/blogs";
import Footer from "./components/Footer";
import { getData, getHomeListingData } from "./api";
import SharePopup from "../search/components/SharePopup";
import Req from "./components/Req";
import LoginPopup from "@/app/components/project/modals/LoginPop";

export default async function Page() {
  const [data, listingData] = await Promise.all([
    getData(),
    getHomeListingData(),
  ]);
  return (
    <div className="h-[100%] w-[100%] flex  flex-col overflow-hidden bg-[#F5F7F8]">
      <Header />
      <HomeSearch />
      <HomeFeatures />
      {/* <NewAddedProjects data={data.featured} />
      <DynamicListing
        title="Ready to Move Sell Listings"
        content="Loreum Ipsum"
        data={listingData["r_Sale"]}
      />
      <TopLocalities />
      <DynamicListing
        title="Ready to Move Rent Listings"
        content="Loreum Ipsum"
        data={listingData["r_Rent"]}
      />
      <DynamicListing
        title="Featured Plot Listings"
        content="Loreum Ipsum"
        data={listingData["p"]}
      />
      <DynamicListing
        title="Under Construction Sell Listings"
        content="Loreum Ipsum"
        data={listingData["u_Sale"]}
      />
      <HandPickedProjects data={data} />
      <DynamicListing
        title="Under Construction Rent Listings"
        content="Loreum Ipsum"
        data={listingData["u_Rent"]}
      />
      <DynamicListing
        title="Independent Sell Listing"
        content="Loreum Ipsum"
        data={listingData["i_Sale"]}
      />{" "}
      <ListbySection />
      <DynamicListing
        title="Independent Rent Listing"
        content="Loreum Ipsum"
        data={listingData["i_Rent"]}
      />
      <PostYourListing />
      <BlogsSection />
      <Footer />
      <LoginPopup />
      <SharePopup />
      <Req /> */}
    </div>
  );
}
