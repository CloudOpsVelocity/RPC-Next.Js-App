import { Graph, Place } from "schema-dts";
import { MERGERPROJECT } from "../validations/types/project";
import { OPENING_HOURS } from "./common/opening-hours";
import {
  COMPANY_NAME,
  COMPANY_URL,
  PRICE_CURRENY,
  DOMAIN,
  PHONE_NUMBER,
  propertyMap,
  LOGO_URL,
} from "./constants";

interface ProjectData extends MERGERPROJECT {
  url: string;
  desc: string;
}

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
          review: {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: "4.5",
              bestRating: "5",
            },
            author: {
              "@type": "Person",
              name: "Rahul Kumar",
            },
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: "150",
            bestRating: "5",
            worstRating: "1",
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
        "@type": "SaleEvent",
        name: `Avail Offer for ${basicData?.projectName}`,
        startDate: new Date(
          projectData?.basicData?.startDate?.replace("IST", "+05:30")
        ).toISOString(),
        endDate: new Date(
          projectData?.basicData?.endDate?.replace("IST", "+05:30")
        ).toISOString(),
        url: projectDetailsPageUrl,
        description: "Special discounts available for a limited time.",
        image: basicData?.media?.coverImageUrl
          ? [basicData.media.coverImageUrl]
          : [],
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "MixedEventAttendanceMode",
        location: [
          {
            "@type": "VirtualLocation",
            url: projectDetailsPageUrl,
          },
          {
            "@type": "Place",
            name: basicData.projectName,
            address: basicData.address,
          },
        ],
        offers: {
          "@type": "Offer",
          url: projectDetailsPageUrl,
          priceCurrency: "INR",
          price: basicData?.minPrice,
          validFrom: new Date(
            basicData?.startDate?.replace("IST", "+05:30")
          ).toISOString(),
          priceValidUntil: new Date(
            projectData?.basicData?.endDate?.replace("IST", "+05:30")
          ).toISOString(),
          availability: "http://schema.org/InStock",
          category: "RealEstate",
        },
        organizer: {
          "@type": "Organization",
          name: COMPANY_NAME,
          url: COMPANY_URL,
          logo: LOGO_URL,
        },
        eventLocation: {
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
        potentialAction: {
          "@type": "BuyAction",
          target: projectDetailsPageUrl,
        },
        performer: {
          "@type": "Organization",
          name: COMPANY_NAME,
          url: COMPANY_URL,
          logo: LOGO_URL,
        },
      },
      {
        "@type": "SaleEvent",
        name: `Call Now  :8884440963`,
        startDate: new Date(
          projectData?.basicData?.startDate?.replace("IST", "+05:30")
        ).toISOString(),
        endDate: new Date(
          projectData?.basicData?.endDate?.replace("IST", "+05:30")
        ).toISOString(),
        url: projectDetailsPageUrl,
        description: "Call our team now to get more details and offers.",
        image: basicData?.media?.coverImageUrl
          ? [basicData.media.coverImageUrl]
          : [],
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "MixedEventAttendanceMode",
        location: [
          {
            "@type": "VirtualLocation",
            url: projectDetailsPageUrl,
          },
          {
            "@type": "Place",
            name: basicData.projectName,
            address: basicData.address,
          },
        ],
        offers: {
          "@type": "Offer",
          url: projectDetailsPageUrl,
          priceCurrency: "INR",
          price: basicData?.minPrice,
          validFrom: new Date(
            basicData?.startDate?.replace("IST", "+05:30")
          ).toISOString(),
          priceValidUntil: new Date(
            projectData?.basicData?.endDate?.replace("IST", "+05:30")
          ).toISOString(),
          availability: "http://schema.org/InStock",
          category: "RealEstate",
        },
        organizer: {
          "@type": "Organization",
          name: COMPANY_NAME,
          url: COMPANY_URL,
          logo: LOGO_URL,
        },
        eventLocation: {
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
        potentialAction: {
          "@type": "BuyAction",
          target: projectDetailsPageUrl,
        },
        performer: {
          "@type": "Organization",
          name: COMPANY_NAME,
          url: COMPANY_URL,
          logo: LOGO_URL,
        },
      },
      {
        "@type": "SaleEvent",
        name: `Group Buy Discounts for ${basicData?.projectName}`,
        startDate: new Date(
          projectData?.basicData?.startDate?.replace("IST", "+05:30")
        ).toISOString(),
        endDate: new Date(
          projectData?.basicData?.endDate?.replace("IST", "+05:30")
        ).toISOString(),
        url: projectDetailsPageUrl,
        description: "Get discounts when buying in a group. Limited offer!",
        image: basicData?.media?.coverImageUrl
          ? [basicData.media.coverImageUrl]
          : [],
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "MixedEventAttendanceMode",
        location: [
          {
            "@type": "VirtualLocation",
            url: projectDetailsPageUrl,
          },
          {
            "@type": "Place",
            name: basicData.projectName,
            address: basicData.address,
          },
        ],
        offers: {
          "@type": "Offer",
          url: projectDetailsPageUrl,
          priceCurrency: "INR",
          price: basicData?.minPrice,
          validFrom: new Date(
            basicData?.startDate?.replace("IST", "+05:30")
          ).toISOString(),
          priceValidUntil: new Date(
            projectData?.basicData?.endDate?.replace("IST", "+05:30")
          ).toISOString(),
          availability: "http://schema.org/InStock",
          category: "RealEstate",
        },
        organizer: {
          "@type": "Organization",
          name: COMPANY_NAME,
          url: COMPANY_URL,
          logo: LOGO_URL,
        },
        eventLocation: {
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
        potentialAction: {
          "@type": "BuyAction",
          target: projectDetailsPageUrl,
        },
        performer: {
          "@type": "Organization",
          name: COMPANY_NAME,
          url: COMPANY_URL,
          logo: LOGO_URL,
        },
      },
      {
        "@type": "WebPage",
        name: basicData?.projectName || "Real Estate Property Listings",
        url: projectDetailsPageUrl || `${DOMAIN}property-listings`,
        description:
          desc ||
          "Find top real estate listings, including apartments, villas, and commercial spaces.",

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
          image: basicData.media.coverImageUrl,
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
        // itemOffered: {
        //   "@type": "Product",
        //   name: basicData?.projectName,
        //   image: basicData.media.projectPlanUrl,
        //   description: desc || "Details about the project",
        //   brand: {
        //     "@type": "Brand",
        //     name: basicData?.projectName.split(" ")[0],
        //   },
        //   offers: {
        //     "@type": "Offer",
        //     url: projectDetailsPageUrl,
        //     price: basicData.minPrice,
        //     priceCurrency: PRICE_CURRENY,
        //     availability: "https://schema.org/InStock",
        //   },
        // },
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
          url: COMPANY_URL,
          logo: LOGO_URL,
        },
        publisher: {
          "@type": "Organization",
          name: COMPANY_NAME,
          logo: LOGO_URL,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": projectDetailsPageUrl + "#article",
        },
        url: projectDetailsPageUrl + "#article",
        articleBody:
          desc ||
          `${basicData?.projectName} is a residential project located in ${basicData?.localityName}, ${basicData?.stateName}.`,
      },
      {
        "@type": "VirtualLocation",
        name: `Virtual Tour of ${basicData?.projectName}`,
        description: `Experience a virtual walkthrough of ${basicData?.projectName} from anywhere`,
        url: projectDetailsPageUrl,
        additionalType: "https://schema.org/3DModel",
        potentialAction: {
          "@type": "ViewAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: projectDetailsPageUrl,
            actionPlatform: [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform",
            ],
          },
        },
      },
      {
        "@type": "LandUseType",
        name: "Residential",
        description:
          "A property primarily used for residential purposes, such as single-family homes, apartments, and townhouses.",
      },
      {
        "@type": "SpecialAnnouncement",
        name: `${basicData?.projectName} - Special Offer`,
        datePosted: projectData?.basicData.startDate,
        expires: projectData?.basicData.endDate,
        text: `Special announcement for ${basicData?.projectName} - Located in ${basicData?.localityName}`,
        subjectOf: {
          "@type": "RealEstateListing",
          name: `${basicData?.projectName} - Luxury Apartments & Villas`,
          description: `Explore ${basicData?.projectName}, offering ${basicData?.availableProperties} configurations with world-class amenities in ${basicData?.localityName}, ${basicData?.stateName}.`,
          offers: {
            "@type": "Offer",
            price: basicData?.minPrice,
            priceCurrency: "INR",
            availability: "InStock",
            validFrom: projectData?.basicData.startDate,
            validThrough: projectData?.basicData.endDate,
          },
          url: projectDetailsPageUrl,
          image: basicData?.media.coverImageUrl,
          specialCoverage: {
            "@type": "Place",
            name: `${basicData?.localityName}, ${basicData?.cityName}`,
          },
        },
      },
      {
        "@type": "Dataset",
        name: `${basicData?.projectName} Property Details`,
        description: `Comprehensive dataset for ${basicData?.projectName} located in ${basicData?.localityName}, ${basicData?.stateName}`,
        creator: {
          "@type": "Organization",
          name: "Square Yards",
        },
        dateCreated: projectData?.basicData.startDate,
        dateModified:
          projectData?.basicData.startDate || projectData?.basicData.startDate,
        license: "https://creativecommons.org/licenses/by/4.0/",
        variableMeasured: [
          {
            "@type": "PropertyValue",
            name: "Project Name",
            value: basicData?.projectName,
          },
          {
            "@type": "PropertyValue",
            name: "Location",
            value: `${basicData?.localityName}, ${basicData?.stateName}`,
          },
          {
            "@type": "PropertyValue",
            name: "Property Type",
            value: "Residential",
          },
          {
            "@type": "PropertyValue",
            name: "Price Range",
            value: `${basicData?.minPrice || "Contact"} - ${
              basicData?.maxPrice || "for Price"
            }`,
          },
          {
            "@type": "PropertyValue",
            name: "Total Units",
            value: basicData?.floorPlanCount || "Not Specified",
          },
          {
            "@type": "PropertyValue",
            name: "Launch Date",
            value: basicData?.startDate,
          },
          {
            "@type": "PropertyValue",
            name: "Possession Status",
            value: basicData?.endDate || "Not Specified",
          },
          ...(basicData?.nearByLocations?.map((location: any) => ({
            "@type": "PropertyValue",
            name: "Nearby Location",
            value: {
              "@type": "Place",
              name: location.name,
              address: {
                "@type": "PostalAddress",
                addressLocality: location.locality,
                addressRegion: location.region,
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: location.latitude,
                longitude: location.longitude,
              },
              distance: `${location.distance} km`,
            },
          })) || []),
          ...(basicData?.amenityList?.map((amenity) => ({
            "@type": "PropertyValue",
            name: "Amenity",
            value: amenity.name,
          })) || []),
          ...(basicData?.specificationList?.map((spec) => ({
            "@type": "PropertyValue",
            name: "Specification",
            value: spec.specName,
          })) || []),
        ],
        distribution: {
          "@type": "DataDownload",
          contentUrl: projectDetailsPageUrl,
          encodingFormat: "text/html",
        },
        keywords: [
          "real estate",
          "residential property",
          basicData?.projectName,
          basicData?.localityName,
          basicData?.stateName,
          "property for sale",
          ...(basicData?.nearByLocations?.map((loc: any) => loc.name) || []),
          ...(basicData?.amenityList?.map((amenity: any) => amenity.name) ||
            []),
        ],
      },
    ],
  };

  return JSON.stringify(schemaData);
};

const ProjectSchema = ({ projectData }: { projectData: ProjectData }) => (
  // <div className="mt-[10%]  ">{generateSchema(projectData)}</div>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: generateSchema(projectData) }}
  />
);

export default ProjectSchema;
