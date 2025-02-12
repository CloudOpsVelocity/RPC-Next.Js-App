import { Place } from "schema-dts";
import {
  DOMAIN,
  PRICE_CURRENY,
  COMPANY_NAME,
  PHONE_NUMBER,
  LOGO_URL,
} from "../constants";

interface ListingSchemaProps {
  nearByLocations: any;
  listing: any;
  faqData: any;
  title: string;
  url: string;
}

export const generateListingSchema = ({
  nearByLocations,
  listing,
  faqData,
  title,
  url,
}: ListingSchemaProps) => {
  const nearByLocationsSchema: Place[] = [];
  for (const category in nearByLocations) {
    nearByLocations[category]?.forEach((location: any) => {
      nearByLocationsSchema.push({
        "@type": "Place",
        name: location.name,
        geo: {
          "@type": "GeoCoordinates",
          latitude: location.lat,
          longitude: location.lang,
        },
        additionalType: "http://schema.org/PropertyValue",
        additionalProperty: {
          "@type": "PropertyValue",
          name: category,
          value: location.distance,
        },
      });
    });
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: title,
        url: url,
        description: listing.usp,
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
              name: listing.propTypeName,
              item: `${DOMAIN}${listing.propTypeName.toLowerCase()}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: title,
              item: `${DOMAIN}property/${listing.propIdEnc}`,
            },
          ],
        },
        mainEntity: {
          "@type": "RealEstateListing",
          url: url,
          datePosted: listing.createdAt,
          description: listing.usp,
        },
      },
      {
        "@type":
          listing.propTypeName === "Apartment"
            ? "Apartment"
            : listing.propTypeName === "Villament"
            ? "House"
            : listing.propTypeName === "Plot"
            ? "Land"
            : listing.propTypeName === "Villa"
            ? "Villa"
            : listing.propTypeName === "Row House"
            ? "RowHouse"
            : listing.propTypeName === "Independent House/Building"
            ? "ResidentialBuilding"
            : "Apartment",
        name: title,
        description: listing.usp,
        numberOfRooms:
          listing.propTypeName !== "Land" ? listing.nobt : undefined,
        floorSize:
          listing.propTypeName !== "Land"
            ? {
                "@type": "QuantitativeValue",
                value: listing.sba,
                unitCode: "SqFt",
              }
            : undefined,
        address: {
          "@type": "PostalAddress",
          streetAddress: listing.address,
          addressLocality: listing.ltName,
          addressRegion: listing.stateName,
          postalCode: listing.pinCode,
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: listing.lat,
          longitude: listing.lang,
        },
        image: listing.projMedia?.coverImageUrl?.split(",")[0],
        url: url,
        telephone: PHONE_NUMBER,
        amenityFeature:
          listing.propTypeName !== "Land"
            ? listing.amenities?.map((amenity: number) => ({
                "@type": "LocationFeatureSpecification",
                name: amenity.toString(),
                value: "true",
              }))
            : undefined,
        numberOfBathroomsTotal:
          listing.propTypeName !== "Land" ? listing.bathRooms : undefined,
        yearBuilt:
          listing.propTypeName !== "Land" ? listing.yearBuilt : undefined,
        // propertyType: listing.propTypeName,
        floorLevel: ["Apartment", "Residential Building"].includes(
          listing.propTypeName
        )
          ? listing.floorNo
          : undefined,
      },
      {
        "@type": "Product",
        name: title,
        description: listing.usp,
        image: listing.projMedia.coverImageUrl.split(",")[0],
        brand: {
          "@type": "Brand",
          name: listing.postedByName,
        },
        offers: {
          "@type": "Offer",
          url: url,
          price: listing.price,
          priceCurrency: PRICE_CURRENY,
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: listing.postedByName,
          },
          priceValidUntil: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
          itemCondition:
            listing.furnishType === "Fully Furnished"
              ? "https://schema.org/UsedCondition"
              : "https://schema.org/NewCondition",
        },
        aggregateRating: listing.rating
          ? {
              "@type": "AggregateRating",
              ratingValue: listing.rating,
              reviewCount: listing.reviewCount || 0,
            }
          : undefined,
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          ...(faqData?.map((faq: any) => ({
            "@type": "Question",
            name: faq.faqQuestion,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.faqAnswer,
            },
          })) || []),
          {
            "@type": "Question",
            name: `How can I contact the owner of ${listing.propName}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `You can contact the owner of ${listing.propName} by clicking on the contact button on the property listing page. Our team will connect you with the owner directly.`,
            },
          },
          {
            "@type": "Question",
            name: `What is the price of ${listing.propName}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `The price of ${listing.propName} is Rs. ${listing.price}. Please contact us for detailed pricing information and negotiations.`,
            },
          },
          {
            "@type": "Question",
            name: `Is ${listing.propName} available for immediate possession?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Please contact us to know the exact possession status of ${listing.propName}. We will provide you with all the necessary details about availability and possession timeline.`,
            },
          },
        ],
      },
      {
        "@type": "PropertyValue",
        name: title,
        value: listing.price,
        unitText: "INR",
        propertyID: listing.id,
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "bedrooms",
            value: listing.bhk,
          },
          {
            "@type": "PropertyValue",
            name: "furnishing",
            value: listing.furnishType,
          },
          {
            "@type": "PropertyValue",
            name: "propertyType",
            value: listing.propType,
          },
          {
            "@type": "PropertyValue",
            name: "area",
            value: listing.sba,
            unitText: "sq ft",
          },
        ],
      },
      {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: listing.ltName,
        addressRegion: listing.ctName,
        streetAddress: listing.address,
        postalCode: listing.pincode || "",
      },
      {
        "@type": "GeoCoordinates",
        latitude: listing.lat,
        longitude: listing.lang,
      },
      {
        "@type": "ViewAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${DOMAIN}property/${listing.propIdEnc}`,
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
            "http://schema.org/AndroidPlatform",
            "http://schema.org/IOSPlatform",
          ],
        },
        expectsAcceptanceOf: {
          "@type": "Offer",
          price: listing.price,
          priceCurrency: PRICE_CURRENY,
        },
      },
      ...nearByLocationsSchema,
    ],
  };

  return schemaData;
};

const ListingSchema = ({
  listingData,
}: {
  listingData: ListingSchemaProps;
}) => {
  return (
    // <script
    //   type="application/ld+json"
    //   dangerouslySetInnerHTML={{
    //     __html: JSON.stringify(generateListingSchema(listingData)),
    //   }}
    // />
    <div>{JSON.stringify(generateListingSchema(listingData))}</div>
  );
};

export default ListingSchema;
