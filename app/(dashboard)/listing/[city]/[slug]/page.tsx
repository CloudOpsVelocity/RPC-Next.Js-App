import React from "react";
import AboutBuilder from "@/app/components/project/aboutBuilder";
import GalleryBlock from "@/app/components/project/galleryBlock";
import Banner from "@/app/components/project/banner";
import Reviews from "@/app/components/project/reviews";
import Amenties from "@/app/components/project/amenties";
import Loans from "@/app/components/project/loans";
import FaqWithBg from "@/app/components/project/faq";
import About from "@/app/components/project/about";
import Navigation from "@/app/components/property/Navigation";
import Link from "next/link";
import { getProjectDetails } from "@/app/utils/api/property";
import ProjectDrawer from "@/app/components/project/Drawer";
import RoomDetails from "@/app/components/property/RoomDetails";
import PropertyOverView from "@/app/components/property/Overview";
import RoomFloorplansBlock from "@/app/components/property/Floorplan";
import PropertyBanner from "@/app/components/property/propertyBanner";
import PropertyFirstBlock from "@/app/components/property/fistblock";
import LeafMap from "@/app/components/project/map";
import PropertyHeading from "@/app/components/property/heading";
import { getListingDetails } from "@/app/utils/api/property";

type Props = { params: { slug: string } };
export default async function ProjectDetails({ params: { slug } }: Props) {
  const data = await getListingDetails(slug);
  const projData = await getProjectDetails(data.projIdEnc);

  return (
    <div className="w-full">
      <div className="mt-[90px] w-full pb-[2%] flex items-center justify-center flex-col">
        <div className="p-[2%] w-full">
          <p className="text-[16px] text-[#565D70] font-[500] mb-[1%]">
            <span>home</span> {" > "}
            <Link href={"/project/banglore"}>
              <span>{data.ctName}</span>
            </Link>{" "}
            {" > "}
            <span>
              {data.bhkName} {data.propTypeName} In {data.ltName}
            </span>
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
          type="prop"
          id="about"
          heading="about"
          projName={"Listing"}
          content={"hello this is listing "}
        />

        {/* Property Details */}
        <RoomDetails {...data} />
        {/* Floor Plan Block */}
        <RoomFloorplansBlock data={data} />
        <GalleryBlock
          media={data.projMedia}
          type="prop"
          coverUrl={""}
          projReviewVideoUrl={""}
          projWalkThroughVideoUrl={""}
          otherImgUrl={[]}
          coverImageUrl={""}
          projectPlanUrl={""}
          walkThrowVideoUrl={""}
          projBroucherUrl={""}
        />
        <Amenties
          type="prop"
          data={data.amenities.map((item) => {
            return { id: item, name: String(item) };
          })}
        />
        {/* {data.lat && data.lang && (
          <LeafMap
            lat={data.lat}
            lang={data.lang}
            projName={data.bhkName}
            type="prop"
          />
        )} */}
        <Banner projName={data.bhkName} />
        <Loans
          type="prop"
          data={projData.banks}
          projName={projData.projectName}
        />
        {/* About Builder */}
        <AboutBuilder type="prop" id={projData.builderId} />
        <PropertyBanner {...projData} />

        <Reviews projName={projData.projectName} />

        <FaqWithBg data={projData.faqs} projName={projData.projectName} />
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
