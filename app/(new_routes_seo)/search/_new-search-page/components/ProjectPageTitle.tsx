"use client";

import { useAtomValue } from "jotai";
import { useParams, usePathname } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

import Link from "next/link";

type Props = {
  serverFilterData?: Record<string, any>;
};

function ProjectPageTitle({ serverFilterData }: Props) {
  const paramsData = useParams();
  const path = usePathname();

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
    }

    const pageTitle = `Residential Projects For Sale in ${
      paramsData.lt ?? ""
    } ${paramsData.city ?? "Bengaluru"} `;
    const lt = paramsData.lt ?? "";
    const city = paramsData.city ?? "bengaluru";

    const formattedLt = lt;
    const formattedCity = city;
    return (
      <>
        <Link
          href="https://www.getrightproperty.com/residential"
          rel="noopener noreferrer"
        >
          Residential
        </Link>{" "}
        <Link
          href="https://www.getrightproperty.com/residential/projects"
          rel="noopener noreferrer"
        >
          Projects
        </Link>{" "}
        in{" "}
        {lt && (
          <>
            <Link
              href={`https://www.getrightproperty.com/residential/projects/${city}/${lt}`}
              rel="noopener noreferrer"
            >
              {formattedLt}
            </Link>{" "}
          </>
        )}
        <Link
          href={`https://www.getrightproperty.com/residential/projects/${city}`}
          rel="noopener noreferrer"
        >
          {formattedCity}
        </Link>{" "}
      </>
    );
  };

  const [hideHeading, setHideHeading] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setHideHeading(true);
    };

    window.addEventListener("click", handlePopState);
    return () => window.removeEventListener("click", handlePopState);
  }, []);

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
    </div>
  );
}

export default ProjectPageTitle;
