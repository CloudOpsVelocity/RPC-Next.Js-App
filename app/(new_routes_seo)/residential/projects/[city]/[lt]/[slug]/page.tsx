import dynamicImport from "next/dynamic";

const components = {
  Feature: dynamicImport(() => import("@/app/components/project/feature")),
  Amenties: dynamicImport(() => import("@/app/components/project/amenties")),
  Loans: dynamicImport(() => import("@/app/components/project/loans")),
  About: dynamicImport(() => import("@/app/components/project/about")),
  Navigation: dynamicImport(
    () => import("@/app/components/project/navigation")
  ),
  ProjectDrawer: dynamicImport(() => import("@/app/components/project/Drawer")),
  LeafMap: dynamicImport(() => import("@/app/components/project/map")),
  ListingRentAvail: dynamicImport(
    () => import("@/app/components/project/listingRentAvail")
  ),
  ErrorContainer: dynamicImport(
    () => import("@/app/components/project/error/container")
  ),
  MobileHidden: dynamicImport(
    () => import("@/app/components/molecules/MobileHidden")
  ),
  FloorplanDrawer: dynamicImport(
    () => import("@/app/components/project/drawers/floorplan")
  ),
  MasterPlan: dynamicImport(
    () => import("@/app/components/project/masterplan")
  ),
  ProjectDetailsP: dynamicImport(
    () => import("@/app/components/project/projectDetailsP")
  ),
  GalleryBlock: dynamicImport(
    () => import("@/app/components/project/galleryBlock")
  ),
  Specifications: dynamicImport(
    () => import("@/app/components/project/specification")
  ),
  Banner: dynamicImport(() => import("@/app/components/project/banner")),
  AboutBuilder: dynamicImport(
    () => import("@/app/components/project/aboutBuilder")
  ),
  FaqWithBg: dynamicImport(() => import("@/app/components/project/faq")),
  NearByCarousel: dynamicImport(
    () => import("@/app/components/project/NearByCarousel"),
    { ssr: false }
  ),
  LoginPopup: dynamicImport(
    () => import("@/app/components/project/modals/LoginPop"),
    { ssr: false }
  ),
  Reviews: dynamicImport(() => import("@/app/components/project/reviews"), {
    ssr: false,
  }),
  PartialUnitData: dynamicImport(
    () => import("@/app/components/project/sections")
  ),
  PropertyDataDisplay: dynamicImport(
    () => import("@/app/components/project/_ui/PricingDetailsSection")
  ),
  Disclamer: dynamicImport(() => import("@/app/components/builder/Disclamer")),
  BreadCrumbs: dynamicImport(
    () => import("@/app/components/project/breadcrum/BreadCrum")
  ),
  FloorPlans: dynamicImport(
    () => import("@/app/components/project/newFloorPlan/floor-plan")
  ),
  ProjectSchema: dynamicImport(() => import("@/app/seo/ProjectDetailSchema")),
  FAQJsonLdScript: dynamicImport(() => import("@/app/seo/Faqjson")),
  ProjectGallery: dynamicImport(
    () => import("@/app/components/project/_ui/modals/GallerySectionModal")
  ),
  SharePopup: dynamicImport(
    () => import("@/app/(dashboard)/searchOldPage/components/SharePopup"),
    { ssr: false }
  ),
  ProjectBrouchersSection: dynamicImport(
    () => import("@/app/components/project/broucher/ProjectBrouchersSections"),
    { ssr: false }
  ),
};

import {
  getAmenties,
  getAuthorityNames,
  getProjectDetails,
} from "@/app/utils/api/project";
import { notFound, permanentRedirect } from "next/navigation";
import { getPagesSlugs } from "@/app/seo/api";
import { Metadata, ResolvingMetadata } from "next";
import redisService from "@/app/utils/redis/redis.service";
import { SlugsType } from "@/app/common/constatns/slug.constants";
import { isValidSlugId } from "@/common/utils/slugUtils";
import { createProjectLinkUrl } from "@/app/utils/linkRouters/ProjectLink";
import FirstBlock from "@/app/components/project/firstBlock";
import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";
import Overview from "@/app/components/project/overview";
import FloorPlans from "@/app/components/project/newFloorPlan/floor-plan";

type Props = {
  params: { city: string; lt: string; slug: string };
};

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
  const { basicData: data, nearByLocations, phaseOverview } = projResponse;
  const localitySlug = data.localityName.toLowerCase().replaceAll(" ", "-");
  const projectSlug = name.split("-").slice(0, -1).join("-");
  const projectNameSlug = data.projectName.toLowerCase().replaceAll(" ", "-");

  if (
    localitySlug !== lt ||
    projectSlug !== projectNameSlug ||
    city !== data.cityName.toLowerCase()
  ) {
    return permanentRedirect(
      createProjectLinkUrl({
        city: data.cityName,
        slug: data.projectName,
        locality: data.localityName,
        projIdEnc: data.projIdEnc,
      })
    );
  }

  if (data.projAuthorityId) {
    data.projAuthorityNames = await getAuthorityNames(data.projAuthorityId);
  }

  const refURls = data.sourceBuilderUrl?.split(",") ?? [];
  const url = `${process.env.NEXT_PUBLIC_URL}${BASE_PATH_PROJECT_DETAILS}/${params.city}/${params.lt}/${params.slug}/`;
  const title = `${data.projectName} ${data.availableProperties?.join(
    " "
  )} for sale in ${data.localityName} ${data.cityName}`;
  const imageUrl = data.media?.coverImageUrl?.split(",")[1];
  const desc = `${data.projectName} for sale in ${data.localityName}, ${data.cityName}. View Project Details, Price, Check Brochure PDF, Floor Plan, Reviews, Master Plan, Amenities & Contact Details`;

  return (
    <section className="w-full relative break-words ">
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={imageUrl || ""} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={imageUrl || ""} />
      <components.FAQJsonLdScript data={data} />
      <components.ProjectSchema projectData={{ ...projResponse, url, desc }} />
      <div className="mt-[70px] sm:mt-[90px] w-full sm:pb-[2%] flex xl:text-ellipsis items-center justify-center flex-col ">
        <div className="p-[1%] sm:p-[1%] sm:py-0 xl:p-[1%] w-full sm:w-[94%]">
          <components.BreadCrumbs params={params} />
          <FirstBlock
            projectDetails={data}
            companyName={data.postedByName}
            builderId={data.builderId}
            hasReraStatus={data.reraStatus}
          />
        </div>
        <components.MobileHidden>
          <components.Navigation
            isBrochure={
              !!data.media?.projBroucherUrl ||
              phaseOverview?.some((item: any) => item.phaseBrochureUrl)
            }
            detailsData={{ ...data, nearByLocations }}
            slug={slug}
          />
        </components.MobileHidden>
        <Overview {...data} slug={slug} PhaseOverview={phaseOverview} />
        <components.ListingRentAvail
          projName={data.projectName}
          r={data.rentListing}
          s={data.saleListing}
          slug={slug}
        />
        <components.About
          id="about"
          heading="about"
          projName={data.projectName}
          content={data.about}
          maxLines={12}
        />
        <components.ProjectDetailsP
          projName={data.projectName}
          data={data.phases}
          slug={slug}
          projData={data}
          PhaseOverview={phaseOverview}
          isPartialData={data.partialUnitData}
        />
        <components.MasterPlan
          projName={data.projectName}
          media={data.media?.projectPlanUrl}
        />
        {data.partialUnitData ? (
          <components.PartialUnitData
            partialUnitData={data.partialUnitData}
            projName={data.projectName}
            phaseList={data.phases}
            data={data}
            type="partial"
          />
        ) : (
          <components.FloorPlans
            phases={data.phases}
            projName={data.projectName}
            postedById={data.builderId}
            phaseOverview={phaseOverview}
            partialUnitData={data.partialUnitData}
            slug={slug}
          />
        )}
        <components.GalleryBlock {...data.media} projName={data.projectName} />
        <components.ErrorContainer data={data.amenityList}>
          <components.Amenties
            data={data.amenityList}
            projName={data.projectName}
            amenitiesFromDB={amenitiesFromDB}
          />
        </components.ErrorContainer>
        {data.lat && data.lang && (
          <components.LeafMap
            lat={data.lat}
            lang={data.lang}
            projName={data.projectName}
            type="proj"
            mapData={nearByLocations}
          />
        )}
        <components.ProjectBrouchersSection
          projName={data.projectName}
          phaseOverviewData={phaseOverview}
          singleBroucher={data.media?.projBroucherUrl}
        />
        <components.ErrorContainer data={data.specificationList}>
          <components.Specifications
            data={data.specificationList}
            projName={data.projectName}
          />
        </components.ErrorContainer>
        <components.ErrorContainer data={data.highlights}>
          <components.Feature
            data={data.highlights}
            projName={data.projectName}
          />
        </components.ErrorContainer>
        <components.Banner projName={data.projectName} projIdEnc={slug} />
        <components.ErrorContainer data={data.banks}>
          <components.Loans
            type="proj"
            banks={data.banks}
            name={data.projectName}
          />
        </components.ErrorContainer>
        <components.AboutBuilder id={data.builderId} />
        {data.wbtp && (
          <components.About
            id="why-buy-this-project"
            heading="Why Buy"
            projName={`${data.projectName} ?`}
            content={data.wbtp}
            maxLines={12}
          />
        )}
        <components.Reviews projName={data.projectName} projIdEnc={slug} />
        <div
          id="faq"
          className="scroll-mt-[70px] m-auto w-[95%] sm:w-[90%] flex justify-start items-start"
        >
          <components.FaqWithBg
            data={data.faqs}
            slug={slug}
            projName={data.projectName}
            postedById={data.builderId}
          />
        </div>
        <components.NearByCarousel
          projName={data.projectName}
          lat={data.lat}
          lng={data.lang}
          builderId={data.builderId}
          company={data.companyName}
          projId={slug}
          slug={slug}
        />
        {refURls?.length > 0 && <components.Disclamer refUrls={refURls} />}
        <components.ProjectDrawer projName={data.projectName} />
        <components.FloorplanDrawer />
        <components.LoginPopup />
        <components.ProjectGallery />
        <components.SharePopup />
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const res = await getPagesSlugs("project-list");
  await redisService.saveProjectSlug(SlugsType.PROJECT, res);
  return Object.keys(res)
    .filter((data) => (data.match(/\//g) || []).length === 5)
    .map((data) => {
      const [, , , city, lt, slug] = data.split("/");
      return { city, lt, slug };
    });
}

type SeoProps = {
  params: { city: string; lt: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: SeoProps): Promise<Metadata> {
  const slug = params.slug.split("-").at(-1);
  if (!slug || !isValidSlugId(slug)) {
    notFound();
  }
  const {
    basicData: data,
    phaseOverview,
    nearByLocations,
  } = await getProjectDetails(slug);

  const formatPrice = (price: number) =>
    price >= 10000000
      ? `${(price / 10000000).toFixed(2)} Cr`
      : price >= 100000
      ? `${(price / 100000).toFixed(2)} L`
      : `${price.toLocaleString()}`;
  const priceRange = `${formatPrice(data.minPrice)} - ${formatPrice(
    data.maxPrice
  )}`;

  const configurations = [
    // @ts-ignore
    ...new Set(
      phaseOverview.flatMap((phase: any) =>
        Object.values(phase.propTypeOverview).flatMap(
          (type: any) => type.unitTypes
        )
      )
    ),
  ].join(", ");
  const nearbyLandmarks = [
    ...(nearByLocations.school || []).slice(0, 2).map((s: any) => s.name),
    ...(nearByLocations.hospital || []).slice(0, 2).map((h: any) => h.name),
    ...(nearByLocations.train_station || [])
      .slice(0, 1)
      .map((t: any) => t.name),
  ].join(", ");

  const title = `${data.projectName} ${data.availableProperties?.join(
    " "
  )} for sale in ${data.localityName} ${data.cityName}`;
  const description = `${
    data.projectName
  } offers exclusive ${data.availableProperties?.join(", ")} in ${
    data.localityName
  }, ${
    data.cityName
  }. Explore Project Details, Pricing, Brochure PDF, Floor Plans, Reviews, Master Plan, Amenities, and Contact Information. Secure your future home now!`;
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
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: data.projectName,
      images: data.media.coverImageUrl
        .split(",")
        .map((url) => ({ url, width: 1200, height: 630 })),
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
    robots: { index: true, follow: true },
    category: "Real Estate",
    other: {
      "price-range": priceRange,
      "property-type": data.availableProperties?.join(", ") || "",
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
