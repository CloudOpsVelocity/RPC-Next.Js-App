import React from "react";
import {
  WebPage,
  Product,
  Offer,
  PostalAddress,
  GeoCoordinates,
  Place,
  Review,
  FAQPage,
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
  phaseOverview: any[];
  nearByLocations: any;
  basicData: any;
  url: string;
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
    const { basicData, phaseOverview, nearByLocations, url } = projectData;

    const graph: any[] = [];

    // Helper function to safely add data to the graph
    const pushGraphItem = (item: any) => {
      if (item) {
        graph.push(item);
      }
    };

    // WebPage
    pushGraphItem({
      "@type": "WebPage",
      name: basicData?.projectName,
      url: url,
      description: basicData?.about,
    });

    // Organization (Builder)
    pushGraphItem({
      "@type": "Organization",
      name: basicData?.projPromoter,
      url: basicData?.projBroucherUrl,
      address:
        basicData?.address &&
        basicData?.localityName &&
        basicData?.state &&
        basicData?.pinCode
          ? {
              "@type": "PostalAddress",
              streetAddress: basicData.address,
              addressLocality: basicData.localityName,
              addressRegion: basicData.state,
              postalCode: basicData.pinCode,
              addressCountry: "India",
            }
          : undefined,
      telephone: basicData?.projPromoterContact,
    });

    // LocalBusiness (Real Estate Project)
    pushGraphItem({
      "@type": "LocalBusiness",
      name: basicData?.projectName,
      address:
        basicData?.address &&
        basicData?.localityName &&
        basicData?.state &&
        basicData?.pinCode
          ? {
              "@type": "PostalAddress",
              streetAddress: basicData.address,
              addressLocality: basicData.localityName,
              addressRegion: basicData.state,
              postalCode: basicData.pinCode,
              addressCountry: "India",
            }
          : undefined,
      geo:
        basicData?.lat && basicData?.lang
          ? {
              "@type": "GeoCoordinates",
              latitude: basicData.lat,
              longitude: basicData.lang,
            }
          : undefined,
      telephone: basicData?.projPromoterContact,
      url: url,
    });

    // Product (Plots)
    phaseOverview?.forEach((phase) => {
      if (phase?.propTypeOverview?.plot) {
        const plotData = phase.propTypeOverview.plot;
        plotData?.unitTypes?.forEach((unitType: any) => {
          const priceListEntry = plotData?.priceList?.find(
            (entry: any) => entry.bhkOrDimension === unitType
          );
          pushGraphItem({
            "@type": "Product",
            name: `Plot in ${basicData?.projectName} (${unitType})`,
            description: `Plot size ${unitType} in ${basicData?.projectName}`,
            brand: basicData?.projPromoter,
            sku: unitType,
            offers:
              priceListEntry || plotData?.minPrice
                ? {
                    "@type": "Offer",
                    priceCurrency: "INR",
                    price: priceListEntry?.minPrice ?? plotData.minPrice, // Use nullish coalescing operator
                    availability: "http://schema.org/InStock",
                  }
                : undefined,
          });
        });
      }
    });

    // FAQPage
    if (basicData?.faqs?.length > 0) {
      const faqItems = basicData.faqs.map((faq: any) => ({
        "@type": "Question",
        name: faq.faqQuestion,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.faqAnswer,
        },
      }));

      pushGraphItem({
        "@type": "FAQPage",
        mainEntity: faqItems,
      });
    }

    // NearBy Locations
    if (nearByLocations) {
      for (const category in nearByLocations) {
        nearByLocations[category]?.forEach((location: any) => {
          pushGraphItem({
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
          });
        });
      }
    }

    // BreadcrumbList
    const breadcrumbs = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://example.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: "/projects",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: basicData?.projectName,
        item: url,
      },
    ];

    pushGraphItem({
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
