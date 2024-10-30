import React from "react";
import AboutBuilder from "@/app/components/project/aboutBuilder";
import GalleryBlock from "@/app/components/project/galleryBlock";
import Amenties from "@/app/components/project/amenties";
import Loans from "@/app/components/project/loans";
import FaqWithBg from "@/app/components/project/faq";
import About from "@/app/components/project/about";
import Navigation from "@/app/components/property/Navigation";
import ProjectDrawer from "@/app/components/project/Drawer";
import RoomDetails from "@/app/components/property/RoomDetails";
import PropertyOverView from "@/app/components/property/Overview";
import RoomFloorplansBlock from "@/app/components/property/Floorplan";
import PropertyBanner from "@/app/components/property/propertyBanner";
import PropertyFirstBlock from "@/app/components/property/fistblock";
import LeafMap from "@/app/components/project/map";
import PropertyMap from "@/app/components/property/map";
import NearByCarouselProperty from "@/app/components/property/carousel";
import LoginPopup from "@/app/components/project/modals/LoginPop";
import MobileHidden from "@/app/components/molecules/MobileHidden";
import PriceBreakup from "@/app/components/property/pricingbreakup/PriceBreakup";
import CompareError from "@/app/components/property/actions/Error";
import NearByCarouselProjProperty from "@/app/components/property/carousel/ProjectCarouse";
import ListingBreadCrumbs from "@/app/components/property/BreadCrumb/ListingBreadcrumb";
import ProjectGallery from "@/app/components/project/_ui/modals/GallerySectionModal";
type Props = {
  data: any;
  totalPrice: number;
  projData: any;
  issueData: any;
  amenitiesFromDB: any;
  nearByLocations: any;
  TITLE_OF_PROP: string;
  params: any;
};

export default function ListingDetailsPage({
  data,
  projData,
  totalPrice,
  issueData,
  amenitiesFromDB,
  nearByLocations,
  TITLE_OF_PROP,
  params,
}: Props) {
  const title =  `${data.bhkName} ${data.propTypeName} For
  ${data.cg === "S" ? " Sell" : " Rent"} In
  ${data.ltName} ${data.projIdEnc ? `,${data.propName}` : ''}`
  console.log(data)
  return (
    <div className="w-full">
 dsf
    </div>
  );
}
