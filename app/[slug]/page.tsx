import React from "react";
import { getPagesSlugs } from "../seo/api";
import { Metadata } from "next";
import { ResolvingMetadata } from "next";
import NewSearchPage from "../(new_routes_seo)/search/NewSearchPage";
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
  // Get the data (mocked here, replace with your actual data fetching logica)
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
  const heading = cleanHeading(id);

  return {
    title: `${heading} - Getrightproperty`,
    description: `Searching ${heading}, Bangalore. Get a verified search without any charges on Getrightproperty. Property Search Application`,
    openGraph: {
      title: `${heading} - Getrightproperty`,
      description: `Searching ${heading}, Bangalore. Get a verified search without any charges on Getrightproperty. Property Search Application`,
    },
  };
}
function cleanHeading(id: string[]) {
  return id
    .join(" ")
    .replace(/\b\d*(B|C|G|L|P|CG|SCG|RCG)\b/g, "")
    .replace(/\s+/g, " ");
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
