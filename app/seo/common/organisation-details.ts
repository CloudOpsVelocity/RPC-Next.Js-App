export const Organization_SCHEMA = {
  "@type": "Organization",
  name: "GET RIGHT PROPERTY",
  url: "https://www.getrightproperty.com",
  logo: "https://media.getrightproperty.com/staticmedia-images-icons/grp-logo/grp-logo-tm.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91 8884440963",
    contactType: "Customer Service",
    areaServed: "IN",
    availableLanguage: [
      "English",
      "Tamil",
      "Telugu",
      "Kannada",
      "Malayalam",
      "Hindi",
      "Bengali",
    ],
  },
  sameAs: [
    "https://www.facebook.com/getrightproperty",
    "https://twitter.com/getrightproperty",
    "https://www.linkedin.com/company/getrightproperty",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office No 15 3rd Floor Gamma Block Sigma Soft Tech Park",
    addressLocality: "Whitefield",
    addressRegion: "KA",
    postalCode: "560066",
    addressCountry: "IN",
  },
  founder: {
    "@type": "Person",
    name: "Rahul Vishwakarma",
  },
  foundingDate: "07-02-2025",
  description:
    "We are a premier real estate agency offering buying, selling, and rental services for residential properties.",
  department: [
    {
      "@type": "Organization",
      name: "Sales Department",
      employee: {
        "@type": "Person",
        name: "Abhishek Kumar",
        jobTitle: "Sales Manager",
      },
    },
    {
      "@type": "Organization",
      name: "Property Management",
      employee: {
        "@type": "Person",
        name: "Sneha Kumari",
        jobTitle: "HR",
      },
    },
  ],
  memberOf: {
    "@type": "Organization",
    name: "RERA",
  },
  //   worksFor: {
  //     "@type": "Person",
  //     name: "Rahul Vishwakarma",
  //     jobTitle: "Real Estate Agent",
  //     telephone: "+91 8884445678",
  //     url: "https://rera.karnataka.gov.in/home",
  //   },
  //   offers: {
  //     "@type": "OfferCatalog",
  //     name: "Property Listings",
  //     itemListElement: [
  //       {
  //         "@type": "Offer",
  //         url: "https://www.getrightproperty.com/search/listing",
  //         priceCurrency: "INR",
  //         price: "100000",
  //         eligibleRegion: {
  //           "@type": "Place",
  //           name: "Bangalore",
  //         },
  //         category: "Residential",
  //         description: "Residential Apartment For Sale",
  //       },
  //     ],
  //   },
  telephone: "+91 8884440963",
};
