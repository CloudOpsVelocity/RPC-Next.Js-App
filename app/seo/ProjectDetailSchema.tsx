import { Graph } from "schema-dts";
import { MERGERPROJECT } from "../validations/types/project";

interface ProjectData extends MERGERPROJECT {
  url: string;
  desc: string;
}

const COMPANY_NAME = "RP CLAN PVT LMT";
const COMPANY_URL = "https://rpclan.com/";
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
  const generateProductSchema = () => {
    const schemaData = phaseOverview?.map((phase: any) => {
      const propTypes = Object.keys(phase.propTypeOverview);
      const propTypeData = propTypes.map((propType: any) => {
        const propTypeOverview = phase.propTypeOverview[propType];
        const propTypeSchema = {
          "@type": "Product",
          name: `${basicData?.projectName} - ${phase.phaseName} - ${
            propertyMap.get(propType)?.name
          })}`,
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
          basicData?.about ||
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
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
          telephone: PHONE_NUMBER,
          additionalProperty: phaseOverview?.map((phase: any) => ({
            "@type": "PropertyValue",
            name: phase.name,
            value: phase.details,
          })),
        },
      },
      // {
      //   "@type": "Article",
      //   headline: "Best Properties to Buy in 2024",
      //   author: {
      //     "@type": "Person",
      //     name: "John Doe",
      //   },
      //   datePublished: "2025-02-05",
      //   dateModified: "2025-02-05",
      //   description:
      //     "A comprehensive guide to the best properties to invest in this year, including top cities and upcoming projects.",
      //   image: "https://example.com/image.jpg",
      //   publisher: {
      //     "@type": "Organization",
      //     name: "RealEstate Magazine",
      //     logo: {
      //       "@type": "ImageObject",
      //       url: "https://example.com/logo.jpg",
      //     },
      //   },
      //   mainEntityOfPage: {
      //     "@type": "WebPage",
      //     "@id": "https://example.com/best-properties-to-buy-2024",
      //   },
      //   articleBody:
      //     "This article discusses the best properties to invest in 2024, focusing on key locations, price trends, and expert opinions. With a focus on residential and commercial properties, readers can find valuable insights into the most promising investments for the year.",
      //   keywords:
      //     "properties, real estate, 2024 investment, best properties, top cities, upcoming projects",
      // },
      ...generateProductSchema(),
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
