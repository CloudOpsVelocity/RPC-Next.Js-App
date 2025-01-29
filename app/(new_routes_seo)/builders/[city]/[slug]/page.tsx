import { getPagesSlugs } from "@/app/seo/api";
import path from "path";
import React from "react";
import fs from "fs";
import { getBuilderDetailsPageData } from "@/app/utils/api/builder";
import { notFound } from "next/navigation";
import BuilderPage from "@/app/builder/[slug]/Page/BuilderPage";
import redisService from "@/app/utils/redis/redis.service";
import { SlugsType } from "@/app/common/constatns/slug.constants";
type Props = {
  params: {
    city: string;
    slug: string;
  };
};

async function getBuilderSlug(pathname: string) {
  try {
    const builderJsonData = await redisService.getBuilderSlug(
      SlugsType.BUILDER
    );
    const decodeUrl = decodeURIComponent(pathname);
    return builderJsonData[decodeUrl];
  } catch (error) {
    console.error("Error reading or parsing file:", error);
    return null;
  } finally {
    console.timeEnd("getBuilderSlugs");
  }
}
export default async function Page({ params: { city, slug } }: Props) {
  const pathname = `/builders/${city}/${slug}`;
  const id = await getBuilderSlug(pathname);
  if (!id) return notFound();
  const data = await getBuilderDetailsPageData(id?.split("_")[1], pathname);
  return (
    <BuilderPage
      data={{
        ...data,
        data: {
          ...data.data,
          builderCity: city,
          pathname: pathname,
        },
      }}
      id={id?.split("_")[1]}
    />
  );
}

export async function generateStaticParams() {
  // Get the data (mocked here, replace with your actual data fetching logic)
  const res = await getPagesSlugs("builder-list");
  // Prepare the slugs for static generation
  const builderRess = Object.keys(res);
  const slugs = builderRess.map((data) => {
    const [staticPath, staticPath2, city, slug] = data.split("/");
    return { city, slug };
  });
  return slugs;
}
// export const dynamic = "force-dyanmic";
// export const dyanmicParams = true;

// export async function generateMetadata(
//   { params }: SeoProps,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const pathname = `/builders/${params.city}/${params.slug}`;
//   const id = await getBuilderSlug(pathname);
//   const data = await getBuilderDetailsPageData(id?.split("_")[1], pathname);
//   return {
//     title: `${data.data.userName} | Top Real Estate Developer in ${data.data.cityName} | Properties in ${data.data.localityName}`,
//     description: `Explore ${data.data.userName} - A leading real estate developer in ${data.data.cityName}. Browse through their residential and commercial projects in ${data.data.localityName} and discover your dream property.`,
//   }
// }
