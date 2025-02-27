import { useAtom } from "jotai";
import React from "react";
import { MdClose } from "react-icons/md";
import { projSearchStore } from "../../store/projSearchStore";
import { SEARCH_FILTER_DATA, SelectedFiltersMap } from "@/app/data/search";
import useProjSearchAppliedFilters from "../../hooks/useProjSearchAppliedFilters";

type Props = {};

export default function SelectedFilters({}: Props) {
  const [state, dispatch] = useAtom(projSearchStore);
  const { handleApplyFilters } = useProjSearchAppliedFilters();
  console.log(state)
  return (
    Object.entries(state).some(
      ([_, value]) =>
        (Array.isArray(value) && value.length > 0) || value !== null
    ) && (
      <div className="border-t overflow-x-auto min-w-full max-w-full md:min-w-[60%] md:max-w-[60%] xl:min-w-[50%] xl:max-w-[50%] flex items-center ">
        <div className="flex gap-2 px-[10px] w-full pt-[4px] xl:pt-[8px] ">
          {Object.entries(state).map(
            ([category, values]) =>
              values !== null &&
              values !== undefined &&
              category !== "bugdetValue" &&
              category !== "areaValue" &&
              category !== "sortByfield" &&
              category !== "sortType" &&
              category !== "cg" &&
              category !== "city" &&
              category !== "projIdEnc" &&
              category !== "lat" &&
              category !== "lng" &&
              (Array.isArray(values) ? (
                values.map((value) => (
                  <div
                    key={`${category}-${value}`}
                    className="flex items-center text-nowrap gap-2 mb-[6px] mt-[6px] bg-[#0073C6]/10 text-[#0073C6] px-3 py-1 rounded-full text-sm capitalize"
                  >
                    <span>
                      {category === "localities" ||
                      category === "builderIds" ||
                      category === "phaseId"
                        ? `${value.split("+")[0]}${
                            values.length - 1 === values.indexOf(value)
                              ? ""
                              : ""
                          }`
                        : category === "parking" || category === "bathroom"
                        ? `${value} ${category}`
                        : SelectedFiltersMap.get(value)}
                    </span>
                    <button
                      onClick={() => {
                        dispatch({
                          type: "update",
                          payload: {
                            [category]: Array.isArray(
                              state[category as keyof typeof state]
                            )
                              ? (
                                  state[category as keyof typeof state] as any[]
                                ).filter((item: any) => item !== value)
                              : null,
                          },
                        });
                        handleApplyFilters();
                      }}
                      className="text-[#0073C6] hover:text-[#0073C6]/70"
                    >
                      <MdClose className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div
                  key={`${category}-${values}`}
                  className="flex items-center text-nowrap gap-2 mb-[6px] mt-[6px] bg-[#0073C6]/10 text-[#0073C6] px-3 py-1 rounded-full text-sm capitalize"
                >
                  <span>
                    {values === "All"
                      ? "All Listings"
                      : category === "parking" || category === "bathroom"
                      ? `${values} ${category}`
                      : category === "pnb"
                      ? SEARCH_FILTER_DATA.photoAvail?.filter(
                          (each) => each.value == values
                        )[0]?.title
                      : category === "projName"
                      ? values
                      : category === "lat"
                      ? "lat"
                      : category == "lng"
                      ? "lng"
                      : SelectedFiltersMap.get(values)}
                  </span>
                  <button
                    onClick={() => {
                      dispatch({
                        type: "update",
                        payload: {
                          [category]: null,
                          ...(category === "projName" && {
                            projIdEnc: null,
                            phaseId: [],
                          }),
                        },
                      });
                      handleApplyFilters();
                    }}
                    className="text-[#0073C6] hover:text-[#0073C6]/70"
                  >
                    <MdClose className="w-4 h-4" />
                  </button>
                </div>
              ))
          )}
        </div>
      </div>
    )
  );
}
