"use client";

import useQsearch from "@/app/hooks/search/useQsearch";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import classes from "@/app/styles/search.module.css";
import Results from "./Result";
import { useAtom } from "jotai";
import { homeSearchFiltersAtom } from "@/app/store/home";
import { useMediaQuery } from "@mantine/hooks";
import { toQueryParams } from "../../utils/param";
import { SEARCH_FILTER_DATA } from "@/app/data/search";
import { Pill } from "@mantine/core";
import { extractApiValues } from "@/app/utils/dyanamic/projects";

type Props = {};
export default function SearchSec({}: Props) {
  const [f, dispatch] = useAtom(homeSearchFiltersAtom);
  const { onSearchChange, name, data } = useQsearch();
  const isTab = useMediaQuery("(max-width: 1600px)");
  const [showAllLocalities, setShowAllLocalities] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchError, setSearchError] = useState("");

  // Create a ref for the search container
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 601px)");

  const allBhksIds = SEARCH_FILTER_DATA.bhkDetails.map((each) =>
    each.value.toString()
  );

  // Handle outside clicks
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFieldClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAllLocalities(false);
    setDropdownOpen(true);
    dispatch({ type: "SHOW_FILTER", payload: true });
  };

  const URLCreater = (ids: any) => {
    let redirectionURL = "";

    // Handling CG (if exists)
    if (ids.CG) {
      redirectionURL += `cg=${ids.CG}`;
    }

    // Handling PT (if exists)
    if (ids.PT) {
      redirectionURL += redirectionURL
        ? `-propType=${parseInt(ids.PT as string)}`
        : `propType=${parseInt(ids.PT as string)}`;
    }
    if (ids.BH) {
      redirectionURL += redirectionURL
        ? `-bhk=${parseInt(ids.BH as string)}`
        : `bhk=${parseInt(ids.BH as string)}`;
    }

    if (ids.PJ) {
      redirectionURL += redirectionURL
        ? `-projIdEnc=${ids.PJ as string}-projName=${
            searchQuery as string
          }-listedBy=All`
        : `projIdEnc=${ids.PJ as string}-projName=${
            searchQuery as string
          }-listedBy=All`;
    }
    return redirectionURL;
  };

  const handleKeyDown = async (event: React.KeyboardEvent) => {
    if (!(/[^a-zA-Z0-9\s]/.test(name as string ))) {
      if (event.key === "Enter") {

        event.preventDefault();
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/matcher/string?word=${searchQuery}&cityId=${9}`
        );
        const data = await res.json();
        if (data && data.ids) {
          const bhk = data.ids.split("*")[0];
          let ids = extractApiValues(data.ids);
          let URLReNew = URLCreater(ids);
          //alert(JSON.stringify(ids));
          if (URLReNew != "") {
            const toRedirect= f.propType === 36 ? `/search/listing?sf=${URLReNew}` : `/search?sf=${URLReNew}`
            //alert(toRedirect)
            window.open(toRedirect, "_blank", "noreferrer")
          }
          
        } else {
          const whichPage = f.propType === 36 ? "/search/listing" : "/search"
          window.open(whichPage, "_blank", "noreferrer")
        }
      }
    };
    }
   

/*   const handleSearch = (projIdEnc?: string) => {
    const whichPage = f.propType === 36 ? "/search/listing" : "/search";

    if (projIdEnc) {
      const url = `projIdEnc=${projIdEnc}-listedBy=${"All"}-projName=${searchQuery.replaceAll(
        " ",
        "+"
      )}`;
      console.log(`${whichPage}?sf=${url}`);
      window.open(`${whichPage}?sf=${url}`, "_blank", "noreferrer");
    } else {
      console.log(`${whichPage}?sf=${toQueryParams(f)}`);
      window.open(
        `${whichPage}?sf=${toQueryParams(f)}`,
        "_blank",
        "noreferrer"
      );
    }
  }; */

  const handleSearchChange = (e: any) => {
    const value = e.target.value;
    if (/[^a-zA-Z0-9\s]/.test(value)) {
      setSearchError("Special characters are not allowed.");
      onSearchChange(value);
    } else {
      setSearchError("");
      onSearchChange(value);
    }
    setSearchQuery(value);
  };

//console.log(name,  dropdownOpen ,searchError )
  return (
    <div className="realtive w-[100%] " ref={searchContainerRef}>
      <div
        onClick={() => setShowAllLocalities(!showAllLocalities)}
        className="w-[100%] sm:min-w-[49.9%] p-2 gap-2 xl:gap-[8px] pl-2 xl:pl-[8px] max-w-full flex items-center justify-start flex-wrap"
      >
        <div className="flex flex-wrap gap-2 items-center h-auto">
          {f.locality?.map(
            (each, index) =>
              (showAllLocalities || index < (isTab ? 1 : 2)) && (
                <Pill
                  className="capitalize !text-[12px] !sm:text-[14px]"
                  onRemove={() =>
                    dispatch({ type: "REMOVE_LOCALITY", payload: each })
                  }
                  key={each}
                  withRemoveButton
                  classNames={{ root: classes.MultiSelectionPill }}
                >
                  {each.split("+")[0]}
                </Pill>
              )
          )}
          {f.locality?.length > (isTab ? 1 : 2) &&
            !showAllLocalities &&
            f.locality?.length > (isTab ? 1 : 2) && (
              <Pill
                className="capitalize cursor-pointer"
                classNames={{ root: classes.MultiSelectionPill }}
                onClick={() => setShowAllLocalities(true)}
              >
                {`+${f.locality?.length - (isTab ? 1 : 2)} More`}
              </Pill>
            )}
        </div>
        <input
          placeholder={
            f.locality.length > 0
              ? "Add More"
              : "Search By Locality, Project, Listing"
          }
          onClick={handleFieldClick}
          value={name ?? ""}
          onChange={(e) => {
            handleSearchChange(e)
          }}
          maxLength={50}
           pattern="[a-zA-Z0-9\s]+"
           title="Only letters, numbers, and spaces are allowed."
          onKeyDown={handleKeyDown}
          /* min-w-[234px]   sm:min-w-[255px] we change input width for full text visible in search main  */
          className=" min-w-[100%] text-[12px] sm:text-[14px] outline-none pr-2 py-1 focus:text-[16px] sm:focus:text-[14px] placeholder:text-gray-600 ios-zoom-fix"
        />
      </div>

      {
  ((name && dropdownOpen) || searchError !== '') && (
    <div
      className={`${
        isMobile
          ? 'min-w-[92%] max-w-[92%] w-full '
          : 'max-w-[calc(100% - 70%)]'
      } sm:max-w-[100%] !left-[4%] sm:!min-w-[410px] sm:!left-[32.5%] xl:!left-[44.5%] mt-2 bg-white shadow-xl absolute z-10 max-h-[400px] overflow-y-auto`}
    >
      <div className="flex items-center justify-between p-2 border-b">
        {searchError !== '' ? (
          <div className="p-3">{searchError}</div>
        ) : (
          <Results />
        )}
      </div>
    </div>
  )
}   </div>
  );
}
