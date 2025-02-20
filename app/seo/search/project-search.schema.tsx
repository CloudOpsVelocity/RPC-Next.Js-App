export const generateAllSchemas = (property: any, properties?: any[]) => {
  if (!property) return [];

  // Check if this builder/agent already exists in previous properties
  const builderAlreadyExists =
    properties?.findIndex((p, index) => {
      return (
        index < properties.indexOf(property) &&
        p.postedByName === property.postedByName
      );
    }) !== -1;

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
        postalCode: property.pincode || "",
        streetAddress: property.address || "",
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
          priceValidUntil: property.possassionDate || "",
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
          ratingValue: "4.5",
          reviewCount: "10",
          bestRating: "5",
          worstRating: "1",
        },
      },
      ...(builderAlreadyExists
        ? []
        : [
            {
              "@type": "RealEstateAgent",
              name: property.postedByName || "GetRightProperty",
              image:
                property.builderLogo || "https://getrightproperty.com/logo.png",
              address: {
                "@type": "PostalAddress",
                addressLocality: property.builderCity || "",
                addressRegion: property.state || "",
                addressCountry: "IN",
              },
            },
          ]),
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(results),
        }}
      />
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
