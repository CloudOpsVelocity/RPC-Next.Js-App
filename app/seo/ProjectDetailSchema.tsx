import { Graph, Place } from "schema-dts";
import { MERGERPROJECT } from "../validations/types/project";
import { OPENING_HOURS } from "./common/opening-hours";
import { REALESTATEAGENT_SCHEMA } from "./common/real-estateagent";

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
          additionalType: "http://schema.org/PropertyValue",
          additionalProperty: {
            "@type": "PropertyValue",
            name: category,
            value: location.distance,
          },
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
      {
        "@type": "Residence",
        address: {
          "@type": "PostalAddress",
          addressLocality: basicData?.localityName,
          addressRegion: basicData?.stateName,
          addressCountry: "India",
          postalCode: basicData?.pinCode,
          streetAddress: basicData?.address,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: basicData?.lat,
          longitude: basicData?.lang,
        },
      },
      {
        "@type": "PostalAddress",
        addressLocality: basicData?.localityName,
        addressRegion: basicData?.stateName,
        addressCountry: "India",
        postalCode: basicData?.pinCode,
        streetAddress: basicData?.address,
        areaServed: basicData?.localityName,
      },
      {
        "@type": "ApartmentComplex",
        name: basicData?.projectName,
        description: basicData?.about,
        address: {
          "@type": "PostalAddress",
          addressLocality: basicData?.localityName,
          addressRegion: basicData?.stateName,
          addressCountry: "India",
          postalCode: basicData?.pinCode,
          streetAddress: basicData?.address,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: basicData?.lat,
          longitude: basicData?.lang,
        },
        image: basicData?.media.coverImageUrl,
        telephone: PHONE_NUMBER,
        amenityFeature: [],
      },
      {
        "@type": "SaleEvent",
        name: "Buy " + basicData?.projectName,
        startDate: projectData?.basicData.startDate,
        endDate: projectData?.basicData.endDate,
        url: projectDetailsPageUrl,
        description: desc,
        image: basicData?.media.coverImageUrl,
        eventStatus: "http://schema.org/EventScheduled",
        eventAttendanceMode: "http://schema.org/MixedEventAttendanceMode",
        location: [
          {
            "@type": "VirtualLocation",
            url: projectDetailsPageUrl,
          },
          {
            "@type": "Place",
            name: basicData?.projectName,
            address: {
              "@type": "PostalAddress",
              addressLocality: basicData?.localityName,
              addressRegion: basicData?.stateName,
              addressCountry: "India",
              postalCode: basicData?.pinCode,
            },
          },
        ],
        offers: {
          "@type": "Offer",
          url: projectDetailsPageUrl,
          priceCurrency: "INR",
          priceValidUntil: projectData?.basicData.endDate,
          availability: "http://schema.org/InStock",
          category: "Primary",
        },
        performer: {
          "@type": "PerformingGroup",
          name: basicData?.projectName,
        },
        organizer: {
          "@type": "Organization",
          name: COMPANY_NAME,
          logo: LOGO_URL,
        },
      },
      {
        "@type": "ViewAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: projectDetailsPageUrl,
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
        name: `View ${basicData?.projectName} Details`,
        description:
          desc || `View complete details about ${basicData?.projectName}`,
        image: basicData?.media.coverImageUrl,
        url: projectDetailsPageUrl,
      },
      {
        "@type": "Article",
        headline: `${basicData?.projectName} - Property Details and Pricing`,
        description:
          desc ||
          `Complete details about ${basicData?.projectName} including pricing, amenities, and location information`,
        image: basicData?.media.coverImageUrl,
        datePublished: projectData?.basicData.startDate,
        dateModified: projectData?.basicData.endDate,
        author: {
          "@type": "Organization",
          name: COMPANY_NAME,
          logo: LOGO_URL,
        },
        publisher: {
          "@type": "Organization",
          name: COMPANY_NAME,
          logo: LOGO_URL,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": projectDetailsPageUrl,
        },
        url: projectDetailsPageUrl,
        articleBody:
          desc ||
          `${basicData?.projectName} is a residential project located in ${basicData?.localityName}, ${basicData?.stateName}.`,
      },
    ],
  };

  return JSON.stringify(schemaData);
};

const ProjectSchema = ({ projectData }: { projectData: ProjectData }) =>
  process.env.ENVIRONMENT !== "dev" ? (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: generateSchema(projectData) }}
    />
  ) : (
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
