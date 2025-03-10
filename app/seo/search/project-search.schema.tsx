import { createProjectLinkUrl } from "@/app/utils/linkRouters/ProjectLink";
import { PHONE_NUMBER } from "../constants";
import { convertToSchemaDate } from "@/common/utils/dateUtils";

export const generateAllSchemas = (
  property: any,
  properties: any[],
  index: number
) => {
  const [launchDate, possassionDate] = [
    convertToSchemaDate(property?.launchDate),
    convertToSchemaDate(property?.possassionDate),
  ];
  if (!property) return [];
  const builderAlreadyExists =
    properties?.findIndex((p, index) => {
      return (
        index < properties.indexOf(property) &&
        p.postedByName === property.postedByName
      );
    }) !== -1;
  const PAGE_URL = createProjectLinkUrl({
    city: property.city,
    slug: property.projName,
    locality: property.locality,
    projIdEnc: property.projIdEnc,
  });
  const schemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        name: `${property.projName || ""} ${property.propType || ""} ${
          property.locality ? `in ${property.locality}` : ""
        } ${property.city ? `, ${property.city}` : ""}`.trim(),
        description: property.projectAbout || "",
        url: PAGE_URL,
        datePosted: launchDate || new Date().toISOString(),
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
        description: property.projectAbout.slice(0, 4800) || "",
        image:
          property.coverUrl?.split(",")[0] ||
          "https://getrightproperty.com/default-property.jpg",
        url: PAGE_URL,
        offers: {
          "@type": "Offer",
          price: property.minPrice || "0",
          priceCurrency: "INR",
          availability:
            property.projstatus?.toLowerCase() === "under construction"
              ? "PreOrder"
              : "InStock",
          priceValidUntil: possassionDate || "",
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
      {
        "@type": "WebPage",
        url: PAGE_URL,
        name: property.projName || "",
        description: property.projectAbout || "",
        datePublished: launchDate || new Date().toISOString(),
        image:
          property.coverUrl?.split(",")[0] ||
          "https://getrightproperty.com/default-property.jpg",
      },
      ...(builderAlreadyExists
        ? []
        : [
            {
              "@type": "RealEstateAgent",
              name: property.postedByName || "GetRightProperty",
              image:
                property.builderLogo || "https://getrightproperty.com/logo.png",
              priceRange: property.minPrice || "0",
              telephone: PHONE_NUMBER || "",

              address: {
                "@type": "PostalAddress",
                addressLocality: property.builderCity || "",
                addressRegion: property.state || "",
                addressCountry: "IN",
                postalCode: property.pincode || "N/A",
                streetAddress: property.address || "N/A",
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
        name: ["Home", "Properties", property.projName],
        url: [PAGE_URL],
      },
      {
        "@type": "ItemList",
        itemListElement: {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: property.projName || "N/A",
            image: property.image || "N/A",
            description: property.description || "N/A",
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: property.price || "N/A",
              itemCondition: "http://schema.org/NewCondition",
              availability: "http://schema.org/InStock",
            },
          },
        },
      },
    ],
  };

  return schemas;
};

export const ProjectSeachSchema = ({ properties }: any) => {
  if (!Array.isArray(properties)) return null;

  const results = properties
    .map((property: any, index: number) => {
      return generateAllSchemas(property, properties, index);
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
                name: "How can I find the best property prices in Bangalore?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "GetRightProperty helps you find the best property prices in Bangalore by comparing prices across different localities, providing market analysis, and connecting you with verified sellers. Our extensive database includes both ready-to-move and under-construction properties.",
                },
              },
              {
                "@type": "Question",
                name: "What are the benefits of using GetRightProperty for property search?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "GetRightProperty offers verified listings, transparent pricing, expert guidance, and a hassle-free property search experience. We provide detailed property information, high-quality images, and direct contact with property owners and agents.",
                },
              },
              {
                "@type": "Question",
                name: "Which are the top investment areas in Bangalore?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Popular investment areas in Bangalore include Whitefield, Electronic City, Sarjapur Road, and Hebbal. These areas offer good appreciation potential, infrastructure development, and proximity to IT hubs. GetRightProperty can help you find the best properties in these locations.",
                },
              },
              {
                "@type": "Question",
                name: "What price ranges are available for properties in Bangalore?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Property prices in Bangalore vary by location and type. Apartments range from ₹40 lakhs to ₹5 crores, while villas start from ₹1 crore. GetRightProperty offers options across all budget ranges with transparent pricing and negotiation assistance.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
};
