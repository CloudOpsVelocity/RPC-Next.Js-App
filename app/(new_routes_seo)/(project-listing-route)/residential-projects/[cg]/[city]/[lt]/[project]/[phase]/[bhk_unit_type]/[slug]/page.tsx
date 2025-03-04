import ListingDetailsPage from "@/app/(dashboard)/listing/[city]/[slug]/Page/ListingDetailsPage";
import { getAmenties, getAuthorityNames } from "@/app/utils/api/project";
import {
  getListingDetails,
  getProjectDetails,
  getReportConstData,
} from "@/app/utils/api/property";
import { notFound } from "next/navigation";
import React from "react";
import { BASE_PATH_PROJECT_LISTING } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import { Metadata, ResolvingMetadata } from "next";
type Props = {
  params: {
    cg: string;
    city: string;
    lt: string;
    project: string;
    bhk_unit_type: string;
    slug: string;
    phase: string;
  };
};

export default async function Page({ params }: Props) {
  const pathname = `${BASE_PATH_PROJECT_LISTING}/${params.cg}/${params.city}/${params.lt}/${params.project}/${params.phase}/${params.bhk_unit_type}/${params.slug}`;

  let id = params.slug.includes("-") ? params.slug.split("-").at(-1) : null;
  if (!id) {
    notFound();
  }
  const {
    listing: data,
    nearByLocations,
    totalPrice,
  } = await getListingDetails(id as string, pathname);
  const [projData, issueData, amenities] = await Promise.all([
    getProjectDetails(data.projIdEnc),
    getReportConstData(),
    getAmenties(),
  ]);
  if (projData.projAuthorityId) {
    const res = await getAuthorityNames(projData.projAuthorityId);
    data.projAuthorityNames = res;
  }
  const TITLE_OF_PROP = data.projIdEnc
    ? data.propName
    : `${data.bhkName ?? ""} ${data.propTypeName} For
  ${data.cg === "S" ? " Sale" : " Rent"} In ${data.ltName}`;
  if (!data.propIdEnc) {
    console.log("slug found data not coming for this listing" + pathname);
    notFound();
  }
  return (
    <ListingDetailsPage
      TITLE_OF_PROP={TITLE_OF_PROP}
      amenitiesFromDB={amenities}
      data={data}
      projData={projData}
      issueData={issueData}
      nearByLocations={nearByLocations}
      totalPrice={totalPrice}
      params={params}
      pathname={pathname}
    />
  );
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params?.slug?.split("-")[1];
  const {
    listing: data,
    nearByLocations,
    totalPrice,
  } = await getListingDetails(id as string);

  const keywords = `${data.bhkName ?? ""}, ${data.propTypeName}, ${
    data.ltName
  }, ${data.ctName}, ${data.cg === "S" ? "Sale" : "Rent"}`;

  return {
    title: `${data.bhkName ?? ""} ${data.propTypeName}, for ${
      data.cg === "S" ? " Sale" : " Rent"
    } in ${data.ltName} - Getrightproperty`,
    applicationName: "Getrightproperty",
    description: `Searching ${data.bhkName ?? ""} ${data.propTypeName}, for ${
      data.cg === "S" ? " Sale" : " Rent"
    } in ${
      data.ltName
    }, Bangalore. Get a verified search without any charges on Getrightproperty. Property Search Application. Find your dream home today!`,
    keywords: keywords, // Added keywords for SEO
    openGraph: {
      title: `${data.bhkName ?? ""} ${data.propTypeName}, for ${
        data.cg === "S" ? " Sale" : " Rent"
      } in ${data.ltName} - Getrightproperty`,
      description: `Searching ${data.bhkName ?? ""} ${data.propTypeName}, for ${
        data.cg === "S" ? " Sale" : " Rent"
      } in ${
        data.ltName
      }, Bangalore. Get a verified search without any charges on Getrightproperty. Property Search Application. Explore listings now!`,
      url: data.projMedia.coverImageUrl,
      type: "website",
      // site_name: "Getrightproperty",
      images: [
        {
          url: data.projMedia.coverImageUrl,
          width: 800,
          height: 600,
          alt: `${data.bhkName ?? ""} ${data.propTypeName}, for ${
            data.cg === "S" ? " Sale" : " Rent"
          } in ${data.ltName} - Getrightproperty`,
        },
      ],
      locale: "en_US",
      siteName: "Getrightproperty",
      countryName: "India",
      emails: ["rahulrpclan@gamil.com"],
      phoneNumbers: ["+91-8884440963"],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Getrightproperty",
      title: `${data.bhkName ?? ""} ${data.propTypeName}, for ${
        data.cg === "S" ? " Sale" : " Rent"
      } in ${data.ltName} - Getrightproperty`,
      description: `Searching ${data.bhkName ?? ""} ${data.propTypeName}, for ${
        data.cg === "S" ? " Sale" : " Rent"
      } in ${
        data.ltName
      }, Bangalore. Get a verified search without any charges on Getrightproperty.`,
      images: data.projMedia.coverImageUrl,
    },
  };
}
