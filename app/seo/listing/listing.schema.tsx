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
}

export const generateListingSchema = ({
  nearByLocations,
  listing,
  faqData,
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
        name: listing.propName,
        url: `${DOMAIN}property/${listing.propIdEnc}`,
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
              name: listing.propName,
              item: `${DOMAIN}property/${listing.propIdEnc}`,
            },
          ],
        },
        mainEntity: {
          "@type": "RealEstateListing",
          url: `${DOMAIN}property/${listing.propIdEnc}`,
          datePosted: listing.createdAt,
          description: listing.usp,
        },
      },
      {
        "@type": "Apartment",
        name: listing.propName,
        description: listing.usp,
        numberOfRooms: listing.nobt,
        floorSize: {
          "@type": "QuantitativeValue",
          value: listing.sba,
          unitCode: "SqFt",
        },
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
        image: listing.projMedia.coverImageUrl.split(",")[0],
        url: `${DOMAIN}property/${listing.propIdEnc}`,
        telephone: PHONE_NUMBER,
        amenityFeature: listing.amenities.map((amenity: number) => ({
          "@type": "LocationFeatureSpecification",
          name: amenity.toString(),
          value: "true",
        })),
        numberOfBathroomsTotal: listing.bathRooms,
        yearBuilt: listing.yearBuilt,
        propertyType: listing.propTypeName,
        floorLevel: listing.floorNo,
      },
      {
        "@type": "Product",
        name: listing.propName,
        description: listing.usp,
        image: listing.projMedia.coverImageUrl.split(",")[0],
        brand: {
          "@type": "Brand",
          name: listing.postedByName,
        },
        offers: {
          "@type": "Offer",
          url: `${DOMAIN}property/${listing.propIdEnc}`,
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
        mainEntity:
          listing.faqs?.map((faq: any) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })) || [],
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateListingSchema(listingData)),
      }}
    />
  );
};

export default ListingSchema;
