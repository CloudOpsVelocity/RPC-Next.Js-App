import { Graph } from "schema-dts";

const schemaData: Graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Real Estate Property Listings",
      url: "https://example.com",
    },
    {
      "@type": "VideoObject",
      name: "Luxury Apartment Tour",
      description: "A walkthrough of a luxury apartment",
      uploadDate: "2024-02-06",
      thumbnailUrl: "https://example.com/thumbnail.jpg",
    },
    {
      "@type": "Article",
      headline: "Best Properties to Buy in 2024",
      author: {
        "@type": "Person",
        name: "John Doe",
      },
    },
    {
      "@type": "Product",
      name: "Luxury Apartment",
      brand: {
        "@type": "Brand",
        name: "Premium Homes",
      },
    },
    {
      "@type": "Residence",
      name: "Skyline Towers",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Main St",
        addressLocality: "New York",
        addressRegion: "NY",
        postalCode: "10001",
        addressCountry: "US",
      },
    },
    {
      "@type": "SaleEvent",
      name: "Exclusive Property Sale",
      startDate: "2024-03-01",
    },
    {
      "@type": "RealEstateAgent",
      name: "Top Realtors Inc.",
      telephone: "+1-555-555-5555",
    },
    {
      "@type": "Place",
      name: "Downtown Luxury Apartments",
      geo: {
        "@type": "GeoCoordinates",
        latitude: 40.7128,
        longitude: -74.006,
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What are the payment options?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We accept credit cards, bank transfers, and cryptocurrency.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://example.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Properties",
          item: "https://example.com/properties",
        },
      ],
    },
    {
      "@type": "ApartmentComplex",
      name: "Skyline Residences",
    },
    {
      "@type": "Organization",
      name: "Real Estate Hub",
      url: "https://realestatehub.com",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Main Navigation",
      url: "https://example.com",
    },
    {
      "@type": "Apartment",
      name: "Luxury Apartment",
      numberOfRooms: 3,
    },
    {
      "@type": "PostalAddress",
      streetAddress: "456 Elm St",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      postalCode: "90001",
      addressCountry: "US",
    },
    {
      "@type": "GeoCoordinates",
      latitude: 40.7128,
      longitude: -74.006,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Gym and Pool",
    },
    {
      "@type": "ViewAction",
      target: "https://example.com/listing/123",
    },
    {
      "@type": "WebSite",
      name: "Best Property Listings",
      url: "https://example.com",
    },
    {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "500000",
      highPrice: "1500000",
    },
  ],
};

const ProjectSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
  />
);

export default ProjectSchema;
