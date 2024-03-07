"use client";

import React from "react";
import { Tabs } from "@mantine/core";
import useSearchFilters from "@/app/hooks/search";
import RequestCallBackModal from "@/app/components/molecules/popups/req";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import LoginPopup from "@/app/components/project/modals/LoginPop";

const LeftSideBlock = () => {
  const [opned, { close }] = useReqCallPopup();
  const {
    searchProps: { isLoading, data, hasNextPage, fetchMoreData },
    handleAppliedFilters,
    filters,
    params,
    setFilters,
  } = useSearchFilters("project");

  const onTabChange = (listedBy: "A" | "I" | "proj"): void => {
    if (!listedBy) {
      console.error(`Invalid value passed to onTabChange: ${listedBy}`);
      return;
    }
    const updatedFilters =
      listedBy === "proj"
        ? { ...filters, listedBy: null }
        : {
            ...filters,
            ...Object.fromEntries(
              (diffToProjFromListing[listedBy] ?? []).map((key: string) => [
                key,
                // @ts-ignore
                (initialState[key] ?? null) as any,
              ])
            ),
            listedBy,
          };
    setFilters(updatedFilters);
    handleAppliedFilters();
  };

  return (
    <div className="md:w-[50%] sm:w-[100%]  md:bg-white  min-w-[400px] md:min-w-[500px]">
      <Tabs
        value={params.listedBy ?? "proj"}
        onChange={(value) => onTabChange((value as "proj") || "proj")}
        defaultValue="proj"
      >
        <TabList />
        <TabPanelSection />
      </Tabs>
      <RequestCallBackModal close={close} opened={opned} builderId={1112} />
      <LoginPopup />
    </div>
  );
};

export { LeftSideBlock };
import { diffToProjFromListing, initialState } from "@/app/store/search";
import TabList from "./TabList";
import TabPanelSection from "./TabPanelSection";
