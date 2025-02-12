import {
  BASE_PATH_LISTING,
  BASE_PATH_PROJECT_LISTING,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import Link from "next/link";
import React from "react";

export const slugify = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-") // Allow dots by including . in the character set
    .replace(/(^-|-$)+/g, ""); // Remove leading and trailing hyphens
};

export default function ListingBreadCrumbs({
  params,
  isProject,
  title,
}: {
  params: any;
  isProject: boolean;
  title: string;
}) {
  const allParams = Object.keys(params || {});
  const isIndependent = title.includes("Independent");
  const titleOfKeys = {
    city: "Project In ",
    lt: `${isIndependent ? "Independent Listings" : "Projects"} In `,
  };
  let currentPath = "";

  // Generate breadcrumb items for schema
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "/",
    },
  ];

  allParams.forEach((key, index) => {
    currentPath += `/${slugify(params[key])}`;
    const name = titleOfKeys[key as keyof typeof titleOfKeys]
      ? `${titleOfKeys[key as keyof typeof titleOfKeys]}${params[key].replace(
          /-/g,
          " "
        )}`
      : params[key].replace(/-/g, " ");

    breadcrumbItems.push({
      "@type": "ListItem",
      position: index + 2,
      name:
        index === allParams.length - 1 ? title.replace("undefined ", "") : name,
      item: `${
        isProject ? BASE_PATH_PROJECT_LISTING : BASE_PATH_LISTING
      }${currentPath}`,
    });
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbItems,
          }),
        }}
      >
        {}
      </script>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            name: breadcrumbItems.map((item) => item.name),
            url: breadcrumbItems.map((item) => item.item),
          }),
        }}
      ></script>

      <p className="text-[12px] sm:text-[16px] text-[#565D70] font-[500] mb-[1%]">
        <a
          href={`/`}
          target="_blank"
          className="hover:underline cursor-pointer capitalize"
        >
          Home
        </a>
        {" > "}
        {allParams.map((key, index) => {
          currentPath += `/${slugify(params[key])}`;
          const isLast = index === allParams.length - 1;
          return (
            <React.Fragment key={`${key[index]}`}>
              {!isLast ? (
                <>
                  <a
                    href={`${
                      isProject ? BASE_PATH_PROJECT_LISTING : BASE_PATH_LISTING
                    }${currentPath}`}
                    target="_blank"
                    className="hover:underline cursor-pointer capitalize"
                  >
                    {titleOfKeys[key as keyof typeof titleOfKeys] && (
                      <span>
                        {titleOfKeys[key as keyof typeof titleOfKeys]}
                      </span>
                    )}
                    <span>
                      {index === allParams.length - 2
                        ? params[key].replace(/-/g, " ").replace(/bhk/i, "BHK")
                        : params[key].replace(/-/g, " ")}
                    </span>
                  </a>
                  {" > "}
                </>
              ) : (
                <span className="capitalize">
                  {title.replace("undefined ", "")}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </p>
    </>
  );
}
