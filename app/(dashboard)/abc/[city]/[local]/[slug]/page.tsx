import React from "react";
import FloorplansBlock from "@/app/components/project/floorplansBlock";
import AboutBuilder from "@/app/components/project/aboutBuilder";
import GalleryBlock from "@/app/components/project/galleryBlock";
import Nearby from "@/app/components/project/nearby";
import Banner from "@/app/components/project/banner";
import Feature from "@/app/components/project/feature";
import Reviews from "@/app/components/project/reviews";
import Amenties from "@/app/components/project/amenties";
import Loans from "@/app/components/project/loans";
import { FaqWithBg } from "@/app/components/project/faq";
import ProjectCarousel from "@/app/components/project/ProjectCard";
import FirstBlock from "@/app/components/project/firstBlock";
import Overview from "@/app/components/project/overview";
import Testimonials from "@/app/components/project/testimonials";
import About from "@/app/components/project/about";
import Navigation from "@/app/components/project/navigation";
import Link from "next/link";
import { getCachedUser, getProjectDetails } from "@/app/utils/api/project";
import ProjectDetailsP from "@/app/components/project/projectDetailsP";
import Specifications from "@/app/components/project/specification";
import ProjectDrawer from "@/app/components/project/Drawer";
import Container from "@/app/components/molecules/Utils/Container";
import { unstable_cache } from "next/cache";
import { projectprops } from "@/app/data/projectDetails";
import DownloadBroucher from "@/app/components/project/downloadBroucher";

type Props = { params: { slug: string } };
export default async function ProjectDetails({ params: { slug } }: Props) {
  // const data = await getCachedUser(slug);
  const data = await getProjectDetails(slug);
  console.log(data);
  return (
    <div className="w-full">
      <div className="mt-[90px] w-full pb-[2%] flex items-center justify-center flex-col">
        <div className="p-[2%] w-full">
          <p className="text-[16px] text-[#565D70] font-[500] mb-[1%]">
            <span>home</span> {" > "}
            <Link href={"/project/banglore"}>
              <span>Project In Bengaluru</span>
            </Link>{" "}
            {" > "}
            <Link href={"/project/banglore/whitefield"}>
              <span>Project In BTM Layout Bengaluru</span>
            </Link>{" "}
            {" > "}
            <span>{data.projectName}</span>
          </p>
          {/* Top Cover Image Card */}
          <FirstBlock projectDetails={data} />
        </div>
        {/* Navigations Container */}
        <Navigation />
        {/* Overview */}
        <Overview {...data} />
        {/* About */}
        <About
          id="about"
          heading="about"
          projName={data.projectName}
          content={data.about}
        />
        {/* Property Details */}
        <ProjectDetailsP projName={data.projectName} data={data.phaseList} slug={slug} />
        {/* Floor Plan Block */}
        <FloorplansBlock projName={data.projectName} data={data.phaseList} slug={slug} />
        <GalleryBlock {...data.media} projName={data.projectName} />
        <Amenties data={data.amenityList} />
        {/* <Nearby lat={data.lat} lang={data.lang} /> */}
        <Nearby lat="12.9662976" lang="77.5716864" projName={data.projectName} />
        <Specifications data={data.specificationList} projName={data.projectName} />
        <Feature data={data.highlights} projName={data.projectName} />
        <Banner projName={data.projectName} />
        <Loans data={data.banks} projName={data.projectName} />
        <AboutBuilder />
        {/* Why Buy This */}
        <About
          id="whyBuy"
          heading="Why Buy"
          projName={`${data.projectName} ?`}
          content={data.wbtp}
        />
        <Testimonials projName={data.projectName} />
        <Reviews projName={data.projectName} />
        <DownloadBroucher url={data?.media?.projBroucherUrl} />

        <FaqWithBg data={data.faqs} projName={data.projectName} />
        <div className="flex flex-col justify-start items-start w-[90%]">
          <ProjectCarousel
            type="proj"
            title="nEAR BY pROJECTS OF"
            projName={data.projectName}
            content="See what other customers also viewed"
          />
          
          <ProjectCarousel
            type="prop"
            title="Projects By Developers"
            content="See what developers has posted"
          />
        </div>

        <ProjectDrawer projName={data.projectName} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = [
    "7f146b9e4154f8613745e501fb87d6b9",
    "1a108fb4ef25e2ae31cf002cb005289e",
    "4f313de2f95cd9d761098b8f6c09417c",
  ];
  return slugs.map((slug) => ({
    slug,
  }));
}
