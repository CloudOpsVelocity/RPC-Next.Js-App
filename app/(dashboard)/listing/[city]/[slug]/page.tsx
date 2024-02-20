import React from "react";
import AboutBuilder from "@/app/components/project/aboutBuilder";
import GalleryBlock from "@/app/components/project/galleryBlock";
import Banner from "@/app/components/project/banner";
import Reviews from "@/app/components/project/reviews";
import Amenties from "@/app/components/project/amenties";
import Loans from "@/app/components/project/loans";
import { FaqWithBg } from "@/app/components/project/faq";
import About from "@/app/components/project/about";
import Navigation from "@/app/components/property/Navigation";
import Link from "next/link";
import { getProjectDetails } from "@/app/utils/api/project";
import ProjectDrawer from "@/app/components/project/Drawer";
import RoomDetails from "@/app/components/property/RoomDetails";
import PropertyOverView from "@/app/components/property/Overview";
import RoomFloorplansBlock from "@/app/components/property/Floorplan";
import PropertyBanner from "@/app/components/property/propertyBanner";
import PropertyFirstBlock from "@/app/components/property/fistblock";
import LeafMap from "@/app/components/project/map";
import PropertyHeading from "@/app/components/property/heading";

type Props = { params: { slug: string } };
export default async function ProjectDetails({ params: { slug } }: Props) {
  const data = await getProjectDetails(slug);
  return (
    <div className="w-full">
      <div className="mt-[90px] w-full pb-[2%] flex items-center justify-center flex-col">
        <div className="p-[2%] w-full">
          <p className="text-[16px] text-[#565D70] font-[500] mb-[1%]">
            <span>home</span> {" > "}
            <Link href={"/project/banglore"}>
              <span>Property In Bengaluru</span>
            </Link>{" "}
            {" > "}
            <span>2 BHK Apartment In Whitefield</span>
          </p>
          {/* Top Cover Image Card */}
          <PropertyFirstBlock projectDetails={data} />
        </div>
        {/* Navigations Container */}
        <Navigation />
        {/* Overview */}
        <PropertyOverView {...data} />
        {/* About */}
        <About
          id="about"
          heading="about"
          projName={"Listing"}
          content={data.about}
        />

        {/* Property Details */}
        <RoomDetails data={data.phaseList} />
        {/* Floor Plan Block */}
        <RoomFloorplansBlock data={data.phaseList} />
        <GalleryBlock {...data.media} />
        <Amenties data={data.amenityList} />
        {data.lat && data.lang && (
          <LeafMap
            lat={data.lat}
            lang={data.lang}
            projName={data.projectName}
          />
        )}
        <Banner projName={data.projectName} />
        <Loans data={data.banks} projName={data.projectName} />
        {/* About Builder */}
        <AboutBuilder id={data.builderId} />
        <PropertyBanner projName={data.projectName} />

        <Reviews projName={data.projectName} />

        <FaqWithBg data={data.faqs} projName={data.projectName} />
        {/* <div className="flex flex-col justify-start items-start w-[95%]">
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
          /> */}
        {/* </div> */}

        <ProjectDrawer projName="Sarang By Sumadhura" />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = ["96ed572a1630741b975b7950bf0c2f99"];
  return slugs.map((slug) => ({
    slug,
  }));
}
