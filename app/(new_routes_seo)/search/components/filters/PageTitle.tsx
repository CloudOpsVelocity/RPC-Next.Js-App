"use client";

import { useAtomValue } from "jotai";
import { useParams, usePathname } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { projSearchStore } from "../../store/projSearchStore";
import Link from "next/link";

type Props = {
  serverFilterData?: Record<string, any>;
};

function PageTitle({ serverFilterData }: Props) {
  const state = useAtomValue(projSearchStore);

  const paramsData = useParams();
  const path = usePathname();

  function cleanHeading(id: string[]) {
    const sanitizedName = id.map((part) => {
      if (part.includes("PJ")) {
        return;
      }
      return part;
    });
    return sanitizedName
      .join(" ")
      .replace(/\b\d*(B|C|G|L|P|CG|SCG|RCG|PJ)\b/g, "")
      .replace(/\s+/g, " ");
  }

  // const getTitle = (pageUrl: string) => {
  //   if (paramsData && Object.keys(paramsData).length > 0) {
  //     if (paramsData.slug) {
  //       const slug = paramsData.slug as string;
  //       const id = slug?.split("-");
  //       return cleanHeading(id);
  //     } else {
  //       const pageTitle = `Residential Projects For ${
  //         paramsData.bhk_unit_type ? paramsData.bhk_unit_type : ""
  //       } ${paramsData.lt ? paramsData.lt + " for" : ""} ${
  //         state.cg !== "S" ? "Rent" : "Sale"
  //       } in ${paramsData.project ? paramsData.project : "Bengaluru"} ${
  //         paramsData.city ? paramsData.city : paramsData.city ?? ""
  //       }`;
  //       return pageTitle.replaceAll("-", " ");
  //     }
  //   } else if (pageUrl === "/search") {
  //     return "Project Search";
  //   } else if (pageUrl === "/search/listing") {
  //     return "Listing Search";
  //   } else if (pageUrl === "/residential-listings") {
  //     return "Residential Projects";
  //   }
  // };

  const getTitle = (pageUrl: string) => {
    if (pageUrl === "/residential/projects") {
      return (
        <>
          Explore{" "}
          <Link
            href="https://www.getrightproperty.com/residential/projects/bengaluru"
            // target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Residential Projects in Bengaluru
          </Link>
        </>
      );
    } else if (pageUrl === "/residential-listings/for-sale") {
      return (
        <>
          Explore{" "}
          <Link
            href="https://www.getrightproperty.com/residential-listings/for-sale/bengaluru"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Residential Properties for sale in Bengaluru
          </Link>
        </>
      );
    } else if (path === "/residential-listings/for-rent") {
      return (
        <>
          Explore{" "}
          <Link
            href="https://www.getrightproperty.com/residential-listings/for-rent/bengaluru"
            // target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Residential Properties for rent in Bengaluru,
          </Link>
        </>
      );
    }
    const isListing = path.includes("/residential-listings/");
    if (paramsData && Object.keys(paramsData).length > 0) {
      if (paramsData.slug) {
        const slug = paramsData.slug as string;
        const id = slug?.split("-");
        const isProject = !(slug.includes("rent") || slug.includes("sale"))
          ? "Property For Sale | Rent"
          : "";
        return `${isProject}  ${cleanHeading(id)}`;
      } else {
        let firstString = paramsData.bhk_unit_type
          ? paramsData.bhk_unit_type
          : paramsData.phase
          ? paramsData.phase
          : `Residential ${isListing ? "Listings" : "Projects"}`;
        const pageTitle = `${firstString} For ${
          serverFilterData?.cg === "R" || state.cg === "R" ? "Rent" : "Sale"
        } in ${paramsData.project ?? ""} ${paramsData.lt ?? ""} ${
          paramsData.city ?? "Bengaluru"
        } `;
        const basePath = "/residential-listings";
        const slugs = paramsData.slugs || [];

        const isExtraTitleAvailable = Array.isArray(slugs) && slugs.length > 2;

        // const links = isExtraTitleAvailable ? (
        //   <nav aria-label="Breadcrumb">
        //     <ol className="inline-flex items-center space-x-1">
        //       {slugs.slice(2).map((slug, index) => {
        //         const fullPath = `${basePath}/${slugs
        //           .slice(0, 2 + index + 1)
        //           .join("/")}`;
        //         const linkText = slug.replaceAll("-", " ");

        //         return (
        //           <li key={fullPath}>
        //             <Link
        //               href={fullPath}
        //               title={`View listings for ${linkText}`}
        //               className="text-blue-600 hover:underline pl-1"
        //             >
        //               {linkText}
        //             </Link>
        //           </li>
        //         );
        //       })}
        //     </ol>
        //   </nav>
        // ) : null;

        const links = isExtraTitleAvailable ? (
          <>
            {slugs.slice(2).map((slug, index) => {
              const fullPath = `${basePath}/${slugs
                .slice(0, 2 + index + 1)
                .join("/")}`;
              const linkText = slug.replaceAll("-", " ");

              return (
                <Fragment key={fullPath}>
                  {index === 0 ? "" : "/"}
                  <span>
                    <Link
                      href={fullPath}
                      title={`View listings for ${linkText}`}
                      className="text-blue-600 hover:underline"
                    >
                      {linkText}
                    </Link>
                  </span>
                </Fragment>
              );
            })}
          </>
        ) : null;
        // return (
        //   <div className="flex">
        //     {pageTitle.replaceAll("-", " ")}
        //     <div>{links}</div>
        //   </div>
        // );
        return (
          <>
            {pageTitle.replaceAll("-", " ")}
            {links}
          </>
        );
      }
    } else if (paramsData && Object.keys(paramsData).length === 0) {
      let firstString = `Residential ${isListing ? "Listings" : "Projects"}`;

      const pageTitle = `${firstString} For ${
        state.cg === "R" ? "Rent" : "Sale"
      } in Bengaluru `;
      return pageTitle;
    } else if (pageUrl === "/search") {
      return "Search Results for";
    } else if (pageUrl === "/search/listing") {
      return "Search Results for";
    }

    // else if (pageUrl === "/residential-listings") {
    //   return "Residential Projects";
    // }
  };

  const [hideHeading, setHideHeading] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setHideHeading(true);
    };

    window.addEventListener("click", handlePopState);
    return () => window.removeEventListener("click", handlePopState);
  }, []);

  const getParagraph = () => {
    if (path === "/residential-listings/for-sale") {
      return (
        <p className="text-[13px] 2xl:text-sm text-gray-600 mb-4 line-clamp-1">
          Explore a diverse range of{" "}
          <Link
            href="https://www.getrightproperty.com/residential-listings/for-sale/bengaluru"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            residential properties for sale in Bengaluru
          </Link>
          , including premium apartments, luxury villas, plots and affordable
          flats, tailored to meet various lifestyle and investment needs.
        </p>
      );
    } else if (path === "/residential-listings/for-rent") {
      return (
        <p className="text-[13px] 2xl:text-sm text-gray-600 mb-4 line-clamp-1">
          Explore a curated selection of{" "}
          <Link
            href="https://www.getrightproperty.com/residential-listings/for-rent/bengaluru"
            // target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            residential properties for rent in Bengaluru,
          </Link>
          featuring premium apartments, spacious villas, and affordable flats to
          suit various lifestyles and budgets.
        </p>
      );
    } else if (path === "residential-listings/for-sale/bengaluru") {
      return (
        <p className="text-[13px] 2xl:text-sm text-gray-600 mb-4 truncate line-clamp-1">
          Browse the best{" "}
          <Link
            href="https://www.getrightproperty.com/residential-listings/for-sale/bengaluru"
            // target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            residential listings for sale in Bengaluru
          </Link>
          featuring apartments, villas, and gated communities across top areas
          like Whitefield, Sarjapur, and Electronic City. All listings are
          verified with detailed pricing, amenities, and location insights to
          help you find your ideal home.
        </p>
      );
    } else if (path === "/residential/projects") {
      return (
        <p className="text-[13px] 2xl:text-sm  text-gray-600  line-clamp-1">
          Explore a wide range of{" "}
          <Link
            href="https://www.getrightproperty.com/residential/projects/bengaluru"
            // target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            residential projects in Bengaluru
          </Link>
          featuring top apartments, villas, and plots from leading
          developers—perfect for homebuyers and investors.
        </p>
      );
    }
  };

  return (
    <div>
      {!hideHeading ? (
        <div className=" text-[16px] 2xl:text-xl  ml-[8px]   capitalize flex flex-wrap ">
          {/* <span className="mr-[6px]">Search Results for</span> */}
          <h1 className="font-bold text-[14px]  md:text-[16px] ">
            {getTitle(path)}
          </h1>
        </div>
      ) : (
        <h1 className="font-bold text-[16px]   mb-[6px] ml-[8px] capitalize flex gap-[6px]  2xl:text-xl ">
          Find your dream home, where comfort meets convenience.
        </h1>
      )}

      {/* {getParagraph()} */}
    </div>
  );
}

export default PageTitle;
