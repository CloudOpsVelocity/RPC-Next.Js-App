"use client";
import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import {
//   Drawer,
//   MultiSelect,
//   Pill,
//   PillsInput,
//   Popover,
//   ScrollArea,
//   Select,
//   em,
// } from "@mantine/core";
// import { FilterPopup } from "./filterPopup";
// import classes from "@/app/styles/search.module.css";
// import { useQueryState } from "nuqs";
// import BhkFilter from "./bhk";
// import PropTypeFilter from "./proptype";
// import BugdetFilter from "./buget";
// import useSearchFilters from "@/app/hooks/search";
// import S from "@/app/styles/seach/Drawer.module.css";
// import SearchDrawerHeader from "./filter";
// import MobileFilterDrawer from "./drawer";
// import BuyRent from "../../components/filter/BuyRent";
// import { DynamicText } from "../../utils/text";
// import useQsearch from "@/app/hooks/search/useQsearch";
// import { SearchIcon } from "@/app/images/HomePageIcons";
// import { toFormattedString } from "../../components/buget/budget";
// import { projectprops, propertyDetailsTypes } from "@/app/data/projectDetails";
// import { SEARCH_FILTER_DATA } from "@/app/data/search";
import { useDisclosure } from "@mantine/hooks";
import { initialState, searachFilterAtom } from "@/app/store/search";
import { useHydrateAtoms } from "jotai/utils";
import SearchHeader from "./SearchHeader";
/* import { getCommonData } from "@/app/utils/api/property"; */

const SearchAndFilterCon = ({ frontendFilters }: any) => {
  useHydrateAtoms([
    [searachFilterAtom, { ...initialState, ...frontendFilters }],
  ]);
  const [opened, { open, close }] = useDisclosure(false);
  const [showAllLocalities, setShowAllLocalities] = useState(false);

  // useEffect(() => {
  //     if (opened) {
  //       // Push a new state to the history stack when the modal is opened
  //       window.history.pushState("shearlModal", "");
  
  //       const handlePopState = () => {
  //         document.body.style.overflow = "scroll"; 
  //         close();
  //       };
  
  //       window.addEventListener("popstate", handlePopState);
  //       return () => window.removeEventListener("popstate", handlePopState);
  //     }
  //   }, [opened]);

  return (
    <SearchHeader
      showAllLocalities={showAllLocalities}
      setShowAllLocalities={setShowAllLocalities}
      open={open}
      close={close}
    />
  );
};

export default SearchAndFilterCon;
