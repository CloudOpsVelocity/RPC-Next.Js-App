"use client";
import { GrpDarkLogoSvg } from "@/app/images/getrightLogo";
import { FaLocationDot } from "react-icons/fa6";

import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import Subscribe from "@/app/test/components/Section/Subscribe";
import { memo } from "react";
import { useSession } from "next-auth/react";

function Footer() {
  const { data: session } = useSession();
  const socialIcons = [
    {
      name: "facebook",
      icon: <FaFacebook size={24} />,
      link: "https://www.facebook.com/profile.php?id=100066833915037",
    },
    {
      name: "instagram",
      icon: <FaInstagram size={24} />,
      link: "https://www.instagram.com/_getrightproperty_/?utm_source=qr#",
    },
    {
      name: "twitter",
      icon: <FaTwitter size={24} />,
      link: "https://x.com/getrightproperty",
    },
    {
      name: "youtube",
      icon: <FaYoutube size={24} />,
      link: "https://www.youtube.com/@getrightproperty",
    },
    {
      name: "linkedin",
      icon: <FaLinkedin size={24} />,
      link: "https://www.linkedin.com/company/get-right-property/",
    },
  ];
  const sections = [
    {
      title: "New Projects",
      links: ["New Delhi", "Bangalore", "Chennai", "Mumbai", "Hyderabad"],
      hrefs: [
        "/search?sf=city=New+Delhi%2B683",
        "/search?sf=city=Bengaluru%2B9",
        "/search?sf=city=Chennai%2B580",
        "/search?sf=city=Mumbai%2B577",
        "/search?sf=city=Hyderabad%2B582",
      ],
      target: "_blank",
    },
    {
      title: "Properties",
      links: [
        "For Sale Listings",
        "For Rent Listings",
        "New Launch Projects",
        "On-Going Projects",
        "Completed Projects",
        /*  "Commercial",
        "Vacation Rentals",
        "Foreclosures", */
      ],
      hrefs: [
        "/residential-projects/for-sale",
        "/residential-projects/for-rent?listedBy=ALL&cg=R",
        "/search?sf=projStatus=108",
        "/search?sf=projStatus=106",
        "/search?sf=projStatus=107",
        /* "/commercial",
        "/vacation-rentals",
        "/foreclosures", */
      ],
      target: "_blank",
    },
    {
      title: "Resources",
      links: [
        "Market Trends",
        "Buying Guide",
        "Selling Tips",
        "Real Estate News",
        // "Mortgage Calculator",
        // "Home Valuation",
      ],
      hrefs: [
        "/market-trends/locality-insights",
        "/buying-guide",
        "/selling-tips",
        "/market-trends/news",
        // "/mortgage-calculator",
        // "/home-valuation",
      ],
      target: "_blank",
    },
    {
      title: "Our Pages",
      links: [
        "Home",
        "Projects",
        "Properties",
        session !== undefined &&
        session !== null &&
        session.user?.userType === "B"
          ? "Post Project"
          : "",
        "Post Property",
        "Builders",
        session === null ? "Login/Signup" : "",
        "Listing Search",
        "Project Search",
      ],
      hrefs: [
        "/",
        "/search",
        "/search/listing",
        "/post-your-project",
        "/post-your-listing",
        "/builders",
        "/login",
        "/search/listing",
        "/search",
      ],
      target: "_blank",
    },
    {
      title: "Company",
      links: [
        "About Us",
        "Our Team",
        "Careers",
        "Contact",
        // "Press",
        // "Partnerships",
      ],
      hrefs: [
        "/about",
        "/team",
        "/careers",
        "/get-in-touch",
        // "/press",
        // "/partnerships",
      ],
      target: "_blank",
    },
    {
      title: "Legal",
      links: [
        "Privacy Policy",
        "Terms of Service",
        "Sitemap",
        // "Cookie Policy",
        // "Fair Housing",
        // "Accessibility",
      ],
      hrefs: [
        "/privacy-policy",
        "/terms-and-conditions",
        "/sitemap.xml",
        // "/cookies",
        // "/fair-housing",
        // "/accessibility",
      ],
      target: "_blank",
    },
  ];

  return (
    <footer className="bg-[#253F59] text-white">
      <div className="max-w-[95%] mx-auto pt-2 sm:pt-12 pb-6 px-1 sm:px-6  lg:pt-16 lg:pb-8 lg:px-8">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <div className=" sm:space-y-6 xl:col-span-1">
            <GrpDarkLogoSvg className="w-[130px] sm:w-[180px] sm:-ml-2" />
            <p className="text-white text-sm sm:text-base mb-4 sm:mb-0">
              We pride ourselves on delivering exceptional customer services
              &amp; building lasting relationships with our clients
            </p>
            <div className="flex space-x-6">
              {socialIcons.map(({ name, icon, link }) => (
                <a
                  key={name}
                  href={link}
                  target="_blank"
                  className="text-white hover:text-gray-300"
                >
                  <span className="sr-only">{name}</span>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-2 sm:mt-12 grid grid-cols-3 gap-6 sm:gap-8 xl:mt-0 xl:col-span-3">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {sections.slice(0, 2).map(({ title, links, hrefs, target }) => (
                <div key={title}>
                  <h3 className="text-xs mt-2 sm:mt-0 sm:text-sm font-semibold text-white tracking-wider uppercase">
                    {title}
                  </h3>
                  <ul className="sm:mt-4  md:space-y-4">
                    {links.map((link, index) => (
                      <li key={link}>
                        <a
                          href={hrefs[index]}
                          target={target}
                          className="text-xs sm:text-base text-gray-300 hover:text-white"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8">
              {sections.slice(2, 4).map(({ title, links, hrefs, target }) => {
                return (
                  <div key={title}>
                    <h3 className="text-xs mt-2 sm:mt-0 sm:text-sm font-semibold text-white tracking-wider uppercase">
                      {title}
                    </h3>
                    {/* <ul className="sm:mt-4  md:space-y-4">
                      {links.map((link, index) => {
                        if (link == "Login/Signup") {
                          return (
                            <li key={link}>
                              <a
                                href={hrefs[index]}
                                target="_self"
                                className="text-xs sm:text-base text-gray-300 hover:text-white"
                              >
                                {link}
                              </a>
                            </li>
                          );
                        } else {
                          return (
                            <li key={link}>
                              <a
                                href={hrefs[index]}
                                target={target}
                                className="text-xs sm:text-base text-gray-300 hover:text-white"
                              >
                                {link}
                              </a>
                            </li>
                          );
                        }
                      })}
                    </ul> */}

                    <ul className="sm:mt-4  md:space-y-4">
                      {links.map((link, index) => {
                        if (link !== "") {
                          return (
                            <li key={link}>
                              <a
                                href={hrefs[index]}
                                target={target}
                                className="text-xs sm:text-base text-gray-300 hover:text-white"
                              >
                                {link}
                              </a>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {sections.slice(4).map(({ title, links, hrefs, target }) => (
                <div key={title}>
                  <h3 className="text-xs mt-2 sm:mt-0 sm:text-sm font-semibold text-white tracking-wider uppercase">
                    {title}
                  </h3>
                  <ul className="sm:mt-4  md:space-y-4">
                    {links.map((link, index) => (
                      <li key={link}>
                        <a
                          href={hrefs[index]}
                          target={target}
                          className="text-xs sm:text-base text-gray-300 hover:text-white"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-12 border-t border-gray-700 sm:pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-white tracking-wider uppercase">
                Subscribe to our newsletter
              </h3>
              <p className="mt-1 sm:mt-4 text-xs sm:text-base text-gray-300">
                Get the latest news, market trends, and hot property listings
                delivered to your inbox.
              </p>
              <Subscribe />
            </div>
          </div>
        </div>

        <div className="mt-2 sm:mt-8 border-t border-gray-700 sm:pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <button className="text-white text-xs sm:text-base hover:text-gray-300 inline-flex md:items-center md:justify-center flex-wrap text-left">
              <FaLocationDot className="mr-1" /> Whitefield, Bengaluru-560066
            </button>
            <a
              href={`tel:${8884440963}`}
              target="_blank"
              className="text-white text-xs sm:text-base hover:text-gray-300 inline-flex md:items-center md:justify-center flex-wrap text-left"
            >
              <FaPhoneAlt className="mr-1" /> +91-8884440963
            </a>
          </div>
          <p className="mt-1 text-xs sm:text-base text-white md:mt-0 md:order-1">
            Copyright © 2024 GetRightProperty. All Rights Reserved.
            <span>
              <br />A Product By &quot;
              <a href="https://rpclan.com/" target="_blank">
                {" "}
                RPCLAN SERVICES PVT.LTD
              </a>
              &quot;
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
export default memo(Footer);
