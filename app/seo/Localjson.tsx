import Script from "next/script";
import { LocalBusiness, WithContext } from "schema-dts";
const generateLocalBusinessJsonLd = (data: any) => {
  const jsonLd: WithContext<LocalBusiness> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: data.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.addressLocality,
      addressRegion: data.address.addressRegion,
      postalCode: data.address.postalCode,
      addressCountry: data.address.addressCountry,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: data.contactPoint.telephone,
      email: data.contactPoint.email,
    },
    openingHours: data.openingHours,
    image: data.image,
    url: data.url,
    description: data.description,
    sameAs: data.sameAs,
  };

  return jsonLd;
};

const LocalBusinessJsonLdScript = ({ data }: any) => {
  const jsonLd = generateLocalBusinessJsonLd(data);

  return (
    <Script
    id="localkScript1"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default LocalBusinessJsonLdScript;
