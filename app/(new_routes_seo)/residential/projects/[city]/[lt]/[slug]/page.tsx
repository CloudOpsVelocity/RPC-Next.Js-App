import React from "react";
import path from "path";
import fs from "fs";
import {
  getAmenties,
  getAuthorityNames,
  getProjectDetails,
} from "@/app/utils/api/project";
import { notFound } from "next/navigation";
import ProjectsDetailsPage from "@/app/(dashboard)/abc/[city]/[local]/[slug]/Page/ProjectDetailsPage";
import { getPagesSlugs } from "@/app/seo/api";
import { Metadata, ResolvingMetadata } from "next";
type Props = {
  params: { city: string; lt: string; slug: string };
};
// let metadataCache: {title?: string, description?: string} = {};
export default async function Page({ params }: Props) {
  const { city, lt, slug: name } = params;
  // const pathname = `${BASE_PATH_PROJECT_DETAILS}/${city}/${lt}/${name}`;
  // const value = await findPathForProjectDetails(pathname);
  // const { PJ: slug } = await extractProjectParamsValues(value);

  let slug = name.split("-").at(-1);
  if (!slug) return notFound();
  console.time("project detaild api calling" + slug);
  let [projResponse, amenitiesFromDB] = await Promise.all([
    getProjectDetails(slug as string),
    getAmenties(),
  ]);
  console.timeEnd("project detaild api calling" + slug);
  if (projResponse.basicData.projAuthorityId) {
    const res = await getAuthorityNames(projResponse.basicData.projAuthorityId);
    projResponse = {
      ...projResponse,
      basicData: {
        ...projResponse.basicData,
        projAuthorityNames: res,
      },
    };
  }
  const structuredData = {
    "@context": "http://schema.org",
    "@type": "RealEstateListing",
    name: projResponse.basicData.projectName,
    description: projResponse.basicData.about,
    image: projResponse.basicData.media.coverImageUrl.split(",")[1] || "",

    url: `${process.env.NEXTAUTH_URL}/${city}/${lt}/${slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: projResponse.basicData.localityName,
      addressRegion: projResponse.basicData.cityName,
      postalCode: projResponse.basicData.pinCode || "",
      streetAddress: projResponse.basicData.address || "",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: projResponse.basicData.basePrice || "",
      itemCondition: "http://schema.org/NewCondition",
      availability: "http://schema.org/InStock",
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProjectsDetailsPage
        projResponse={projResponse}
        amenitiesFromDB={amenitiesFromDB}
        slug={slug as string}
        params={params}
      />
    </>
  );
}

export async function generateStaticParams() {
  // Get the data (mocked here, replace with your actual data fetching logic)
  const res = await getPagesSlugs("project-list");
  const staticDir = path.join(process.cwd(), "static");
  const filePath = path.join(staticDir, "projectSlugs.json");

  // Ensure the 'static' directory exists
  if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir);
  }

  // Convert the data object into JSON
  const jsonContent = JSON.stringify(res, null, 2);

  // Write the JSON data to the file
  fs.writeFileSync(filePath, jsonContent);
  console.log("projectSlugs.json file created successfully");
  const projectRes = Object.keys(res);
  const slugs = [];
  for (let i = 0; i < projectRes.length; i++) {
    const data = projectRes[i];
    if ((data.match(/\//g) || []).length === 5) {
      const [staticPath, staticPath2, sta3, city, lt, slug] = data.split("/");
      slugs.push({ city, lt, slug });
    }
  }
  console.log(slugs);
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
  const { basicData: data } = await getProjectDetails(slug as string);

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

  const ogTitle = title;
  const ogDescription = description;
  const ogImage =
    data.media.coverImageUrl.split(",")[1] || "default-image-url.jpg";
  const ogUrl = `${process.env.NEXTAUTH_URL}/${params.city}/${params.lt}/${params.slug}`;

  const twitterCard = "summary_large_image";
  const twitterTitle = title;
  const twitterDescription = description;
  const twitterImage = ogImage;

  return {
    title,
    description,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: ogUrl,
      images: [ogImage],
      type: "website",
    },
    twitter: {
      card: twitterCard,
      title: twitterTitle,
      description: twitterDescription,
      images: [twitterImage],
    },
  };
}

export const dynamicParams = true;
export const dynamic = "force-static";
