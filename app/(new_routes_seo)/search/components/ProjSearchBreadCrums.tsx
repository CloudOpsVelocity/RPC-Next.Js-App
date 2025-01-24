"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { FaHome, FaChevronRight } from "react-icons/fa";
import { BASE_PATH_PROJECT_DETAILS } from "../../utils/new-seo-routes/project.route";

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
  const pathname = usePathname();
  const getParams = useSearchParams();
  let listedBy = getParams.get("sf");
  let allParams:any = [
    {
      href: "/",
      label: "Home",
    },{
      href: "/",
      label: "For Buy",
    },{
      href: `${BASE_PATH_PROJECT_DETAILS}${"/bengaluru"}`,
      label: "Bengaluru",
    }
  ];

  const cropText = (text:string, word: string) => {
    const result = text.split(word)[0] + word;
    return result;
  }

  function textFormat(text:string) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  if(listedBy){ // -- query params not equel to null --
    listedBy?.split("-").forEach((each:any)=>{
      let key = each.split("=")[0];
      let value = each.split("=")[1];
      // console.log(key, value)
  
      if(key === "cg"){
        allParams[1] = {
          href: `${BASE_PATH_PROJECT_DETAILS}${value === "R" ? "/for-rent" : "/For-sale"}`,
          label: value === "R" ? "For Rent" : "For Sale",
        };
      }
  
      if(key === "localities"){
        allParams.push({
          href: `${BASE_PATH_PROJECT_DETAILS}${"/bengaluru/" + value.includes("+") ? value.split("+")[0] : value}`,
          label: value.includes("+") ? value.split("+")[0] : value,
        });
      }
    });
  }else{ // for Path params
    // console.log(pathname)
    let path = pathname.split("/"); // index start from 4 (locality)
    let isProjectSearch = path[1] === "residential-projects"
    
    // cropText(pathname, path[2]);
    allParams[1] = { // category
      href: isProjectSearch ? cropText(pathname, path[2]) : "",
      label: isProjectSearch ? textFormat(path[2]) : "",
    };

    if(path[4] !== undefined){ // locality
      allParams[3] = { 
        href: cropText(pathname, path[4]),
        label: textFormat(path[4]),
      };
    }

    if(path[5] !== undefined){ // project name
      allParams[4] = { 
        href: cropText(pathname, path[5]),
        label: textFormat(path[5]),
      };
    }

    if(path[6] !== undefined){ // property name
      allParams[5] = { 
        href: cropText(pathname, path[6]),
        label: textFormat(path[6]),
      };
    }
  }

  if (!allParams || allParams.length === 0) {
    return null; // Return null if no breadcrumb items exist
  }

  return (
    <nav
      aria-label="Project Search Breadcrumbs"
      className="w-full px-[8px] sm:px-[10px] lg:px-[14px] py-4 bg-gray-100 rounded-md shadow-sm max-w-[100%] overflow-x-auto "
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
              className={`ml-2 text-sm font-semibold text-gray-500 hover:text-blue-500 transition-all duration-200 text-nowrap `}
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
