import Tag from "../atoms/Tag";

export interface TagData {
  title: string;
  url: string;
}

interface Props {
  urls: TagData[];
}

export default function TagsSections({ urls }: Props) {
  const flatLinks = [
    ...urls,

    { title: "Bangalore", url: "/residential/projects/bengaluru" },

    // Properties
    { title: "For Sale Listings", url: "/residential-listings/for-sale" },
    { title: "For Rent Listings", url: "/residential-listings/for-rent" },
    { title: "New Launch Projects", url: "/search?sf=projStatus=108" },
    { title: "On-Going Projects", url: "/search?sf=projStatus=106" },
    { title: "Completed Projects", url: "/search?sf=projStatus=107" },
    { title: "Ready to Move Listings", url: "/search/listing?sf=propStatus=R" },
    {
      title: "Under Construction Listings",
      url: "/search/listing?sf=propStatus=U",
    },

    // Resources
    { title: "Market Trends", url: "/market-trends/locality-insights" },
    { title: "Buying Guide", url: "/buying-guide" },
    { title: "Selling Tips", url: "/selling-tips" },
    { title: "Real Estate News", url: "/market-trends/news" },

    // Our Pages
    { title: "Home", url: "/" },
    { title: "Residential Projects", url: "/residential" },
    { title: "Properties", url: "/residential-listings" },
    { title: "Post Project", url: "/post-your-project" }, // optional
    { title: "Post Property", url: "/post-your-listing" },
    { title: "Builders", url: "/builders" },
    { title: "Login/Signup", url: "/login" }, // optional
    { title: "Listing Search", url: "/search/listing" },
    { title: "Project Search", url: "/search" },
    { title: "Residential Listings", url: "/residential-listings" },

    // Company
    { title: "About Us", url: "/about" },
    { title: "Our Team", url: "/team" },
    { title: "Careers", url: "/careers" },
    { title: "Contact", url: "/get-in-touch" },

    // Legal
    { title: "Privacy Policy", url: "/privacy-policy" },
    { title: "Terms of Service", url: "/terms-and-conditions" },
    { title: "Sitemap", url: "/sitemap.xml" },
  ];

  return (
    <section className="my-6 mx-auto w-[90%]">
      <h2 className="text-xl font-semibold mb-2">Tags:</h2>
      <p className="text-sm text-gray-600 mb-4">
        Discover more rental and residential properties in popular areas and
        projects.
      </p>
      <ul className="flex flex-wrap gap-2">
        {flatLinks.map((urlObj, index) => (
          <li key={urlObj.url || index}>
            <Tag {...urlObj} />
          </li>
        ))}
      </ul>
    </section>
  );
}
