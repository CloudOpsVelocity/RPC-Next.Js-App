import React from "react";
import Feature from "@/app/components/project/feature";
import Reviews from "@/app/components/project/reviews";
import Amenties from "@/app/components/project/amenties";
import Loans from "@/app/components/project/loans";
import FirstBlock from "@/app/components/project/firstBlock";
import Overview from "@/app/components/project/overview";
import About from "@/app/components/project/about";
import Navigation from "@/app/components/project/navigation";
import Link from "next/link";
import { getAmenties, getProjectDetails } from "@/app/utils/api/project";
import ProjectDetailsP from "@/app/components/project/projectDetailsP";
import ProjectDrawer from "@/app/components/project/Drawer";
import LeafMap from "@/app/components/project/map";
import ListingRentAvail from "@/app/components/project/listingRentAvail";
import ErrorContainer from "@/app/components/project/error/container";
import MobileHidden from "@/app/components/molecules/MobileHidden";
import { notFound } from "next/navigation";
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
import axios from "axios";
import PartialUnitData from "@/app/components/project/sections";
import { Metadata } from "next";
import type { ResolvingMetadata } from "next";
import { capitalizeWords } from "@/app/utils/letters";
// const FloorplansBlock = dynamic(
//   () => import("@/app/components/project/floorplansBlock"),
//   {
//     loading: () => <SectionSkeleton />,
//     ssr: false,
//   }
// );
// const GalleryBlock = dynamic(
//   () => import("@/app/components/project/galleryBlock"),
//   {
//     loading: () => <SectionSkeleton />,
//     ssr: false,
//   }
// );
// const MasterPlan = dynamic(
//   () => import("@/app/components/project/masterplan"),
//   {
//     loading: () => <SectionSkeleton />,
//     ssr: true,
//   }
// );
// const NearByCarousel = dynamic(
//   () => import("@/app/components/project/NearByCarousel"),
//   {
//     loading: () => <SectionSkeleton />,
//     ssr: false,
//   }
// );
// const Specifications = dynamic(
//   () => import("@/app/components/project/specification"),
//   {
//     loading: () => <SectionSkeleton />,
//     ssr: false,
//   }
// );
// const LoginPopup = dynamic(
//   () => import("@/app/components/project/modals/LoginPop"),
//   {
//     loading: () => <SectionSkeleton />,
//     ssr: false,
//   }
// );
// const Banner = dynamic(() => import("@/app/components/project/banner"), {
//   loading: () => <SectionSkeleton />,
//   ssr: false,
// });
// const AboutBuilder = dynamic(
//   () => import("@/app/components/project/aboutBuilder"),
//   {
//     loading: () => <SectionSkeleton />,
//     ssr: false,
//   }
// );
// const FaqWithBg = dynamic(() => import("@/app/components/project/faq"), {
//   loading: () => <SectionSkeleton />,
//   ssr: false,
// });

type Props = { params: { slug: string } };
export default async function ProjectDetails({ params: { slug } }: Props) {
  const {
    basicData: data,
    nearByLocations,
    phaseOverview,
  } = await getProjectDetails(slug);
  const amenitiesFromDB = await getAmenties();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.projectName,
    image: data.media.coverImageUrl,
    description: data.about,
  };
  if (!data.projIdEnc) {
    notFound();
  }

  return (
    <section className="w-full relative break-words">
      {/* <!-- Facebook Meta Tags --> */}
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_URL}/abc/${data.cityName}/${data.localityName}/${slug}`}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={`${data.projectName} ${data.availableProperties.join(
          " "
        )} for sale in ${data.localityName} ${data.cityName}`}
      />
      <meta
        property="og:description"
        content={`${data.projectName} for sale in ${data.localityName}, ${data.cityName}. View Project Details, Price, Check Brochure PDF, Floor Plan, Reviews, Master Plan, Amenities & Contact Details`}
      />
      <meta property="og:image" content={data.media.coverImageUrl} />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="getrightproperty.com" />
      <meta
        property="twitter:url"
        content="https://www.getrightproperty.com/"
      />
      <meta
        name="twitter:title"
        content={`${data.projectName} ${data.availableProperties.join(
          " "
        )} for sale in ${data.localityName} ${data.cityName}`}
      />
      <meta
        name="twitter:description"
        content={`${data.projectName} for sale in ${data.localityName}, ${data.cityName}. View Project Details, Price, Check Brochure PDF, Floor Plan, Reviews, Master Plan, Amenities & Contact Details`}
      />
      <meta name="twitter:image" content={data.media.coverImageUrl}></meta>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mt-[100px] sm:mt-[70px] w-full pb-[2%] flex items-center justify-center flex-col">
        <div className="p-[2%] w-[94.3%]">
          <p className="text-[12px] sm:text-[16px] text-[#565D70] font-[500] mb-[1%]">
            <span>Home</span> {" > "}
            <Link href={"/project/banglore"}>
              <span>Projects In {data.cityName}</span>
            </Link>{" "}
            {" > "}
            <Link href={"/project/banglore/whitefield"}>
              <span>Projects In {`${data.localityName} `}</span>
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
          />
        </div>
        {/* Navigations Container */}
        <MobileHidden>
          <Navigation
            isBrochure={!!data?.media?.projBroucherUrl}
            detailsData={data}
          />
        </MobileHidden>
        <Overview {...data} PhaseOverview={phaseOverview} />
        <ListingRentAvail
          projName={data.projectName}
          r={data.rentListing}
          s={data.saleListing}
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
        {!data.partialUnitData ? (
          <FloorplansBlock
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
          <Loans type="proj" banks={data.banks} name={data.projectName} />
        </ErrorContainer>

        <AboutBuilder id={data.builderId} />
        {/* Why Buy This  */}
        {data.wbtp && (
          <About
            id="whyBuy"
            heading="Why Buy"
            projName={`${data.projectName} ?`}
            content={data.wbtp}
          />
        )}
        <Reviews projName={data.projectName} />
        {/* <DownloadBroucher
          url={`${data?.media?.projBroucherUrl}?${Math.random()}`}
        /> */}
        <FaqWithBg data={data.faqs} projName={data.projectName} />
        <NearByCarousel
          projName={data.projectName}
          lat={data.lat}
          lng={data.lang}
          builderId={data.builderId}
          company={data.companyName}
        />
        <ProjectDrawer projName={data.projectName} />
        <FloorplanDrawer />
        <LoginPopup />
        {/* <BaseSucess /> */}
      </div>
    </section>
  );
}
// VALIDATIONS OF PAGE & SEO
// export const fetchCache = "force-cache";
// export const revalidate = 120;

// export async function generateStaticParams() {
//   const { projResult } = await getParams();
//   const slugs = projResult.map((slug: string) => ({
//     slug: slug,
//   }));
//   // console.log(slugs);
//   return slugs;
// }

async function getParams() {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/all/active/ids?identifier=project`;
  let data = await axios.get(url);
  return data.data;
}

type SeoProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: SeoProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const { basicData: data } = await getProjectDetails(slug);
  // Name of the Project
  // Property Type
  // Text " For Sale In"
  // Locality
  // City

  return {
    title: `${data.projectName} ${data.availableProperties.join(
      " "
    )} for sale in ${data.localityName} ${data.cityName}`,
    // Jackson Botanico for sale in whitefield, Banglore. View Project Details, Price, Check Brochure PDF, Floor Plan, Reviews, Master Plan, Amenities & Contact Details

    description: `${data.projectName} for sale in ${data.localityName}, ${data.cityName}. View Project Details, Price, Check Brochure PDF, Floor Plan, Reviews, Master Plan, Amenities & Contact Details`,
    twitter: {},

    // openGraph: [{ }],
  };
}
