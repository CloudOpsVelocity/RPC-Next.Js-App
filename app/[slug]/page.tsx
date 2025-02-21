import React from "react";
import { getPagesSlugs } from "../seo/api";
import { Metadata } from "next";
import { ResolvingMetadata } from "next";
import NewSearchPage from "../(new_routes_seo)/search/NewSearchPage";
import redisService from "../utils/redis/redis.service";
import CaseSeoSearchService from "../services/case-seo.service";
import { SlugsType } from "../common/constatns/slug.constants";
import { ProjectSeachSchema } from "../seo/search/project-search.schema";
type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    sf: string;
  };
};
export default async function Page({ params: { slug }, searchParams }: Props) {
  const { frontEndFilter, severData } = await CaseSeoSearchService(slug, {
    sf: !!searchParams.sf,
  });
  const pageUrl = `${process.env.NEXT_PUBLIC_URL}/${slug}`;
  return (
    <main>
      <link rel="canonical" href={`${process.env.NEXT_PUBLIC_URL}/${slug}`} />
      <NewSearchPage
        serverData={severData}
        frontendFilters={frontEndFilter}
        pageUrl={pageUrl}
      />
    </main>
  );
}

export const generateStaticParams = async () => {
  // Get the data (mocked here, replace with your actual data fetching logic)
  const res = await getPagesSlugs("case-seo");
  await redisService.saveSeoSlug(SlugsType.SEO, res);
  console.log(`case-seo saved in redis succesfully`);
  // if (process.env.ENVIRONMENT === "production") {
  //   return res.map((slug: string) => ({ slug }));
  // }
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
