"use client";
import React from "react";
import MainHeading from "../heading";
import SideTabs from "./Sidetabs";
import CardCarousel from "./Card/CardCarousel";
import { useAtomValue } from "jotai";
import { useQuery } from "react-query";
import { homeSearchFiltersAtom } from "@/app/store/home";
import { getHomePageProjectData } from "@/app/(new_routes_seo)/utils/new-seo-routes/home.api";
import RTK_CONFIG from "@/app/config/rtk";

type Props = { data: any; shortIds: any; cityId?: string };

export default function HandPickedProjects({ data, shortIds, cityId }: Props) {
  const [active, setActive] = React.useState(0);
  const url =
    active == 0
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/search?sf=projStatus=108`
      : active == 1
      ? ` ${process.env.NEXT_PUBLIC_BACKEND_URL}/search?sf=projStatus=106`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/search?sf=projStatus=107`;

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
    (isEnabled ? newlyAddedProjects?.status : data?.status > 0) && (
      <div className="w-full mt-[40px] pt-1 sm:pt-0 sm:mt-[80px] min-h-[530px] sm:min-h-[582px] flex justify-center items-center shrink-0 bg-gradient-to-r from-[#DAE6F1] via-[#DAE6F1] to-[#A7D0F5]">
        <div className=" w-[97%]">
          <div className="flex flex-row justify-between  items-center ">
            <MainHeading
              title="Handpicked Projects"
              content="Discover Your Dream Home with Handpicked Projects – Where Quality Meets Elegance"
              url={url}
            />
            <a
              className="hidden  xl:block text-[#0073C6] text-nowrap  text-[14px] sm:text-[18px] xl:text-[20px] not-italic font-bold leading-[normal]"
              href={url}
              target="_blank"
            >
              View all
            </a>
          </div>

          <div className=" w-full flex flex-col xl:flex-row justify-start items-start mt-2 xl:mt-10 flex-nowrap sm:gap-6 ">
            <div className=" w-full flex flex-row justify-between  items-end  xl:hidden ">
              <SideTabs className="" active={active} setActive={setActive} />
              <a
                className="  text-[#0073C6] text-nowrap  text-[14px] sm:text-[18px] xl:text-[20px] not-italic font-bold leading-[normal]"
                href={url}
                target="_blank"
              >
                View all
              </a>
            </div>
            <SideTabs
              className={"hidden xl:block"}
              active={active}
              setActive={setActive}
            />

            <div className=" max-w-[600px] sm:max-w-full xl:max-w-[1590px] mt-[16px] sm:mt-0 ">
              <CardCarousel
                data={data?.[config[active]]}
                active={active}
                shortIds={shortIds}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

const config = ["New Launch", "On Going", "Completed"];
