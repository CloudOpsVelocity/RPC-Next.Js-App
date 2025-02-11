import React from "react";
import fs from "fs";
import path from "path";
import { getPagesSlugs } from "../seo/api";
import ProjectSearchPage from "../(dashboard)/searchOldPage/Page/ProjectSearchPage";
import { notFound } from "next/navigation";
import {
  getNewProjSearchData,
  getProjSearchData,
} from "../(new_routes_seo)/in/utils/api";
import { findSeoParams, extractCaseSeoParams } from "./_utils/findParams";
import { Metadata } from "next";
import { ResolvingMetadata } from "next";
import NewSearchPage from "../(new_routes_seo)/search/NewSearchPage";
import logger from "../utils/logger";
import redisService from "../utils/redis/redis.service";
import CaseSeoSearchService from "../services/case-seo.service";
import { SlugsType } from "../common/constatns/slug.constants";
type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    sf: string;
  };
};

// // Example usage
// const key = "mysecretkey"; // Your encryption key
export default async function Page({ params: { slug }, searchParams }: Props) {
  const { frontEndFilter, severData } = await CaseSeoSearchService(slug, {
    sf: !!searchParams.sf,
  });
  return (
    <>
      <link rel="canonical" href={`${process.env.NEXT_PUBLIC_URL}/${slug}`} />
      <NewSearchPage serverData={severData} frontendFilters={frontEndFilter} />
    </>
  );
}

export const generateStaticParams = async () => {
  // Get the data (mocked here, replace with your actual data fetching logic)
  const res = await getPagesSlugs("case-seo");
  await redisService.saveSeoSlug(SlugsType.SEO, res);
  console.log(`case-seo saved in redis succesfully`);
  if (process.env.ENVIRONMENT === "production") {
    return res.map((slug: string) => ({ slug }));
  }
  return [];
};

export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.slug.split("-");
  const heading = id.join(" ");
  return {
    title: `${heading} - Getrightproperty`,
    description: `Searching ${heading}, Bangalore. Get a verified search without any charges on Getrightproperty. Property Search Application`,
    openGraph: {
      title: `${heading} - Getrightproperty`,
      description: `Searching ${heading}, Bangalore. Get a verified search without any charges on Getrightproperty. Property Search Application`,
    },
  };
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;
