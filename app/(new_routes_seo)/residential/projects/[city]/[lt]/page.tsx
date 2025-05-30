import { getPagesSlugs } from "@/app/seo/api";
import React from "react";
import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";

import {
  extractProjectParamsValues,
  findPathForProjectDetails,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/project";
import { notFound } from "next/navigation";
import NewSearchPage from "@/app/(new_routes_seo)/search/NewSearchPage";
import { Metadata, ResolvingMetadata } from "next";
import logger from "@/app/utils/logger";
import parseProjectSearchQueryParams from "@/app/(new_routes_seo)/search/utils/parse-project-searchqueryParams";
import {
  getProjSearchData,
  getSearchData as getListingData,
} from "@/app/(new_routes_seo)/in/utils/api";
import { parseApiFilterQueryParams } from "@/app/(new_routes_seo)/search/utils/project-search-queryhelpers";
import { getServerSession } from "next-auth";
import { options } from "@/app/options";
import { projectStatusMap } from "@/app/common/constatns/projectStatusPathMap";

type Props = {
  params: { city: string; lt: string; slug: string };
  searchParams: {
    sf: string;
  };
};
export const dynamic = "force-dynamic";
export default async function Page({
  params: { city, lt },
  searchParams,
}: Props) {
  const pathname = `${BASE_PATH_PROJECT_DETAILS}/${city}/${lt}`;
  const value = await findPathForProjectDetails(pathname);
  console.log({ value });
  if (!value) notFound();
  const filterValues = extractProjectParamsValues(value);
  let serverData = null;
  let frontendFilters = null;
  if (searchParams.sf) {
    const apiFilters = parseApiFilterQueryParams(searchParams.sf);
    frontendFilters = parseProjectSearchQueryParams(searchParams.sf);
    const isProj = frontendFilters.listedBy ? false : true;
    // eslint-disable-next-line no-unused-vars
    const data = isProj
      ? await getProjSearchData(apiFilters ?? "")
      : await getListingData(apiFilters ?? "");
    serverData = data?.results;
  } else {
    const data = await getSearchData(
      filterValues.PG
        ? `&page=${filterValues.PG}`
        : `${
            filterValues.LT
              ? `&localities=${filterValues.LT}`
              : `&projStatus=${filterValues.PS}`
          }`
    );
    serverData = await data?.results;
    frontendFilters = {
      ...(filterValues.LT
        ? { localities: [`${lt}+${filterValues.LT}`] }
        : { projStatus: parseInt(filterValues.PS as string) }),
      cg: filterValues.CG,
      listedBy: null,
      currentPage: filterValues.PG ? parseInt(filterValues.PG as string) : null,
      totalCount: data.totalCount,
    };
  }
  return (
    <NewSearchPage
      pageUrl={pathname}
      serverData={serverData}
      frontendFilters={frontendFilters}
      preDefinedFilters={searchParams.sf}
      serverFilterString={
        filterValues.LT
          ? `&localities=${filterValues.LT}`
          : `&projStatus=${filterValues.PS}`
      }
    />
  );
}
export async function generateStaticParams() {
  const res = await getPagesSlugs("project-list");
  const keys = Object.keys(res);
  const slugs = [];
  for (let i = 0; i < keys.length; i++) {
    const data = keys[i];
    if ((data.match(/\//g) || []).length === 4) {
      const [, , , city, lt] = data.split("/");
      slugs.push({ city, lt });
    }
  }
  return slugs;
}
export async function generateMetadata(
  { params }: { params: { city: string; lt: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { city, lt } = params;
  const cityFormatted = city.charAt(0).toUpperCase() + city.slice(1);

  let title: string;
  let description: string;

  if (projectStatusMap.has(lt)) {
    const formattedStatus = projectStatusMap.get(lt)?.title || "Residential";

    title = `${formattedStatus} Residential Projects in ${cityFormatted} - Buy Apartments, Villas & Plots | GetRightProperty`;

    description = `Discover ${formattedStatus.toLowerCase()} residential projects in ${cityFormatted}. Browse verified listings of apartments, villas, plots, and builder floors from trusted developers. Find your perfect home today on GetRightProperty.`;
  } else {
    const localityFormatted = lt
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    title = `Residential Projects Available in ${localityFormatted}, ${cityFormatted} - GetRightProperty`;
    description = `Find the best residential projects in ${localityFormatted}, ${cityFormatted}. Explore apartments, flats, villas, villaments, plots and builder floors. Get verified details.`;
  }

  const url = `https://www.getrightproperty.com/residential/projects/${city}/${lt}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Get Right Property",
      type: "website",
      locale: "en_US",
    },
  };
}

const getSearchData = async (apiFilterQueryParams: string) => {
  try {
    let baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/searchproj?city=9&cg=S`;
    if (!apiFilterQueryParams.includes("page=")) {
      baseUrl += "&page=0";
    }
    const url = `${baseUrl}${apiFilterQueryParams}`;
    const session = await getServerSession(options);
    const res = await fetch(url, {
      cache: "no-store", // disables caching for fresh data
      headers: {
        Authorization: session?.user?.token || "", // fallback to empty string if no token
      },
    });
    if (!res.ok) {
      logger.error("data not fetched successfuly" + res.statusText);
      throw new Error(`Error fetching data: ${res.statusText}`);
    }
    const data = await res.json();
    logger.debug(data);
    return data;
  } catch (error) {
    logger.error(error);
    console.error(error);
    throw new Error("Something Went Wrong.");
  }
};

// export const fetchCache = "force-no-store";
