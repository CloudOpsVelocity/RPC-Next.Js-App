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
import PropertyMap from "@/app/components/property/map";
import { getListingDetails } from "@/app/utils/api/property";
import NearByCarousel from "@/app/components/project/NearByCarousel";
import NearByCarouselProperty from "@/app/components/property/carousel";
import LoginPopup from "@/app/components/project/modals/LoginPop";
import Reviews from "@/app/components/property/reviews";
import Banner from "@/app/components/property/banner";
import MobileHidden from "@/app/components/molecules/MobileHidden";
import ErrorContainer from "@/app/components/project/error/container";
import PriceBreakup from "@/app/components/property/pricingbreakup/PriceBreakup";

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
          <PropertyFirstBlock projectDetails={data} projName={data.propName} />
        </div>
        {/* Navigations Container */}
        <MobileHidden>
          <Navigation isProj={!!data.projIdEnc} />
        </MobileHidden>
        {/* Overview */}
        <PropertyOverView data={data} />
        {/* About */}
        <About
          type="prop"
          id="about"
          heading="about"
          projName={"Listing"}
          content={data.usp || "About Listing Not Avail"}
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
          <>
            <LeafMap
              lat={projData.lat}
              lang={projData.lang}
              projName={data.propName}
              projId={data.projIdEnc}
              type="prop"
            />
            <ErrorContainer data={projData.banks}>
              <Loans type="prop" banks={projData.banks} name={data.propName} />
            </ErrorContainer>
            {/* About Builder */}
            <AboutBuilder type="prop" id={projData.builderId} />
            <PropertyBanner {...projData} />

            <FaqWithBg data={projData.faqs} projName={data.propName} />
          </>
        )}
        {!data.projIdEnc && (
          <PropertyMap
            lat={data?.lat ?? 0}
            lang={data?.lang ?? 0}
            projName={data.propName}
            projId={data.propIdEnc}
            type="prop"
          />
        )}

        <NearByCarouselProperty
          projName={data.propName}
          lat={projData?.lat}
          lng={projData?.lang}
          projId={data.projIdEnc}
          cg={data.cg}
        />
        {data.projIdEnc && (
          <NearByCarousel
            projName={data.propName}
            lat={projData?.lat}
            lng={projData?.lang}
            projId={data.propIdEnc}
            builderId={projData?.builderId}
          />
        )}
        <PriceBreakup otherPrice={data.otherPrice} price={data.price} />

        <LoginPopup />
        <ProjectDrawer projName="Sarang By Sumadhura" />
      </div>
    </div>
  );
}

// export async function generateStaticParams() {
//   const slugs = ["96ed572a1630741b975b7950bf0c2f99"];
//   return slugs.map((slug) => ({
//     slug,
//   }));
// }
