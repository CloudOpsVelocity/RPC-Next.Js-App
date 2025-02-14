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
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `What is the price of ${property.bhkName} ${property.propTypeName} in ${property.localityName}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `The price is ₹${property.price || "0"}`,
            },
          },
          {
            "@type": "Question",
            name: `What is the super built-up area?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `The super built-up area is ${property.sba} sq.ft.`,
            },
          },
          {
            "@type": "Question",
            name: `What are the amenities available?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `This property has ${property.amenCount} amenities.`,
            },
          },
        ],
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(results),
      }}
    />
  );
};
