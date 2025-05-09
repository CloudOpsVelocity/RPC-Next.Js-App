/* eslint-disable no-unused-vars */
import React, { Suspense } from "react";
import clsx from "clsx";
import { useMediaQuery } from "@mantine/hooks";
import { CustomLoading } from "@/app/images/commonSvgs";
import { areasMap } from "@/app/components/project/map/data";

const SearchCardCustomScrollArea: React.FC<{
  selected: string;
  setSelected: (key: string) => void;
  data: any;
}> = ({ selected, setSelected, data }) => {
  const isMobile = useMediaQuery("(max-width: 601px)");

  // Calculate the number of visible items per line and total lines
  const items = Object.keys(data).filter((key) => !!data[key as string]);

  return (
    <div className={`flex flex-col xl:px-2 relative w-full`}>
      <div className="flex flex-wrap gap-2 overflow-hidden relative">
        {items.map((key) => {
          const Icon = areasMap.get(key).Icon;
          const name = areasMap.get(key).name;
          return (
            <div
              key={key}
              onClick={() => setSelected(key ?? "")}
              className={clsx(
                "flex items-center gap-1.5 px-2 py-1 text-[12px] xl:text-[14px] cursor-pointer",
                "text-[#0073C6] font-medium rounded border border-solid border-[#0073C6]",
                selected === key && "!text-white font-semibold bg-[#0073C6]"
              )}
            >
              <Suspense fallback={<CustomLoading stroke="#0073C6" className="w-5 h-5" />}>
                {Icon && (
                  <Icon
                    stroke={clsx(selected === key ? "#FFF" : "#0073C6")}
                    className={isMobile ? "w-4 h-4" : "w-5 h-5"}
                  />
                )}
              </Suspense>
              {name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchCardCustomScrollArea;
