import React from "react";
import dynamic from "next/dynamic";
import { MERGERPROJECT } from "@/app/validations/types/project";

const Feature = dynamic(() => import("@/app/components/project/feature"));
const Amenties = dynamic(() => import("@/app/components/project/amenties"));
const Loans = dynamic(() => import("@/app/components/project/loans"));
const FirstBlock = dynamic(() => import("@/app/components/project/firstBlock"));
const Overview = dynamic(() => import("@/app/components/project/overview"));
const About = dynamic(() => import("@/app/components/project/about"));
const Navigation = dynamic(() => import("@/app/components/project/navigation"));
const ProjectDetailsP = dynamic(() => import("@/app/components/project/projectDetailsP"));
const ProjectDrawer = dynamic(() => import("@/app/components/project/Drawer"));
// const LeafMap = dynamic(() => import("@/app/components/project/map"));
import LeafMap from "@/app/components/project/map";
const ListingRentAvail = dynamic(() => import("@/app/components/project/listingRentAvail"));
const ErrorContainer = dynamic(() => import("@/app/components/project/error/container"));
const MobileHidden = dynamic(() => import("@/app/components/molecules/MobileHidden"));
const FloorplanDrawer = dynamic(() => import("@/app/components/project/drawers/floorplan"));
const MasterPlan = dynamic(() => import("@/app/components/project/masterplan"));
const FloorplansBlock = dynamic(() => import("@/app/components/project/floorplansBlock"));
const GalleryBlock = dynamic(() => import("@/app/components/project/galleryBlock"));
const Specifications = dynamic(() => import("@/app/components/project/specification"));
const Banner = dynamic(() => import("@/app/components/project/banner"));
import AboutBuilder from "@/app/components/project/aboutBuilder";
import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";
import Head from "next/head";
const FaqWithBg = dynamic(() => import("@/app/components/project/faq"));
const NearByCarousel = dynamic(() => import("@/app/components/project/NearByCarousel"));
const LoginPopup = dynamic(() => import("@/app/components/project/modals/LoginPop"));
const FAQJsonLdScript = dynamic(() => import("@/app/seo/Faqjson"));
const QAJsonLdScript = dynamic(() => import("@/app/seo/Qnajson"));
const PropertyJsonLdScript = dynamic(() => import("@/app/seo/Productjson"));
const ArticleJsonLdScript = dynamic(() => import("@/app/seo/ArticleJson"));
const Reviews = dynamic(() => import("@/app/components/project/reviews"));
const PartialUnitData = dynamic(() => import("@/app/components/project/sections"));
const PropertyDataDisplay = dynamic(() => import("@/app/components/project/_ui/PricingDetailsSection"));
const Disclamer = dynamic(() => import("@/app/components/builder/Disclamer"));
const BreadCrumbs = dynamic(() => import("@/app/components/project/breadcrum/BreadCrum"));
const ProjectGallery = dynamic(() => import("@/app/components/project/_ui/modals/GallerySectionModal"));
const SharePopup = dynamic(() => import("@/app/(dashboard)/search/components/SharePopup"));
const ProjectBrouchersSection = dynamic(
  () => import("@/app/components/project/broucher/ProjectBrouchersSections"),
  {
    ssr: false,
  }
);
type Props = {
  projResponse: MERGERPROJECT;
  amenitiesFromDB: any;
  slug: string;
  scrollId?: string;
  params: any;
  
};

export default async function ProjectsDetailsPage({
  projResponse,
  amenitiesFromDB,
  slug,
  scrollId,
  params,
}: Props) {
  const { basicData: data, nearByLocations, phaseOverview } = projResponse;
  const refURls = data?.sourceBuilderUrl?.split(",");
  const url = `${BASE_PATH_PROJECT_DETAILS}/${data.cityName}/${data.localityName}/${params.slug}`
  const title = `${data?.projectName} ${
      data.availableProperties && data?.availableProperties?.join(" ")
    } for sale in ${data.localityName} ${data.cityName}`
    const imageUrl = data?.media?.coverImageUrl.split(",")[1]
    const desc = `${data.projectName} for sale in ${data.localityName}, ${data.cityName}. View Project Details, Price, Check Brochure PDF, Floor Plan, Reviews, Master Plan, Amenities & Contact Details`
  return (
    <section className="w-full relative break-words ">
      {/* <meta name="keywords" content={`${data.projectName}, ${data.localityName}, ${data.cityName}, real estate, property`} /> */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={imageUrl || ''} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={imageUrl || ''} />
      <FAQJsonLdScript data={data} />
      <QAJsonLdScript data={data} />
      <PropertyJsonLdScript data={data} />
      <ArticleJsonLdScript data={data} />
      <div className="mt-[70px] sm:mt-[90px] w-full sm:pb-[2%] flex xl:text-ellipsis items-center justify-center flex-col ">
        <div className="p-[1%] sm:p-[1%] sm:py-0 xl:p-[1%] w-full sm:w-[94%]">
          <BreadCrumbs params={params} />
          {/* Top Cover Image Card */}
          <FirstBlock
            projectDetails={data}
            companyName={data.postedByName}
            builderId={data.builderId}
            hasReraStatus={data.reraStatus}
            scrollId={scrollId}
          />
        </div>
        {/* Navigations Container */}
        <MobileHidden>
          <Navigation
            isBrochure={!!data?.media?.projBroucherUrl || phaseOverview?.some((item: { phaseBrochureUrl: string | null }) => item.phaseBrochureUrl)}
            detailsData={{ ...data, nearByLocations }}
            slug={slug}
            scrollId={scrollId}
          />
        </MobileHidden>
        <Overview {...data} slug={slug} PhaseOverview={phaseOverview} />
        <ListingRentAvail
          projName={data.projectName}
          r={data.rentListing}
          s={data.saleListing}
          slug={slug}
        />
        {/* About */}
        <About
          id="about"
          heading="about"
          projName={data.projectName}
          content={data.about}
          maxLines={12}
        />
        {/* Property Details */}
        <ProjectDetailsP
          projName={data.projectName}
          data={data.phases}
          slug={slug}
          projData={data}
          PhaseOverview={phaseOverview}
          isPartialData={data.partialUnitData!!}
        />
        <MasterPlan
          projName={data.projectName}
          media={data?.media?.projectPlanUrl}
        />
        {data.partialUnitData && (
          <PropertyDataDisplay
            unitData={data.partialUnitData}
            projName={data.projectName}
            phaseList={data.phases}
          />
        )}
        {!data.partialUnitData ? (
          <FloorplansBlock
            partialUnitData={data.partialUnitData}
            // overview={overview}
            projName={data.projectName}
            data={data.phases}
            slug={slug}
            PhaseOverview={phaseOverview}
            phaseList={data.phases}
          />
        ) : (
          <PartialUnitData
            partialUnitData={data.partialUnitData}
            projName={data.projectName}
            phaseList={data.phases}
            data={data}
            type="partial"
          />
        )}

        <GalleryBlock
          {...data.media}
          projName={data.projectName}
          media={data.media}
        />
        <ErrorContainer data={data.amenityList}>
          <Amenties
            data={data.amenityList}
            projName={data.projectName}
            amenitiesFromDB={amenitiesFromDB}
          />
        </ErrorContainer>
        <div id="near-by" className="scroll-mt-[180px]" />
        {data.lat && data.lang && (
          <LeafMap
            lat={data.lat}
            lang={data.lang}
            projName={data.projectName}
            type="proj"
            mapData={nearByLocations}
          />
        )}
        <ProjectBrouchersSection
          projName={data.projectName}
          phaseOverviewData={phaseOverview}
          singleBroucher={data.media?.projBroucherUrl}
        />
        <ErrorContainer data={data.specificationList}>
          <Specifications
            data={data.specificationList}
            projName={data.projectName}
          />
        </ErrorContainer>
        <ErrorContainer data={data.highlights}>
          <Feature data={data.highlights} projName={data.projectName} />
        </ErrorContainer>
        <Banner projName={data.projectName} projIdEnc={slug} />
        <ErrorContainer data={data.banks}>
          <div id="bank-approvals" className="w-full h-auto scroll-mt-[150px]">
            <Loans type="proj" banks={data.banks} name={data.projectName} />
          </div>
        </ErrorContainer>

        <AboutBuilder id={data.builderId} />
        {data.wbtp && (
          <About
            id="why-buy-this-project"
            heading="Why Buy"
            projName={`${data.projectName} ?`}
            content={data.wbtp}
            maxLines={12}
          />
        )}
        <Reviews projName={data.projectName} projIdEnc={slug} />
        <div
          id="faq"
          className="scroll-mt-[70px] m-auto w-[95%] sm:w-[90%] flex justify-start items-start"
        >
          <FaqWithBg data={data.faqs} slug={slug} projName={data.projectName} postedById={data.builderId} />
        </div>
        <NearByCarousel
          projName={data.projectName}
          lat={data.lat}
          lng={data.lang}
          builderId={data.builderId}
          company={data.companyName}
          projId={slug}
          slug={slug}
        />
        {refURls && refURls.length > 0 && <Disclamer refUrls={refURls} />}

        <ProjectDrawer projName={data.projectName} />
        <FloorplanDrawer />
        <LoginPopup />
        <ProjectGallery />
        <SharePopup />
      </div>
    </section>
  );
}
