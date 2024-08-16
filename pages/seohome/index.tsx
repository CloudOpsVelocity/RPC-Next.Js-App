import React from "react";
// import fs from "fs";
type Props = { repo: string };

export default function SlugsTest({ shortIds, data, listingData }: any) {
  return (
    <div className="h-[100%] w-[100%] flex  flex-col overflow-hidden bg-[#F5F7F8]">
      <Header />
      <HomeSearch count={shortIds?.total} />
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
    </div>
  );
}

import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import axios from "axios";
import { getAmenties, getProjectDetails } from "@/app/utils/api/project";
import { MantineProvider } from "@mantine/core";
import {
  getData,
  getHomeListingData,
  getShortIds,
} from "@/app/(dashboard)/new/api";
import HomeFeatures from "../../components/features";
import NewAddedProjects from "../../components/newly-added-projects";
import DynamicListing from "../../components/Listing";
import TopLocalities from "../../components/top-localities";
import ListbySection from "../../components/ListedBy";
import PostYourListing from "../../components/post-your-listing";
import BlogsSection from "../../components/blogs";
import Footer from "../../components/Footer";
import HandPickedProjects from "../../components/hand-picked-projects";
import HomeSearch from "@/app/(dashboard)/new/components/home-search";
import Header from "@/app/components/layouts/primary/header";

export const getStaticProps = async () => {
  const [data, listingData, shortIds] = await Promise.all([
    getData(),
    getHomeListingData(),
    getShortIds(),
  ]);
  return {
    props: {
      data,
      listingData,
      shortIds,
    },
  };
};
