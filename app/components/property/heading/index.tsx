import clsx from "clsx";
import React from "react";

export default function PropertyHeading({
  className,
  title,
  desc,
  projName,
}: {
  className?: string;
  title: any;
  desc: string;
  projName?: string;
}) {
  return (
    <div
      className={clsx(
        "inline-flex  gap-2 sm:gap-[26px]  w-[90%] items-center",
        className
      )}
    >
      {Svg}{" "}
      <div>
        {" "}
        <p className="text-h2 sm:text-[22px] xl:text-[32px] font-[600] text-[#001F35] mb-[4px] sm:mb-[10px] xl:mb-[6px] capitalize">
          {title}
          {projName && projName !== "" && <span className="text-[#148B16]">{projName} </span> }
        </p>{" "}
        <p className="text-[13px] sm:text-[16px] xl:text-2xl  text-[#344273]  italic font-semibold leading-[normal] mb-2">
          {desc}
        </p>
      </div>
    </div>
  );
}

const Svg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="6"
    height="72"
    viewBox="0 0 6 72"
    fill="none"
    className="h-[36px] xl:h-[54px] xl:w-[14px]"

  >
    <path
      d="M3 2.5L3 69.5"
      stroke="url(#paint0_linear_342_34781)"
      stroke-width="5"
      stroke-linecap="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_342_34781"
        x1="3.00001"
        y1="72"
        x2="3"
        y2="0.499999"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#B3DFFF" />
        <stop offset="1" stop-color="#0094FF" />
      </linearGradient>
    </defs>
  </svg>
);

export { Svg };
