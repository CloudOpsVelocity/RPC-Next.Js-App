import React from "react";
import Feature from "@/app/components/project/feature";
import Reviews from "@/app/components/project/reviews";
import Amenties from "@/app/components/project/amenties";
import Loans from "@/app/components/project/loans";
import FirstBlock from "@/app/components/project/firstBlock";
import Overview from "@/app/components/project/overview";
import About from "@/app/components/project/about";
import Navigation from "@/app/components/project/navigation";
import Link from "next/link";
import { getAmenties, getProjectDetails } from "@/app/utils/api/project";
import ProjectDetailsP from "@/app/components/project/projectDetailsP";
import ProjectDrawer from "@/app/components/project/Drawer";
import LeafMap from "@/app/components/project/map";
import ListingRentAvail from "@/app/components/project/listingRentAvail";
import ErrorContainer from "@/app/components/project/error/container";
import MobileHidden from "@/app/components/molecules/MobileHidden";
import { notFound } from "next/navigation";
import FloorplanDrawer from "@/app/components/project/drawers/floorplan";
import MasterPlan from "@/app/components/project/masterplan";
import FloorplansBlock from "@/app/components/project/floorplansBlock";
import GalleryBlock from "@/app/components/project/galleryBlock";
import Specifications from "@/app/components/project/specification";
import Banner from "@/app/components/project/banner";
import AboutBuilder from "@/app/components/project/aboutBuilder";
import FaqWithBg from "@/app/components/project/faq";
import NearByCarousel from "@/app/components/project/NearByCarousel";
import LoginPopup from "@/app/components/project/modals/LoginPop";
import axios from "axios";
import PartialUnitData from "@/app/components/project/sections";
import { Metadata } from "next";
import type { ResolvingMetadata } from "next";
import FAQJsonLdScript from "@/app/seo/Faqjson";
import QAJsonLdScript from "@/app/seo/Qnajson";
import PropertyJsonLdScript from "@/app/seo/Productjson";
import ArticleJsonLdScript from "@/app/seo/ArticleJson";
import { extractID, getPagesSlugs } from "../seo/api";
import fs from "fs";
import path from "path";
import { cookies, headers } from "next/headers";
import db from "../config/level";
import { builderSlugs } from "@/static/builderSlugs";
import { builderSlugsMap } from "@/static/builderSlugsMap";
import { getBuilderDetails } from "../utils/api/builder";
import BuilderPage from "../builder/[slug]/Page/BuilderPage";
type Props = {
  params: { slug: string };
};

export default async function page({ params: { slug } }: Props) {
  const nextHeaders = headers();
  const pathname = `${nextHeaders.get("x-current-path")}`;
  const token = cookies().get("token")?.value;
  const id = builderSlugsMap.get(pathname);
  if (!id) {
    notFound();
  }
  const data = await getBuilderDetails(id, "Y", "proj", token);
  return <BuilderPage data={data} />;
}
//  builder0 = state / project0 project in locality

export async function generateStaticParams() {
  // Get the data (mocked here, replace with your actual data fetching logic)
  const res = await getPagesSlugs("builder-list");

  // Convert the `res` object into a Map
  const resMap = new Map(Object.entries(res));

  const staticDir = path.join(process.cwd(), "static");
  const filePath = path.join(staticDir, "builderSlugsMap.js");

  // Ensure the 'static' directory exists
  if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir);
  }

  // Write the `resMap` to a JavaScript file as an exported module
  // Note: JSON.stringify won't work directly with a Map, so we need to convert it back to an object first
  const mapContent = `export const builderSlugsMap = new Map(${JSON.stringify(
    Array.from(resMap.entries()),
    null,
    2
  )});`;

  // Overwrite the file with the new content
  fs.writeFileSync(filePath, mapContent);

  console.log(`Map data has been saved to ${filePath}`);

  // Prepare bulk operations for the LevelDB database
  const builderRess = Array.from(resMap.keys());
  const slugs = builderRess.map((data) => ({
    state: data.replace(/\//g, ""),
  }));

  return slugs;
}
