import { useAtom } from "jotai";
import React from "react";
import { MdClose } from "react-icons/md";
import { projSearchStore } from "../../store/projSearchStore";
import { SelectedFiltersMap } from "@/app/data/search";
import useProjSearchAppliedFilters from "../../hooks/useProjSearchAppliedFilters";

type Props = {};

export default function SelectedFilters({}: Props) {
  const [state, dispatch] = useAtom(projSearchStore);
  const { handleApplyFilters } = useProjSearchAppliedFilters();
  return (
    Object.entries(state).some(
      ([_, value]) =>
        (Array.isArray(value) && value.length > 0) || value !== null
    ) && (
      <div className="py-2 border-t">
        <div className="flex overflow-x-auto gap-2">
          {Object.entries(state).map(
            ([category, values]) =>
              values !== null &&
              values !== undefined &&
              category !== "bugdetValue" &&
              category !== "areaValue" &&
              (Array.isArray(values) ? (
                values.map((value) => (
                  <div
                    key={`${category}-${value}`}
                    className="flex items-center text-nowrap gap-2 bg-[#0073C6]/10 text-[#0073C6] px-3 py-1 rounded-full text-sm capitalize"
                  >
                    <span>
                      {category === "parking" || category === "bathroom"
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
                  className="flex items-center text-nowrap gap-2 bg-[#0073C6]/10 text-[#0073C6] px-3 py-1 rounded-full text-sm"
                >
                  <span>
                    {category === "parking" || category === "bathroom"
                      ? `${values} ${category}`
                      : SelectedFiltersMap.get(values)}
                  </span>
                  <button
                    onClick={() => {
                      dispatch({
                        type: "update",
                        payload: {
                          [category]: null,
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
