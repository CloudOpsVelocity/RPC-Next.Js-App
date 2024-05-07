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
import { getProjectDetails } from "@/app/utils/api/project";
import ProjectDetailsP from "@/app/components/project/projectDetailsP";
import ProjectDrawer from "@/app/components/project/Drawer";
import DownloadBroucher from "@/app/components/project/downloadBroucher";
import LeafMap from "@/app/components/project/map";
import ListingRentAvail from "@/app/components/project/listingRentAvail";
import dynamic from "next/dynamic";
import SectionSkeleton from "@/app/components/atoms/skeleton/section";
import ErrorContainer from "@/app/components/project/error/container";
import MobileHidden from "@/app/components/molecules/MobileHidden";
import { notFound } from "next/navigation";
const FloorplansBlock = dynamic(
  () => import("@/app/components/project/floorplansBlock"),
  {
    loading: () => <SectionSkeleton />,
    ssr: false,
  }
);
const GalleryBlock = dynamic(
  () => import("@/app/components/project/galleryBlock"),
  {
    loading: () => <SectionSkeleton />,
    ssr: false,
  }
);
const MasterPlan = dynamic(
  () => import("@/app/components/project/masterplan"),
  {
    loading: () => <SectionSkeleton />,
    ssr: true,
  }
);
const NearByCarousel = dynamic(
  () => import("@/app/components/project/NearByCarousel"),
  {
    loading: () => <SectionSkeleton />,
    ssr: false,
  }
);
const Specifications = dynamic(
  () => import("@/app/components/project/specification"),
  {
    loading: () => <SectionSkeleton />,
    ssr: false,
  }
);
const LoginPopup = dynamic(
  () => import("@/app/components/project/modals/LoginPop"),
  {
    loading: () => <SectionSkeleton />,
    ssr: false,
  }
);
const Banner = dynamic(() => import("@/app/components/project/banner"), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});
const AboutBuilder = dynamic(
  () => import("@/app/components/project/aboutBuilder"),
  {
    loading: () => <SectionSkeleton />,
    ssr: false,
  }
);
const FaqWithBg = dynamic(() => import("@/app/components/project/faq"), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

type Props = { params: { slug: string } };
export default async function ProjectDetails({ params: { slug } }: Props) {
  const data = await getProjectDetails(slug);
  if (!data.projIdEnc) {
    notFound();
  }
  return (
    <div className="w-full relative">
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
          <FirstBlock projectDetails={data} />
        </div>
        {/* Navigations Container */}
        <MobileHidden>
          <Navigation
            isBrochure={!!data?.media?.projBroucherUrl}
            detailsData={data}
          />
        </MobileHidden>
        <Overview {...data} />
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
          data={data.phaseList}
          slug={slug}
        />
        <MasterPlan
          projName={data.projectName}
          media={data?.media?.projectPlanUrl}
        />
        <FloorplansBlock
          projName={data.projectName}
          data={data.phaseList}
          slug={slug}
        />
        <GalleryBlock
          {...data.media}
          projName={data.projectName}
          media={data.media}
        />
        <ErrorContainer data={data.amenityList}>
          <Amenties data={data.amenityList} />
        </ErrorContainer>

        {data.lat && data.lang && (
          <LeafMap
            lat={data.lat}
            lang={data.lang}
            projName={data.projectName}
            type="proj"
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
        {/* Why Buy This */}
        {data.wbtp && (
          <About
            id="whyBuy"
            heading="Why Buy"
            projName={`${data.projectName} ?`}
            content={data.wbtp}
          />
        )}
        <Reviews projName={data.projectName} />
        <DownloadBroucher
          url={`${data?.media?.projBroucherUrl}?${Math.random()}`}
        />
        <FaqWithBg data={data.faqs} projName={data.projectName} />
        <NearByCarousel
          projName={data.projectName}
          lat={data.lat}
          lng={data.lang}
          builderId={data.builderId}
        />
        <ProjectDrawer projName={data.projectName} />
        <LoginPopup />
      </div>
    </div>
  );
}

export const fetchCache = "force-no-store";

// export async function generateStaticParams() {
//   const slugs = [
//     "7f146b9e4154f8613745e501fb87d6b9",
//     "1a108fb4ef25e2ae31cf002cb005289e",
//     "4f313de2f95cd9d761098b8f6c09417c",
//     "c74d67bd1a8929892738e969d0c7691e",
//   ];
//   return slugs.map((slug) => ({
//     slug,
//   }));
// }
