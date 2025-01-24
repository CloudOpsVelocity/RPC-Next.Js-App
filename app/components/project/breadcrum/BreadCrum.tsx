import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";
import { slugify } from "@/app/utils/linkRouters/ProjectLink";
import React from "react";

export default function BreadCrumbs({ params }: { params: any }) {
  const allParams = Object.keys(params);
  const titleOfKeys = {
    city: "Project In ",
    lt: "Projects In ",
  };
  let currentPath = "";

  return (
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

        let name = params[key].replace(/-/g, " ");
        const newArray = name.split(" ").slice(0, -1);
        const newName = key !== "slug" ? name : newArray.join(" ");
        
        return (
          <React.Fragment key={`${key[index]}`}>
            {index < Object.keys(params).length - 1 ? (
              <a
                href={`${BASE_PATH_PROJECT_DETAILS}${currentPath}`}
                target="_blank"
                className="hover:underline cursor-pointer capitalize"
              >
                {titleOfKeys[key as keyof typeof titleOfKeys] && (
                  <span>{titleOfKeys[key as keyof typeof titleOfKeys]}</span>
                )}
                <span>{newName}</span>
              </a>
            ) : (
              <>
                {titleOfKeys[key as keyof typeof titleOfKeys] && (
                  <span>{titleOfKeys[key as keyof typeof titleOfKeys]}</span>
                )}
                <span className="capitalize">{newName.replace("undefined ", "")}</span>
              </>
            )}
            {index < Object.keys(params).length - 1 && " > "}
          </React.Fragment>
        );
      })}
    </p>
  );
}
