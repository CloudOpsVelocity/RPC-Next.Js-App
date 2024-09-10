import { Project, WithContext } from "schema-dts";

const generateProjectJsonLd = (data: any) => {
  const jsonLd: WithContext<any> = {
    "@context": "https://schema.org",
    "@type": "Project",
    name: data.name,
    description: data.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: data.location.locality,
      addressRegion: data.location.city,
      streetAddress: data.location.address,
    },

    developer: data.developer,
    status: data.status,
    completionDate: data.completionDate,
    totalUnits: data.totalUnits,
    availableUnits: data.availableUnits,
    amenities: data.amenities,
    image: data.images, // Assuming images is an array
    offers: {
      "@type": "Offer",
      priceCurrency: data.pricing.currency,
      price: data.minPrice, // You can use minPrice or another specific field
      priceValidUntil: data.completionDate, // Example field
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      url: data.url,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: data.contactDetails.phone,
      contactType: "Customer Support",
      email: data.contactDetails.email,
    },
    createdDate: data.createdDate,
    updatedDate: data.updatedDate,
  };

  return jsonLd;
};

const ProjectJsonLdScript = ({ data }: any) => {
  const jsonLd = generateProjectJsonLd(data);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
export default ProjectJsonLdScript;
export const ProjectJsonLdScriptfakeData = {
  name: "Sunrise Apartments",
  description:
    "A luxurious residential project offering 2 and 3 BHK apartments with modern amenities.",
  location: {
    city: "Bangalore",
    locality: "MG Road",
    address: "123, MG Road, Bangalore",
  },
  developer: "Sunrise Developers",
  status: "completed",
  completionDate: "2022-12-01",
  totalUnits: 200,
  availableUnits: 5,
  amenities: ["Clubhouse", "Swimming Pool", "Gym", "Garden"],
  images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  pricing: {
    minPrice: 5000000,
    maxPrice: 7500000,
    currency: "INR",
  },
  contactDetails: {
    phone: "+91-1234567890",
    email: "info@sunrisedevelopers.com",
  },
  url: "https://example.com/sunrise-apartments",
  createdDate: "2024-09-01T12:00:00Z",
  updatedDate: "2024-09-10T12:00:00Z",
};
