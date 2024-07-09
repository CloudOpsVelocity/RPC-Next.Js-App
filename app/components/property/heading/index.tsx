import clsx from "clsx";
import React from "react";

export default function PropertyHeading({
  className,
  title,
  desc,
  projName,
}: {
  className?: string;
  title: string;
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
        <p className="text-[#001F35] text-[18px] sm:text-[32px] not-italic font-semibold leading-[normal] uppercase mb-1 sm:mb-[14px]">
          <span className="text-[#148B16]">{projName} </span> {title}
        </p>{" "}
        <p className="text-[#4D6677] text-[12px] sm:text-2xl italic font-medium leading-[normal] capitalize">
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
