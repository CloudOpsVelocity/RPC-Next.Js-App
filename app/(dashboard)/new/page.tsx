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

export default function Page() {
  return (
    <div className="h-[100%] w-[100%] flex  flex-col overflow-hidden bg-[#F5F7F8]">
      <Header />
      <HomeSearch />
      <HomeFeatures />
      <NewAddedProjects />
      {/* <FeaturedProjects /> */}
      <DynamicListing
        title="Ready to Move Sell Listings"
        content="Loreum Ipsum"
      />
      <TopLocalities />
      <DynamicListing
        title="Ready to Move Rent Listings"
        content="Loreum Ipsum"
      />
      <DynamicListing
        title="Under Construction Sell Listings"
        content="Loreum Ipsum"
      />
      <HandPickedProjects />
      <DynamicListing
        title="Ready to Move Independent Sell Listing"
        content="Loreum Ipsum"
      />

      <DynamicListing
        title="Under Construction Independent Sell Listing"
        content="Loreum Ipsum"
      />
      <ListbySection />
      <DynamicListing
        title="Under Construction Independent Rent Listing"
        content="Loreum Ipsum"
      />
      <PostYourListing />
      <BlogsSection />
      <Footer />
    </div>
  );
}
