import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";
import { slugify } from "@/app/utils/linkRouters/ProjectLink";
import Link from "next/link";
import Script from "next/script";
import React from "react";

export default function BreadCrumbs({ params: routes }: { params: any }) {
  const params = {
    residential: "residential",
    projects: "projects",
    ...routes,
  };
  const allParams = Object.keys(params);
  const titleOfKeys = {
    city: "",
    lt: "",
  };
  let currentPath = "";
  const breadcrumsschema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allParams.map((key, index) => {
      currentPath += `/${slugify(params[key])}`;
      let name = params[key].replace(/-/g, " ");
      const newArray = name.split(" ").slice(0, -1);
      const newName = key !== "slug" ? name : newArray.join(" ");
      return {
        "@type": "ListItem",
        position: index + 1,
        name: newName,
        item: `${process.env.NEXT_PUBLIC_PROJECT_URL}${currentPath}`,
      };
    }),
  };
  let siteMapPath = "";
  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@graph": allParams.map((key, index) => {
      siteMapPath += `/${slugify(params[key])}`;
      let name = params[key].replace(/-/g, " ");
      const newArray = name.split(" ").slice(0, -1);
      const newName = key !== "slug" ? name : newArray.join(" ");
      return {
        "@context": "https://schema.org",
        "@type": "SiteNavigationElement",
        position: index + 1,
        name: titleOfKeys[key as keyof typeof titleOfKeys]
          ? titleOfKeys[key as keyof typeof titleOfKeys] + newName
          : newName,
        url: `${process.env.NEXT_PUBLIC_PROJECT_URL}${siteMapPath}`,
      };
    }),
  };
  let currentPath2 = "";
  return (
    <>
      <Script
        id="BreadCrumbsScript1"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumsschema),
        }}
      />

      <Script
        id="BreadCrumbsScript2"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteNavigationSchema),
        }}
      />
      <p className="text-[12px] sm:text-[16px] text-[#565D70] font-[500] mb-[1%]">
        <Link
          prefetch={false}
          rel="noopener noreferrer"
          href={`/`}
          className="hover:underline cursor-pointer capitalize"
        >
          Home
        </Link>
        {" > "}

        {allParams.map((key, index) => {
          currentPath2 += `/${slugify(params[key])}`;
          let name = params[key].replace(/-/g, " ");
          const newArray = name.split(" ").slice(0, -1);
          const newName = key !== "slug" ? name : newArray.join(" ");
          return (
            <React.Fragment key={`${key[index]}`}>
              {index < Object.keys(params).length - 1 ? (
                <Link
                  prefetch={false}
                  href={`${process.env.NEXT_PUBLIC_PROJECT_URL}${currentPath2}`}
                  className="hover:underline cursor-pointer capitalize"
                >
                  <span>{newName}</span>
                </Link>
              ) : (
                <>
                  <span className="capitalize">
                    {newName.replace("undefined ", "")}
                  </span>
                </>
              )}
              {index < Object.keys(params).length - 1 && " > "}
            </React.Fragment>
          );
        })}
        {/* {allParams.map((key, index) => {
          path += `/${slugify(params[key])}`;
          let name = params[key].replace(/-/g, " ");
          const newArray = name.split(" ").slice(0, -1);
          const newName = key !== "slug" ? name : newArray.join(" ");

          return (
            <React.Fragment key={`${key[index]}`}>
              {index < Object.keys(params).length - 1 ? (
                <Link
                  prefetch={false}
                  href={`${process.env.NEXT_PUBLIC_PROJECT_URL}${siteMapPath}`}
                  className="hover:underline cursor-pointer capitalize"
                >
                  <span>{newName}</span>
                </Link>
              ) : (
                <>
                  <span className="capitalize">
                    {newName.replace("undefined ", "")}
                  </span>
                </>
              )}
              {index < Object.keys(params).length - 1 && " > "}
            </React.Fragment>
          );
        })} */}
      </p>
    </>
  );
}
