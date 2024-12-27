import { useAtom } from "jotai";
import React from "react";
import { MdClose } from "react-icons/md";
import { projSearchStore } from "../../store/projSearchStore";

type Props = {};

export default function SelectedFilters({}: Props) {
  const [state, dispath] = useAtom(projSearchStore);
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
                    className="flex items-center text-nowrap gap-2 bg-[#0073C6]/10 text-[#0073C6] px-3 py-1 rounded-full text-sm"
                  >
                    <span>{value}</span>
                    <button
                      //   onClick={() => removeFilter(category, value)}
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
                  <span>{values}</span>
                  <button
                    // onClick={() => removeFilter(category, values)}
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
