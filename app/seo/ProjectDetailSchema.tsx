import { Graph, Place } from "schema-dts";
import { MERGERPROJECT } from "../validations/types/project";
import { OPENING_HOURS } from "./common/opening-hours";
import { Organization_SCHEMA } from "./common/organisation-details";

interface ProjectData extends MERGERPROJECT {
  url: string;
  desc: string;
}

const COMPANY_NAME = "GET RIGHT PROPERTY";
const COMPANY_URL = "https://www.getrightproperty.com/";
const PRICE_CURRENY = "INR";
const LOGO_URL =
  "https://media.getrightproperty.com/staticmedia-images-icons/grp-logo/grp-logo-tm.png";
const DOMAIN = "https://www.getrightproperty.com/";
const PHONE_NUMBER = "+91 8884440963";
const propertyMap = new Map<string, { name: string }>([
  ["apt", { name: "Apartment" }],
  ["plot", { name: "Plot" }],
  ["rowHouse", { name: "Rowhouse" }],
  ["villa", { name: "Villa" }],
  ["vlmt", { name: "Villament" }],
]);
const generateSchema = (projectData: ProjectData) => {
  const {
    basicData,
    nearByLocations,
    phaseOverview,
    url: projectDetailsPageUrl,
    desc,
  } = projectData;
  const nearByLocationsSchema: Place[] = [];
  if (nearByLocations) {
    for (const category in nearByLocations) {
      nearByLocations[category]?.forEach((location: any) => {
        nearByLocationsSchema.push({
          "@type": "Place",
          name: location.name,
          geo:
            location.lat && location.lang
              ? {
                  "@type": "GeoCoordinates",
                  latitude: location.lat,
                  longitude: location.lang,
                }
              : undefined,
        });
      });
    }
  }
  const generateProductSchema = () => {
    const schemaData = phaseOverview?.map((phase: any) => {
      const propTypes = Object.keys(phase.propTypeOverview);
      const propTypeData = propTypes.map((propType: any) => {
        const propTypeSchema = {
          "@type": "Product",
          name: `${basicData?.projectName} - ${
            phase.phaseName ? phase.phaseName + " -" : ""
          }  ${propertyMap.get(propType)?.name}`,
          description: desc || "Details about the project phase.",
          image: basicData.media.coverImageUrl,
          brand: {
            "@type": "Brand",
            name: basicData?.projectName.split(" ")[0],
          },
          offers: {
            "@type": "Offer",
            url: projectDetailsPageUrl,
            price: basicData.minPrice,
            priceCurrency: PRICE_CURRENY,
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: COMPANY_NAME,
            },
            isFamilyFriendly: "https://schema.org/True",
            priceValidUntil: basicData.endDate,
            itemCondition: "http://schema.org/NewCondition",
          },
        };
        return propTypeSchema;
      });

      return [...propTypeData];
    });

    return schemaData;
  };
  const schemaData: Graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: basicData?.projectName || "Real Estate Property Listings",
        url: projectDetailsPageUrl || `${DOMAIN}property-listings`,
        description:
          desc ||
          "Find top real estate listings, including apartments, villas, and commercial spaces.",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: DOMAIN,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Real Estate",
              item: `${DOMAIN}real-estate`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Property Listings",
              item: `${DOMAIN}property-listings`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: basicData?.projectName || "Project",
              item: projectDetailsPageUrl,
            },
          ],
        },
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        author: {
          "@type": "Organization",
          name: COMPANY_NAME,
          url: COMPANY_URL,
        },
        publisher: {
          "@type": "Organization",
          name: COMPANY_NAME,
          logo: {
            "@type": "ImageObject",
            url: LOGO_URL,
          },
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: basicData?.media.coverImageUrl || `${DOMAIN}default-image.jpg`,
        },
        isPartOf: {
          "@type": "WebSite",
          name: "Get Right Property",
          url: DOMAIN,
        },
        inLanguage: "en",
        mainEntity: {
          "@type": "Place",
          name: basicData?.projectName || "Real Estate Project",
          address: {
            "@type": "PostalAddress",
            streetAddress: basicData?.address || "Unknown",
            addressLocality: basicData?.localityName || "Unknown",
            addressRegion: basicData?.state || "Unknown",
            postalCode: String(basicData?.pinCode) || "000000",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: basicData?.lat || "0",
            longitude: basicData?.lang || "0",
          },
          openingHoursSpecification: OPENING_HOURS,
          telephone: PHONE_NUMBER,
          additionalProperty: phaseOverview?.map((phase: any) => ({
            "@type": "PropertyValue",
            name: phase.name,
            value: phase.details,
          })),
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "Place",
        name: basicData?.projectName || "Unknown",
        address: {
          "@type": "PostalAddress",
          streetAddress: basicData?.address || "Unknown",
          addressLocality: basicData?.localityName || "Unknown",
          addressRegion: basicData?.state || "Unknown",
          postalCode: "560087",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: basicData?.lat || "12.9716",
          longitude: basicData?.lang || "77.5946",
        },
        image: basicData.media.projectPlanUrl,
        url: projectDetailsPageUrl,
        telephone: PHONE_NUMBER,
        description: desc,
        openingHoursSpecification: OPENING_HOURS,
        amenityFeature: [
          {
            "@type": "LocationFeatureSpecification",
            name: "Swimming Pool",
            value: "true",
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "Gym",
            value: "true",
          },
        ],
      },
      {
        "@type": "GeoCoordinates",
        latitude: basicData?.lat || "12.9716",
        longitude: basicData?.lang || "77.5946",
      },
      ...generateProductSchema(),
      ...nearByLocationsSchema,
      Organization_SCHEMA,
      {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        highPrice: basicData.maxPrice,
        lowPrice: basicData.minPrice,
        seller: {
          "@type": "Organization",
          name: basicData.projectName.split(" ")[0],
          url: "https://www.builderalliance.in/",
        },
        offerCount: 1,
        availability: "https://schema.org/InStock",
        itemOffered: {
          "@type": "Product",
          name: basicData?.projectName,
          image: basicData.media.projectPlanUrl,
        },
      },
    ],
  };

  return JSON.stringify(schemaData);
};

const ProjectSchema = ({ projectData }: { projectData: ProjectData }) => (
  // <script
  //   type="application/ld+json"
  //   dangerouslySetInnerHTML={{ __html: generateSchema(projectData) }}
  // />
  <div className="mt-[10%]  ">{generateSchema(projectData)}</div>
);

export default ProjectSchema;

// {
//   "@type": "Article",
//   headline: "Best Properties to Buy in 2024",
//   author: {
//     "@type": "Person",
//     name: "John Doe",
//   },
// },

// {
//   "@type": "Residence",
//   name: "Skyline Towers",
//   address: {
//     "@type": "PostalAddress",
//     streetAddress: "123 Main St",
//     addressLocality: "New York",
//     addressRegion: "NY",
//     postalCode: "10001",
//     addressCountry: "US",
//   },
// },
// {
//   "@type": "SaleEvent",
//   name: "Exclusive Property Sale",
//   startDate: "2024-03-01",
// },
// {
//   "@type": "RealEstateAgent",
//   name: "Top Realtors Inc.",
//   telephone: "+1-555-555-5555",
// },
// {
//   "@type": "Place",
//   name: "Downtown Luxury Apartments",
//   geo: {
//     "@type": "GeoCoordinates",
//     latitude: 40.7128,
//     longitude: -74.006,
//   },
// },
// {
//   "@type": "FAQPage",
//   mainEntity: [
//     {
//       "@type": "Question",
//       name: "What are the payment options?",
//       acceptedAnswer: {
//         "@type": "Answer",
//         text: "We accept credit cards, bank transfers, and cryptocurrency.",
//       },
//     },
//   ],
// },
// {
//   "@type": "BreadcrumbList",
//   itemListElement: [
//     {
//       "@type": "ListItem",
//       position: 1,
//       name: "Home",
//       item: "https://example.com",
//     },
//     {
//       "@type": "ListItem",
//       position: 2,
//       name: "Properties",
//       item: "https://example.com/properties",
//     },
//   ],
// },
// {
//   "@type": "ApartmentComplex",
//   name: "Skyline Residences",
// },
// {
//   "@type": "Organization",
//   name: "Real Estate Hub",
//   url: "https://realestatehub.com",
// },
// {
//   "@type": "SiteNavigationElement",
//   name: "Main Navigation",
//   url: "https://example.com",
// },
// {
//   "@type": "Apartment",
//   name: "Luxury Apartment",
//   numberOfRooms: 3,
// },
// {
//   "@type": "PostalAddress",
//   streetAddress: "456 Elm St",
//   addressLocality: "Los Angeles",
//   addressRegion: "CA",
//   postalCode: "90001",
//   addressCountry: "US",
// },
// {
//   "@type": "GeoCoordinates",
//   latitude: 40.7128,
//   longitude: -74.006,
// },
// {
//   "@type": "LocationFeatureSpecification",
//   name: "Gym and Pool",
// },
// {
//   "@type": "ViewAction",
//   target: "https://example.com/listing/123",
// },
// {
//   "@type": "WebSite",
//   name: "Best Property Listings",
//   url: "https://example.com",
// },
// {
//   "@type": "AggregateOffer",
//   priceCurrency: "USD",
//   lowPrice: "500000",
//   highPrice: "1500000",
// },
