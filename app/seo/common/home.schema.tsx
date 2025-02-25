const homeLinksData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Post Property",
    url: "/post-your-listing",
  },
  {
    name: "Post Project",
    url: "/post-your-project",
  },
  { name: "About", url: "/about" },
  {
    name: "Compare Property And Projects",
    url: "/your-profile/compares",
  },
  { name: "Your Best Real Estate Guide", url: "/contact" },
  {
    name: "Individual Signup",
    url: "/register/individual",
  },
  {
    name: "Agent Signup",
    url: "/register/agent",
  },
  {
    name: "Builder Signup",
    url: "/register/builder",
  },
];

export const homeSiteNavigationSchemaData = {
  "@context": "https://schema.org",
  "@graph": homeLinksData.map((item) => ({
    "@type": "SiteNavigationElement",
    name: item.name,
    url: item.url,
  })),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GetRightProperty",
  url: "https://getrightproperty.com",
  description:
    "Find your perfect property in Bangalore with GetRightProperty - Your trusted real estate partner",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://getrightproperty.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=100066833915037",
    "https://x.com/getrightproperty",
    "https://www.instagram.com/_getrightproperty_/?utm_source=qr#",
    "https://www.linkedin.com/company/get-right-property/",
  ],
};

const offerSchema = {
  "@context": "https://schema.org",
  "@type": "Offer",
  itemOffered: {
    "@type": "Service",
    name: "Property Listing Service",
    description:
      "List your property for free on GetRightProperty and reach thousands of potential buyers and tenants",
  },
  price: "N/A",
  priceCurrency: "INR",
  availability: "https://schema.org/InStock",
  seller: {
    "@type": "Organization",
    name: "GetRightProperty",
    url: "https://getrightproperty.com",
  },
  areaServed: {
    "@type": "City",
    name: "Bangalore",
  },
  deliveryLeadTime: {
    "@type": "QuantitativeValue",
    minValue: "1",
    maxValue: "2",
    unitCode: "DAY",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@id": "https://getrightproperty.com",
        name: "Home",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@id": "https://getrightproperty.com/properties",
        name: "Properties",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@id": "https://getrightproperty.com/projects",
        name: "Projects",
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@id": "https://getrightproperty.com/agents",
        name: "Agents",
      },
    },
  ],
};

const FaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is GetRightProperty?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GetRightProperty is a platform that helps you find the best property prices in Bangalore by comparing prices across different localities, providing market analysis, and connecting you with verified sellers. Our extensive database includes both ready-to-move and under-construction properties.",
      },
    },
    {
      "@type": "Question",
      name: "Is GetRightProperty free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, GetRightProperty is a completely free platform. You can post property listings and projects at no cost. There are no hidden charges or fees.",
      },
    },
    {
      "@type": "Question",
      name: "Who can post properties on GetRightProperty?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Property owners, agents, and builders can sign up and post their property listings and projects for free. We offer unlimited listings for individuals and businesses.",
      },
    },
    {
      "@type": "Question",
      name: "How does GetRightProperty help buyers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Buyers can compare property prices, set property alerts, and access detailed listings with multiple images. Our service team assists both buyers and sellers in securing the best deal by providing market insights and direct support.",
      },
    },
    {
      "@type": "Question",
      name: "Does GetRightProperty assist in getting the best property deal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Our dedicated service team helps both buyers and sellers negotiate the best property deals. We ensure a smooth transaction and assist with all necessary formalities.",
      },
    },
    {
      "@type": "Question",
      name: "Does GetRightProperty have partnerships with real estate companies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we have partnered with many leading real estate companies, builders, and developers. This allows us to offer exclusive deals and insights to our users.",
      },
    },
    {
      "@type": "Question",
      name: "Can GetRightProperty help me post my listing or project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! If you need help posting your property or project, our service team will handle the listing process for you at no cost. We make it easy for you to showcase your property.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly can I post a property listing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can add detailed property information within 60 seconds. Our user-friendly platform makes it easy to upload multiple images, set property alerts, and manage your listings efficiently.",
      },
    },
    {
      "@type": "Question",
      name: "What type of properties can I list on GetRightProperty?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can list residential and commercial properties, including apartments, independent houses, villas, plots, office spaces, and shops. Both ready-to-move and under-construction properties are supported.",
      },
    },
    {
      "@type": "Question",
      name: "Can I showcase my property for rent or sale?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can list your property as either 'For Sale' or 'For Rent'. This allows potential buyers and tenants to find your property easily.",
      },
    },
    {
      "@type": "Question",
      name: "Does GetRightProperty provide a map with nearby amenities?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our property details page includes an interactive map showing nearby amenities such as schools, hospitals, malls, and public transport, helping buyers make informed decisions.",
      },
    },
    {
      "@type": "Question",
      name: "How do I track responses and views for my listing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can monitor the performance of your listings through our platform. We provide data on views, inquiries, and search rankings to help you optimize your listings.",
      },
    },
    {
      "@type": "Question",
      name: "How does GetRightProperty compare listings and projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GetRightProperty offers one of the largest property comparisons in India, helping users compare listings and projects across different locations, price ranges, and property types. We provide insights on market trends, builder reputations, and real-time price variations to ensure you get the best deal.",
      },
    },
  ],
};

export const HomeSiteNavigationSchema = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeSiteNavigationSchemaData),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(offerSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FaqSchema),
        }}
      />
    </>
  );
};
