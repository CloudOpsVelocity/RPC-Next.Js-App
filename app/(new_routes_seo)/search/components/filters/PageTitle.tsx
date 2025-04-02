"use client";

import { useAtom, useAtomValue } from "jotai";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import { projSearchStore } from "../../store/projSearchStore";

type Props = {};

function PageTitle({}: Props) {
  const state = useAtomValue(projSearchStore);

  const paramsData = useParams();
  const path = usePathname();

  function cleanHeading(id: string[]) {
    return id
      .join(" ")
      .replace(/\b\d*(B|C|G|L|P|CG|SCG|RCG|PJ)\b/g, "")
      .replace(/\s+/g, " ");
  }

  const getTitle = (pageUrl: string) => {
    if (paramsData && Object.keys(paramsData).length > 0) {
      if (paramsData.slug) {
        const id = paramsData.slug?.split("-");
        return cleanHeading(id);
      } else {
        const pageTitle = `Search Results For ${
          paramsData.bhk_unit_type ? paramsData.bhk_unit_type : ""
        } ${paramsData.lt ? paramsData.lt + " for" : ""} ${
          state.cg !== "S" ? "Rent" : "Sale"
        } in ${paramsData.project ? paramsData.project : ""} ${
          paramsData.city ? paramsData.city : paramsData.city
        }`;
        return pageTitle.replaceAll("-", " ");
      }
    } else if (pageUrl === "/search") {
      return "Project Search";
    } else if (pageUrl === "/search/listing") {
      return "Listing Search";
    }
  };

  return (
    <h1 className="font-bold text-[16px] md:text-[18px] xl:text-[20px] mb-[6px] ml-[8px] capitalize ">
      {getTitle(path)}
    </h1>
  );
}

export default PageTitle;
