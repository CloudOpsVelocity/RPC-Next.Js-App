"use client";
import { emptyFilesIcon, strikeIconIcon } from "@/app/images/commonSvgs";

import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import ProjectCard from "@/app/test/newui/components/Card";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useInfiniteQuery, useQuery } from "react-query";
import RTK_CONFIG from "@/app/config/rtk";
import { getSearchData } from "../utils/project-search-queryhelpers";
import { useQueryState } from "nuqs";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { projSearchStore, searchPageMapToggle } from "../store/projSearchStore";
import RequestCallBackModal from "@/app/components/molecules/popups/req";
import LoginPopup from "@/app/components/project/modals/LoginPop";
import { getAllAuthorityNames } from "@/app/utils/api/project";
import { usePathname } from "next/navigation";
import FloatingArrowIcon from "./ProjectSearchTabs/FloatingArrowIcon";
import selectedSearchAtom, { selectedNearByAtom } from "@/app/store/search/map";
import { useMediaQuery } from "@mantine/hooks";
import { overlayAtom } from "@/app/test/newui/store/overlay";
import ServerDataSection from "./ServerDataSection";
type Props = {
  mutate?: ({ index, type }: { type: string; index: number }) => void;
  serverData?: any;
  frontendFilters?: any;
  isTrue: boolean;
  setIsTrue: any;
};

function LeftSection({
  mutate,
  serverData,
  frontendFilters,
  isTrue: it,
  setIsTrue,
}: Props) {
  const isMobile = useMediaQuery("(max-width: 601px)");
  const [page, setPage] = useState(0);
  const [shouldFetchMore, setShouldFetchMore] = useState(true);
  const pathname = usePathname();
  const state = useAtomValue(projSearchStore);
  const [apiFilterQueryParams] = useQueryState("sf");
  const [{ allMarkerRefs }, setNearby] = useAtom(selectedNearByAtom);

  const isTrue =
    it || pathname.includes("search") ? true : apiFilterQueryParams !== null;
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery({
      queryKey: [
        `searchQuery${apiFilterQueryParams ? `-${apiFilterQueryParams}` : ""}`,
      ],
      queryFn: async ({ pageParam = 0 }) => {
        const response = await getSearchData(
          pageParam,
          apiFilterQueryParams ?? ""
        );
        return response;
      },

      getNextPageParam: (lastPage: any, allPages: any) => {
        return lastPage?.length === 20 ? allPages.length : undefined;
      },
      ...(serverData && {
        initialData: {
          pages: [serverData],
          pageParams: [0],
        },
      }),
      cacheTime: 300000,
      enabled: isTrue,
      staleTime: 0,
      refetchOnWindowFocus: false,
    });

  const { data: approvedData } = useQuery({
    queryKey: ["projAuth"],
    enabled: true,
    queryFn: () => getAllAuthorityNames(),
    ...RTK_CONFIG,
  });

  const allItems =
    (data?.pages?.length || 0) > 0
      ? data?.pages.flat()
      : serverData || data?.pages?.flat() || [];

  // const rowVirtualizer = useVirtualizer({
  //   count: allItems?.length || 0,
  //   getScrollElement: () => containerRef.current,
  //   estimateSize: () => 300,
  //   overscan: 5,
  //   enabled: true,
  //   measureElement: (element) => {
  //     return element?.getBoundingClientRect().height || 300;
  //   },
  // });

  const setSelected = useSetAtom(selectedSearchAtom);
  const [, dispatch] = useAtom(overlayAtom);
  const setIsMapLoaded = useSetAtom(searchPageMapToggle);

  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      setIsMapLoaded(true);
      if (allMarkerRefs) {
        const keys = [...allMarkerRefs.current.keys()];
        if (keys.length > 0) {
          keys.forEach((refKey: string) => {
            const marker = allMarkerRefs.current.get(refKey);
            if (marker) marker.closePopup();
          });
        }
      }

      setSelected(null);
      setNearby((prev: any) => ({
        ...prev,
        category: "",
        data: {},
        selectedNearbyItem: {},
        id: "",
        isOpen: false,
      }));
      dispatch({ type: "CLOSE" });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, allItems]);

  // Enhanced infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (
          target.isIntersecting &&
          hasNextPage &&
          shouldFetchMore &&
          !isLoading
        ) {
          setIsTrue(true);
          fetchNextPage();
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, shouldFetchMore, isLoading, fetchNextPage]);

  // const renderProjectCard = useCallback(
  //   (virtualRow: any) => {
  //     const eachOne: any = allItems[virtualRow.index];

  //     return (
  //       <div
  //         key={virtualRow.key}
  //         data-index={virtualRow.index}
  //         ref={rowVirtualizer.measureElement}
  //         style={{
  //           position: "absolute",
  //           top: 0,
  //           left: 0,
  //           width: "100%",
  //           transform: `translateY(${virtualRow.start ?? 0}px)`,
  //         }}
  //       >
  //         <ProjectCard
  //           key={eachOne.projIdEnc + eachOne.propType}
  //           refetch={refetch}
  //           data={{ ...eachOne, type: state.listedBy ?? "proj" }}
  //           index={virtualRow.index}
  //           mutate={mutate}
  //         />
  //       </div>
  //     );
  //   },
  //   [allItems, mutate, refetch, rowVirtualizer.measureElement, state.listedBy]
  // );

  const EmptyState = memo(function EmptyState() {
    return (
      <div className="flex w-full h-full justify-center items-center flex-col">
        {emptyFilesIcon}
        No Matching Results Found!
        <span className="relative left-[10%]">{strikeIconIcon}</span>
      </div>
    );
  });

  const LoadingBlock = () => (
    <div className="flex items-center justify-center h-full w-full pt-[15%]">
      <div className="text-center flex items-center justify-center flex-col ">
        <div className="w-[20px] h-[20px] md:w-[26px] md:h-[26px] xl:w-[30px] xl:h-[30px] border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
        <h2 className="text-[16px] md:text-[18px] xl:text-[20px] font-semibold text-gray-700 mt-[14px] ">
          Loading...
        </h2>
      </div>
    </div>
  );

  return (
    <div
      className={`flex flex-col w-full md:max-w-[40%] xl:max-w-[50%] relative overflow-auto`}
      // ref={containerRef}
    >
      <>
        {isLoading || !allItems ? (
          <LoadingBlock />
        ) : allItems?.length > 0 ? (
          <ServerDataSection
            data={allItems}
            refetch={refetch}
            mutate={mutate}
            state={state}
          />
        ) : (
          // <ServerDataSection
          //   data={allItems}
          //   refetch={refetch}
          //   mutate={mutate}
          //   state={state}
          // />
          // allItems.map((eachOne: any, index: number) => {
          //   return (
          //     <ProjectCard
          //       key={eachOne.projIdEnc + eachOne.propType}
          //       refetch={refetch}
          //       data={{ ...eachOne, type: state.listedBy ?? "proj" }}
          //       index={index}
          //       mutate={mutate}
          //     />
          //   );
          // })
          // <div
          //   style={{
          //     height: `${rowVirtualizer.getTotalSize()}px`,
          //     width: "100%",
          //     position: "relative",
          //   }}
          // >
          //   {rowVirtualizer.getVirtualItems().map(renderProjectCard)}
          // </div>
          <EmptyState />
        )}

        {hasNextPage && shouldFetchMore && (
          <div
            ref={loadMoreRef}
            className="text-center font-bold text-3xl py-3"
          >
            Loading...
          </div>
        )}
        <LoginPopup />
        <RequestCallBackModal />
      </>

      <FloatingArrowIcon />
    </div>
  );
}
export default memo(LeftSection);
