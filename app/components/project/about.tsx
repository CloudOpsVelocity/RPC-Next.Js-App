"use client";
import React from "react";
import ReadMore from "../atoms/readmore";
import clsx from "clsx";
import PropertyHeading from "../property/heading";
import { useMediaQuery } from "@mantine/hooks";

type Props = {
  heading: string;
  projName?: string;
  content: string;
  id?: string;
  type?: "prop" | "proj";
  className?: string;
  showProjName?: boolean;
  builderName?: string;
};

export default function About({
  heading,
  projName,
  content,
  id,
  type,
  className,
  showProjName,
  builderName,
}: Props) {
  const isMobile = useMediaQuery(`(max-width: 750px)`);
  return (
    <div
      className={clsx(
        "w-[95%] md:w-[90%] mb-[5%] scroll-mt-[180px]",
        className
      )}
      id={id ?? ""}
    >
      {type === "prop" ? (
        <PropertyHeading
          title={heading}
          desc={
            "About listing get summarized perspective for the incredible listing"
          }
          className="mb-[14px] sm:mb-[30px]"
        />
      ) : (
        <h2 className="text-h2 lg:text-[32px] font-[600] text-[#001F35] mb-[4px] sm:mb-[24px] capitalize">
          {heading}{" "}
          <span className={clsx(" font-[700]  text-[#148B16]")}>
            {projName}
          </span>{" "}
        </h2>
      )}

      <ReadMore
        text={content}
        maxLines={isMobile ? 1 : 6}
        title={heading}
        showProjName={showProjName}
        builderName={builderName}
      />
    </div>
  );
}
