import React from "react";
import AboutBuilder from "@/app/components/project/aboutBuilder";
import GalleryBlock from "@/app/components/project/galleryBlock";
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
import NearByCarousel from "@/app/components/project/NearByCarousel";
import ProjectCarousel from "@/app/components/project/ProjectCard";
import NearByCarouselProperty from "@/app/components/property/carousel";
import LoginPopup from "@/app/components/project/modals/LoginPop";
import Reviews from "@/app/components/property/reviews";
import Banner from "@/app/components/property/banner";

type Props = { params: { slug: string } };
export default async function ProjectDetails({ params: { slug } }: Props) {
  const data = await getListingDetails(slug);
  const projData = await getProjectDetails(data.projIdEnc);
  const title = `  ${data.bhkName} ${data.propTypeName} FOR 
  ${data.cg === "S" ? " Sell" : " Rent"} In ${data.ltName}`;
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
        <PropertyOverView data={data} />
        {/* About */}
        <About
          type="prop"
          id="about"
          heading="about"
          projName={"Listing"}
          content={"hello this is listing "}
        />

        {/* Property Details */}
        <RoomDetails data={data} />
        {/* Floor Plan Block */}
        <RoomFloorplansBlock data={data} />
        <GalleryBlock
          media={data.projMedia}
          type="prop"
          coverUrl={""}
          projReviewVideoUrl={""}
          otherImgUrl={[]}
          projectVideoIUrl=""
          coverImageUrl={""}
          projectPlanUrl={""}
          walkThrowVideoUrl={""}
          projBroucherUrl={""}
        />
        <Amenties
          type="prop"
          data={data?.amenities?.map((item) => {
            return { id: item, name: String(item) };
          })}
        />
        {data.projIdEnc && (
          <LeafMap
            lat={projData.lat}
            lang={projData.lang}
            projName={projData.projectName}
            projId={data.projIdEnc}
            type="prop"
          />
        )}
        <Banner slug={data.projIdEnc} projName={projData.projectName} />
        <Loans
          type="prop"
          data={projData.banks}
          projName={projData.projectName}
        />
        {/* About Builder */}
        <AboutBuilder type="prop" id={projData.builderId} />
        <PropertyBanner {...projData} />

        <Reviews slug={data.projIdEnc} projName={projData.projectName} />

        <FaqWithBg data={projData.faqs} projName={projData.projectName} />
        <NearByCarouselProperty
          projName={projData.projectName}
          lat={projData.lat}
          lng={projData.lang}
          projId={data.projIdEnc}
          cg={data.cg}
        />
        <NearByCarousel
          projName={projData.projectName}
          lat={projData.lat}
          lng={projData.lang}
          projId={data.projIdEnc}
        />
        <LoginPopup />
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
