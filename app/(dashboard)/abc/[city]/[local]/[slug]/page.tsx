import React from "react";
import Footer from "@/app/components/layouts/primary/footer";
import Header from "@/app/components/layouts/primary/header";
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

type Props = { params: { slug: string } };
export default async function ProjectDetails({ params: { slug } }: Props) {
  // const data = await getCachedUser(slug);
  const data = await getProjectDetails(slug);
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
            <span>Sarang By Sumadhura</span>
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
        <ProjectDetailsP data={data.phaseList} slug={slug} />
        {/* Floor Plan Block */}
        <FloorplansBlock data={data.phaseList} slug={slug} />
        <GalleryBlock {...data.media} />
        {/* About Builder */}
        <AboutBuilder />
        <Nearby lat={data.lat} lang={data.lang} />
        <Specifications data={data.specificationList} />
        <Banner />
        <Feature data={data.highlights} />
        <Loans data={data.banks} />
        <Amenties data={data.amenityList} />
        {/* Why Buy This */}
        <About
          id="whyBuy"
          heading="Why Buy"
          projName="SARANG BY SUMADHURA ?"
          content={data.wbtp}
        />
        <Testimonials />
        <Reviews />
        <FaqWithBg data={data.faqs} />
        <div className="flex flex-col justify-start items-start w-[95%]">
          <ProjectCarousel
            type="proj"
            title="nEAR BY pROJECTS OF"
            projName="SARANG BY SUMADHURA"
            content="See what other customers also viewed"
          />
          <ProjectCarousel
            type="prop"
            title="Projects By Developers"
            content="See what developers has posted"
          />
        </div>

        <ProjectDrawer />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = ["7f146b9e4154f8613745e501fb87d6b9"];
  return slugs.map((slug) => ({
    slug,
  }));
}
