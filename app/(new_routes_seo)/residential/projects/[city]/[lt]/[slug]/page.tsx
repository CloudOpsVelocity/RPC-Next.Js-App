import dynamicImport from "next/dynamic";
// const Feature = dynamicImport(() => import("@/app/components/project/feature"));
// const Amenties = dynamicImport(
//   () => import("@/app/components/project/amenties")
// );
// const Loans = dynamicImport(() => import("@/app/components/project/loans"));

// const About = dynamicImport(() => import("@/app/components/project/about"));
// const Navigation = dynamicImport(
//   () => import("@/app/components/project/navigation")
// );
// const ProjectDrawer = dynamicImport(
//   () => import("@/app/components/project/Drawer")
// );
// const LeafMap = dynamicImport(() => import("@/app/components/project/map"));
// const ListingRentAvail = dynamicImport(
//   () => import("@/app/components/project/listingRentAvail")
// );
// const ErrorContainer = dynamicImport(
//   () => import("@/app/components/project/error/container")
// );
// const MobileHidden = dynamicImport(
//   () => import("@/app/components/molecules/MobileHidden")
// );
// const FloorplanDrawer = dynamicImport(
//   () => import("@/app/components/project/drawers/floorplan")
// );

// const MasterPlan = dynamicImport(
//   () => import("@/app/components/project/masterplan")
// );
// const ProjectDetailsP = dynamicImport(
//   () => import("@/app/components/project/projectDetailsP")
// );
// const GalleryBlock = dynamicImport(
//   () => import("@/app/components/project/galleryBlock")
// );
// const Specifications = dynamicImport(
//   () => import("@/app/components/project/specification")
// );
// const Banner = dynamicImport(() => import("@/app/components/project/banner"));
// const AboutBuilder = dynamicImport(
//   () => import("@/app/components/project/aboutBuilder")
// );
// const FaqWithBg = dynamicImport(() => import("@/app/components/project/faq"));
// const NearByCarousel = dynamicImport(
//   () => import("@/app/components/project/NearByCarousel"),
//   {
//     ssr: false,
//   }
// );
// const LoginPopup = dynamicImport(
//   () => import("@/app/components/project/modals/LoginPop"),
//   {
//     ssr: false,
//   }
// );
// const Reviews = dynamicImport(
//   () => import("@/app/components/project/reviews"),
//   {
//     ssr: false,
//   }
// );
// const PartialUnitData = dynamicImport(
//   () => import("@/app/components/project/sections")
// );
// const PropertyDataDisplay = dynamicImport(
//   () => import("@/app/components/project/_ui/PricingDetailsSection")
// );
// const Disclamer = dynamicImport(
//   () => import("@/app/components/builder/Disclamer")
// );
const BreadCrumbs = dynamicImport(
  () => import("@/app/components/project/breadcrum/BreadCrum")
);
// const FloorPlans = dynamicImport(
//   () => import("@/app/components/project/newFloorPlan/floor-plan")
// );
const ProjectSchema = dynamicImport(
  () => import("@/app/seo/ProjectDetailSchema")
);
const FAQJsonLdScript = dynamicImport(() => import("@/app/seo/Faqjson"));

// const ProjectGallery = dynamicImport(
//   () => import("@/app/components/project/_ui/modals/GallerySectionModal")
// );
// const SharePopup = dynamicImport(
//   () => import("@/app/(dashboard)/searchOldPage/components/SharePopup"),
//   {
//     ssr: false,
//   }
// );
// const ProjectBrouchersSection = dynamicImport(
//   () => import("@/app/components/project/broucher/ProjectBrouchersSections"),
//   {
//     ssr: false,
//   }
// );
import {
  getAmenties,
  getAuthorityNames,
  getProjectDetails,
} from "@/app/utils/api/project";
import { notFound, permanentRedirect } from "next/navigation";
import { getPagesSlugs } from "@/app/seo/api";
// import { Metadata, ResolvingMetadata } from "next";
import redisService from "@/app/utils/redis/redis.service";
import { SlugsType } from "@/app/common/constatns/slug.constants";
import { isValidSlugId } from "@/common/utils/slugUtils";
import { createProjectLinkUrl } from "@/app/utils/linkRouters/ProjectLink";
import FirstBlock from "@/app/components/project/firstBlock";
import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";
// import Overview from "@/app/components/project/overview";
type Props = {
  params: { city: string; lt: string; slug: string };
};
// let metadataCache: {title?: string, description?: string} = {};
let data = {
  state: "Karnataka",
  projectName: "Trendsquares Akino",
  projIdEnc: "fa25f654cbff39f706bc2de602adb09f",
  projectStatus: "New Launch",
  minPrice: 16200000,
  maxPrice: 22200000,
  basePrice: "11111",
  totalLandArea: "4.697693",
  totalUnit: 394,
  floorPlanCount: 2,
  projAuthorityId: "713",
  startDate: "Thu Mar 13 00:00:00 IST 2025",
  endDate: "Fri Aug 31 00:00:00 IST 2029",
  expectedEndDate: "Fri Aug 31 00:00:00 IST 2029",
  builderId: 145,
  lat: "12.9317167",
  lang: "77.71841909999999",
  address: "Trendsquares Panathur, Panathur, Bengaluru, Karnataka, India",
  localityName: "Panathur",
  cityName: "Bengaluru",
  pinCode: 560103,
  cityId: "9",
  localityId: "444",
  saleListing: "2",
  rentListing: "0",
  media: {
    projBroucherUrl:
      "https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-brochure.pdf?v=1743483077090",
    coverImageUrl:
      "https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-cover.webp?v=1743483076358,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-cover-small.webp?v=1743483077090,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-cover-medium.webp?v=1743483077090,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-cover-large.webp?v=1743483077090,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-cover-extra-small.webp?v=1743483077090",
    otherImgUrl: [
      "https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-image0.webp?v=1743483077245,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-image0-small.webp?v=1743483077788,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-image0-medium.webp?v=1743483077788,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-image0-large.webp?v=1743483077788,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-image0-extra-small.webp?v=1743483077788",
      "https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-image1.webp?v=1743483077788,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-image1-small.webp?v=1743483078216,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-image1-medium.webp?v=1743483078216,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-image1-large.webp?v=1743483078216,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-image1-extra-small.webp?v=1743483078216",
      "https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-image2.webp?v=1743483078216,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-image2-small.webp?v=1743483078766,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-image2-medium.webp?v=1743483078766,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-image2-large.webp?v=1743483078766,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-image2-extra-small.webp?v=1743483078766",
      "https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-image3.webp?v=1743483078766,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-image3-small.webp?v=1743483079610,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-image3-medium.webp?v=1743483079610,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-image3-large.webp?v=1743483079610,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-image3-extra-small.webp?v=1743483079610",
    ],
    projectPlanUrl:
      "https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-masterplan.webp?v=1743483079612,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-masterplan-small.webp?v=1743483080467,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-masterplan-medium.webp?v=1743483080467,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-masterplan-large.webp?v=1743483080467,https://media.getrightproperty.com/residential-projects/bengaluru/1135/trendsquares-akino-panathur-masterplan-extra-small.webp?v=1743483080467",
  },
  availableProperties: ["Apartment"],
  amenityList: [
    {
      name: "",
      id: 2176,
    },
    {
      name: "",
      id: 2049,
    },
    {
      name: "",
      id: 2050,
    },
    {
      name: "",
      id: 2061,
    },
    {
      name: "",
      id: 2577,
    },
    {
      name: "",
      id: 2323,
    },
    {
      name: "",
      id: 2324,
    },
    {
      name: "",
      id: 2198,
    },
    {
      name: "",
      id: 2583,
    },
    {
      name: "",
      id: 2841,
    },
    {
      name: "",
      id: 2208,
    },
    {
      name: "",
      id: 2209,
    },
    {
      name: "",
      id: 2210,
    },
    {
      name: "",
      id: 2981,
    },
    {
      name: "",
      id: 2725,
    },
    {
      name: "",
      id: 3110,
    },
    {
      name: "",
      id: 2728,
    },
    {
      name: "",
      id: 2473,
    },
    {
      name: "",
      id: 2346,
    },
    {
      name: "",
      id: 2987,
    },
    {
      name: "",
      id: 2219,
    },
    {
      name: "",
      id: 2478,
    },
    {
      name: "",
      id: 2099,
    },
    {
      name: "",
      id: 2102,
    },
    {
      name: "",
      id: 2362,
    },
    {
      name: "",
      id: 2106,
    },
    {
      name: "",
      id: 2108,
    },
    {
      name: "",
      id: 2748,
    },
    {
      name: "",
      id: 2366,
    },
    {
      name: "",
      id: 2112,
    },
    {
      name: "",
      id: 2113,
    },
    {
      name: "",
      id: 2369,
    },
    {
      name: "",
      id: 2114,
    },
    {
      name: "",
      id: 2626,
    },
    {
      name: "",
      id: 2117,
    },
    {
      name: "",
      id: 2118,
    },
    {
      name: "",
      id: 2375,
    },
    {
      name: "",
      id: 2120,
    },
    {
      name: "",
      id: 2507,
    },
    {
      name: "",
      id: 2763,
    },
    {
      name: "",
      id: 2129,
    },
    {
      name: "",
      id: 2001,
    },
    {
      name: "",
      id: 2644,
    },
    {
      name: "",
      id: 2134,
    },
    {
      name: "",
      id: 2008,
    },
    {
      name: "",
      id: 2393,
    },
    {
      name: "",
      id: 2009,
    },
    {
      name: "",
      id: 2010,
    },
    {
      name: "",
      id: 2779,
    },
    {
      name: "",
      id: 2011,
    },
    {
      name: "",
      id: 2267,
    },
    {
      name: "",
      id: 2012,
    },
    {
      name: "",
      id: 2013,
    },
    {
      name: "",
      id: 2270,
    },
    {
      name: "",
      id: 2143,
    },
    {
      name: "",
      id: 2656,
    },
    {
      name: "",
      id: 2016,
    },
    {
      name: "",
      id: 2019,
    },
    {
      name: "",
      id: 2660,
    },
    {
      name: "",
      id: 2276,
    },
    {
      name: "",
      id: 2022,
    },
    {
      name: "",
      id: 2919,
    },
    {
      name: "",
      id: 2023,
    },
    {
      name: "",
      id: 2540,
    },
    {
      name: "",
      id: 2796,
    },
    {
      name: "",
      id: 2797,
    },
    {
      name: "",
      id: 2029,
    },
    {
      name: "",
      id: 2157,
    },
    {
      name: "",
      id: 2414,
    },
    {
      name: "",
      id: 2161,
    },
    {
      name: "",
      id: 2163,
    },
    {
      name: "",
      id: 2932,
    },
    {
      name: "",
      id: 2036,
    },
    {
      name: "",
      id: 2681,
    },
    {
      name: "",
      id: 2170,
    },
    {
      name: "",
      id: 2042,
    },
    {
      name: "",
      id: 2683,
    },
    {
      name: "",
      id: 2172,
    },
  ],
  specificationList: [
    {
      specId: 753,
      specName: "Rainwater Harvesting",
      values: ["Rainwater Harvesting"],
    },
    {
      specId: 401,
      specName: "Structure",
      values: ["Mivan Construction"],
    },
    {
      specId: 402,
      specName: "Window",
      values: ["UPVC Windows"],
    },
    {
      specId: 755,
      specName: "Sewage Treatment Plant (STP)",
      values: ["Sewage Treatment Plant (STP)"],
    },
    {
      specId: 403,
      specName: "Door",
      values: ["Teak wood doors"],
    },
    {
      specId: 404,
      specName: "Flooring",
      values: [
        "Vetrified tiles in rooms, kitchen, living and dining.",
        "Anti skid tiles in Bathrooms and balconies",
      ],
    },
    {
      specId: 757,
      specName: "Street Lighting",
      values: ["Street Lighting in common areas"],
    },
    {
      specId: 405,
      specName: "Kitchen",
      values: ["Granite platform"],
    },
    {
      specId: 409,
      specName: "Water Supply",
      values: ["Borewells"],
    },
  ],
  highlights: [
    "Prime Location: Situated in Panathur, a rapidly developing area in Bangalore, Trendsquares Akino offers excellent connectivity to major IT hubs, educational institutions, healthcare facilities, and entertainment centres, making it an ideal choice for professionals and families alike.​",
    "Spacious Layouts: Units are available in various configurations, providing ample space for families of different sizes.​",
    "Security: Equipped with 24/7 security personnel and CCTV surveillance, ensuring a safe living environment for all residents.​",
    "Retail Accessibility: Nearby shopping centers and supermarkets provide residents with easy access to daily necessities and leisure shopping.​",
    "Modern Architecture: The apartments feature contemporary designs with high-quality finishes, catering to modern aesthetic preferences.​",
    "Proximity to Educational Institutions: Close to reputed schools and colleges, making it convenient for families with children.​",
    "Green Spaces: The complex boasts landscaped gardens and open areas, promoting a serene and eco-friendly living environment.​",
    "Sustainable Features: Incorporates rainwater harvesting systems and solar panels, emphasizing eco-conscious living.​",
    "Amenities: Residents can enjoy a range of facilities such as a swimming pool, gymnasium, clubhouse, children's play area, and sports courts.​",
    "Community Living: Designed to foster a sense of community with dedicated spaces for social gatherings and events.​",
  ],
  wbtp: "<p>Buying a property like Trendsquares Akino can be an attractive option for several reasons:</p><p><br></p><h3>1. <strong>Reputed Developer</strong></h3><p><br></p><p><strong>Trendsquares Constructions</strong> is known for delivering high-quality residential projects, with a track record of providing modern living spaces. Their previous projects, like Trendsquares Ortus 3 and Trendsquares Ambience, have received positive feedback for their design, construction quality, and amenities.</p><p><br></p><h3>2. <strong>Modern Amenities</strong></h3><p><br></p><p>Based on their other projects, it's likely that Trendsquares Akino will offer a wide range of amenities, such as a clubhouse, fitness centre, swimming pool, and other lifestyle-oriented features. These amenities can enhance the overall living experience.</p><p><br></p><h3>3. <strong>Prime Location</strong></h3><p><br></p><p><strong>Panathur</strong> in Bengaluru is a growing residential area with good connectivity to key parts of the city, such as Whitefield, Sarjapur Road, and ORR (Outer Ring Road). This makes it an ideal location for professionals working in tech hubs like Whitefield and Electronic City.</p><p><br></p><h3>4. <strong>Future Appreciation Potential</strong></h3><p><br></p><p>Given the ongoing development in and around Panathur, purchasing property in this area could lead to long-term capital appreciation. As more infrastructure and commercial hubs come up in the vicinity, property values are expected to rise.</p><p><br></p><h3>5. <strong>Lifestyle &amp; Comfort</strong></h3><p><br></p><p>With an emphasis on quality construction and well-planned designs, Trendsquares Akino is likely to provide a comfortable and contemporary lifestyle. Large, well-ventilated apartments, green spaces, and thoughtful layouts are expected to ensure a pleasant living environment.</p><p><br></p><h3>6. <strong>Investment Potential</strong></h3><p><br></p><p>If you're an investor, buying in a rapidly developing area like Panathur can be a wise decision. The demand for rental properties in tech-centric locations like this one is generally high, providing good rental yields for investors.</p><p><br></p><h3>7. <strong>Security &amp; Safety</strong></h3><p><br></p><p>Gated communities with modern security features, such as 24/7 surveillance, access control systems, and professional security personnel, are often a key selling point for residential projects by developers like Trendsquares.</p><p><br></p><h3>8. <strong>Sustainability Features</strong></h3><p><br></p><p>Many modern residential projects now come with eco-friendly features such as rainwater harvesting, energy-efficient lighting, and waste management systems. Trendsquares may include such initiatives to ensure a sustainable living environment.</p><p><br></p><p>If you're looking for a blend of comfort, location, modern amenities, and potential for growth in property value, Trendsquares Akino could be an excellent choice.</p>",
  banks: [
    {
      bankid: 529,
      bankName: "Axis Bank",
    },
    {
      bankid: 521,
      bankName: "ICICI Bank Home Loan",
    },
    {
      bankid: 523,
      bankName: "Bank of Baroda",
    },
    {
      bankid: 555,
      bankName: "Tata Capital Housing Finance Limited",
    },
    {
      bankid: 556,
      bankName: "L&T Housing Finance Limited",
    },
    {
      bankid: 525,
      bankName: "HDFC Bank Home loan",
    },
    {
      bankid: 557,
      bankName: "Bajaj Housing finance",
    },
    {
      bankid: 526,
      bankName: "SBI home loan",
    },
    {
      bankid: 542,
      bankName: "HDFC Housing finance",
    },
  ],
  faqs: [
    {
      faqQuestion: "Where is Trendsquares Akino located?",
      faqAnswer:
        "Trendsquares Akino is situated on Panathur Road in Bangalore, a rapidly growing neighborhood known for its strategic location and vibrant community. ",
    },
    {
      faqQuestion:
        "What types of apartments are available at Trendsquares Akino?",
      faqAnswer:
        "The project offers a variety of residential options, including luxury apartments, all designed with 100% Vaastu compliance to ensure a harmonious living environment.",
    },
    {
      faqQuestion: "What is the total area of the Trendsquares Akino project?",
      faqAnswer:
        "The development spans approximately 4.7 acres, providing ample open spaces and well-planned infrastructure for a comfortable living experience.",
    },
    {
      faqQuestion: "What amenities are offered at Trendsquares Akino?",
      faqAnswer:
        "Residents can enjoy modern amenities, including a well-equipped clubhouse, fitness center, swimming pool, landscaped gardens, children's play areas, and a 24/7 security system, promoting a vibrant and secure community environment.",
    },
    {
      faqQuestion:
        "How is the connectivity of Trendsquares Akino to major hubs in Bangalore?",
      faqAnswer:
        "Panathur Road offers excellent connectivity, with easy access to major IT hubs like Whitefield and Marathahalli. The Outer Ring Road (ORR) enhances accessibility to various parts of Bangalore, and public transportation options, including BMTC buses, facilitate convenient commuting",
    },
    {
      faqQuestion:
        "Are there educational institutions and healthcare facilities nearby?",
      faqAnswer:
        "Yes, the vicinity boasts several reputable schools such as VIBGYOR Rise School and New Horizon Gurukul, as well as healthcare facilities like Maya Multi Specialty Hospital and Fostr Healthcare Multi-Specialty Clinic, ensuring residents have access to essential services. ​",
    },
    {
      faqQuestion:
        "What shopping and entertainment options are available around Trendsquares Akino?",
      faqAnswer:
        "Residents can explore nearby shopping centers like Apple City Mall and Nexus Whitefield, offering a variety of retail, dining, and entertainment options to cater to diverse preferences. ​",
    },
    {
      faqQuestion: "Who is the developer of Trendsquares Akino?",
      faqAnswer:
        "Trendsquares Akino is developed by Trendsquares Constructions, a forward-thinking property development company known for delivering quality living spaces that blend contemporary design with functional living.",
    },
  ],
  partialUnitData: {
    "1412": {
      Apartment: {
        "4 BHK": {
          minPrice: "19400000",
          maxPrice: "22200000",
          minSba: "1975",
          maxSba: "1975",
          minCa: "1248",
          maxCa: "1248",
          unitDataDtoList: [
            {
              projUnitIdEnc: "bad2ce603737b8a0cb50acf512728ed4",
              unitType: "4 BHK",
              phaseId: 1412,
              propType: "35",
              sba: "1975",
              ca: "1248",
              floorPlan:
                "https://media.getrightproperty.com/residential-projects/bengaluru/1135/17578/trendsquares-akino-panathur/a-005-4-bhk-apartment-1248-sqft-west-facing.webp,https://media.getrightproperty.com/residential-projects/bengaluru/1135/17578/trendsquares-akino-panathur/a-005-4-bhk-apartment-1248-sqft-west-facing-small.webp?v=1743483075416,https://media.getrightproperty.com/residential-projects/bengaluru/1135/17578/trendsquares-akino-panathur/a-005-4-bhk-apartment-1248-sqft-west-facing-medium.webp?v=1743483075416,https://media.getrightproperty.com/residential-projects/bengaluru/1135/17578/trendsquares-akino-panathur/a-005-4-bhk-apartment-1248-sqft-west-facing-large.webp?v=1743483075416,https://media.getrightproperty.com/residential-projects/bengaluru/1135/17578/trendsquares-akino-panathur/a-005-4-bhk-apartment-1248-sqft-west-facing-extra-small.webp?v=1743483075416?v=1743483075416",
            },
          ],
        },
        "3 BHK": {
          minPrice: "16200000",
          maxPrice: "19200000",
          minSba: "1730",
          maxSba: "1730",
          minCa: "1088",
          maxCa: "1088",
          unitDataDtoList: [
            {
              projUnitIdEnc: "ff6f561e7db525f0fc656a8c7354bca1",
              unitType: "3 BHK",
              phaseId: 1412,
              propType: "35",
              sba: "1730",
              ca: "1088",
              floorPlan:
                "https://media.getrightproperty.com/residential-projects/bengaluru/1135/17579/trendsquares-akino-panathur/a-001-3-bhk-apartment-1088-sqft-east-facing.webp,https://media.getrightproperty.com/residential-projects/bengaluru/1135/17579/trendsquares-akino-panathur/a-001-3-bhk-apartment-1088-sqft-east-facing-small.webp?v=1743483076356,https://media.getrightproperty.com/residential-projects/bengaluru/1135/17579/trendsquares-akino-panathur/a-001-3-bhk-apartment-1088-sqft-east-facing-medium.webp?v=1743483076356,https://media.getrightproperty.com/residential-projects/bengaluru/1135/17579/trendsquares-akino-panathur/a-001-3-bhk-apartment-1088-sqft-east-facing-large.webp?v=1743483076356,https://media.getrightproperty.com/residential-projects/bengaluru/1135/17579/trendsquares-akino-panathur/a-001-3-bhk-apartment-1088-sqft-east-facing-extra-small.webp?v=1743483076356?v=1743483076356",
            },
          ],
        },
      },
    },
  },
  about:
    "<p><strong>Explore the Future with Trendsquares Akino</strong></p><p><br></p><p>Welcome to <strong>Trendsquares Akino</strong>, the ultimate destination for innovative designs, cutting-edge technology, and sustainable living solutions. Whether you're seeking modern lifestyle products, high-tech gadgets, or stylish home decor, we bring you everything you need to stay ahead of the curve.</p><p><br></p><h3><strong>Why Trendsquares Akino Stands Out</strong></h3><p><br></p><p>At Trendsquares Akino, we blend style with functionality to deliver products that enhance your everyday life. Here’s why you should choose us:</p><ol><li><strong>Innovative Designs</strong>: Our products feature contemporary designs that reflect the latest trends, combining form and function to elevate your space and experience.</li><li><strong>Innovative Technology</strong>: Stay connected and simplify your life with our tech-driven solutions. From smart home devices to cutting-edge gadgets, Trendsquares Akino offers innovative tech that makes life easier and more efficient.</li><li><strong>Sustainability at the Core</strong>: We care about the planet. That's why we focus on eco-friendly materials and sustainable practices across all our products, ensuring a better future without compromising quality or style.</li><li><strong>Personalised Solutions</strong>: Trendsquares Akino offers customisable options that allow you to personalise our products according to your preferences, making them truly your own.</li></ol><p><br></p><h3><strong>Trendsquares Akino – Shaping Modern Living</strong></h3><p><br></p><p>Trendsquares Akino is more than just a brand. We are setting new standards in modern living by combining advanced technology, cutting-edge design, and sustainable practices. Our diverse range of products includes:</p><ul><li><strong>Smart Home Solutions</strong>: Transform your home with the latest in smart technology. Control lighting, security, temperature, and more with just a tap on your phone or a voice command.</li><li><strong>Eco-Luxury Living</strong>: Embrace luxury without the environmental cost. Our products feature eco-friendly materials and sustainable production methods, offering an indulgent experience that doesn’t harm the planet.</li><li><strong>Contemporary Furniture &amp; Decor</strong>: Redefine your living space with our exclusive collection of modern furniture and decor. Each piece is carefully crafted to blend functionality with style.</li></ul><p><br></p><h3><strong>Why Choose Trendsquares Akino?</strong></h3><p><br></p><ol><li><strong>Unmatched Quality</strong>: We prioritise quality above all else. Each product is crafted from durable materials designed to last, ensuring you get the best value for your investment.</li><li><strong>Future-Ready Designs</strong>: Our products incorporate the latest trends and technologies, offering solutions that are not only stylish but also practical and future-proof.</li><li><strong>Seamless Integration</strong>: Whether it's smart technology or modern decor, our products are designed to integrate seamlessly into your lifestyle, making everyday tasks easier and more enjoyable.</li><li><strong>Customer-Centred Approach</strong>: Our customer support team is always available to assist with any questions or concerns, ensuring a smooth and satisfying shopping experience.</li></ol><p><br></p><h3><strong>Join the Trendsquares Akino Movement</strong></h3><p>Ready to experience the next level of modern living? Explore the world of <strong>Trendsquares Akino</strong> today. Stay updated with the latest products, exclusive offers, and insightful lifestyle trends by signing up for our newsletter.</p><p><br></p><p>Elevate your home, enhance your life, and stay on top of the latest trends with <strong>Trendsquares Akino</strong>.</p>",
  postedByName: "Trendsquares Constructions",
  builderCity: "Bengaluru",
  reraStatus: "Recieved",
};
export default async function page({ params }: Props) {
  // const { city, lt, slug: name } = params;
  // const slug = name.split("-").at(-1);
  // if (!slug || !isValidSlugId(slug)) {
  //   notFound();
  // }

  // const [projResponse, amenitiesFromDB] = await Promise.all([
  //   getProjectDetails(slug),
  //   getAmenties(),
  // ]);
  // const { basicData: data, nearByLocations, phaseOverview } = projResponse;
  // const localitySlug = projResponse.basicData.localityName
  //   .toLowerCase()
  //   .replaceAll(" ", "-");
  // const projectSlug = name.split("-").slice(0, -1).join("-");
  // const projectNameSlug = projResponse.basicData.projectName
  //   .toLowerCase()
  //   .replaceAll(" ", "-");

  // if (
  //   localitySlug !== lt ||
  //   projectSlug !== projectNameSlug ||
  //   city !== projResponse.basicData.cityName.toLowerCase()
  // ) {
  //   const path = createProjectLinkUrl({
  //     city: projResponse.basicData.cityName,
  //     slug: projResponse.basicData.projectName,
  //     locality: projResponse.basicData.localityName,
  //     projIdEnc: projResponse.basicData.projIdEnc,
  //   });
  //   return permanentRedirect(path);
  // }
  // if (projResponse.basicData.projAuthorityId) {
  //   const authorityNames = await getAuthorityNames(
  //     projResponse.basicData.projAuthorityId
  //   );
  //   projResponse.basicData.projAuthorityNames = authorityNames;
  // }
  // // const refURls = data?.sourceBuilderUrl?.split(",");
  // const url = `${process.env.NEXT_PUBLIC_URL}${BASE_PATH_PROJECT_DETAILS}/${params.city}/${params.lt}/${params.slug}/`;
  // const title = `${data?.projectName} ${
  //   data.availableProperties && data?.availableProperties?.join(" ")
  // } for sale in ${data.localityName} ${data.cityName}`;
  // const imageUrl = data?.media?.coverImageUrl?.split(",")[1];
  // const scrollId = undefined;
  // const desc = `${data.projectName} for sale in ${data.localityName}, ${data.cityName}. View Project Details, Price, Check Brochure PDF, Floor Plan, Reviews, Master Plan, Amenities & Contact Details`;
  return (
    <section className="w-full relative break-words ">
      <meta name="robots" content="index, follow" />
      {/* <link rel="canonical" href={url} /> */}
      {/* <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={imageUrl || ""} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={imageUrl || ""} /> */}
      <FAQJsonLdScript data={data} />
      {/* <ProjectSchema projectData={{ ...projResponse, url, desc }} /> */}
      {/* <QAJsonLdScript data={data} />
      <PropertyJsonLdScript data={data} />
      <ArticleJsonLdScript data={data} /> */}
      <div className="mt-[70px] sm:mt-[90px] w-full sm:pb-[2%] flex xl:text-ellipsis items-center justify-center flex-col ">
        <div className="p-[1%] sm:p-[1%] sm:py-0 xl:p-[1%] w-full sm:w-[94%]">
          <BreadCrumbs params={params} />

          {/* Top Cover Image Card */}
          <FirstBlock
            projectDetails={data}
            companyName={data.postedByName}
            builderId={data.builderId}
            hasReraStatus={true}
            scrollId={undefined}
          />
        </div>
        {/* Navigations Container */}
        {/* <MobileHidden>
          <Navigation
            isBrochure={
              !!data?.media?.projBroucherUrl ||
              phaseOverview?.some(
                (item: { phaseBrochureUrl: string | null }) =>
                  item.phaseBrochureUrl
              )
            }
            detailsData={{ ...data, nearByLocations }}
            slug={slug}
            scrollId={scrollId}
          />
        </MobileHidden>
        <Overview {...data} slug={slug} PhaseOverview={phaseOverview} />
        <ListingRentAvail
          projName={data.projectName}
          r={data.rentListing}
          s={data.saleListing}
          slug={slug}
        />

        <About
          id="about"
          heading="about"
          projName={data.projectName}
          content={data.about}
          maxLines={12}
        /> */}

        {/* <ProjectDetailsP
          projName={data.projectName}
          data={data.phases}
          slug={slug}
          projData={data}
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
          <FloorPlans
            phases={data.phases}
            projName={data.projectName}
            partialUnitData={data.partialUnitData}
            phaseOverview={phaseOverview}
            slug={slug}
            postedById={data.builderId}
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
        <ProjectBrouchersSection
          projName={data.projectName}
          phaseOverviewData={phaseOverview}
          singleBroucher={data.media?.projBroucherUrl}
          broucherImage={data.media?.projectPlanUrl }

        />
        <ErrorContainer data={data.specificationList}>
          <Specifications
            data={data.specificationList}
            projName={data.projectName}
          />
        </ErrorContainer>
        <ErrorContainer data={data.highlights}>
          <Feature data={data.highlights} projName={data.projectName} />
        </ErrorContainer>
        <Banner projName={data.projectName} projIdEnc={slug} />
        <ErrorContainer data={data.banks}>
          <div id="bank-approvals" className="w-full h-auto scroll-mt-[150px]">
            <Loans type="proj" banks={data.banks} name={data.projectName} />
          </div>
        </ErrorContainer>

        <AboutBuilder id={data.builderId} />
        {data.wbtp && (
          <About
            id="why-buy-this-project"
            heading="Why Buy"
            projName={`${data.projectName} ?`}
            content={data.wbtp}
            maxLines={12}
          />
        )}
        <Reviews projName={data.projectName} projIdEnc={slug} />
        <div
          id="faq"
          className="scroll-mt-[70px] m-auto w-[95%] sm:w-[90%] flex justify-start items-start"
        >
          <FaqWithBg
            data={data.faqs}
            slug={slug}
            projName={data.projectName}
            postedById={data.builderId}
          />
        </div>
        <NearByCarousel
          projName={data.projectName}
          lat={data.lat}
          lng={data.lang}
          builderId={data.builderId}
          company={data.companyName}
          projId={slug}
          slug={slug}
        />
        {refURls && refURls.length > 0 && <Disclamer refUrls={refURls} />}

        <ProjectDrawer projName={data.projectName} />
        <FloorplanDrawer />
        <LoginPopup />
        <ProjectGallery />
        <SharePopup /> */}
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const res = await getPagesSlugs("project-list");
  await redisService.saveProjectSlug(SlugsType.PROJECT, res);
  const projectRes = Object.keys(res);
  const slugs = [];
  for (let i = 0; i < projectRes.length; i++) {
    const data = projectRes[i];
    if ((data.match(/\//g) || []).length === 5) {
      const [staticPath, staticPath2, sta3, city, lt, slug] = data.split("/");
      slugs.push({ city, lt, slug });
    }
  }
  return slugs;

  // Extract project names from the keys
  // const projectRes = Object.keys(res);
  // const slugs = projectRes.map((data) => {
  //   const [staticPath, staticPath2, sta3, city, lt, slug] = data.split("/");
  //   return { city, lt, slug };
  // });
  // return slugs;
}

type SeoProps = {
  params: { city: string; lt: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// export async function generateMetadata(
//   { params }: SeoProps,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   let slug = params.slug.split("-").at(-1);
//   if (!slug || !isValidSlugId(slug)) {
//     notFound();
//   }
//   const {
//     basicData: data,
//     phaseOverview,
//     nearByLocations,
//   } = await getProjectDetails(slug as string);

//   // Calculate price range in a readable format
//   const formatPrice = (price: number) => {
//     if (price >= 10000000) return `${(price / 10000000).toFixed(2)} Cr`;
//     if (price >= 100000) return `${(price / 100000).toFixed(2)} L`;
//     return `${price.toLocaleString()}`;
//   };

//   const priceRange = `${formatPrice(data.minPrice)} - ${formatPrice(
//     data.maxPrice
//   )}`;

//   // Get all available configurations
//   const configurations = phaseOverview
//     .flatMap((phase: any) =>
//       Object.values(phase.propTypeOverview).flatMap(
//         (type: any) => type.unitTypes
//       )
//     )
//     .filter(
//       (value: string, index: number, self: string[]) =>
//         self.indexOf(value) === index
//     )
//     .join(", ");

//   // Get nearby landmarks for description
//   const nearbyLandmarks = [
//     ...(nearByLocations.school || []).slice(0, 2).map((s: any) => s.name),
//     ...(nearByLocations.hospital || []).slice(0, 2).map((h: any) => h.name),
//     ...(nearByLocations.train_station || [])
//       .slice(0, 1)
//       .map((t: any) => t.name),
//   ].join(", ");

//   // Constructing SEO-friendly title
//   const title = `${data?.projectName} ${data.availableProperties?.join(
//     " "
//   )} for sale ${data.localityName} ${data.cityName}`;

//   // Constructing detailed and keyword-rich description
//   const description = `${data.projectName} ${data.availableProperties?.join(
//     ", "
//   )} in ${data.localityName}, ${
//     data.cityName
//   }. Project Details, Pricing, Brochure, Floor Plans, Reviews, Master Plan, Amenities & Contact Details`;

//   // Get all relevant keywords
//   const keywords = [
//     data.projectName,
//     ...(data.availableProperties || []),
//     data.localityName,
//     data.cityName,
//     configurations,
//     "Property",
//     "Real Estate",
//     "Home",
//     data.cityName,
//     `${data.cityName} Properties`,
//     "Buy Property",
//     data.postedByName,
//     nearbyLandmarks,
//     "RERA Approved",
//   ].join(", ");
//   const canonical = `${process.env.NEXTAUTH_URL}/residential/projects/${params.city}/${params.lt}/${params.slug}`;
//   return {
//     title,
//     description,
//     keywords,
//     metadataBase: new URL(process.env.NEXTAUTH_URL || ""),
//     alternates: {
//       canonical,
//     },
//     openGraph: {
//       title,
//       description,
//       url: canonical,
//       siteName: data.projectName,
//       images: data.media.coverImageUrl.split(",").map((url) => ({
//         url,
//         width: 1200,
//         height: 630,
//       })),
//       locale: "en_IN",
//       type: "website",
//       videos: data.media.walkThrowVideoUrl
//         ? [data.media.walkThrowVideoUrl]
//         : undefined,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       images: [data.media.coverImageUrl.split(",")[0]],
//       site: "@getrightproperty",
//     },
//     robots: {
//       index: true,
//       follow: true,
//     },
//     category: "Real Estate",
//     other: {
//       "price-range": priceRange,
//       "property-type": data?.availableProperties?.join(", ") || "",
//       "launch-date": data.startDate,
//       "possession-date": data.endDate,
//       "builder-name": data.postedByName,
//       "rera-id": phaseOverview[0]?.reraId,
//       "total-units": data.totalUnit.toString(),
//       "project-area": data.totalLandArea,
//       "project-status": data.projectStatus,
//     },
//   };
// }

export const dynamicParams = true;
export const dynamic = "force-static";
