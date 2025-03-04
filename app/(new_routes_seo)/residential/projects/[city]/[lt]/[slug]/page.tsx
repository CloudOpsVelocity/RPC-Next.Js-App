import React from "react";
import path from "path";
import fs from "fs";
import {
  getAmenties,
  getAuthorityNames,
  getProjectDetails,
} from "@/app/utils/api/project";
import {
  notFound,
  permanentRedirect,
  redirect,
  RedirectType,
} from "next/navigation";
import ProjectsDetailsPage from "@/app/(dashboard)/abc/[city]/[local]/[slug]/Page/ProjectDetailsPage";
import { getPagesSlugs } from "@/app/seo/api";
import { Metadata, ResolvingMetadata } from "next";
import redisService from "@/app/utils/redis/redis.service";
import { SlugsType } from "@/app/common/constatns/slug.constants";
import { isValidSlugId } from "@/common/utils/slugUtils";
import { createProjectLinkUrl } from "@/app/utils/linkRouters/ProjectLink";

type Props = {
  params: { city: string; lt: string; slug: string };
};
// let metadataCache: {title?: string, description?: string} = {};
export default async function page({ params }: Props) {
  const { city, lt, slug: name } = params;
  const slug = name.split("-").at(-1);
  if (!slug || !isValidSlugId(slug)) {
    notFound();
  }

  const [projResponse, amenitiesFromDB] = await Promise.all([
    getProjectDetails(slug),
    getAmenties(),
  ]);
  const localitySlug = projResponse.basicData.localityName
    .toLowerCase()
    .replaceAll(" ", "-");
  const projectSlug = name.split("-").slice(0, -1).join("-");
  const projectNameSlug = projResponse.basicData.projectName
    .toLowerCase()
    .replaceAll(" ", "-");

  if (
    localitySlug !== lt ||
    projectSlug !== projectNameSlug ||
    city !== projResponse.basicData.cityName.toLowerCase()
  ) {
    const path = createProjectLinkUrl({
      city: projResponse.basicData.cityName,
      slug: projResponse.basicData.projectName,
      locality: projResponse.basicData.localityName,
      projIdEnc: projResponse.basicData.projIdEnc,
    });
    return permanentRedirect(path);
  }
  if (projResponse.basicData.projAuthorityId) {
    const authorityNames = await getAuthorityNames(
      projResponse.basicData.projAuthorityId
    );
    projResponse.basicData.projAuthorityNames = authorityNames;
  }

  return (
    <ProjectsDetailsPage
      projResponse={projResponse}
      amenitiesFromDB={amenitiesFromDB}
      slug={slug as string}
      params={params}
    />
  );
}

export async function generateStaticParams() {
  // Get the data (mocked here, replace with your actual data fetching logic)
  const res = await getPagesSlugs("project-list");
  await redisService.saveProjectSlug(SlugsType.PROJECT, res);
  const projectRes = Object.keys(res);
  const slugs = [];
  for (let i = 0; i < projectRes.length; i++) {
    const data = projectRes[i];
    if ((data.match(/\//g) || []).length === 5) {
      const [staticPath, staticPath2, sta3, city, lt, slug] = data.split("/");
      slugs.push({ city, lt, slug });
    }
  }
  return slugs;

  // Extract project names from the keys
  // const projectRes = Object.keys(res);
  // const slugs = projectRes.map((data) => {
  //   const [staticPath, staticPath2, sta3, city, lt, slug] = data.split("/");
  //   return { city, lt, slug };
  // });
  // return slugs;
}

type SeoProps = {
  params: { city: string; lt: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: SeoProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  let slug = params.slug.split("-").at(-1);
  if (!slug || !isValidSlugId(slug)) {
    notFound();
  }
  const {
    basicData: data,
    phaseOverview,
    nearByLocations,
  } = await getProjectDetails(slug as string);

  // Calculate price range in a readable format
  const formatPrice = (price: number) => {
    if (price >= 10000000) return `${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `${(price / 100000).toFixed(2)} L`;
    return `${price.toLocaleString()}`;
  };

  const priceRange = `${formatPrice(data.minPrice)} - ${formatPrice(
    data.maxPrice
  )}`;

  // Get all available configurations
  const configurations = phaseOverview
    .flatMap((phase: any) =>
      Object.values(phase.propTypeOverview).flatMap(
        (type: any) => type.unitTypes
      )
    )
    .filter(
      (value: string, index: number, self: string[]) =>
        self.indexOf(value) === index
    )
    .join(", ");

  // Get nearby landmarks for description
  const nearbyLandmarks = [
    ...(nearByLocations.school || []).slice(0, 2).map((s: any) => s.name),
    ...(nearByLocations.hospital || []).slice(0, 2).map((h: any) => h.name),
    ...(nearByLocations.train_station || [])
      .slice(0, 1)
      .map((t: any) => t.name),
  ].join(", ");

  // Constructing SEO-friendly title
  const title = `${data?.projectName} ${data.availableProperties?.join(
    " "
  )} for sale in ${data.localityName} ${data.cityName}`;

  // Constructing detailed and keyword-rich description
  const description = `${
    data.projectName
  } offers exclusive ${data.availableProperties?.join(", ")} in ${
    data.localityName
  }, ${
    data.cityName
  }. Explore Project Details, Pricing, Brochure PDF, Floor Plans, Reviews, Master Plan, Amenities, and Contact Information. Secure your future home now!`;

  // Get all relevant keywords
  const keywords = [
    data.projectName,
    ...(data.availableProperties || []),
    data.localityName,
    data.cityName,
    configurations,
    "Property",
    "Real Estate",
    "Home",
    data.cityName,
    `${data.cityName} Properties`,
    "Buy Property",
    data.postedByName,
    nearbyLandmarks,
    "RERA Approved",
  ].join(", ");
  const canonical = `${process.env.NEXTAUTH_URL}/residential/projects/${params.city}/${params.lt}/${params.slug}`;
  return {
    title,
    description,
    keywords,
    metadataBase: new URL(process.env.NEXTAUTH_URL || ""),
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: data.projectName,
      images: data.media.coverImageUrl.split(",").map((url) => ({
        url,
        width: 1200,
        height: 630,
      })),
      locale: "en_IN",
      type: "website",
      videos: data.media.walkThrowVideoUrl
        ? [data.media.walkThrowVideoUrl]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [data.media.coverImageUrl.split(",")[0]],
      site: "@getrightproperty",
    },
    robots: {
      index: true,
      follow: true,
    },
    category: "Real Estate",
    other: {
      "price-range": priceRange,
      "property-type": data?.availableProperties?.join(", ") || "",
      "launch-date": data.startDate,
      "possession-date": data.endDate,
      "builder-name": data.postedByName,
      "rera-id": phaseOverview[0]?.reraId,
      "total-units": data.totalUnit.toString(),
      "project-area": data.totalLandArea,
      "project-status": data.projectStatus,
    },
  };
}

export const dynamicParams = true;
export const dynamic = "force-static";
