import Tag from "../atoms/Tag";
export interface TagData {
  title: string;
  url: string;
  className?: string;
}
interface Props {
  urls: TagData[];
}

export default function TagsSections({ urls }: Props) {
  const flatLinks = [
    ...urls,
    { title: "Bangalore", url: "/residential/projects/bengaluru" },
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
    { title: "Market Trends", url: "/market-trends/locality-insights" },
    { title: "Buying Guide", url: "/buying-guide" },
    { title: "Selling Tips", url: "/selling-tips" },
    { title: "Real Estate News", url: "/market-trends/news" },
    { title: "Home", url: "/" },
    { title: "Residential Projects", url: "/residential" },
    { title: "Properties", url: "/residential-listings" },
    { title: "Post Project", url: "/post-your-project" },
    { title: "Post Property", url: "/post-your-listing" },
    { title: "Builders", url: "/builders" },
    { title: "Login/Signup", url: "/login" },
    { title: "Listing Search", url: "/search/listing" },
    { title: "Project Search", url: "/search" },
    { title: "Residential Listings", url: "/residential-listings" },
    { title: "About Us", url: "/about" },
    { title: "Our Team", url: "/team" },
    { title: "Careers", url: "/careers" },
    { title: "Contact", url: "/get-in-touch" },
    { title: "Privacy Policy", url: "/privacy-policy" },
    { title: "Terms of Service", url: "/terms-and-conditions" },
    { title: "Sitemap", url: "/sitemap.xml" },
    {
      title: "Post Property Listing | Sell or Rent Your Property",
      url: "/post-your-listing",
    },
    {
      title: "Your Dashboard | Manage Your Profile and Listings",
      url: "/your-profile/dashboard",
    },
    {
      title: "Post Your Project | Real Estate Project Submission",
      url: "/post-your-project",
    },

    {
      title: "Login | Access Your Real Estate Account",
      url: "/login",
    },
    {
      title: "Register | Create Your Real Estate Account",
      url: "/register",
    },
    {
      title: "Forgot Password | Reset Your Account Password",
      url: "/forgot",
    },
    {
      title: "Register as Individual | Create a Personal Account",
      url: "/register/individual",
    },
    {
      title: "Register as Agent | Join as Real Estate Agent",
      url: "/register/agent",
    },
    {
      title: "Register as Builder | Register Your Real Estate Business",
      url: "/register/builder",
    },
    {
      title: "Shortlisted Properties | View Your Saved Listings",
      url: "/your-profile/shortlisted",
    },
    {
      title: "Compare Properties | Compare Your Favorite Listings",
      url: "/your-profile/compare",
    },
  ];

  return (
    <section className="relative my-6 px-4 sm:px-6 md:px-8 w-[95%] ">
      <h2 className="text-lg sm:text-xl font-semibold mb-2">Tags:</h2>
      <p className="text-xs sm:text-sm text-gray-600 mb-4">
        Discover more residential rent and sale properties in popular areas and
        projects.
      </p>
      {flatLinks.map(({title, url}, index) => {
        console.log(url)
        return(
        <Tag
          key={`tags_sections__${index.toString()}`}
          // {...urlObj}
          title={title}
          url={url}
          className="mr-[6px] mb-[4px] text-wrap whitespace-wrap "
        />
      )})}
    </section>
  );
}
