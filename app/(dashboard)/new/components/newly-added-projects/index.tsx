"use client";
import React from "react";
import CardCarousel from "./CardCarousel";
import { useAtomValue } from "jotai";
import MainHeading from "../heading";
import { homeSearchFiltersAtom } from "@/app/store/home";
import { useQuery } from "react-query";
import RTK_CONFIG from "@/app/config/rtk";
import { getHomePageProjectData } from "@/app/(new_routes_seo)/utils/new-seo-routes/home.api";

type Props = {
  data: any;
  shortIds: any;
  cityId?: string;
};

export default function NewAddedProjects({ data, shortIds, cityId }: Props) {
  const globalState = useAtomValue(homeSearchFiltersAtom);
  const isEnabled =
    !!globalState.city && globalState.city?.split("+")[1] != cityId;
  const { data: newlyAddedProjects, isLoading } = useQuery({
    queryKey: ["home-page-projects-data" + globalState.city?.split("+")[1]],
    queryFn: () =>
      getHomePageProjectData(globalState.city?.split("+")[1] ?? ""),
    enabled: isEnabled,
    ...RTK_CONFIG,
  });
  return isLoading ? (
    <div> Loading...</div>
  ) : (
    (isEnabled
      ? newlyAddedProjects?.status && newlyAddedProjects["New Launch"]?.length
      : data?.length) > 0 && (
      <div className="mt-[40px] sm:mt-[60px] w-[95%] m-auto">
        <MainHeading
          title="Featured Projects"
          content="Premier Real Estate Projects Awaiting You"
          url="/search"
        />

        <CardCarousel
          data={isEnabled ? newlyAddedProjects["New Launch"] : data}
          shortIds={shortIds}
        />
      </div>
    )
  );
}
