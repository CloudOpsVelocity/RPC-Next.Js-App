import React from "react";
import {
  Graph,
  WebPage,
  Product,
  Offer,
  PostalAddress,
  GeoCoordinates,
  Place,
  Review,
  FAQPage,
  Question,
  Answer,
  ListItem,
  BreadcrumbList,
  Organization,
  LocalBusiness,
  RealEstateAgent,
  Residence,
  ApartmentComplex,
  Apartment,
  AggregateOffer,
  ViewAction,
  WebSite,
} from "schema-dts";

interface ProjectData {
  phaseOverview: any[]; // You'll need to type these properly later
  nearByLocations: any; // Same here - add specific types
  basicData: any; // And here
  // ... other properties
}

interface MySchemaData {
  "@context": "https://schema.org";
  "@graph": (
    | WebPage
    | Product
    | Offer
    | PostalAddress
    | GeoCoordinates
    | Place
    | Review
    | FAQPage
    | BreadcrumbList
    | Organization
    | LocalBusiness
    | RealEstateAgent
    | Residence
    | ApartmentComplex
    | Apartment
    | AggregateOffer
    | ViewAction
    | WebSite
  )[];
}

interface ProjectSchemaProps {
  projectData: ProjectData;
}

const ProjectSchema: React.FC<ProjectSchemaProps> = ({ projectData }) => {
  const generateSchemaData = (): MySchemaData => {
    const { basicData, phaseOverview, nearByLocations } = projectData;

    const graph: any[] = [];

    // WebPage
    graph.push({
      "@type": "WebPage",
      name: basicData.projectName,
      url: window.location.href, // Or a more specific URL if available
      description: basicData.about, // Use project description
    });

    // Organization (Builder)
    graph.push({
      "@type": "Organization",
      name: basicData.projPromoter,
      url: basicData.projBroucherUrl ? basicData.projBroucherUrl : null, // Add website if available
      address: {
        "@type": "PostalAddress",
        streetAddress: basicData.address,
        addressLocality: basicData.localityName,
        addressRegion: basicData.state,
        postalCode: basicData.pinCode,
        addressCountry: "India", // Or get from data if available
      },
      telephone: basicData.projPromoterContact
        ? basicData.projPromoterContact
        : null, // Add phone if available
    });

    // LocalBusiness (Real Estate Project)
    graph.push({
      "@type": "LocalBusiness",
      name: basicData.projectName,
      address: {
        "@type": "PostalAddress",
        streetAddress: basicData.address,
        addressLocality: basicData.localityName,
        addressRegion: basicData.state,
        postalCode: basicData.pinCode,
        addressCountry: "India",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: basicData.lat,
        longitude: basicData.lang,
      },
      telephone: basicData.projPromoterContact
        ? basicData.projPromoterContact
        : null,
      url: window.location.href, // Or a more specific URL
      // ... other properties as needed (e.g., openingHours, priceRange)
    });

    // Product (Plots) - Adapt as needed based on data
    phaseOverview.forEach((phase) => {
      if (phase.propTypeOverview && phase.propTypeOverview.plot) {
        const plotData = phase.propTypeOverview.plot;
        plotData.unitTypes.forEach((unitType: any) => {
          const priceListEntry = plotData.priceList.find(
            (entry: any) => entry.bhkOrDimension === unitType
          );
          graph.push({
            "@type": "Product",
            name: `Plot in ${basicData.projectName} (${unitType})`,
            description: `Plot size ${unitType} in ${basicData.projectName}`, // More details if available
            brand: basicData.projPromoter, // Or builder name
            sku: unitType, // Use unitType as SKU or a unique identifier
            offers: {
              "@type": "Offer",
              priceCurrency: "INR", // Indian Rupees
              price: priceListEntry
                ? priceListEntry.minPrice
                : plotData.minPrice, // Use specific price if available, fallback to minPrice
              availability: "http://schema.org/InStock", // Or "PreOrder" etc.
            },
          });
        });
      }
    });

    // FAQPage
    if (basicData.faqs && basicData.faqs.length > 0) {
      const faqItems = basicData.faqs.map((faq: any) => ({
        "@type": "Question",
        name: faq.faqQuestion,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.faqAnswer,
        },
      }));

      graph.push({
        "@type": "FAQPage",
        mainEntity: faqItems,
      });
    }

    // Iterate through nearByLocations and add Place entities
    for (const category in nearByLocations) {
      nearByLocations[category].forEach((location: any) => {
        graph.push({
          "@type": "Place",
          name: location.name,
          geo: {
            "@type": "GeoCoordinates",
            latitude: location.lat,
            longitude: location.lang,
          },
          // ... other properties like address, telephone, etc., if available
        });
      });
    }

    // ... Add more schema types as needed (e.g., Review, Offer, etc.)

    // BreadcrumbList
    const breadcrumbs = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://example.com", // Replace with your actual home page URL
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: "/projects", // Replace with the appropriate URL
      },
      {
        "@type": "ListItem",
        position: 3,
        name: basicData.projectName,
        item: window.location.href,
      },
    ];

    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs,
    });

    return {
      "@context": "https://schema.org",
      "@graph": graph,
    };
  };

  const schemaData = generateSchemaData();

  try {
    const jsonString = JSON.stringify(schemaData, null, 2);
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonString }}
      />
    );
  } catch (error) {
    console.error("Error serializing schema data:", error);
    return null;
  }
};

export default ProjectSchema;
