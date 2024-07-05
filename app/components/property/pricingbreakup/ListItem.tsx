import clsx from "clsx";
import React from "react";

type Props = {
  label: string;
  value: string | number;
  className?: string;
};

export default function ListItem({ label, value, className }: Props) {
  return (
    <li
      className={clsx(
        "flex w-full   justify-between items-center  list-disc   gap-[14px]  xl:gap-[26px]   text-[14px] xl:text-2xl  font-bold leading-[23.784px]  pb-2 xl:pb-5",
        className
      )}
    >
      <div className=" flex items-center   text-[#202020] text-[14px] xl:text-xl not-italic font-medium leading-[normal] relative pl-5">
        <span className="text-center  absolute left-0 -top-[30px] xl:-top-[25px] font-medium text-5xl">
          .
        </span>

        {label}
      </div>{" "}
      <span className="text-[#242424] text-right text-[14px] xl:text-xl not-italic font-semibold">
        {typeof value === "string" && config.hidePriceItems.includes(value)
          ? value
          : `₹ ${value}`}
      </span>
    </li>
  );
}

const config = {
  hidePriceItems: ["Lifetime", "As Per Actuals", "Already Included"],
};
