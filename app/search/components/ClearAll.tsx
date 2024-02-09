import React from "react";

export default function ClearAll() {
  return (
    <div className="flex w-full justify-end items-center pl-auto pr-[13px] py-[5px] bg-[#F4F4F4]">
      <p className="text-[#0073C6] text-lg not-italic font-semibold leading-[normal] underline mr-5 cursor-pointer">
        Clear all
      </p>
      <button className="flex justify-center items-center gap-1 px-2 py-1 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] rounded-[10px] bg-[#0073C6] text-white text-lg not-italic font-semibold leading-[normal]">
        Apply Filters
      </button>
    </div>
  );
}
