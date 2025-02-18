"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaHome, FaChevronRight } from "react-icons/fa";
import { BASE_PATH_PROJECT_DETAILS } from "../../utils/new-seo-routes/project.route";
import { useAtom } from "jotai";
import { projSearchStore } from "../store/projSearchStore";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

const ProjectSearchBreadCrumbs: React.FC<BreadcrumbProps> = ({
  items = [],
}) => {
  const [state] = useAtom(projSearchStore);

  const getParams = useSearchParams();
  let listedBy = getParams.get("sf");

  let initailAlParams:any = [
    {
      href: "/",
      label: "Home",
    },{
      href: "/",
      label: "For Buy",
    },{
      href: `${BASE_PATH_PROJECT_DETAILS}${"/bengaluru"}`,
      label: "bengaluru",
    }
  ];

  const [allParams, setAllParams] = useState(initailAlParams)

  useEffect(()=>{
    let oldParams = [...allParams];
    const finalCityName = state && state.city && state.city.split("+")[0] ? state?.city.split("+")[0] : "bengaluru";

    oldParams[1] = {
      href: `${BASE_PATH_PROJECT_DETAILS}${state.cg === "R" ? "/for-rent" : "/For-sale"}`,
      label: state.cg === "R" ? "For Rent" : "For Sale",
    };

    oldParams[2] = {
      href: `${BASE_PATH_PROJECT_DETAILS}/${finalCityName}`,
      label: finalCityName,
    };
  
    let localityName = state.localities.length > 0 ? state.localities[0] : "";
    oldParams[3] = {
      href: localityName !== "" ? `${BASE_PATH_PROJECT_DETAILS}/${finalCityName}/${localityName}` : "", 
      label: localityName.split("+")[0],
    };

    oldParams[4] = {
      href: state.projName !== "" ? `${BASE_PATH_PROJECT_DETAILS}/${finalCityName}/${localityName}/${state.projName}` : "", 
      label: state.projName !== "" ? state.projName : "",
    };
    setAllParams(oldParams);
  }, [listedBy, state]);


  if (!allParams || allParams.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Project Search Breadcrumbs"
      className="w-full px-[8px] sm:px-[10px] lg:px-[14px] py-[6px] md:py-[10px] xl:py-4 bg-gray-100 rounded-md shadow-sm max-w-[100%] overflow-x-auto "
    >
      <ol className="flex items-center space-x-1 md:space-x-3  text-sm text-gray-600 pr-[10px] ">
        <li>
          <a 
            href="/"
            className="flex items-center text-gray-600 hover:text-blue-600 transition-all duration-200"
          >
            <FaHome className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </a>
        </li>
        {allParams.map((item:any, index:number) => {
          if(item.label !== ""){
          return(
          <li key={item.href} className="flex items-center">
            <FaChevronRight
              className="h-4 w-4 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {index !== allParams.length -1 ?
            <a
              href={item.href}
              target="_blank"
               rel="noopener noreferrer"
              className={`ml-2 text-sm font-semibold text-gray-500 hover:text-blue-500 transition-all duration-200 text-nowrap first-letter:capitalize `}
              aria-current={index === allParams.length - 1 ? "page" : undefined}
            >
              {item.label}
            </a>
            :
            <span className={`ml-2 text-sm font-semibold text-gray-800 hover:text-blue-600 transition-all duration-200 text-nowrap`}>{item.label}</span>}
          </li>
        )}})}
      </ol>
    </nav>
  );
};

export default ProjectSearchBreadCrumbs;