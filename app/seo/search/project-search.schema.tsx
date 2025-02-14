export const generateAllSchemas = (property: any, properties?: any[]) => {
  if (!property) return [];

  const schemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        name: `${property.projName || ""} ${property.propType || ""} ${
          property.locality ? `in ${property.locality}` : ""
        } ${property.city ? `, ${property.city}` : ""}`.trim(),
        description: property.projectAbout || "",
        url: property.projIdEnc
          ? `https://getrightproperty.com/property/${property.projIdEnc}`
          : "https://getrightproperty.com",
        datePosted: property.launchDate || new Date().toISOString(),
        image:
          property.coverUrl?.split(",")[0] ||
          "https://getrightproperty.com/default-property.jpg",
        offers: {
          "@type": "Offer",
          price: property.minPrice || "0",
          priceCurrency: "INR",
          availability:
            property.projstatus?.toLowerCase() === "under construction"
              ? "PreOrder"
              : "InStock",
        },
      },
      {
        "@type": "Product",
        name: `${property.projName || ""} ${property.propType || ""} ${
          property.locality ? `in ${property.locality}` : ""
        }`.trim(),
        description: property.projectAbout || "",
        image:
          property.coverUrl?.split(",")[0] ||
          "https://getrightproperty.com/default-property.jpg",
        offers: {
          "@type": "Offer",
          price: property.minPrice || "0",
          priceCurrency: "INR",
          availability:
            property.projstatus?.toLowerCase() === "under construction"
              ? "PreOrder"
              : "InStock",
        },
      },
      {
        "@type": "RealEstateAgent",
        name: property.postedByName || "GetRightProperty",
        image: property.builderLogo || "https://getrightproperty.com/logo.png",
        address: {
          "@type": "PostalAddress",
          addressLocality: property.builderCity || "",
          addressRegion: property.state || "",
          addressCountry: "IN",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `What is the price of ${property.projName || ""} ${
              property.propType || ""
            } ${property.locality ? `in ${property.locality}` : ""}?`.trim(),
            acceptedAnswer: {
              "@type": "Answer",
              text: `The price starts from ₹${
                property.minPrice || "0"
              } onwards`.trim(),
            },
          },
          ...(property.minSba
            ? [
                {
                  "@type": "Question",
                  name: `What is the super built-up area available?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `The super built-up area ranges from ${property.minSba} to ${property.maxSba} sq.ft.`,
                  },
                },
              ]
            : []),
          ...(property.amenCount
            ? [
                {
                  "@type": "Question",
                  name: `What are the amenities available?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `This property has ${property.amenCount} amenities.`,
                  },
                },
              ]
            : []),
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
          addressLocality: property.locality || "",
          addressRegion: property.state || "",
          postalCode: property.pincode || "",
          addressCountry: "IN",
        },
      },
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `https://getrightproperty.com/search?q={search_term_string}&location=${
            property.locality || ""
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
      {
        "@type": "SiteNavigationElement",
        name: [
          "Home",
          "Properties",
          `${property.city || ""} Properties`,
          `${property.propType || ""} in ${property.locality || ""}`,
          property.projName || "",
        ],
        url: [
          "https://getrightproperty.com",
          "https://getrightproperty.com/properties",
          `https://getrightproperty.com/${
            property.city?.toLowerCase() || ""
          }-properties`,
          `https://getrightproperty.com/${
            property.propType?.toLowerCase() || ""
          }-in-${property.locality?.toLowerCase() || ""}`,
          `https://getrightproperty.com/property/${property.projIdEnc || ""}`,
        ],
      },
    ],
  };

  return schemas;
};

export const ProjectSeachSchema = ({ properties }: any) => {
  if (!Array.isArray(properties)) return null;

  const results = properties
    .map((property: any) => {
      return generateAllSchemas(property, properties);
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
