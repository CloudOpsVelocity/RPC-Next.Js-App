import React from "react";
import ReadMore from "../atoms/readmore";
import clsx from "clsx";
import PropertyHeading from "../property/heading";

type Props = {
  heading: string;
  projName?: string;
  content: string;
  id?: string;
  type?: "prop" | "proj";
  className?: string;
  showProjName?: boolean;
  builderName?: string;
  maxLines?: number;
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
  maxLines = 6,
}: Props) {
  // const isMobile  = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const isMobile = false;
  if (isMobile) {
    maxLines = 2;
  }
  const charLimit = maxLines * 100;

  return (
    <div
      className={clsx(
        "w-[95%] sm:w-[90%] sm:mb-[0px] xl:mb-[0%] mt-4  sm:mt-[50px] m-auto mb-[20px] sm:scroll-mt-[140px] xl:scroll-mt-[150px]",
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
          className="mb-[14px] sm:mb-[8px]"
        />
      ) : (
        ((heading !== undefined && heading !== "") ||
          (projName !== undefined && projName !== "")) && (
          <h2 className="sm:text-[22px] xl:text-[28px] font-bold mb-[4px] sm:mb-[10px] xl:mb-[10px] capitalize ">
            <strong>
              {heading && <span className="text-[#001F35] ">{heading} </span>}
              {projName && (
                <span className={clsx(" text-[#148B16]  bg-white")}>
                  {projName}{" "}
                </span>
              )}
            </strong>
          </h2>
        )
      )}
      <div className="w-full">
        <div className="text-[14px] sm:text-[18px] xl:text-[24px] font-[500] text-[#233333] break-words">
          <div
            className="prose-p:py-1 prose-no-break"
            dangerouslySetInnerHTML={{ __html: content?.slice(0, charLimit) }}
          />
        </div>
      </div>
      <ReadMore
        text={content}
        maxLines={maxLines}
        title={heading}
        showProjName={showProjName}
        builderName={builderName}
      />
    </div>
  );
}
