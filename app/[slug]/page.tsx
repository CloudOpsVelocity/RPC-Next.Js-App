/* eslint-disable no-unused-vars */
import React from "react";
import { getPagesSlugs } from "../seo/api";
import { Metadata, ResolvingMetadata } from "next";
// import NewSearchPage from "../(new_routes_seo)/search/NewSearchPage";
// import redisService from "../utils/redis/redis.service";
import CaseSeoSearchService from "../services/case-seo.service";
// import { SlugsType } from "../common/constatns/slug.constants";
import NewListingSearchpage from "../(new_routes_seo)/search/listing/NewListingSearchpage";
import {
  getProjSearchData,
  getSearchData,
} from "../(new_routes_seo)/in/utils/api";
import { parseApiFilterQueryParams } from "../(new_routes_seo)/search/utils/project-search-queryhelpers";
// import redisService from "../utils/redis/redis.service";
// import { SlugsType } from "../common/constatns/slug.constants";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    sf: string;
  };
};
export default async function Page({ params: { slug }, searchParams }: Props) {
  let serverData = null;
  let frontendFilters = null;
  if (searchParams.sf) {
    const apiFilters = parseApiFilterQueryParams(searchParams.sf);
    const isProj = apiFilters?.includes("listedBy=proj") ? true : false;
    // eslint-disable-next-line no-unused-vars
    const data = isProj
      ? await getProjSearchData(apiFilters ?? "")
      : await getSearchData(apiFilters ?? "");

    serverData = data;
    frontendFilters = parseApiFilterQueryParams(searchParams.sf);
  } else {
    const { frontEndFilter, severData } = await CaseSeoSearchService(slug, {
      sf: !!searchParams.sf,
    });
    frontendFilters = frontEndFilter;
    serverData = severData;
  }

  const pageUrl = `/${slug}`;
  return (
    <NewListingSearchpage
      serverData={serverData}
      frontendFilters={frontendFilters}
      pageUrl={pageUrl}
      preDefinedFilters={searchParams.sf}
      is2lakhUrls
      showProjectTab
    />
  );
}

export const generateStaticParams = async () => {
  // const res = await getPagesSlugs("case-seo");
  // await redisService.saveSeoSlug(SlugsType.SEO, res);
  const res = [
    "3-bhk-plot-for-buy-sale-in-kalkere-bengaluru-45B-32P-SCG-320L-9C",
    "5-bhk-with-servant-for-buy-sale-in-sultan-palya-bengaluru-684B-SCG-519L-9C",
    "3.5-bhk-apartment-flat-for-rent-in-deepanjali-nagar-bengaluru-47B-35P-RCG-156L-9C",
    "5-bhk-villa-for-buy-sale-in-yellupura-bengaluru-683B-31P-SCG-570L-9C",
    "5-bhk-for-rent-in-sadduguntepalya-bengaluru-683B-RCG-482L-9C",
    "3-bhk-row-house-for-rent-in-doddakallasandra-bengaluru-45B-33P-RCG-169L-9C",
    "5-bhk-with-servant-villa-for-buy-sale-in-defence-colony-bengaluru-684B-31P-SCG-157L-9C",
    "3-bhk-apartment-flat-for-buy-sale-in-yelahanka-bengaluru-45B-35P-SCG-568L-9C",
    "2.5-bhk-villa-for-buy-sale-in-indira-nagar-1st-stage-bengaluru-44B-31P-SCG-262L-9C",
    "1-bhk-apartment-flat-for-buy-sale-in-judicial-layout-bengaluru-41B-35P-SCG-308L-9C",
    "2.5-bhk-villa-for-rent-in-nehru-nagar-bengaluru-44B-31P-RCG-435L-9C",
    "5.5-bhk-with-servant-row-house-for-buy-sale-in-singapura-bengaluru-686B-33P-SCG-505L-9C",
    "3-bhk-for-rent-in-hosakerehalli-bengaluru-45B-RCG-241L-9C",
    "1-rk-villa-for-buy-sale-in-thubarahalli-bengaluru-40B-31P-SCG-532L-9C",
    "5.5-bhk-for-buy-sale-in-itpl-bengaluru-685B-SCG-267L-9C",
    "4-bhk-with-servant-villament-for-rent-in-vv-puram-bengaluru-680B-34P-RCG-561L-9C",
    "1-bhk-plot-for-buy-sale-in-hombegowda-nagar-bengaluru-41B-32P-SCG-231L-9C",
    "2.5-bhk-for-buy-sale-in-konanakunte-bengaluru-44B-SCG-352L-9C",
    "3.5-bhk-apartment-flat-for-buy-sale-in-vijaya-bank-layout-bengaluru-47B-35P-SCG-550L-9C",
    "mithuna-white-aspera-in-jakkur-for-rent-in-bengaluru-9C-RCG-8e8ffda354d12c2353d8671eadafbcafPJ",
    "2-bhk-villa-for-rent-in-rmv-extension-bengaluru-43B-31P-RCG-472L-9C",
    "5.5-bhk-with-servant-independent-house-building-for-rent-in-defence-colony-bengaluru-686B-36P-RCG-157L-9C",
    "2.5-bhk-villa-for-buy-sale-in-jp-nagar-1st-phase-bengaluru-44B-31P-SCG-299L-9C",
    "1-rk-for-rent-in-sonnenahalli-bengaluru-40B-RCG-511L-9C",
    "1.5-bhk-apartment-flat-for-buy-sale-in-sunkadakatte-bengaluru-42B-35P-SCG-520L-9C",
  ];
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
  const isProject = !(
    params.slug.includes("rent") || params.slug.includes("sale")
  )
    ? "Property For Sale And Rent"
    : "";
  const twitterTitle = `${isProject} ${heading}`;
  const twitterDescription = `${isProject} ${heading}, Bangalore. Get a verified search without any charges on Getrightproperty.`;
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
  const sanitizedName = id.map((part) => {
    if (part.includes("PJ")) {
      return;
    }
    return part;
  });
  return sanitizedName
    .join(" ")
    .replace(/\b\d*(B|C|G|L|P|CG|SCG|RCG|PJ)\b/g, "")
    .replace(/\s+/g, " ");
}
// export const dynamic = "force-static";
// export const dynamicParams = false;
export const dynamic = "force-dynamic";
