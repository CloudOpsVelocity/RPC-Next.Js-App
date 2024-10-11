import {
  BASE_PATH_LISTING,
  BASE_PATH_PROJECT_LISTING,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import { slugify } from "@/app/utils/linkRouters/ProjectLink";
import Link from "next/link";
import React from "react";

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
  const titleOfKeys = {
    city: "Project In ",
    lt: "Projects In ",
  };
  let currentPath = "";

  return (
    <p className="text-[12px] sm:text-[16px] text-[#565D70] font-[500] mb-[1%]">
      <Link
        href={`/`}
        target="_blank"
        className="hover:underline cursor-pointer capitalize"
      >
        Home
      </Link>
      {" > "}
      {allParams.map((key, index) => {
        currentPath += `/${slugify(params[key])}`;
        const isLast = index === allParams.length - 1;

        return (
          <React.Fragment key={`${key[index]}`}>
            {!isLast ? (
              <>
                <Link
                  href={`${
                    isProject ? BASE_PATH_PROJECT_LISTING : BASE_PATH_LISTING
                  }${currentPath}`}
                  target="_blank"
                  className="hover:underline cursor-pointer capitalize"
                >
                  {titleOfKeys[key as keyof typeof titleOfKeys] && (
                    <span>{titleOfKeys[key as keyof typeof titleOfKeys]}</span>
                  )}
                  <span>{params[key].replace(/-/g, " ")}</span>
                </Link>
                {" > "}
              </>
            ) : (
              <span className="capitalize">{title}</span> // Last breadcrumb is plain text
            )}
          </React.Fragment>
        );
      })}
    </p>
  );
}
