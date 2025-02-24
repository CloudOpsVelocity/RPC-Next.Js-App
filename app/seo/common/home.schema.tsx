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

export const HomeSiteNavigationSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(homeSiteNavigationSchemaData),
      }}
    />
  );
};
