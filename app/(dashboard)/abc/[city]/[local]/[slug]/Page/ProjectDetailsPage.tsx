import React from "react";
import Feature from "@/app/components/project/feature";
import Amenties from "@/app/components/project/amenties";
import Loans from "@/app/components/project/loans";
import FirstBlock from "@/app/components/project/firstBlock";
import Overview from "@/app/components/project/overview";
import About from "@/app/components/project/about";
import Navigation from "@/app/components/project/navigation";
import Link from "next/link";
import ProjectDetailsP from "@/app/components/project/projectDetailsP";
import ProjectDrawer from "@/app/components/project/Drawer";
import LeafMap from "@/app/components/project/map";
import ListingRentAvail from "@/app/components/project/listingRentAvail";
import ErrorContainer from "@/app/components/project/error/container";
import MobileHidden from "@/app/components/molecules/MobileHidden";
import FloorplanDrawer from "@/app/components/project/drawers/floorplan";
import MasterPlan from "@/app/components/project/masterplan";
import FloorplansBlock from "@/app/components/project/floorplansBlock";
import GalleryBlock from "@/app/components/project/galleryBlock";
import Specifications from "@/app/components/project/specification";
import Banner from "@/app/components/project/banner";
import AboutBuilder from "@/app/components/project/aboutBuilder";
import FaqWithBg from "@/app/components/project/faq";
import NearByCarousel from "@/app/components/project/NearByCarousel";
import LoginPopup from "@/app/components/project/modals/LoginPop";
import FAQJsonLdScript from "@/app/seo/Faqjson";
import QAJsonLdScript from "@/app/seo/Qnajson";
import PropertyJsonLdScript from "@/app/seo/Productjson";
import ArticleJsonLdScript from "@/app/seo/ArticleJson";
import Reviews from "@/app/components/project/reviews";
import PartialUnitData from "@/app/components/project/sections";
import PropertyDataDisplay from "@/app/components/project/_ui/PricingDetailsSection";
import Disclamer from "@/app/components/builder/Disclamer";
type Props = {
  projResponse: any;
  amenitiesFromDB: any;
  slug: string;
  scrollId?: string;
};

export default async function ProjectsDetailsPage({
  projResponse,
  amenitiesFromDB,
  slug,
  scrollId,
}: Props) {
  const { basicData: data, nearByLocations, phaseOverview } = projResponse;

  const refURls = data?.sourceBuilderUrl?.split(",");

  return (
    <section className="w-full relative break-words ">
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_URL}/abc/${data.cityName}/${data.localityName}/${slug}`}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={`${data.projectName} ${data.availableProperties?.join(
          " "
        )} for sale in ${data.localityName} ${data.cityName}`}
      />
      <meta
        property="og:description"
        content={`${data.projectName} for sale in ${data.localityName}, ${data.cityName}. View Project Details, Price, Check Brochure PDF, Floor Plan, Reviews, Master Plan, Amenities & Contact Details`}
      />
      <meta property="og:image" content={data.media?.coverImageUrl} />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="getrightproperty.com" />
      <meta
        property="twitter:url"
        content={`${process.env.NEXT_PUBLIC_URL}/abc/${data.cityName}/${data.localityName}/${slug}`}
      />
      <meta
        name="twitter:title"
        content={`${data.projectName} ${data.availableProperties?.join(
          " "
        )} for sale in ${data.localityName} ${data.cityName}`}
      />
      <meta
        name="twitter:description"
        content={`${data.projectName} for sale in ${data.localityName}, ${data.cityName}. View Project Details, Price, Check Brochure PDF, Floor Plan, Reviews, Master Plan, Amenities & Contact Details`}
      />
      <meta name="twitter:image" content={data.media?.coverImageUrl} />
      <FAQJsonLdScript data={data} />
      <QAJsonLdScript data={data} />
      <PropertyJsonLdScript data={data} />
      <ArticleJsonLdScript data={data} />
      <div className="mt-[70px] sm:mt-[90px] w-full sm:pb-[2%] flex xl:text-ellipsis items-center justify-center flex-col ">
        <div className="p-[1%] sm:p-[1%] sm:py-0 xl:p-[1%] w-full sm:w-[94%]">
          <p className="text-[12px] sm:text-[16px] text-[#565D70] font-[500] mb-[1%]">
            <a className="hover:underline cursor-pointer" href={"/"}>
              Home
            </a>{" "}
            {" > "}
            <Link href={"/project/banglore"}>
              <span>Projects In {data.cityName}</span>
            </Link>{" "}
            {" > "}
            <Link href={"/project/banglore/whitefield"}>
              <span className="hover:underline cursor-pointer">
                Projects In {`${data.localityName} `}
              </span>
            </Link>{" "}
            {" > "}
            <span>{data.projectName}</span>
          </p>
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
            isBrochure={!!data?.media?.projBroucherUrl}
            detailsData={{ ...data, nearByLocations }}
            slug={slug}
          />
        </MobileHidden>
        <Overview {...data} slug={slug} Ph aseOverview={phaseOverview} />
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
        />
        {/* Property Details */}
        <ProjectDetailsP
          projName={data.projectName}
          data={data.phases}
          slug={slug}
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
        <ErrorContainer data={data.specificationList}>
          <Specifications
            data={data.specificationList}
            projName={data.projectName}
          />
        </ErrorContainer>
        <ErrorContainer data={data.highlights}>
          <Feature data={data.highlights} projName={data.projectName} />
        </ErrorContainer>
        <Banner projName={data.projectName} projIdEnc={data.projIdEnc} />

        <ErrorContainer data={data.banks}>
          <div id="bank-approvals" className="w-full h-auto scroll-mt-[150px]">
            <Loans type="proj" banks={data.banks} name={data.projectName} />
          </div>
        </ErrorContainer>

        <AboutBuilder id={data.builderId} />
        {/* Why Buy This  */}
        {data.wbtp && (
          <About
            id="why-buy-this-project"
            heading="Why Buy"
            projName={`${data.projectName} ?`}
            content={data.wbtp}
          />
        )}
        <Reviews projName={data.projectName} projIdEnc={slug} />
        {/* <DownloadBroucher
  url={`${data?.media?.projBroucherUrl}?${Math.random()}`}
/> */}
        <div
          id="faq"
          className="scroll-mt-[70px] m-auto w-[95%] sm:w-[90%] flex justify-start items-start"
        >
          <FaqWithBg data={data.faqs} projName={data.projectName} />
        </div>
        <NearByCarousel
          projName={data.projectName}
          lat={data.lat}
          lng={data.lang}
          builderId={data.builderId}
          company={data.companyName}
        />
        {refURls && refURls.length > 0 && <Disclamer refUrls={refURls} />}

        <ProjectDrawer projName={data.projectName} />
        <FloorplanDrawer />
        <LoginPopup />
        {/* <BaseSucess /> */}
      </div>
    </section>
  );
}
