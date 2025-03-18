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
  const res = await getPagesSlugs("case-seo");
  await redisService.saveSeoSlug(SlugsType.SEO, res);
  console.log(`case-seo saved in redis succesfully`);
  if (process.env.ENVIRONMENT === "production" && process.env.LAKH_URLS) {
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

  const twitterTitle = `${heading} - Getrightproperty`;
  const twitterDescription = `Searching ${heading}, Bangalore. Get a verified search without any charges on Getrightproperty. Property Search Application`;
  const imageUrl = `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/search-page/default.webp`;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/${params.slug}`;

  return {
    title: twitterTitle,
    description: twitterDescription,
    keywords: [
      `${heading} Bangalore`,
      `${heading} property`,
      `${heading} for sale`,
      `real estate Bangalore`,
      "Buy property in Bangalore",
      "Verified property listings",
    ],
    robots: "index, follow",
    openGraph: {
      title: twitterTitle,
      description: twitterDescription,
      url,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${heading} Property Image`,
        },
      ],
      siteName: "Getrightproperty",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      site: "@Getrightproperty",
      creator: "@Getrightproperty",
      images: [imageUrl],
    },
  };
}

function cleanHeading(id: string[]) {
  return id
    .join(" ")
    .replace(/\b\d*(B|C|G|L|P|CG|SCG|RCG|PJ)\b/g, "")
    .replace(/\s+/g, " ");
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
