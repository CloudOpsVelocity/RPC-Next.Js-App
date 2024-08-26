import { Project, WithContext } from "schema-dts";

const realEstateProject: WithContext<Project> = {
  "@context": "https://schema.org",
  "@type": "Project",
  name: "Beautiful Family Home in Suburb",
  description:
    "A charming 4-bedroom, 3-bathroom family home located in a quiet suburban neighborhood with excellent schools and amenities.",
  image: "https://example.com/image.jpg",
  url: "https://example.com/real-estate-listing",
  address: {
    "@type": "PostalAddress",
    streetAddress: "456 Elm Street",
    addressLocality: "Suburbia",
    addressRegion: "CA",
    postalCode: "90210",
    addressCountry: "US",
  },

  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Sales",
    telephone: "+1-800-555-5555",
    email: "info@example.com",
  },
  potentialAction: {
    "@type": "Action",
    name: "Schedule a Tour",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://example.com/schedule-tour",
    },
  },
  makesOffer: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "750000",
    additionalType: "https://schema.org/RealEstateProject",
  },
};

export default function RealEstateProject() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(realEstateProject),
      }}
    />
  );
}
