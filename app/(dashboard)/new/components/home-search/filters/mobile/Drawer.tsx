import { Drawer, Pill } from "@mantine/core";
import React from "react";
import Styles from "./S.module.css";
import Box from "../../recentSearch/Box";
import QuickFilters from "../QuickFilters";
import Nearme from "../../Nearme";
import Tabs from "../../tabs";
import { SearchIcon, SmallHomeIcon } from "@/app/images/HomePageIcons";
import SearchSec from "../../SearchSec";
import useSearchFilters from "@/app/hooks/search";
import classes from "@/app/styles/search.module.css";
type Props = {
  opened: boolean;
  close: () => void;
};

function AppDrawer({ close, opened }: Props) {
  const { filters: f, remnoveSearchOptions, setFilters } = useSearchFilters();
  return (
    <Drawer
      opened={opened}
      onClose={close}
      classNames={{
        content: Styles.content,
        overlay: Styles.overlay,
      }}
      withCloseButton={false}
    >
      <button
        className="text-[#565D70] text-sm not-italic font-medium"
        onClick={close}
      >
        Back
        {config.icon}
      </button>
      <div className="w-full mt-16">
        <div className="flex flex-col items-start sm:gap-3 self-stretch pl-[11px] pr-2.5 pt-0 pb-[13px] rounded-lg border-[0.5px] border-solid border-[#A6BDDF] bg-[#f2f7ff] sm:h-[200px] w-full">
          <Tabs />
          <p className="inline-flex sm:hidden justify-center items-center text-[#242424] text-[12px] not-italic font-medium gap-1">
            <SmallHomeIcon /> All Residential
          </p>
          <div className="flex items-center sm:gap-2.5 rounded shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] px-1.5 py-1 border-[0.5px] border-solid border-[#819CA9] bg-white w-full sm:w-auto">
            <div className="hidden sm:flex items-center gap-[5px] rounded p-2 border-r-[0.5px] border-r-gray-400 border-solid text-[#242424] sm:text-lg not-italic font-medium text-[12px]">
              <SmallHomeIcon />{" "}
              <div className="text-nowrap">All Residential</div>
            </div>
            <div></div>
            <div>
              <div className="flex justify-between items-center sm:gap-[191px] w-full">
                <div className="flex sm:hidden items-center ">
                  {/* <button className="ml-2">
                  <span className="text-[#242424] text-xs not-italic font-normal">
                    Search
                  </span>
                  <span className="text-[#242424] text-xs italic font-medium">
                    “ Whitefield, Bangalore”
                  </span>
                </button> */}
                  <SearchSec />
                </div>
                <div className="flex gap-2">
                  <Nearme />
                  <a
                    href={`/search`}
                    target="_blank"
                    className={`inline-flex justify-center items-center gap-2.5 rounded p-1.5 md:p-2.5  text-white  text-[12px]  2xl:text-xl font-bold bg-[#0073c6]`}
                  >
                    Search
                  </a>
                </div>
              </div>
              {(f.city || f.locality.length > 0) && (
                <div className="border-gray-400 border-t-[0.5px] border-t pt-1">
                  {" "}
                  <Pill.Group>
                    {f.city && (
                      <Pill
                        className="capitalize"
                        withRemoveButton
                        classNames={{
                          root: classes.MultiSelectionPill,
                          label: classes.MultiSelectionPillLabel,
                          remove: classes.MultiSelectionPillRemove,
                        }}
                        onRemove={() =>
                          setFilters((prev) => ({ ...prev, city: null }))
                        }
                      >
                        manglore
                        {f.city.split("+")[0]}
                      </Pill>
                    )}
                    {f.locality?.map((each, index) => (
                      <Pill
                        className="capitalize"
                        onRemove={() => remnoveSearchOptions(each, "locality")}
                        key={index}
                        withRemoveButton
                        classNames={{
                          root: classes.MultiSelectionPill,
                          label: classes.MultiSelectionPillLabel,
                          remove: classes.MultiSelectionPillRemove,
                        }}
                      >
                        {each.split("+")[0]}
                      </Pill>
                    ))}
                  </Pill.Group>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-[#242424] text-[14px] sm:text-xl not-italic font-medium leading-[normal] ">
            Browse:
          </p>
          <div className="space-x-2 mt-1 flex sm:block overflow-x-scroll max-w-[100%] scrollbar-hide pb-2 border-b-[0.5px] border-solid border-[#819CA9]">
            <Box />
            <Box />
            <Box />
            <Box />
          </div>
        </div>
        <QuickFilters />
      </div>
      {/* Drawer content */}
    </Drawer>
  );
  console.log("🚀 ~ AppDrawer ~ f:", f);
}

export default AppDrawer;

const config = {
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="6"
      viewBox="0 0 36 6"
      fill="none"
    >
      <path
        d="M0 3L5 5.88675V0.113249L0 3ZM4.5 3.5H36V2.5H4.5V3.5Z"
        fill="#565D70"
      />
    </svg>
  ),
};
