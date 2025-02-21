import { PHONE_NUMBER } from "../constants";

export const generateAllSchemas = (property: any) => {
  if (!property) return [];

  const schemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        name: `${property.bhkName} ${property.facing} facing ${property.propTypeName} for ${property.category} ${property.postedBy} ${property.propName} ${property.localityName}`.trim(),
        description: property.usp || "",
        url: property.propIdEnc
          ? `https://getrightproperty.com/property/${property.propIdEnc}`
          : "https://getrightproperty.com",
        datePosted: property.postedDate || new Date().toISOString(),
        image:
          property.coverImage?.split(",")[0] ||
          "https://getrightproperty.com/default-property.jpg",
        offers: {
          "@type": "Offer",
          price: property.price || "0",
          priceCurrency: "INR",
          availability:
            property.propStatus?.toLowerCase() === "under construction"
              ? "PreOrder"
              : "InStock",
        },
      },
      {
        "@type": "Product",
        name: `${property.bhkName} ${property.propTypeName} in ${property.localityName}`.trim(),
        description: property.usp || "",
        image:
          property.coverImage?.split(",")[0] ||
          "https://getrightproperty.com/default-property.jpg",
        offers: {
          "@type": "Offer",
          price: property.price || "0",
          priceCurrency: "INR",
          availability:
            property.propStatus?.toLowerCase() === "under construction"
              ? "PreOrder"
              : "InStock",
          priceValidUntil: property.endDate || "",
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
      },
      {
        "@type": "RealEstateAgent",
        name: property.postedByName || "GetRightProperty",
        address: {
          "@type": "PostalAddress",
          addressLocality: property.cityName || "",
          addressRegion: property.stateName || "",
          addressCountry: "IN",
        },
        telephone: PHONE_NUMBER,
        streetAddress: "N/A",
      },
      {
        "@type": "Place",
        geo: {
          "@type": "GeoCoordinates",
          latitude: property.lat || "",
          longitude: property.lang || "",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: property.address || "",
          addressLocality: property.localityName || "",
          addressRegion: property.stateName || "",
          addressCountry: "IN",
        },
      },
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `https://getrightproperty.com/search?q={search_term_string}&location=${
            property.localityName || ""
          }`,
        },
        "query-input": "required name=search_term_string",
      },
      {
        "@type": "WebSite",
        url: "https://getrightproperty.com/",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://getrightproperty.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return schemas;
};

export const ListingSearchSchema = ({ properties }: any) => {
  if (!Array.isArray(properties)) return null;

  const results = properties
    .map((property: any) => {
      return generateAllSchemas(property);
    })
    .filter(Boolean);
  if (!results.length) return null;
  const uniqueBuilders = Array.from(
    new Set(properties.map((property: any) => property.postedByName))
  ).filter(Boolean);
  const realEstateAgentSchemas = uniqueBuilders.map((builderName: string) => {
    const builderProperty = properties.find(
      (p: any) => p.postedByName === builderName
    );
    return {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      name: builderName || "GetRightProperty",
      address: {
        "@type": "PostalAddress",
        addressLocality: builderProperty?.cityName || "",
        addressRegion: builderProperty?.stateName || "",
        addressCountry: "IN",
      },
      telephone: PHONE_NUMBER,
      streetAddress: "N/A",
    };
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(results),
        }}
      />
      {realEstateAgentSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What documents do I need to buy a property?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The essential documents needed are sale deed, property tax receipts, encumbrance certificate, approved building plan, and completion certificate. Additional documents may be required based on the property type and location.",
                },
              },
              {
                "@type": "Question",
                name: "How do I verify property ownership?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can verify property ownership by checking the sale deed, property tax receipts, and obtaining an encumbrance certificate from the sub-registrar's office. It's also recommended to conduct a legal title search.",
                },
              },
              {
                "@type": "Question",
                name: "What are the steps involved in property registration?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Property registration involves document verification, payment of stamp duty and registration charges, signing the sale deed in presence of witnesses, and registering at the sub-registrar's office. The process typically takes 1-2 weeks.",
                },
              },
              {
                "@type": "Question",
                name: "How can I check if a property is legally approved?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "To check legal approval, verify the building plan approval, occupancy certificate, and NOCs from relevant authorities. Also ensure the property is free from any legal disputes or encumbrances.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
};
