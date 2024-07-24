import { RealEstateListing, WithContext } from "schema-dts";

const realEstateListingSchema: WithContext<RealEstateListing> = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  name: "Beautiful Family Home in Suburb",
  description:
    "A charming 4-bedroom, 3-bathroom family home located in a quiet suburban neighborhood with excellent schools and amenities.",

  offers: {
    "@type": "Offer",
    price: "350000",
    priceCurrency: "USD",
    itemCondition: "NewCondition",
  },
  image: "https://example.com/image.jpg",
  url: "https://example.com/real-estate-listing",
};

export default function RealStateJSONLD() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(realEstateListingSchema),
      }}
    />
  );
}
